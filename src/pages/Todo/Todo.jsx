import {
  Container,
  Text,
  Title,
  Card,
  Group,
  ActionIcon,
  Button,
  Checkbox,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Trash, Pencil } from "tabler-icons-react";
import CreateModal from "../../components/CreateModal";
import EditModal from "../../components/EditModal";
import * as api from "../../api/api";
import Tasks from "./Tasks";
import { Loader } from "@mantine/core";
import { showError, showSuccess } from "../../utils/notifications";

const Todo = () => {
  const [openedCreateTask, setOpenedCreateTask] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    let data = await api.getTasksFetch();
    if (data) {
      setTasks(data.data);
    } else {
      showError();
    }
    setLoading(false);
  };

  const addTask = async (content) => {
    setLoadingButton(true);
    setLoadingButton(true);
    const data = await api.addTaskFetch(content);
    if (data) {
      await getTasks();
      setLoadingButton(false);
      setOpenedCreateTask(false);
      showSuccess();
    } else {
      setOpenedCreateTask(false);
      showError();
    }
  };

  useEffect(() => {
    setLoading(true);
    getTasks();
  }, []);

  return (
    <>
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
          mt={"md"}
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
