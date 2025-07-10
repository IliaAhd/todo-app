import "@fontsource/josefin-sans/400.css";
import Background from "./components/Background";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Todo from "./components/Todo";
import TodoList from "./components/TodoList";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TodoProvider } from "./contexts/TodoContext";

function App() {
  return (
    <main>
      <TodoProvider>
        <ThemeProvider>
          <Background />
          <Layout>
            <Header />
            <Todo disabled my="my-6" />
            <TodoList />
          </Layout>
        </ThemeProvider>
      </TodoProvider>
    </main>
  );
}

export default App;
