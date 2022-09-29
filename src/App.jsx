import React from "react";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import Todo from "./pages/Todo/Todo";
import Chat from "./pages/Chat/Chat";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Todo />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </BrowserRouter>
        ,
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
