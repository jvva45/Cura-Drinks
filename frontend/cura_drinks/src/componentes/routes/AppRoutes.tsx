import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/componentes/pages/dashboard";
import Produtos from "@/componentes/pages/produtos";
import Categorias from "../pages/categorias";



export default function AppRoutes() {

    const isLoggerIn = true;

  return (
    <Router>
        <Routes>
            <Route path = "/*" element={isLoggerIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            <Route path = "/login" element={<h1>Login Page</h1>} />
            <Route path = "/dashboard" element={isLoggerIn ? <Dashboard/> : <Navigate to="/login" />} >
                <Route path = "produtos" element={<Produtos/>} />
                <Route path = "categorias" element={<Categorias/>} />
                <Route path = "settings" element={<h1>Settings Page</h1>} />    
            </Route>
        </Routes>
    </Router>
  )
}   