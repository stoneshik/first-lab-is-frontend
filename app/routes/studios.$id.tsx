import type { JSX } from "react";
import { StudioByIdPage } from "~/pages/Studios/StudioByIdPage/StudioByIdPage";

export function meta() {
    return [
        { title: "Студия" },
        { name: "description", content: "Лабораторная работа по информационным системам, академ разница" },
    ];
}

export default function StudioById(): JSX.Element {
    return <StudioByIdPage />;
}
