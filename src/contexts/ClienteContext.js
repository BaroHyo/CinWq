import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import CinApi from "../apis/CinApi";
import { useAuth } from "../hooks/useAuth";
import { generateUUID } from "../utils/commo";

export const ClienteContext = createContext({});


export const ClienteProvider = ({ children }) => {

    const [clientes, setClientes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSucces, setIsSucces] = useState(false);
    const { codigo } = useAuth();

    useEffect(() => {
        loadCLiente();
    }, [codigo]);


    const loadCLiente = async () => {

        if (!codigo) return;

        try {
         //   setIsLoading(true);
            const resp = await CinApi.get(`/Clientes/ListaClientes/${codigo}`);
            setClientes([...resp.data.response]);
            // setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            Alert.alert("Error", JSON.stringify(error.response.data.mensaje));
        }
    };

    const creataCliente = async (body) => {
        try {
            const obj = {
                ...body,
                prId: generateUUID()
            }
            setIsLoading(true);
            const resp = await CinApi.post(`/Clientes/GuardarCliente`, body);
            console.log(resp.data.mensaje);
            setClientes([...clientes, obj]);
            setIsSucces(true);
            setIsLoading(false);
        } catch (error) {
            setIsSucces(false);
            setIsLoading(false);
            Alert.alert("Error", JSON.stringify(error.response.data.mensaje));
        }
    };

    const updateCliente = async (body) => {
        try {
            const resp = await CinApi.put(`/Clientes/UpdateCliente`, body);
            console.log(resp.data);

        } catch (error) {
            Alert.alert("Error", JSON.stringify(error.response.data.mensaje));
            console.error(error.response.data.mensaje);
        }
    };

    const close = () => {
        console.log('entasdf');
        setIsSucces(false)
    }

    return (
        <ClienteContext.Provider
            value={{
                clientes,
                loadCLiente,
                isLoading,
                creataCliente,
                updateCliente,
                isSucces,
                close
            }}
        >
            {children}
        </ClienteContext.Provider>
    );

};
