import {
  ActionIcon,
  Card,
  Checkbox,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { Check, Pencil, Trash, PlaystationX } from "tabler-icons-react";
import React, { useState } from "react";
import { showError, showSuccess } from "../../utils/notifications";
import request from "../../utils/ajaxManager";
import { useAuth } from "../../context/provideAuth";

const editTaskInputDefaultState = {
  id: -1,
  status: false,
  content: "",
};

const Tasks = ({ tasks, setTasks, getTasks }) => {
  const [editTaskInput, setEditTaskInput] = useState(editTaskInputDefaultState);
  const auth = useAuth();

  const editTaskStatus = async (id, status) => {
    setTasks((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, isDone: !status } : item
      )
    );

    await request(
      "/task",
      "PUT",
      { id: id, isDone: !status },
      {
        Authorization: "Bearer " + auth.token,
      },
      (response) => response,
      () => {
        setTasks((prevState) =>
          prevState.map((item) =>
            item.id === id ? { ...item, isDone: status } : item
          )
        );
        showError();
      }
    );
  };

  const deleteTask = async (id) => {
    setTasks((prevState) => prevState.filter((item) => item.id !== id));
    await request(
      `/task/${id}`,
      "DELETE",
      {},
      {
        Authorization: "Bearer " + auth.token,
      },
      () => showSuccess(),
      () => {
        showError();
        getTasks();
      }
    );
  };

  const editTask = async (id, content) => {
    await request(
      "/task",
      "PUT",
      { id: id, content: content },
      {
        Authorization: "Bearer " + auth.token,
      },
      () => {
        setTasks((prevState) =>
          prevState.map((item) =>
            item.id === id ? { ...item, content: content } : item
          )
        );
        setEditTaskInput(editTaskInputDefaultState);
        showSuccess();
      },
      () => {
        showError();
      }
    );
  };

  return (
    <>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Card withBorder mt={"sm"} key={task.id}>
            <Group position={"apart"}>
              <Group align={"center"}>
                <Checkbox
                  size="md"
                  checked={task.isDone}
                  onChange={() => editTaskStatus(task.id, task.isDone)}
                />
                {editTaskInput.id === task.id && editTaskInput.status ? (
                  <TextInput
                    value={editTaskInput.content}
                    onChange={(event) =>
                      setEditTaskInput({
                        ...editTaskInput,
                        content: event.currentTarget.value,
                      })
                    }
                  />
                ) : (
                  <Text size={"md"}>{task.content}</Text>
                )}
              </Group>
              <Group spacing={"xs"}>
                {editTaskInput.id === task.id && editTaskInput.status ? (
                  <>
                    <ActionIcon>
                      <Check
                        color={"green"}
                        onClick={() => editTask(task.id, editTaskInput.content)}
                      />
                    </ActionIcon>
                    <ActionIcon>
                      <PlaystationX
                        color={"red"}
                        onClick={() =>
                          setEditTaskInput(editTaskInputDefaultState)
                        }
                      />
                    </ActionIcon>
                  </>
                ) : (
                  <>
                    <ActionIcon variant={"transparent"}>
                      <Pencil
                        onClick={() => {
                          setEditTaskInput({
                            id: task.id,
                            status: true,
                            content: task.content,
                          });
                        }}
                      />
                    </ActionIcon>
                    <ActionIcon color={"red"} variant={"transparent"}>
                      <Trash onClick={() => deleteTask(task.id)} />
                    </ActionIcon>
                  </>
                )}
              </Group>
            </Group>
          </Card>
        ))
      ) : (
        <Text>???????? ??????????</Text>
      )}
    </>
  );
};

export default Tasks;
