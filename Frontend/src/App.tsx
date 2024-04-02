import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import ShopPage from './pages/shop';
import NotFound from './pages/notFound';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import LayoutWebsite from './components/layouts/LayoutWebsite';
import DetailProduct from './pages/detail-product';
import LayoutAdmin from './components/layouts/LayoutAdmin';
import ProductManagement from './pages/admin/product';
import ProductAddPage from './pages/admin/product/add';
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

				<Route path="/admin" element={<LayoutAdmin />}>
					<Route index element={<ProductManagement />} />
					<Route path="products" element={<ProductManagement />} />
					<Route path="products/add" element={<ProductAddPage />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
