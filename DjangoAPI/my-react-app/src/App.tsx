import './App.css'
import HomePage from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import CategoryCreatePage from "./pages/categories/Create";
import AdminLayout from "./layout/admin/AdminLayout.tsx";
import AdminDashboardPage from "./pages/admin/Dashboard";
import AdminNotFoundPage from "./pages/admin/NotFound";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import PasswordResetRequest from './pages/PasswordReset/index.tsx';
import PasswordResetConfirm from './pages/PasswordResetConfirm/index.tsx';
import AddProductPage from './pages/product/create/index.tsx';
import ProductListPage from './pages/product/ProductListPage';
import EditProductPage from './pages/product/EditProductPage';
 
const App = () => {
 
    return (
        <>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<HomePage/>} />
 
                    <Route path={"categories"}>
                        <Route path={"create"} element={<CategoryCreatePage/>}/>
                    </Route>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path={"password-reset"} element={<PasswordResetRequest />} />
                    <Route
                        path="password-reset-confirm/:uid/:token"
                        element={<PasswordResetConfirm />}
                        />
 
                </Route>
                <Route path={"products"}>
                    <Route index element={<ProductListPage/>}/>
                    <Route path={"create"} element={<AddProductPage/>}/>
                    <Route path={"edit/:id"} element={<EditProductPage/>}/>
                </Route>
                <Route path={"admin"} element={<AdminLayout />}>
 
                    <Route path="home" element={<AdminDashboardPage />}/>
 
                </Route>
 
                <Route path="*" element={<AdminNotFoundPage />} />
 
            </Routes>
 
        </>
    )
}
 
export default App