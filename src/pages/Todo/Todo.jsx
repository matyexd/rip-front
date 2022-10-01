import { Container, Title, Button } from "@mantine/core";
import React, { useEffect, useState } from "react";
import CreateModal from "../../components/CreateModal";
import Tasks from "./Tasks";
import { Loader } from "@mantine/core";
import { showError, showSuccess } from "../../utils/notifications";
import MainHeader from "../../layouts/Header/MainHeader";
import { useAuth } from "../../context/provideAuth";
import request from "../../utils/ajaxManager";

const Todo = () => {
  const [openedCreateTask, setOpenedCreateTask] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const auth = useAuth();
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    await request(
      "/task",
      "GET",
      {},
      {
        Authorization: "Bearer " + auth.token,
      },
      (response) => setTasks(response.data),
      () => showError()
    );
    setLoading(false);
  };

  const addTask = async (content) => {
    setLoadingButton(true);
    let formData = new FormData();
    formData.append("content", content);

    await request(
      "/task",
      "POST",
      formData,
      {
        Authorization: "Bearer " + auth.token,
      },
      () => {
        getTasks();
        setLoadingButton(false);
        setOpenedCreateTask(false);
        showSuccess();
      },
      () => {
        setOpenedCreateTask(false);
        showError();
      }
    );
  };

  useEffect(() => {
    setLoading(true);
    getTasks();
  }, []);

  return (
    <>
      <MainHeader />
      <Container mt={50}>
        <Title order={1}>My tasks</Title>
        {loading ? (
          <Loader />
        ) : (
          <Tasks tasks={tasks} setTasks={setTasks} getTasks={getTasks} />
        )}

        <Button
          onClick={() => {
            setOpenedCreateTask(true);
          }}
          fullWidth
          mt={25}
        >
          Добавить новую задачу
        </Button>
      </Container>
      <CreateModal
        opened={openedCreateTask}
        setOpened={setOpenedCreateTask}
        addTask={addTask}
        loadingButton={loadingButton}
      />
    </>
  );
};

export default Todo;
