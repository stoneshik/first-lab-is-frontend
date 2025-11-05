import { api } from "~/lib/axios";

import { type ErrorMessage } from "~/types/ErrorMessage";
import type { MusicBand } from "~/types/musicBand/MusicBand";

export interface ParamsForGetMusicBandId {
    id: number;
}

export const getMusicBandById = async (
    { id }: ParamsForGetMusicBandId
): Promise<MusicBand | ErrorMessage> => {
    try {
        const response = await api.get(`/music-bands/${id}`);
        if (response.status !== 200) {
            return response.data as ErrorMessage;
        }
        return response.data as MusicBand;
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
