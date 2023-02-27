import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";

export default function Notfound() {
    const navigate = useNavigate();
    setTimeout(() => {
        navigate("/");
    }, 2000);
    return (
        <div className="text-xl font-bold text-white/90 text-center h-screen items-center">
            <p>404 Not found mas bro</p>
            <div>
                <Loading bg="base" text="Redirecting to homepage" />
            </div>
        </div>
    );
}
