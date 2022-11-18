import React, { useCallback, useMemo, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import MainRoot from "./routes";
import {
  AuthProvider,
  ClienteProvider,
  PedidoProvider,
  PermissionsProvider,
  PreferencesContext,
  ProductoProvider,
} from "./contexts";
import { CombinedDarkTheme, CombinedDefaultTheme } from "./theme/theme";
import { DistribucionProvider } from "./contexts/DistribucionContext";

const AppState = ({ children }) => {
  return (
    <AuthProvider>
      <PermissionsProvider>
        <ProductoProvider>
          <ClienteProvider>
            <PedidoProvider>
              <DistribucionProvider>
                {children}
              </DistribucionProvider>
            </PedidoProvider>
          </ClienteProvider>
        </ProductoProvider>
      </PermissionsProvider>
    </AuthProvider>
  );
};


export default function App() {

  const [isThemeDark, setIsThemeDark] = useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );


  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <AppState>
            <MainRoot />
          </AppState>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
