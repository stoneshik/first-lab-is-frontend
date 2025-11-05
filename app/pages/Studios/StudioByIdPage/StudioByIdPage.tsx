import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";

import { getStudioById, type ParamsForGetStudioId } from "~/api/Studios/GetStudioById";
import { StudioTable } from "~/components/Tables/Studio/StudioTable";
import { createMessageStringFromErrorMessage, isErrorMessage } from "~/types/ErrorMessage";
import type { Studio } from "~/types/studio/Studio";
import styles from "./StudioByIdPage.module.scss";

export function StudioByIdPage() {
    const { id } = useParams<{ id: string }>();
    const [studio, setStudio] = useState<Studio | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const load = useCallback(
        async (params: ParamsForGetStudioId) => {
            const data = await getStudioById(params);
            if (isErrorMessage(data)) {
                const message = createMessageStringFromErrorMessage(data);
                setErrorMessage(message);
                return;
            }
            setStudio(data);
            setErrorMessage("");
        }, []
    );

    useEffect(() => {
        let mounted = true;
        let intervalId: NodeJS.Timeout;
        const fetchData = async () => {
            if (!mounted) return;
            const studioId: number = (id === undefined)? 0 : +id;
            try {
                await load({ id: studioId });
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
            <h1>Студия</h1>
            <div className={styles.error}>{errorMessage}</div>
            {studio && <StudioTable studios={[studio]} />}
        </div>
    );
}
