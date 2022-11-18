import { useEffect, useState } from "react";
import CinApi from "../apis/CinApi";


export const useProductoSearch = () => {

  const [isFetching, setIsFetching] = useState(true);
  const [simpleProductoList, setSimpleProductoList] = useState([]);

  const loadProducto = async () => {
    const resp = await CinApi.get(`/Producto/Lista`);
    mapProductoList(resp.data.response);
  };

  const mapProductoList = (productoList) => {

    const newProductoList = productoList.map((obj) => {
      return obj;
    });
    setSimpleProductoList(newProductoList);
    setIsFetching(false);

  };


  useEffect(() => {
    loadProducto();
  }, []);

  return {
    isFetching,
    simpleProductoList,
  };

};
