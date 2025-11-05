import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";

import { getAlbumById, type ParamsForGetAlbumId } from "~/api/Albums/GetAlbumById";
import { AlbumTable } from "~/components/Tables/Album/AlbumTable";
import type { Album } from "~/types/album/Album";
import { createMessageStringFromErrorMessage, isErrorMessage } from "~/types/ErrorMessage";
import styles from "./AlbumByIdPage.module.scss";

export function AlbumByIdPage() {
    const { id } = useParams<{ id: string }>();
    const [album, setAlbum] = useState<Album | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const load = useCallback(
        async (params: ParamsForGetAlbumId) => {
            const data = await getAlbumById(params);
            if (isErrorMessage(data)) {
                const message = createMessageStringFromErrorMessage(data);
                setErrorMessage(message);
                return;
            }
            setAlbum(data);
            setErrorMessage("");
        }, []
    );

    useEffect(() => {
        let mounted = true;
        let intervalId: NodeJS.Timeout;
        const fetchData = async () => {
            if (!mounted) return;
            const musicBandId: number = (id === undefined)? 0 : +id;
            try {
                await load({ id: musicBandId });
            } catch {
                setErrorMessage("Не получилось загрузить данные");
            }
        };
        fetchData();
        intervalId = setInterval(fetchData, 10_000);
        return () => {
            mounted = false;
            clearInterval(intervalId);
        };
    }, [id, load]);

    return (
        <div className={styles.wrapper}>
            <h1>Музыкальный альбом</h1>
            <div className={styles.error}>{errorMessage}</div>
            {album && <AlbumTable albums={[album]} />}
        </div>
    );
}
