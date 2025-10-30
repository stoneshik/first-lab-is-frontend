import React, { useCallback, useEffect, useState } from "react";
import { api } from "~/lib/axios";

import { isErrorMessage, type ErrorMessage } from "~/types/ErrorMessage";
import type { WrapperListMusicBand } from "~/types/musicband/WrapperListMusicBand";
import "./homeContent.scss";

interface ParamsForGetWrapperListMusicBand {
    page: number;
    size: number;
    filter?: string;
}

const getWrapperListMusicBand = async (
    { page, size, filter }: ParamsForGetWrapperListMusicBand
): Promise<WrapperListMusicBand | ErrorMessage> => {
    try {
        const params: Record<string, string | number> = {
            page,
            size,
        };
        if (filter) {
            params.filter = filter;
        }
        const response = await api.get("/music-bands", { params });
        if (response.status !== 200) {
            return response.data as ErrorMessage;
        }
        return response.data as WrapperListMusicBand;
    } catch (err) {
        if (err && typeof err === "object" && "response" in err) {
            // @ts-ignore
            const status = err.response?.status;
            // @ts-ignore
            const data = err.response?.data;
            throw new Error(`Серверная ошибка ${status}: ${JSON.stringify(data)}`);
        }
        throw new Error(String(err));
    }
};

export function HomeContent() {
    const [wrapperListMusicBand, setWrapperListMusicBand] = useState<WrapperListMusicBand | null>(null);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(5);
    const [filter, setFilter] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const load = useCallback(async (p: number, s: number, f: string) => {
        setLoading(true);
        const data = await getWrapperListMusicBand({ page: p, size: s, filter: f });
        if (isErrorMessage(data)) {
            const violations = data.violations;
            let message = data.message;
            for (let i: number = 0; i < data.violations.length; i++) {
                const violation = violations[i];
                message += violation.nameField + " - " + violation.description
                if (i < data.violations.length - 1) {
                    message += ", "
                }
            }
            setErrorMessage(message);
            setLoading(false);
            return;
        }
        setWrapperListMusicBand(data);
        setLoading(false);
        setErrorMessage("");
    }, []);

    useEffect(() => {
        let mounted = true;
        (async () => {
            if (!mounted) return;
            await load(page, size, filter);
        })().catch(_ => setErrorMessage("Не получилось загрузить данные"));
        return () => {
            mounted = false;
        };
    }, [page, size, filter, load]);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const v = event.target.value;
        setFilter(v);
        setPage(0);
    };

    if (loading) {
        if (errorMessage) {
            return (
                <div className="wrapper">
                    <div>{errorMessage}</div>
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

    const bands = wrapperListMusicBand.musicBands;
    const totalPages = wrapperListMusicBand.totalPages ?? 1;
    const totalElements = wrapperListMusicBand.totalElements ?? 0;

    const handlePrevPage = () => setPage((p) => Math.max(0, p - 1));
    const handleNextPage = () => setPage((p) => Math.min((totalPages - 1), p + 1));

    return (
        <div className="wrapper">
            <h1>Музыкальные группы</h1>
            <h2>Всего найдено: {totalElements}</h2>

            <div className="wrapper__controls">
                <input
                    type="text"
                    placeholder="Фильтр по имени..."
                    value={filter}
                    onChange={handleFilterChange}/>
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
                {bands.map((band) => (
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
            <div>{errorMessage}</div>
        </div>
    );
}
