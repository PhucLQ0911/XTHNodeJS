import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface ICategory {
	_id?: number | string;
	name: string;
}

const Categories = () => {
	const { data: categories } = useQuery({
		queryKey: ['CATEGORIES'],
		queryFn: async () => {
			const response = await axios.get(
				'http://localhost:8080/api/v1/categories'
			);
			return response.data.categories;
		},
	});

	return (
		<section className="news">
			<div className="container">
				<div className="section-heading">
					<h2 className="section-heading__title">Categories</h2>
				</div>
				{categories?.map((category: ICategory, index: number) => (
					<div key={index}>
						<h3>
							<Link to={`/categories/${category._id}`}>{category.name}</Link>
						</h3>
					</div>
				))}
			</div>
		</section>
	);
};

export default Categories;
