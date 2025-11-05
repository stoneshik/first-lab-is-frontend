import { api } from "~/lib/axios";

import { type ErrorMessage } from "~/types/ErrorMessage";
import type { Studio } from "~/types/studio/Studio";

export interface ParamsForGetStudioId {
    id: number;
}

export const getStudioById = async (
    { id }: ParamsForGetStudioId
): Promise<Studio | ErrorMessage> => {
    try {
        const response = await api.get(`/studios/${id}`);
        if (response.status !== 200) {
            return response.data as ErrorMessage;
        }
        return response.data as Studio;
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
