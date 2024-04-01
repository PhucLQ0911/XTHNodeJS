import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home";
import ShopPage from "./pages/shop";
import NotFound from "./pages/notFound";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import LayoutWebsite from "./components/layouts/LayoutWebsite";
import DetailProduct from "./pages/detail-product";
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutWebsite />}>
                    <Route index element={<HomePage />} />
                    <Route path="shop" element={<ShopPage />} />
                    <Route path="products/:id" element={<DetailProduct />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
