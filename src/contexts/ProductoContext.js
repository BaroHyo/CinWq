import React, { createContext, useEffect, useState } from "react";
import CinApi from "../apis/CinApi";

export const ProductoContext = createContext({});

export const ProductoProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);

    const [producto, setProducto] = useState([]);

    useEffect(() => {
        loadProducto();
    }, []);

    const loadProducto = async () => {
        try {
            setIsLoading(false);
            const resp = await CinApi.get(`/Producto/Lista`);
            setProducto([...resp.data.response]);
            setIsLoading(true);
        } catch (e) {
            console.error(e.response);
            setIsLoading(true);
        }
    };

    return (
        <ProductoContext.Provider
            value={{
                isLoading,
                producto,
                loadProducto,
            }}>
            {children}
        </ProductoContext.Provider>
    );
};
