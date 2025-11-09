import { api } from "~/lib/axios";
import { isErrorMessage } from "~/types/ErrorMessage";
import { MusicGenre } from "~/types/MusicGenre";
import type { Nomination } from "~/types/nomination/Nomination";

export type ParamsForUpdateNomination = {
    id: number;
    musicBandId: number;
    musicBandName: string;
    musicGenre: MusicGenre;
    nominatedAt: string;
};

export const updateNomination = async (
    params: ParamsForUpdateNomination
): Promise<Nomination> => {
    try {
        const response = await api.put<Nomination>(`/nominations/${params.id}`, {
            musicBandId: params.musicBandId,
            musicBandName: params.musicBandName,
            musicGenre: params.musicGenre,
            nominatedAt: params.nominatedAt,
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
