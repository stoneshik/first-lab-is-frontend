import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";

import { Header } from "./components/header/Header";
import "./app.scss";


export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ru">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links />
        </head>
        <body>
            {children}
            <ScrollRestoration />
            <Scripts />
        </body>
        </html>
    );
}

export default function App() {
    return (
        <>
        <Header />
        <Outlet />
        </>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Упс!";
    let details = "Получена неожиданная ошибка.";
    let stack;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Ошибка";
        details =
        error.status === 404
            ? "Страница не найдена."
            : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <>
        <Header/>
        <main className="error-page">
            <h1 className="error-page__title">{message}</h1>
            <p className="error-page__details">{details}</p>
            {stack && (
                <pre className="error-page__stack">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
        </>
    );
}
