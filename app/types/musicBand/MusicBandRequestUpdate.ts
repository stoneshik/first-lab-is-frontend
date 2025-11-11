import type { Album } from "../album/Album";
import type { Coordinates } from "../coordinates/Coordinates";
import type { MusicGenre } from "../MusicGenre";
import type { Studio } from "../studio/Studio";

export interface MusicBandRequestUpdate {
    id: number;
    name: string;
    coordinates: Coordinates | null;
    coordinatesId: number | null;
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
