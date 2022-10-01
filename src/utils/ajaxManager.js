const serverUrl = "http://localhost:8081/api";

export default async function request(
  path = "",
  method = "GET",
  data = {},
  headers = {},
  callback = null,
  errorCallback = null
) {
  if (path.indexOf("http") === -1) {
    path = serverUrl + path;
  }

  if (data instanceof FormData) {
    // headers['Content-Type'] = 'multipart/form-data';
  } else {
    headers["Content-type"] = "application/json";
  }

  let options = {
    method: method,
    // mode: 'no-cors',
    headers: headers,
  };
  if (data instanceof FormData) options.body = data;
  else if (method !== "GET") options.body = JSON.stringify(data);

  let response = await fetch(path, options);
  try {
    // response = await Promise.race([
    //     fetch(path, options),
    //     new Promise((_, reject) => setTimeout(
    //         () => reject(new Error('Timeout')),
    //         3000
    //     )),
    // ]);
  } catch (e) {
    if (e.name && e.name === "AbortError") {
      // обработать ошибку от вызова abort()
      console.log("Прервано!");
      return;
    } else if (e.message === "Timeout" || e === "Network request failed") {
      defaultErrorCallback(null, 400, errorCallback, path);
      return;
    } else {
      throw e; // rethrow other unexpected errors
    }
  }

  const { statusCode, resultData } = await processResponse(response);
  switch (statusCode) {
    case 200:
      if (callback) {
        callback(resultData);
      }
      break;
    case 400:
      defaultErrorCallback(resultData, statusCode, errorCallback, path);
      break;
    default:
      defaultErrorCallback(resultData, statusCode, errorCallback, path);
      break;
  }
}

async function processResponse(response) {
  const statusCode = response.status;
  const resultData = response.text();
  return Promise.all([statusCode, resultData]).then((res) => ({
    statusCode: res[0],
    resultData: isJson(res[1]),
  }));
}

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return str;
  }
  return JSON.parse(str);
}

function defaultErrorCallback(
  data,
  statusCode,
  errorCallback = null,
  path = ""
) {
  if (errorCallback) {
    errorCallback(data ?? {}, statusCode);
  } else {
    alert(
      typeof data === "string"
        ? "Неизвестная доселе ошибка. Попробуйте повторить действие позднее!"
        : data.message
    );
  }
}
