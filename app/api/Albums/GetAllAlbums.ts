import { api } from "~/lib/axios";
import type { WrapperListAlbum } from "~/types/album/WrapperListAlbum";

import { type ErrorMessage } from "~/types/ErrorMessage";

export interface ParamsForGetWrapperListAlbum {
    page: number;
    size: number;
}

export const getWrapperListAlbum = async ({
    page,
    size,
}: ParamsForGetWrapperListAlbum): Promise<WrapperListAlbum | ErrorMessage> => {
    try {
        const params: Record<string, number> = {
            page,
            size,
        };
        const response = await api.get("/albums", { params });
        if (response.status !== 200) {
            return response.data as ErrorMessage;
        }
        return response.data as WrapperListAlbum;
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
