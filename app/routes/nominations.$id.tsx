import type { JSX } from "react";
import { NominationByIdPage } from "~/pages/Nominations/NominationByIdPage/NominationByIdPage";

export function meta() {
    return [
        { title: "Номинация" },
        { name: "description", content: "Лабораторная работа по информационным системам, академ разница" },
    ];
}

export default function NominationById(): JSX.Element {
    return <NominationByIdPage />;
}
