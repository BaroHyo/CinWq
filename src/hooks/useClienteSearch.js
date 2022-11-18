import { useEffect, useState } from "react";
import CinApi from "../apis/CinApi";
import { useAuth } from "./useAuth";


export const useClienteSearch = () => {

    const { codigo } = useAuth();


    const [isFetching, setIsFetching] = useState(true);
    const [simpleClienteList, setSimpleClienteList] = useState([]);

    const loadCliente = async () => {
        const resp = await CinApi.get(`/Clientes/ListaClientes/${codigo}`);
        mapClienteList(resp.data.response);
    };

    const mapClienteList = (clienteList) => {
        const newCLienteList = clienteList.map((obj) => {
            return obj;
        });
        setSimpleClienteList(newCLienteList);
        setIsFetching(false);

    };


    useEffect(() => {
        loadCliente();
    }, []);

    return {
        isFetching,
        simpleClienteList,
    };

};
