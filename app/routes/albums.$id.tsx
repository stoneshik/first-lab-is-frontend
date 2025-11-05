import type { JSX } from "react";
import { AlbumByIdPage } from "~/pages/Albums/AlbumByIdPage/AlbumByIdPage";

export function meta() {
    return [
        { title: "Муз. альбом" },
        { name: "description", content: "Лабораторная работа по информационным системам, академ разница" },
    ];
}

export default function AlbumById(): JSX.Element {
    return <AlbumByIdPage />;
}
