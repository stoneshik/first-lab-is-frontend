import type { JSX } from "react";
import { AlbumsListPage } from "~/pages/Albums/AlbumsListPage/AlbumsListPage";

export function meta() {
    return [
        { title: "Альбомы" },
        { name: "description", content: "Лабораторная работа по информационным системам, академ разница" },
    ];
}

export default function Albums(): JSX.Element {
    return <AlbumsListPage />;
}
