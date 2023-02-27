import { root } from "postcss";
import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import Login, { LoginPage } from "./page/Login";
import DefaultLayout from "./layouts/DefaultLayout";
import CreatePost from "./page/CreatePost";
import Trending from "./page/Trending";
import Recent from "./page/Recent";
import Register from "./page/Register";
import Profile from "./page/Profile";
import ProfileEdit from "./page/ProfileEdit";
import PostDetail from "./page/PostDetail";
import Notfound from "./page/Notfound";
import Leaderboard from "./page/Leaderboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            { path: "/", element: <Recent /> },
            { path: "/trending", element: <Trending /> },
            { path: "/edit/profile", element: <ProfileEdit /> },
            { path: "/post/:id", element: <PostDetail /> },
            { path: "/profile/:id", element: <Profile /> },
            { path: "/leaderboards", element: <Leaderboard /> },
            { path: "/notfound", element: <Notfound /> },
            { path: "/create", element: <CreatePost /> },
            { path: "/*", element: <Notfound /> },
        ],
    },
    { path: "/login", element: <LoginPage /> },

    { path: "/register", element: <Register /> },
]);

export default router;
