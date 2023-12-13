import { Todo } from "../../store/todo/slice";

export interface CardProps {
  todo: Todo;
  onComplete: (id: number) => void;
}

export const Cards = ({ todo, onComplete }: CardProps) => {
  const isCompleted = todo.isCompleted;
  return (
    <div style={{ color: "white" }}>
      <span>{todo.title}</span>

      {isCompleted ? (
        <>
          <span>Completed</span>
        </>
      ) : (
        <>
          <span>Not completed</span>
          <button onClick={() => onComplete(todo.id)}>Completar</button>
        </>
      )}
    </div>
  );
};
