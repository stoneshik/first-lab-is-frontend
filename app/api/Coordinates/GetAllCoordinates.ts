import { api } from "~/lib/axios";
import type { WrapperListCoordinates } from "~/types/coordinates/WrapperListCoordinates";

import { type ErrorMessage } from "~/types/ErrorMessage";

export interface ParamsForGetWrapperListCoordinates {
    page: number;
    size: number;
}

export const getWrapperListCoordinates = async ({
    page,
    size,
}: ParamsForGetWrapperListCoordinates): Promise<WrapperListCoordinates | ErrorMessage> => {
    try {
        const params: Record<string, number> = {
            page,
            size,
        };
        const response = await api.get("/coordinates", { params });
        if (response.status !== 200) {
            return response.data as ErrorMessage;
        }
        return response.data as WrapperListCoordinates;
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
