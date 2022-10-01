let defaultState = { user: null, token: null };

const userReducer = function (state = defaultState, action) {
  switch (action.type) {
    case "LOGIN":
      console.log(action.payload);
      return { user: action.payload.user, token: action.payload.token };
    case "LOGOUT":
      return defaultState;
    default:
      return state;
  }
};

export default userReducer;
