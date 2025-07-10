import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type FC,
  type ReactNode,
} from "react";

export interface TypeTodo {
  id: string;
  text: string;
  isCompleted: boolean;
}
interface State {
  todos: TypeTodo[];
}

type Action =
  | { type: "INITIAL_TODOS"; payload: TypeTodo[] }
  | { type: "ORDER_TODOS"; payload: TypeTodo[] }
  | {
      type: "ADD_TODO";
      payload: TypeTodo;
    }
  | { type: "DELETE_TODO"; payload: string }
  | {
      type: "TOGGLE_TODO";
      payload: string;
    }
  | {
      type: "CLEAR_COMPLETED";
    };

interface TodoContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

const initialState: State = {
  todos: [],
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "INITIAL_TODOS":
      return { ...state, todos: action.payload };

    case "ORDER_TODOS":
      localStorage.setItem("todos", JSON.stringify(action.payload));
      return { ...state, todos: action.payload };

    case "ADD_TODO":
      localStorage.setItem(
        "todos",
        JSON.stringify([...state.todos, action.payload])
      );
      return { ...state, todos: [...state.todos, action.payload] };

    case "DELETE_TODO":
      localStorage.setItem(
        "todos",
        JSON.stringify(
          state.todos.filter((todo) => todo?.id !== action.payload)
        )
      );

      return {
        ...state,
        todos: state.todos.filter((todo) => todo?.id !== action.payload),
      };

    case "TOGGLE_TODO":
      localStorage.setItem(
        "todos",
        JSON.stringify(
          state.todos.map((todo) =>
            todo.id === action.payload
              ? { ...todo, isCompleted: !todo.isCompleted }
              : todo
          )
        )
      );

      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        ),
      };

    case "CLEAR_COMPLETED":
      localStorage.setItem(
        "todos",
        JSON.stringify(state.todos.filter((todo) => todo.isCompleted === false))
      );

      return {
        ...state,
        todos: state.todos.filter((todo) => todo.isCompleted === false),
      };

    default:
      return state;
  }
};

const TodoContext = createContext<TodoContextType>({
  state: initialState,
  dispatch: () => {},
});

export const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const todosJson = localStorage.getItem("todos");
    if (todosJson) {
      try {
        const todos = JSON.parse(todosJson);
        dispatch({ type: "INITIAL_TODOS", payload: todos });
      } catch (err) {
        console.error("Failed to parse todos from localStorage:", err);
      }
    }
  }, []);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
