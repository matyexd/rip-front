import { Button, Group, Modal, TextInput } from "@mantine/core";
import React, { useState } from "react";

const CreateModal = ({ opened, setOpened, addTask, loadingButton }) => {
  const [valueContent, setValueContent] = useState("");

  return (
    <Modal
      opened={opened}
      size={"lg"}
      title={"Новая задача"}
      withCloseButton={false}
      onClose={() => {
        setOpened(false);
      }}
      centered
    >
      <TextInput
        value={valueContent}
        onChange={(event) => setValueContent(event.currentTarget.value)}
        mt={"md"}
        placeholder={"Введите текст"}
        label={"Описание задачи"}
      />
      <Group mt={"md"}>
        <Button onClick={() => addTask(valueContent)} loading={loadingButton}>
          Создать задачу
        </Button>
        {!loadingButton && (
          <Button color={"red"} onClick={() => setOpened(false)}>
            >Отмена
          </Button>
        )}
      </Group>
    </Modal>
  );
};

export default CreateModal;
