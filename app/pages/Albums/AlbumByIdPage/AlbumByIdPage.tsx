import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";

import { getAlbumById, type ParamsForGetAlbumId } from "~/api/Albums/GetAlbumById";
import { AlbumEditForm } from "~/components/Forms/Albums/AlbumEditForm/AlbumEditForm";
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
            try {
                const data = await getAlbumById(params);
                setAlbum(data);
                setErrorMessage("");
            } catch (error) {
                if (isErrorMessage(error)) {
                    const message = createMessageStringFromErrorMessage(error);
                    setErrorMessage(message);
                    return;
                }
            }
        }, []
    );

    useEffect(() => {
        let mounted = true;
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
        return () => { mounted = false; };
    }, [id, load]);

    return (
        <div className={styles.wrapper}>
            <h1>Музыкальный альбом</h1>
            <div className={styles.error}>{errorMessage}</div>
            {album && <AlbumTable albums={[album]} />}
            {album && <AlbumEditForm album={album} />}
        </div>
    );
}
