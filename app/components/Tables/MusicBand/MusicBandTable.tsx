import type { JSX } from "react";
import type { MusicBand } from "~/types/musicBand/MusicBand";
import styles from "./MusicBandTable.module.scss";

interface MusicBandTableProps {
    musicBands: MusicBand[]
}

export const MusicBandTable = ({ musicBands } : MusicBandTableProps): JSX.Element => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Жанр</th>
                    <th>Участники</th>
                    <th>Синглы</th>
                    <th>Дата создания</th>
                    <th>Дата основания</th>
                    <th>Описание</th>
                    <th>Координаты</th>
                    <th>Студия</th>
                    <th>Лучший альбом</th>
                </tr>
            </thead>
            <tbody>
            {musicBands.map(
                (band) => (
                    <tr key={band.id}>
                        <td>{band.id}</td>
                        <td>{band.name}</td>
                        <td>{band.genre ?? "-"}</td>
                        <td>{band.numberOfParticipants ?? "-"}</td>
                        <td>{band.singlesCount ?? "-"}</td>
                        <td>{new Date(band.creationDate).toLocaleString()}</td>
                        <td>{new Date(band.establishmentDate).toLocaleDateString()}</td>
                        <td>{band.description || "-"}</td>
                        <td> x: {band.coordinates.x}, y: {band.coordinates.y} </td>
                        <td>{band.studio ? `${band.studio.name} (${band.studio.address})` : "-"}</td>
                        <td>{band.bestAlbum ? `${band.bestAlbum.name} (${band.bestAlbum.length} мин)` : "-"}</td>
                    </tr>
                )
            )}
            </tbody>
        </table>
    );
}
