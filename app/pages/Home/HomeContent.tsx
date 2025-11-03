import React, { useCallback, useEffect, useState } from "react";
import { api } from "~/lib/axios";

import { createMessageStringFromErrorMessage, isErrorMessage, type ErrorMessage } from "~/types/ErrorMessage";
import type { WrapperListMusicBand } from "~/types/musicband/WrapperListMusicBand";
import type { MusicGenre } from "~/types/MusicGenre";
import "./homeContent.scss";

interface ParamsForGetWrapperListMusicBand {
    name: string;
    genre: MusicGenre | null;
    description: string;
    bestAlbumName: string;
    studioName: string;
    studioAddress: string;
    page: number;
    size: number;
    sort: string;
}

const getWrapperListMusicBand = async ({
    name,
    genre,
    description,
    bestAlbumName,
    studioName,
    studioAddress,
    page,
    size,
    sort,
}: ParamsForGetWrapperListMusicBand): Promise<WrapperListMusicBand | ErrorMessage> => {
    try {
        const params: Record<string, string | number> = {
            page,
            size,
            sort,
        };
        if (name) { params.name = name; }
        if (genre) { params.genre = genre; }
        if (description) { params.description = description; }
        if (bestAlbumName) { params.bestAlbumName = bestAlbumName; }
        if (studioName) { params.studioName = studioName; }
        if (studioAddress) { params.studioAddress = studioAddress; }

        const response = await api.get("/music-bands", { params });
        if (response.status !== 200) {
            return response.data as ErrorMessage;
        }
        return response.data as WrapperListMusicBand;
    } catch (error) {
        if (error && typeof error === "object" && "response" in error) {
            // @ts-ignore
            const status = error.response?.status;
            // @ts-ignore
            const data = error.response?.data;
            throw new Error(`Серверная ошибка ${status}: ${JSON.stringify(data)}`);
        }
        throw new Error(String(error));
    }
};

export function HomeContent() {
    const [wrapperListMusicBand, setWrapperListMusicBand] = useState<WrapperListMusicBand | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [genre, setGenre] = useState<MusicGenre | null>(null);
    const [description, setDescription] = useState<string>("");
    const [bestAlbumName, setBestAlbumName] = useState<string>("");
    const [studioName, setStudioName] = useState<string>("");
    const [studioAddress, setStudioAddress] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [sort, setSort] = useState<string>("name,asc");

    const load = useCallback(
        async (params: ParamsForGetWrapperListMusicBand) => {
            setLoading(true);
            const data = await getWrapperListMusicBand(params);
            if (isErrorMessage(data)) {
                const message = createMessageStringFromErrorMessage(data);
                setErrorMessage(message);
                setLoading(false);
                return;
            }
            setWrapperListMusicBand(data);
            setLoading(false);
            setErrorMessage("");
        }, []
    );

    useEffect(
        () => {
            let mounted = true;
            (async () => {
                if (!mounted) return;
                await load({
                    name,
                    genre,
                    description,
                    bestAlbumName,
                    studioName,
                    studioAddress,
                    page,
                    size,
                    sort,
                });
            })().catch(_ => setErrorMessage("Не получилось загрузить данные"));
            return () => {
                mounted = false;
            };
        }, [
        name,
        genre,
        description,
        bestAlbumName,
        studioName,
        studioAddress,
        page,
        size,
        sort,
        load,
    ]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const v = event.target.value;
        setName(v);
        setPage(0);
    };

    if (loading) {
        if (errorMessage) {
            return (
                <div className="wrapper">
                    <div className="wrapper__error">{errorMessage}</div>
                </div>
            );
        }
        return (
            <div className="wrapper">
                <div>Загрузка...</div>
            </div>
        );
    }

    if (!wrapperListMusicBand || (wrapperListMusicBand.totalElements ?? 0) === 0) {
        return (
            <div className="wrapper">
                <h1>Музыкальных групп нет</h1>
            </div>
        );
    }

    const musicBands = wrapperListMusicBand.musicBands;
    const totalPages = wrapperListMusicBand.totalPages ?? 1;
    const totalElements = wrapperListMusicBand.totalElements ?? 0;

    const handlePrevPage = () => setPage((p) => Math.max(0, p - 1));
    const handleNextPage = () => setPage((p) => Math.min((totalPages - 1), p + 1));

    return (
        <div className="wrapper">
            <h1>Музыкальные группы</h1>
            <h2>Всего найдено: {totalElements}</h2>
            <div className="wrapper__error">{errorMessage}</div>

            <div className="wrapper__controls">
                <input
                    type="text"
                    placeholder="Фильтр по имени..."
                    value={name}
                    onChange={handleNameChange}/>
                <select
                    value={size}
                    onChange={(e) => {
                        setSize(Number(e.target.value));
                        setPage(0);
                    }}>
                    {[5, 10, 20].map((s) => (
                        <option key={s} value={s}>
                            {s} на страницу
                        </option>
                    ))}
                </select>
            </div>

            <table className="wrapper__table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Жанр</th>
                    <th>Участники</th>
                    <th>Синглы</th>
                    <th>Дата создания</th>
                    <th>Дата основания</th>
                    <th>Описание</th>
                    <th>Координаты</th>
                    <th>Студия</th>
                    <th>Лучший альбом</th>
                </tr>
                </thead>
                <tbody>
                {musicBands.map((band) => (
                    <tr key={band.id}>
                    <td>{band.id}</td>
                    <td>{band.name}</td>
                    <td>{band.genre ?? "-"}</td>
                    <td>{band.numberOfParticipants ?? "-"}</td>
                    <td>{band.singlesCount ?? "-"}</td>
                    <td>{new Date(band.creationDate).toLocaleString()}</td>
                    <td>{new Date(band.establishmentDate).toLocaleDateString()}</td>
                    <td>{band.description || "-"}</td>
                    <td> x: {band.coordinates.x}, y: {band.coordinates.y} </td>
                    <td>{band.studio ? `${band.studio.name} (${band.studio.address})` : "-"}</td>
                    <td>{band.bestAlbum ? `${band.bestAlbum.name} (${band.bestAlbum.length} мин)` : "-"}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="wrapper__pagination">
                <button onClick={handlePrevPage} disabled={page <= 0}>
                    Назад
                </button>
                <span>
                    Страница {page + 1} из {totalPages}
                </span>
                <button onClick={handleNextPage} disabled={page >= totalPages - 1}>
                    Вперед
                </button>
            </div>
        </div>
    );
}
