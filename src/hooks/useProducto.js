import { useContext } from "react";
import { ProductoContext } from "../contexts";

 
export const useProducto = () => {
    const context = useContext(ProductoContext);

    return context
}

 