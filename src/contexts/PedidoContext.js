import React, { createContext, useState } from "react";
import CinApi from "../apis/CinApi";

export const PedidoContext = createContext({});


export const PedidoProvider = ({ children }) => {


  return (
    <PedidoContext.Provider value={{}}>
      {children}
    </PedidoContext.Provider>
  );

};
