import { Link } from 'react-router-dom';
const ProductManagement = () => {
	return (
		<div className="p-5">
			<h1 className="text-center text-xl font-bold">Product List</h1>

			<Link
				className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
				to="add"
			>
				Create Product
			</Link>

			{/* Table */}
			<table className="mt-5 min-w-full divide-y divide-gray-200 border border-gray-300 bg-white text-sm">
				<thead className="bg-gray-50">
					<tr>
						<th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 border border-gray-300">
							Name
						</th>
						<th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 border border-gray-300">
							Date of Birth
						</th>
						<th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 border border-gray-300">
							Role
						</th>
						<th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 border border-gray-300">
							Salary
						</th>
						<th className="px-4 py-2 border border-gray-300 font-bold"></th>
					</tr>
				</thead>

				<tbody className="divide-y divide-gray-200 hover:bg-gray-200">
					<tr className="hover:bg-gray-200">
						<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border border-gray-300">
							John Doe
						</td>

						<td className="whitespace-nowrap px-4 py-2 text-gray-700 border border-gray-300">
							24/05/1995
						</td>
						<td className="whitespace-nowrap px-4 py-2 text-gray-700 border border-gray-300">
							Web Developer
						</td>
						<td className="whitespace-nowrap px-4 py-2 text-gray-700 border border-gray-300">
							$120,000
						</td>
						<td className="whitespace-nowrap py-2 border border-gray-300 flex justify-center space-x-1">
							<Link
								to="#"
								className="inline-block rounded  bg-yellow-400 px-4 py-2 text-xs font-medium text-black hover:bg-indigo-700"
							>
								View
							</Link>
							<button className="inline-block rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
								Delete
							</button>
						</td>
					</tr>
				</tbody>
			</table>

			{/* Pagination */}
			<div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
				<ol className="flex justify-end gap-1 text-xs font-medium">
					<li>
						<a
							href="#"
							className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
						>
							<span className="sr-only">Prev Page</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-3 w-3"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</a>
					</li>
					<li>
						<a
							href="#"
							className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
						>
							1
						</a>
					</li>
					<li className="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
						2
					</li>
					<li>
						<a
							href="#"
							className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
						>
							3
						</a>
					</li>
					<li>
						<a
							href="#"
							className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
						>
							4
						</a>
					</li>
					<li>
						<a
							href="#"
							className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
						>
							<span className="sr-only">Next Page</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-3 w-3"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</a>
					</li>
				</ol>
			</div>
		</div>
	);
};
export default ProductManagement;
