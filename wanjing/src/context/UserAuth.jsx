import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({
    user: null,
    token: null,
    url: null,
});
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem("token"));
    const [url, setUrl] = useState("http://localhost:8000/");

    function setToken(token) {
        _setToken(token);
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }

    return (
        <UserContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
                url,
                setUrl,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
