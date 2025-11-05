import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("music-bands/:id", "routes/music-bands.$id.tsx"),
] satisfies RouteConfig;
