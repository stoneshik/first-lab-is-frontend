import { api } from "~/lib/axios";

import { type ErrorMessage } from "~/types/ErrorMessage";
import type { Nomination } from "~/types/nomination/Nomination";

export interface ParamsForGetNominationId {
    id: number;
}

export const getNominationById = async (
    { id }: ParamsForGetNominationId
): Promise<Nomination| ErrorMessage> => {
    try {
        const response = await api.get(`/nominations/${id}`);
        if (response.status !== 200) {
            return response.data as ErrorMessage;
        }
        return response.data as Nomination;
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
