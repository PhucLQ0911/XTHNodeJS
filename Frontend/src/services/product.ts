import instance from '@/config/axios';
import { IProduct } from '@/interface/IProduct';

export const getAllProducts = async (): Promise<IProduct[]> => {
	try {
		const response = await instance.get('/products');
		return response.data;
	} catch (error) {
		return [];
	}
};

export const getProductById = async (id: number | string) => {
	try {
		const response = await instance.get(`/products/${id}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
