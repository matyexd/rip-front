import { Divider, Group, Title, Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const MainHeader = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    props.onLogout();
    navigate("/login");
  };

  return (
    <>
      <Group style={{}} position={"apart"}>
        <Group m={10}>
          <Title>TodoApp</Title>
          <Group ml={20}>
            <Text
              size={"lg"}
              variant="link"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Todo
            </Text>
            <Text
              size={"lg"}
              variant="link"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/chat")}
            >
              Чат
            </Text>
          </Group>
        </Group>
        <Button mr={10} variant={"outline"} onClick={() => handleLogout()}>
          Выйти
        </Button>
      </Group>
      <Divider />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch({ type: "LOGOUT" }),
});

export default connect((state) => state, mapDispatchToProps)(MainHeader);
