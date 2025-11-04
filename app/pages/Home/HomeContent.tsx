import React, { useCallback, useEffect, useState } from "react";

import type { ParamsForGetWrapperListMusicBand } from "~/api/MusicBandsApi";
import { getWrapperListMusicBand } from "~/api/MusicBandsApi";
import { MusicBandTable } from "~/components/Tables/MusicBand/MusicBandTable";
import { createMessageStringFromErrorMessage, isErrorMessage } from "~/types/ErrorMessage";
import type { WrapperListMusicBand } from "~/types/musicBand/WrapperListMusicBand";
import type { MusicGenre } from "~/types/MusicGenre";
import styles from "./HomeContent.module.scss";

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

    if (!wrapperListMusicBand || (wrapperListMusicBand.totalElements ?? 0) === 0) {
        return (
            <div className={styles.wrapper}>
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
        <div className={styles.wrapper}>
            <h1>Музыкальные группы</h1>
            <h2>Всего найдено: {totalElements}</h2>
            <div className={styles.error}>{errorMessage}</div>

            <div className={styles.controls}>
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

            <MusicBandTable musicBands={musicBands} />

            <div className={styles.pagination}>
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
