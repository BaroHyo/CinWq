import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import CinApi from "../apis/CinApi";


export const DistribucionContext = createContext({});


export const DistribucionProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [fecha, setFecha] = useState(new Date());
  const [destribucion, setDestribucion] = useState([]);

  const loadDistribucion = async (codigo, fecha) => {
    try {
      const resp = await CinApi.get(`/Pedido/ListaDistribucion?idVende=${codigo}&fecha=${fecha}`);
      setDestribucion([...resp.data.response]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", JSON.stringify(error.response));
    }
  };

  const cambiarEstado = async (idPedido) => {
    try {
      setIsLoading(true);
      const resp = await CinApi.put(`/Pedido/EditarEstadoPedido?idPedido=${idPedido}&Estado=E`);
      if (resp.data.mensaje === "editado") {
        const newState = destribucion.map(obj => {
          if (obj.peId === idPedido) {
            const mod = obj;
            mod.peEstado = "E";
            return mod;
          }
          return obj;
        });
        setDestribucion(newState);
      }
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", JSON.stringify(error.response));
    }
  };

  const onFecha = (date) => {
    setFecha(date);
  };

  return (
    <DistribucionContext.Provider value={{
      isLoading,
      setIsLoading,
      fecha,
      destribucion,
      loadDistribucion,
      onFecha,
      cambiarEstado,
    }}>
      {children}
    </DistribucionContext.Provider>
  );

};
