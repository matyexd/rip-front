const URL_API = "http://localhost:8081/api";

export const editTaskFetch = async (id, content) => {
  let formData = new FormData();
  formData.append("content", content);
  const data = await fetch(URL_API + "/task", {
    method: "PUT",
    body: JSON.stringify({ id: id, content: content }),
  })
    .then((response) => response)
    .catch((error) => console.log(error));

  if (data.status === 200) {
    return data.json();
  } else {
    return false;
  }
};

export const getTasksFetch = async () => {
  let data = await fetch(URL_API + "/task", {
    method: "GET",
  })
    .then((response) => response)
    .catch((error) => console.log(error));

  if (data.status === 200) {
    return data.json();
  } else {
    return false;
  }
};

export const editStatusTaskFetch = async (jsonData) => {
  let data = await fetch(URL_API + "/task", {
    method: "PUT",
    body: JSON.stringify(jsonData),
  })
    .then((response) => response)
    .catch((error) => console.log(error));
  if (data.status === 200) {
    return data.json();
  } else {
    return false;
  }
};

export const addTaskFetch = async (content) => {
  let formData = new FormData();
  formData.append("content", content);
  const data = await fetch(URL_API + "/task", {
    method: "POST",
    body: formData,
  })
    .then((response) => response)
    .catch((error) => console.log(error));
  if (data.status === 200) {
    return data;
  } else {
    return false;
  }
};

export const deleteTaskFetch = async (id) => {
  const data = await fetch(URL_API + `/task/${id}`, { method: "DELETE" })
    .then((response) => response)
    .catch((error) => console.log(error));
  if (data.status === 200) {
    return data.json();
  } else {
    return false;
  }
};
