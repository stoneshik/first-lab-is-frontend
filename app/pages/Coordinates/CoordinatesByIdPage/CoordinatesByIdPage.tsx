import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";

import { getCoordinatesById, type ParamsForGetCoordinatesId } from "~/api/Coordinates/GetCoordinatesById";
import { CoordinatesTable } from "~/components/Tables/Coordinates/CoordinatesTable";
import type { Coordinates } from "~/types/coordinates/Coordinates";
import { createMessageStringFromErrorMessage, isErrorMessage } from "~/types/ErrorMessage";
import styles from "./CoordinatesByIdPage.module.scss";

export function CoordinatesByIdPage() {
    const { id } = useParams<{ id: string }>();
    const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const load = useCallback(
        async (params: ParamsForGetCoordinatesId) => {
            const data = await getCoordinatesById(params);
            if (isErrorMessage(data)) {
                const message = createMessageStringFromErrorMessage(data);
                setErrorMessage(message);
                return;
            }
            setCoordinates(data);
            setErrorMessage("");
        }, []
    );

    useEffect(() => {
        let mounted = true;
        let intervalId: NodeJS.Timeout;
        const fetchData = async () => {
            if (!mounted) return;
            const coordinatesId: number = (id === undefined)? 0 : +id;
            try {
                await load({ id: coordinatesId });
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
            <h1>Координаты муз. групп</h1>
            <div className={styles.error}>{errorMessage}</div>
            {coordinates && <CoordinatesTable coordinates={[coordinates]} />}
        </div>
    );
}
