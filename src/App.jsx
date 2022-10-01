import React from "react";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";
import ProvideAuth from "./context/provideAuth";
import PrivateRoutes from "./routes/privateRoutes";
import PublicRoutes from "./routes/publicRoutes";

function App() {
  return (
    <ProvideAuth>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <BrowserRouter>
            <PrivateRoutes />
            <PublicRoutes />
          </BrowserRouter>
        </NotificationsProvider>
      </MantineProvider>
    </ProvideAuth>
  );
}

export default App;
