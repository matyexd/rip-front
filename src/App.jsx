import React from "react";
import { MantineProvider, Text } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import Todo from "./pages/Todo/Todo";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        <Todo />
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
