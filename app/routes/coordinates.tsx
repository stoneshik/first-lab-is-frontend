import type { JSX } from "react";
import { CoordinatesListPage } from "~/pages/Coordinates/CoordinatesListPage/CoordinatesListPage";

export function meta() {
    return [
        { title: "Координаты" },
        { name: "description", content: "Лабораторная работа по информационным системам, академ разница" },
    ];
}

export default function CoordinatesList(): JSX.Element {
    return <CoordinatesListPage />;
}
