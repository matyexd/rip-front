import { showNotification } from "@mantine/notifications";

export const showError = () => {
  showNotification({
    color: "red",
    message: "Ошибка",
  });
};

export const showSuccess = () => {
  showNotification({
    message: "Успех!",
  });
};
