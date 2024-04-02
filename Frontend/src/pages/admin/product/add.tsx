import { IProduct } from '@/interface/IProduct';
import { createProduct } from '@/services/product';
import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

const productSchema = Joi.object({
	name: Joi.string().min(3).max(30).required(),
	price: Joi.number().min(0).required(),
	image: Joi.string().uri().required(),
	description: Joi.string(),
	discount: Joi.number().min(0),
	featured: Joi.boolean(),
});

const ProductAddPage = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IProduct>({
		resolver: joiResolver(productSchema),
		defaultValues: {
			name: '',
			price: 0,
			image: '',
			description: '',
			discount: 0,
			featured: false,
		},
	});

	const mutation = useMutation({
		mutationFn: async (product: IProduct) => {
			const { data } = await createProduct(product);
			return data;
		},
		onSuccess: () => {
			toast.success('Product created successfully!');
			reset();
		},
	});

	const onSubmit = (product: IProduct) => {
		mutation.mutate(product);
	};

	return (
		<section className="bg-gray-100">
			<ToastContainer />
			<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
					<h2 className="text-center font-semibold text-2xl">
						Add new product
					</h2>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-3">
						{/* Name product */}
						<div>
							<input
								className="border border-gray-200 w-full rounded-lg  p-3 text-sm"
								placeholder="Name"
								type="text"
								{...register('name')}
							/>
							{errors.name && (
								<span className="text-red-500">{errors.name.message}</span>
							)}
						</div>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							{/* Price Product */}
							<div>
								<input
									className="border w-full rounded-lg border-gray-200 p-3 text-sm"
									placeholder="Price"
									type="number"
									{...register('price')}
								/>
								{errors.price && (
									<span className="text-red-500">{errors.price.message}</span>
								)}
							</div>

							{/* Image  */}
							<div>
								<input
									className="border w-full rounded-lg border-gray-200 p-3 text-sm"
									placeholder="Image"
									type="text"
									{...register('image')}
								/>
								{errors.image && (
									<span className="text-red-500">{errors.image.message}</span>
								)}
							</div>
						</div>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							{/* Featured */}
							<div>
								<label
									htmlFor="HeadlineAct"
									className=" text-sm font-medium text-gray-900"
								>
									{' '}
									Product type{' '}
								</label>

								<select
									className="border mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
									{...register('featured')}
								>
									<option value="true">Featured</option>
									<option value="false">Ordinary</option>
								</select>
							</div>

							{/* Discount */}
							<div>
								<input
									className="border w-full rounded-lg border-gray-200 p-3 text-sm"
									placeholder="Discount"
									type="text"
									{...register('discount')}
								/>
							</div>
						</div>

						{/* Description */}
						<div>
							<textarea
								className="border w-full rounded-lg border-gray-200 p-3 text-sm"
								placeholder="Description"
								rows={6}
								{...register('description')}
							></textarea>
						</div>

						<div className="mt-4">
							<button
								type="submit"
								className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
							>
								Add product
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};
export default ProductAddPage;
