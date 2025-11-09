import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";

import { getNominationById, type ParamsForGetNominationId } from "~/api/Nominations/GetNominationById";
import { NominationTable } from "~/components/Tables/Nomination/NominationTable";
import { createMessageStringFromErrorMessage, isErrorMessage } from "~/types/ErrorMessage";
import type { Nomination } from "~/types/nomination/Nomination";
import styles from "./NominationByIdPage.module.scss";

export function NominationByIdPage() {
    const { id } = useParams<{ id: string }>();
    const [nomination, setNomination] = useState<Nomination | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const load = useCallback(
        async (params: ParamsForGetNominationId) => {
            try {
                const data = await getNominationById(params);
                setNomination(data);
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
        let intervalId: NodeJS.Timeout;
        const fetchData = async () => {
            if (!mounted) return;
            const nominationId: number = (id === undefined)? 0 : +id;
            try {
                await load({ id: nominationId });
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
            <h1>Номинация муз. группы</h1>
            <div className={styles.error}>{errorMessage}</div>
            {nomination && <NominationTable nominations={[nomination]} />}
        </div>
    );
}
