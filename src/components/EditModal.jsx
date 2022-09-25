import { Button, Group, Modal, TextInput } from "@mantine/core";
import React, { useState } from "react";

const EditModal = ({ opened, setOpened }) => {
  const [valueContent, setValueContent] = useState();

  return (
    <Modal
      opened={opened}
      size={"lg"}
      title={"Редактирование задачи"}
      withCloseButton={false}
      onClose={() => {
        setOpened(false);
      }}
      centered
    >
      <TextInput
        value={valueContent}
        // onChange={(event) => setValueContent(event.currentTarget.value)}
        mt={"md"}
        placeholder={"Введите текст"}
        label={"Описание задачи"}
      />
      <Group mt={"md"}>
        <Button
        // onClick={() => editTaskFetch(currentUser.id, valueContent)}
        >
          Изменить задачу
        </Button>
        <Button color={"red"} onClick={() => setOpened(false)}>
          Отмена
        </Button>
      </Group>
    </Modal>
  );
};

export default EditModal;
