import { HomeContent } from "../pages/Home/HomeContent";

export function meta() {
  return [
    { title: "Главная" },
    { name: "description", content: "Лабораторная работа по информационным системам, академ разница" },
  ];
}

export default function Home() {
  return <HomeContent />;
}
