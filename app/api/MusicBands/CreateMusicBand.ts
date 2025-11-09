import { api } from "~/lib/axios";
import type { Album } from "~/types/album/Album";
import type { Coordinates } from "~/types/coordinates/Coordinates";
import { isErrorMessage } from "~/types/ErrorMessage";
import type { MusicGenre } from "~/types/MusicGenre";
import type { Studio } from "~/types/studio/Studio";

export interface ParamsForCreateMusicBand {
    name: string;
    coordinates: Coordinates | null;
    coordinatesId: number | null;
    creationDate: string;
    genre: MusicGenre | null;
    numberOfParticipants: number | null;
    singlesCount: number;
    description: string | null;
    bestAlbum: Album | null;
    bestAlbumId: number | null;
    albumsCount: number;
    establishmentDate: string;
    studio: Studio | null;
    studioId: number | null;
}

export const createMusicBand = async (params: ParamsForCreateMusicBand): Promise<void> => {
    try {
        await api.post("/music-bands", { params });
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
};
