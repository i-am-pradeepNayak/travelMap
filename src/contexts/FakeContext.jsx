import { useReducer } from "react";
import { createContext, useContext } from "react";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };

    case "logout":
      return { ...state, isAuthenticated: false, user: null };

    default:
      throw new Error("Invalid action type");
  }
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login =(email, password) => {
    if (email === FAKE_USER.email && FAKE_USER.password === password) {
      const { name, avatar } = FAKE_USER;
      dispatch({ type: "login", payload: { name, avatar } });
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
