import type { JSX } from "react";
import { NominationsListPage } from "~/pages/Nominations/NominationsListPage/NominationsListPage";

export function meta() {
    return [
        { title: "Номинации" },
        { name: "description", content: "Лабораторная работа по информационным системам, академ разница" },
    ];
}

export default function NominationsList(): JSX.Element {
    return <NominationsListPage />;
}
