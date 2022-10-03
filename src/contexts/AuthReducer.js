export const AuthReducer = (state, action) => {

    switch (action.type) {
      case "addError":
        return {
          ...state,
          user: null,
          status: "not-authenticated",
          codigo: null,
          errorMessage: action.payload,
        };
  
      case "removeError":
        return {
          ...state,
          errorMessage: "",
        };
  
      case "signUp":
        return {
          ...state,
          errorMessage: "",
          status: "authenticated",
          codigo: action.payload.codigo,
          user: action.payload.user,
        };
  
      case "logout":
      case "notAuthenticated":
        return {
          ...state,
          status: "not-authenticated",
          codigo: null,
          user: null,
        };
  
      default:
        return state;
    }
  };
  