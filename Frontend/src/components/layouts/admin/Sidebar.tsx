import { Link } from 'react-router-dom';

const Sidebar = () => {
	return (
		<div className="flex h-screen flex-col justify-between border-e bg-white">
			<div className="px-4">
				<ul className="space-y-1">
					<li>
						<Link
							to="categories"
							className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
						>
							Category
						</Link>
					</li>

					<li>
						<Link
							to="products"
							className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
						>
							Product
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};
export default Sidebar;
