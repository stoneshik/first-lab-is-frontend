import type { JSX } from "react";
import { MusicBandContent } from "~/pages/MusicBandPage/MusicBandContent";

export function meta() {
    return [
        { title: "Муз. группа" },
        { name: "description", content: "Лабораторная работа по информационным системам, академ разница" },
    ];
}

export default function MusicBandPage(): JSX.Element {
    return <MusicBandContent />;
}
