import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { ContextProviderProps } from "./AuthContext";

export const ChatContext = createContext<any>(null);

export const ChatContextProvider: React.FC<ContextProviderProps> = ({ children }) => {

  const { currentUser } = useContext(AuthContext);

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  console.log(state.user);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};