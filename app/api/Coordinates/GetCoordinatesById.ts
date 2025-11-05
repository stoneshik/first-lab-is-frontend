import { api } from "~/lib/axios";
import type { Coordinates } from "~/types/coordinates/Coordinates";

import { type ErrorMessage } from "~/types/ErrorMessage";

export interface ParamsForGetCoordinatesId {
    id: number;
}

export const getCoordinatesById = async (
    { id }: ParamsForGetCoordinatesId
): Promise<Coordinates | ErrorMessage> => {
    try {
        const response = await api.get(`/coordinates/${id}`);
        if (response.status !== 200) {
            return response.data as ErrorMessage;
        }
        return response.data as Coordinates;
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
