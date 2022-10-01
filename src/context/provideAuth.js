import React, { useContext, createContext, useState } from "react";
import { connect } from "react-redux";

const authContext = createContext({});

const ProvideAuth = function (props) {
  const auth = useProvideAuth();
  const userAuthSecureStorage = props.user;

  if (
    JSON.stringify(auth.user) !== JSON.stringify(userAuthSecureStorage.user) ||
    auth.token !== userAuthSecureStorage.token
  ) {
    auth.login(userAuthSecureStorage);
  }

  return (
    <authContext.Provider value={auth}>{props.children}</authContext.Provider>
  );
};

const useAuth = function () {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (data) => {
    setUser(data.user);
    setToken(data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return {
    user,
    token,
    login,
    logout,
  };
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {})(ProvideAuth);
export { useAuth };
