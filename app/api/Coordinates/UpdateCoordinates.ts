import { api } from "~/lib/axios";
import type { Coordinates } from "~/types/coordinates/Coordinates";
import { isErrorMessage } from "~/types/ErrorMessage";

export type ParamsForUpdateCoordinates = {
    id: number;
    x: number;
    y: number;
};

export const updateCoordinates = async (
    params: ParamsForUpdateCoordinates
): Promise<Coordinates> => {
    try {
        const response = await api.put<Coordinates>(`/coordinates/${params.id}`, {
            x: params.x,
            y: params.y,
        });
        return response.data;
    } catch (error) {
        if (error && typeof error === "object" && "response" in error) {
            // @ts-ignore
            const status = error.response?.status;
            // @ts-ignore
            const data = error.response?.data;
            if (isErrorMessage(data)) { throw data; }
            throw new Error(`Серверная ошибка ${status}: ${JSON.stringify(data)}`);
        }
        throw new Error(String(error));
    }
}
