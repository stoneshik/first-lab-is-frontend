import type { JSX } from "react";
import { CoordinatesByIdPage } from "~/pages/Coordinates/CoordinatesByIdPage/CoordinatesByIdPage";

export function meta() {
    return [
        { title: "Координаты" },
        { name: "description", content: "Лабораторная работа по информационным системам, академ разница" },
    ];
}

export default function CoordinatesById(): JSX.Element {
    return <CoordinatesByIdPage />;
}
