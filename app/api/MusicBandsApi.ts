import { api } from "~/lib/axios";

import { type ErrorMessage } from "~/types/ErrorMessage";
import type { WrapperListMusicBand } from "~/types/musicBand/WrapperListMusicBand";
import type { MusicGenre } from "~/types/MusicGenre";

export interface ParamsForGetWrapperListMusicBand {
    name: string;
    genre: MusicGenre | null;
    description: string;
    bestAlbumName: string;
    studioName: string;
    studioAddress: string;
    page: number;
    size: number;
    sort: string;
}

export const getWrapperListMusicBand = async ({
    name,
    genre,
    description,
    bestAlbumName,
    studioName,
    studioAddress,
    page,
    size,
    sort,
}: ParamsForGetWrapperListMusicBand): Promise<WrapperListMusicBand | ErrorMessage> => {
    try {
        const params: Record<string, string | number> = {
            page,
            size,
            sort,
        };
        if (name !== "") { params.name = name; }
        if (genre) { params.genre = genre; }
        if (description !== "") { params.description = description; }
        if (bestAlbumName !== "") { params.bestAlbumName = bestAlbumName; }
        if (studioName !== "") { params.studioName = studioName; }
        if (studioAddress !== "") { params.studioAddress = studioAddress; }

        const response = await api.get("/music-bands", { params });
        if (response.status !== 200) {
            return response.data as ErrorMessage;
        }
        return response.data as WrapperListMusicBand;
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
