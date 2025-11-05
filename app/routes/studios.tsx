import type { JSX } from "react";
import { StudiosListPage } from "~/pages/Studios/StudiosListPage/StudiosListPage";

export function meta() {
    return [
        { title: "Главная" },
        { name: "description", content: "Лабораторная работа по информационным системам, академ разница" },
    ];
}

export default function StudiosList(): JSX.Element {
    return <StudiosListPage />;
}
