import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import type { MusicBand } from "~/types/musicBand/MusicBand";

import { getMusicBandById, type ParamsForGetMusicBandId } from "~/api/MusicBands/GetMusicBandById";
import { MusicBandTable } from "~/components/Tables/MusicBand/MusicBandTable";
import { createMessageStringFromErrorMessage, isErrorMessage } from "~/types/ErrorMessage";
import styles from "./MusicBandContent.module.scss";

export function MusicBandContent() {
    const { id } = useParams<{ id: string }>();
    const [musicBand, setMusicBand] = useState<MusicBand | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const load = useCallback(
        async (params: ParamsForGetMusicBandId) => {
            const data = await getMusicBandById(params);
            if (isErrorMessage(data)) {
                const message = createMessageStringFromErrorMessage(data);
                setErrorMessage(message);
                return;
            }
            setMusicBand(data);
            setErrorMessage("");
        }, []
    );

    useEffect(
        () => {
            const musicBandId: number = (id === undefined)? 0 : +id;
            let mounted = true;
            (async () => {
                if (!mounted) return;
                await load({
                    id: musicBandId
                });
            })().catch(_ => setErrorMessage("Не получилось загрузить данные"));
            return () => {
                mounted = false;
            };
        }, [id, load]
    );

    useEffect(() => {
        let mounted = true;
        let intervalId: NodeJS.Timeout;
        const fetchData = async () => {
            if (!mounted) return;
            const musicBandId: number = (id === undefined)? 0 : +id;
            try {
                await load({
                    id: musicBandId
                });
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
            <h1>Музыкальная группа</h1>
            <div className={styles.error}>{errorMessage}</div>
            {musicBand && <MusicBandTable musicBands={[musicBand]} />}
        </div>
    );
}
