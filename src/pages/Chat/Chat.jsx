import {
  Button,
  Container,
  Card,
  TextInput,
  Title,
  Box,
  Text,
} from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/provideAuth";
import MainHeader from "../../layouts/Header/MainHeader";

const Chat = () => {
  const auth = useAuth();

  console.log(auth.user.email);

  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const socket = useRef();

  function connect() {
    socket.current = new WebSocket("ws://localhost:8082");

    socket.current.onopen = () => {
      const message = {
        event: "connection",
        username: auth.user.email,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
    socket.current.onclose = () => {
      console.log("Socket закрыт");
    };
    socket.current.onerror = () => {
      console.log("Socket произошла ошибка");
    };
  }

  const sendMessage = async () => {
    const message = {
      username: auth.user.email,
      message: value,
      id: Date.now(),
      event: "message",
    };
    socket.current.send(JSON.stringify(message));
    setValue("");
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <>
      <MainHeader />
      <Container mt={50}>
        <Box>
          <TextInput
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            label={"Введите сообщение"}
          />
          <Button onClick={sendMessage} mt={10}>
            Отправить
          </Button>
        </Box>
        <Title mt={20}>Сообщения</Title>
        <Box>
          {messages.map((mess) => (
            <Card shadow="sm" p={10} withBorder mt={10} key={mess.id}>
              {mess.event === "connection" ? (
                <>
                  <Text mt="5" color="black" size="sm">
                    Пользователь {mess.username} подключился
                  </Text>
                </>
              ) : (
                <>
                  <Text weight={500} size="lg" mt="5">
                    {mess.username}
                  </Text>
                  <Text mt="5" color="black" size="sm">
                    {mess.message}
                  </Text>
                </>
              )}
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Chat;
