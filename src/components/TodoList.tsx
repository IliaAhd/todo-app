import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { useTodo, type TypeTodo } from "../contexts/TodoContext";
import Operations from "./Operations";
import Todo from "./Todo";
import { AnimatePresence, motion } from "motion/react";

export default function TodoList() {
  const {
    state: { todos },
    dispatch,
  } = useTodo();
  const [route, setRoute] = useState(window.location.pathname);
  const [filteredTodos, setFilteredTodos] = useState<TypeTodo[]>([]);

  const isAnyCompleted = todos.some((todo) => todo.isCompleted);

  useEffect(() => {
    if (route === "/" || route === "/all") {
      setFilteredTodos(todos);
    } else if (route === "/completed") {
      setFilteredTodos(todos.filter((todo) => todo.isCompleted));
    } else if (route === "/active") {
      setFilteredTodos(todos.filter((todo) => !todo.isCompleted));
    } else {
      setFilteredTodos(todos);
    }
  }, [route, todos]);

  function handleClearCompletes() {
    dispatch({ type: "CLEAR_COMPLETED" });
  }

  function handleChangeRoute(newRoute: string) {
    window.history.pushState(null, "", newRoute);
    setRoute(newRoute);
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    if (active.id === over?.id) return;

    const getPos = (id: UniqueIdentifier | undefined) =>
      todos.findIndex((todo) => todo.id === id);

    const originalPos = getPos(active.id);
    const newPos = getPos(over?.id);

    dispatch({
      type: "ORDER_TODOS",
      payload: arrayMove(todos, originalPos, newPos),
    });
  }

  return (
    <>
      <div className="flex flex-col divide-light-grayish-blue divide-y rounded-lg overflow-hidden dark:divide-dark-very-dark-grayish-blue">
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <SortableContext items={todos} strategy={verticalListSortingStrategy}>
            <AnimatePresence>
              {filteredTodos?.map((todo) => (
                <motion.div
                  key={todo?.id}
                  initial={{ x: 600, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                >
                  <Todo
                    todo={todo}
                    rounded="rounded-none"
                    inputDisabled
                    hasCross
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </SortableContext>
        </DndContext>

        <Operations className="!py-6">
          <span>{todos.length} items left</span>
          <button disabled={!isAnyCompleted} onClick={handleClearCompletes}>
            Clear Completed
          </button>
        </Operations>
      </div>

      <Operations className="justify-center gap-6 font-bold text-lg !py-4 mt-6 rounded-lg !text-dark-grayish-blue">
        <button
          className={
            route === "/" || route === "/all" ? `text-bright-blue` : ""
          }
          onClick={() => handleChangeRoute("/all")}
        >
          All
        </button>
        <button
          className={route === "/active" ? `text-bright-blue` : ""}
          onClick={() => handleChangeRoute("/active")}
        >
          Active
        </button>
        <button
          className={route === "/completed" ? `text-bright-blue` : ""}
          onClick={() => handleChangeRoute("/completed")}
        >
          Completed
        </button>
      </Operations>
    </>
  );
}
