import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import useAuthCheck from "../hooks/useAuthCheck";

export default function App() {
    const {isLoading} = useAuthCheck();

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}
