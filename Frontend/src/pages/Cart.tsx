import { Services } from '@/components';
import { RemoveIcon } from '@/components/icons';

const CartPage = () => {
	return (
		<>
			<section className="header">
				<div className="header__subbanner">
					<img src="https://picsum.photos/id/1/1440/500" alt="banner" />
				</div>
			</section>
			<section className="infocart mb-5">
				<div className="container">
					<div className="infocart__info">
						<ul className="infocart__list">
							<ul className="infocart__listheader">
								<li className="img"></li>
								<li className="name">Product</li>
								<li className="price">Price</li>
								<li className="quantity">Quantity</li>
								<li className="subtotal">Subtotal</li>
								<li className="remove"></li>
							</ul>

							<li className="infocart__listitem">
								<div className="img">
									<div className="infocart__imageitem">
										<img src="" alt="" />
									</div>
								</div>
								<p className="infocart__nameitem name">Asgaard sofa</p>
								<p className="infocart__priceitem price">25.000.000đ</p>
								<div className="quantity">
									<div className="infocart__quantityitem">
										<span className="minus">-</span>
										<span className="quanity">1</span>
										<span className="plus">+</span>
									</div>
								</div>
								<p className="infocart__subtotalitem subtotal">25.000.000đ</p>
								<div className="remove">
									<div className="infocart__removeitem">
										<img src={RemoveIcon} alt="" />
									</div>
								</div>
							</li>
						</ul>
						<form method="" action="#" className="infocart__checkout">
							<h3 className="infocart__titletotal">Cart Totals</h3>
							<div className="__crosslinecheckout"></div>
							<div className="infocart__subtotalcart">
								<p>Subtotal</p>
								<span>25.000.000đ</span>
							</div>
							<div className="infocart__totalcart">
								<p>Total</p>
								<span>25.000.000đ</span>
							</div>
							<div className="__crosslinecheckout"></div>
							<button>Check Out</button>
						</form>
					</div>
				</div>
			</section>
			<Services />
		</>
	);
};

export default CartPage;
