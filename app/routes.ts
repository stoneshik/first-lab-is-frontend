import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("music-bands/:id", "routes/music-bands.$id.tsx"),
    route("coordinates", "routes/coordinates.tsx"),
    route("coordinates/:id", "routes/coordinates.$id.tsx"),
    route("albums", "routes/albums.tsx"),
    route("albums/:id", "routes/albums.$id.tsx"),
    route("studios", "routes/studios.tsx"),
    route("studios/:id", "routes/studios.$id.tsx"),
    route("nominations", "routes/nominations.tsx"),
    route("nominations/:id", "routes/nominations.$id.tsx"),
] satisfies RouteConfig;
