import { ReactSVG } from "react-svg";
import CheckBox from "./CheckBox";
import { useTodo, type TypeTodo } from "../contexts/TodoContext";
import { useEffect, useState, type FormEvent } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const MAX_LENGTH = 30;

export default function Todo({
  disabled,
  todo,
  inputDisabled,
  my,
  rounded,
  hasCross,
}: {
  disabled?: boolean;
  todo?: TypeTodo;
  inputDisabled?: boolean;
  my?: "my-2" | "my-4" | "my-6";
  rounded?: "rounded-none";
  hasCross?: boolean;
}) {
  const { dispatch } = useTodo();
  const [value, setValue] = useState("");
  const [maxLength, setMaxLength] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo?.id || crypto.randomUUID() });

  useEffect(() => {
    if (value.length === MAX_LENGTH) setMaxLength(true);
    else setMaxLength(false);
  }, [value.length]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const trimmedValue = value.trim();

    if (!trimmedValue) return;

    dispatch({
      type: "ADD_TODO",
      payload: {
        id: crypto.randomUUID(),
        text: trimmedValue,
        isCompleted: false,
      },
    });

    setValue("");
  }

  function handleDelete() {
    if (!todo?.id) return;

    dispatch({ type: "DELETE_TODO", payload: todo?.id });
  }

  function handleComplete() {
    if (!todo?.id) return;

    dispatch({ type: "TOGGLE_TODO", payload: todo?.id });
  }

  return (
    <div
      style={{ transition, transform: CSS.Transform.toString(transform) }}
      className={`flex items-center justify-between bg-white dark:bg-very-dark-desaturated-blue ${my} ${!rounded ? "rounded-lg" : rounded}`}
    >
      <form onSubmit={handleSubmit} className="w-full flex">
        <CheckBox
          onClick={() => handleSubmit}
          onChange={handleComplete}
          className="ml-6"
          disabled={disabled}
          checked={todo?.isCompleted}
        />

        <input
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          className={`w-full h-full px-4 pl-6 py-7 outline-0 text-very-dark-grayish-blue dark:text-light-grayish-blue ${todo?.isCompleted && "line-through !text-dark-grayish-blue !dark:dark-very-dark-grayish-blue"}`}
          type="text"
          name="todo"
          placeholder="Create a new todo..."
          disabled={inputDisabled}
          value={!inputDisabled ? value : todo?.text}
          onChange={(e) => setValue(e.target.value)}
          maxLength={MAX_LENGTH}
        />
      </form>

      {hasCross ? (
        <ReactSVG
          onClick={handleDelete}
          className="p-2 mr-4 cursor-pointer rounded-full border border-transparent active:border-very-grayish-blue active:dark:border-dark-very-dark-grayish-blue"
          src="/icon-cross.svg"
        />
      ) : (
        <div
          className={`text-sm p-2 text-dark-grayish-blue ${maxLength && "text-rose-600"}`}
        >
          {value ? `${value.length}/${MAX_LENGTH}` : ""}
        </div>
      )}
    </div>
  );
}
