export interface IProduct {
	_id?: number | string;
	name: string;
	category: ICategory;
	price: number;
	image: string;
	description: string;
	discount: number;
	featured: boolean;
}

interface ICategory {
	_id: number | string;
	name: string;
}
