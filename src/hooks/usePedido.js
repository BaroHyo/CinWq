import { useContext } from "react";
import { PedidoContext } from "../contexts";



export const usePedido = () => {

    const context = useContext(PedidoContext);

    return context
}
