import { api } from "~/lib/axios";
import type { Album } from "~/types/album/Album";
import { isErrorMessage } from "~/types/ErrorMessage";

export type ParamsForUpdateAlbum = {
    id: number;
    name: string;
    length: number;
};

export const updateAlbum = async (
    params: ParamsForUpdateAlbum
): Promise<Album> => {
    try {
        const response = await api.put<Album>(`/albums/${params.id}`, {
            name: params.name,
            length: params.length,
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
