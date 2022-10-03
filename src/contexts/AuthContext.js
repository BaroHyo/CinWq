import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthReducer } from "./AuthReducer";
import CinApi from "../apis/CinApi";
 
export const AuthContext = createContext({});

const authInicialState = {
  status: "checking",
  codigo: null,
  user: null,
  errorMessage: "",
};

export const AuthProvider = ({ children }) => {

  const [state, dispatch] = useReducer(AuthReducer, authInicialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {

    const codigo = await AsyncStorage.getItem("codigo");

    if (!codigo) return dispatch({ type: "notAuthenticated" });

    try {
      const { data } = await CinApi.get(`/Vendedor/ObtenerVendedor/${codigo}`);
      //console.log(data.response);
      if (!data.response) {
        return dispatch({ type: "notAuthenticated" });
      }
      await AsyncStorage.setItem("codigo", codigo);
      dispatch({
        type: "signUp",
        payload: {
          codigo: codigo,
          user: data.response,
        },
      });
    } catch (e) {
      dispatch({
        type: "addError",
        payload: e.response.data.msg || "Información incorrecta",
      });
    }
  };

  const signIn = async ({ codigo }) => {
    try {
      const { data } = await CinApi.get(`/Vendedor/ObtenerVendedor/${codigo}`);
      //rconsole.log(data);
      if (!data.response) {
        dispatch({
          type: "addError",
          payload: "Información incorrecta",
        });
      } else {
        dispatch({
          type: "signUp",
          payload: {
            codigo: codigo,
            user: data.response,
          },
        });

        await AsyncStorage.setItem("codigo", data.response.veId.toString());
      }
    } catch (e) {
      dispatch({
        type: "addError",
        payload: e.response.data.msg || "Información incorrecta",
      });
    }
  };

  const logOut = async () => {
    await AsyncStorage.removeItem("codigo");
    dispatch({ type: "logout" });
  };

  const removeError = () => {
    dispatch({ type: "removeError" });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      signIn,
      logOut,
      removeError,
    }}>
      {children}
    </AuthContext.Provider>
  );

};
