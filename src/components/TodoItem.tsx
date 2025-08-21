import React from "react";
import Button from "./Buttons";
import type { Todo } from "../types/todo"; 

const TodoItem: React.FC<{
  todo: Todo;
  isEditing: boolean;
  editTitle: string;
  onEditChange: (v: string) => void;
  onStartEdit: (t: Todo) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
  
  onToggle: (id: number) => void;
}> = ({
  todo,
  isEditing,
  editTitle,
  onEditChange,
  onStartEdit,
  onSave,
  onCancel,
  onDelete,
  onToggle,
}) => {
  return (
    <li
      style={{
        marginBottom: 12,
        background: "#f4f4f4",
        padding: 10,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderLeft: todo.completed ? "6px solid #2ecc71" : "6px solid #f39c12",
        gap: 12,
        width: "100%",
      }}
    >
      <div style={{ flex: 1 }}>
        {isEditing ? (
          <input
            value={editTitle}
            onChange={(e) => onEditChange(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #bbb",
              outline: "none",
            }}
            aria-label="Edit todo title"
          />
        ) : (
          <span
            style={{
              color: todo.completed ? "green" : "black",
              fontWeight: todo.completed ? "bold" : "normal",
            }}
          >
            {todo.title}
            <span
              style={{
                marginLeft: 12,
                fontSize: 13,
                color: todo.completed ? "green" : "orange",
                fontWeight: "bold",
              }}
            >
              {todo.completed ? "Completed" : "In progress"}
            </span>
          </span>
        )}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        
        {!isEditing && (
          <Button
            label={todo.completed ? "Reopen" : "Complete"}
            onClick={() => onToggle(todo.id)}
            variant={todo.completed ? "secondary" : "primary"}
          />
        )}

        {isEditing ? (
          <>
            <Button label="Save" onClick={onSave} variant="primary" />
            <Button label="Cancel" onClick={onCancel} variant="secondary" />
          </>
        ) : (
          <>
            <Button label="Edit" onClick={() => onStartEdit(todo)} variant="secondary" />
            <Button label="Delete" onClick={() => onDelete(todo.id)} variant="danger" />
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
