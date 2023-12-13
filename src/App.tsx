import "./App.css";
import { useAppDispatch, useAppSelector } from "./store";
import { useRef } from "react";
import { ADD_TODO, COMPLETE_TODO } from "./store/todo/slice";
import { Cards } from "./componentes/Cards";

function App() {
  const todos = useAppSelector((state) => state.todo.todos);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement>(null);

  const addTodo = () => {
    if (!ref.current) return;
    if (ref.current?.value === "") return;

    const newTodo = {
      title: ref.current.value,
      isCompleted: false,
      id: Date.now(),
    };
    dispatch(ADD_TODO(newTodo));
  };

  const competeTodo = (id: number): void => {
    dispatch(COMPLETE_TODO(id));
  };

  return (
    <div className="App">
      <h1>Lista de tareas:</h1>
      <input type="text" ref={ref} />
      <button type="submit" onClick={addTodo}>
        Add todo
      </button>
      <h2>Tareas:</h2>
      <div>
        {todos.length > 0 &&
          todos.map((todo) => (
            <Cards todo={todo} onComplete={competeTodo} key={todo.id} />
          ))}
      </div>
    </div>
  );
}

export default App;
