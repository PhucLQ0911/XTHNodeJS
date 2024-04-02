import { Outlet } from 'react-router-dom';
import NavBar from './admin/NavBar';
import Sidebar from './admin/Sidebar';

const LayoutAdmin = () => {
	return (
		<div>
			<NavBar />
			<div className="grid grid-cols-12 mt-5">
				<div className="col-span-2">
					<Sidebar />
				</div>
				<div className="col-span-10">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
export default LayoutAdmin;
