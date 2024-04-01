import { useProductQuery } from "@/hooks/useProductQuery";
import { useParams } from "react-router-dom";

const DetailProduct = () => {
    const { id } = useParams();
    const { data, isLoading } = useProductQuery(id!);

    if (isLoading) return <p>Loading...</p>;
    return <div>{data?.name}</div>;
};

export default DetailProduct;
