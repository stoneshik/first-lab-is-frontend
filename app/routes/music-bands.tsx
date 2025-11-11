import type { JSX } from "react";
import { MusicBandsPage } from "~/pages/MusicBands/MusicBandsPage/MusicBandsPage";

export function meta() {
    return [
        { title: "Муз. группы" },
        { name: "description", content: "Лабораторная работа по информационным системам, академ разница" },
    ];
}

export default function MusicBandsContent(): JSX.Element {
    return <MusicBandsPage />;
}
