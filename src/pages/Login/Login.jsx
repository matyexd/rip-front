import { Container, PasswordInput, TextInput, Button } from "@mantine/core";
import { useState } from "react";
import request from "../../utils/ajaxManager";
import { showError } from "../../utils/notifications";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getUser = (token) => {
    request(
      "/user",
      "GET",
      {},
      {
        Authorization: "Bearer " + token,
      },
      (response) => {
        let authData = { token: token, user: response };
        props.onLogin(authData);
        setLoading(false);
        navigate("/");
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
  };

  const handleLogin = () => {
    setLoading(true);
    let data = {
      email: email,
      password: password,
    };
    request(
      "/login_check",
      "POST",
      data,
      {},
      (response) => {
        getUser(response.token);
      },
      () => {
        showError();
        setLoading(false);
      }
    );
  };

  return (
    <Container mt={50}>
      <TextInput
        placeholder="Email"
        label="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <PasswordInput
        mt={10}
        placeholder="Password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <Button mt={15} onClick={() => handleLogin()} loading={loading}>
        Enter
      </Button>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onLogin: (data) => dispatch({ type: "LOGIN", payload: data }),
});

export default connect((state) => state, mapDispatchToProps)(Login);
