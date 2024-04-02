import { IProduct } from '@/interface/IProduct';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const CategoryDetail = () => {
	const { id } = useParams();
	const {
		data: products,
		isError,
		isLoading,
	} = useQuery({
		queryKey: ['CATEGORY_DETAIL', id],
		queryFn: async () => {
			const response = await axios.get(
				`http://localhost:8080/api/v1/categories/${id}`
			);
			return response.data.products;
		},
	});

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error</p>;

	return (
		<div>
			<section className="news">
				<div className="container">
					<div className="section-heading">
						<h2 className="section-heading__title">Products</h2>
					</div>
					<div className="section-body">
						<div className="product-list">
							{products?.map((product: IProduct, index: number) => {
								return (
									<div key={index} className="product-item">
										<div className="product-image">
											<img
												src={product?.image}
												alt="#"
												className="product__thumbnail"
											/>
											<span className="product-sale">{product?.discount}%</span>
										</div>
										<div className="product-info">
											<h3 className="product__name">
												<Link
													to={`/products/${product._id}`}
													className="product__link"
												>
													{product?.name}
												</Link>
											</h3>
											<a href="#" className="product__category">
												{product?.category.name}
											</a>
											<div className="product-price">
												<span className="product-price__new">
													{Number(
														(
															(product?.price * (100 - product?.discount)) /
															100
														).toFixed(2)
													)}
												</span>
												<span className="product-price__old">
													{product?.price}
												</span>
											</div>
										</div>
										<div className="product-actions">
											<Link
												to={`/products/${product._id}`}
												className="btn product-action__quickview"
											>
												Quick View
											</Link>
											<button className="btn product-action__addtocart">
												Add To Cart
											</button>
											<div className="product-actions-more">
												<span className="product-action__share">Share</span>
												<span className="product-action__compare">Compare</span>
												<span className="product-action__like">Like</span>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
export default CategoryDetail;
