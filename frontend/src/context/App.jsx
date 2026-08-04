import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuthCheck from "../hooks/useAuthCheck";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";
import Companies from "../pages/Companies";
import CompanyDetails from "../pages/CompanyDetails";
import { Contacts } from "../pages/Contacts";
import { ContactDetails } from "../pages/ContactDetails";
import { Deals } from "../pages/Deals";
import { DealDetails } from "../pages/DealDetails";

function ProtectedRoute({ children }) {
    const user = useSelector((state) => state.auth.user);
    if (!user) return <Navigate to="/login" replace />;
    return children;
}

export default function App() {
    const { isLoading } = useAuthCheck();

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={
                    <ProtectedRoute><Dashboard /></ProtectedRoute>
                } />

                <Route path="/companies" element={
                    <ProtectedRoute><Companies /></ProtectedRoute>
                } />
                <Route path="/companies/:id" element={
                    <ProtectedRoute><CompanyDetails /></ProtectedRoute>
                } />

                <Route path="/contacts" element={
                    <ProtectedRoute><Contacts /></ProtectedRoute>
                } />
                <Route path="/contacts/:id" element={
                    <ProtectedRoute><ContactDetails /></ProtectedRoute>
                } />

                <Route path="/deals" element={
                    <ProtectedRoute><Deals /></ProtectedRoute>
                } />
                <Route path="/deals/:id" element={
                    <ProtectedRoute><DealDetails /></ProtectedRoute>
                } />

                <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    )
}
