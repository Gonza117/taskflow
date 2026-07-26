import { Task } from "./types";
import { useState } from "react";

type TaskItemProps = {
    task: Task;
    onToggleTask: (id: number) => void;
    onDeleteTask: (id: number) => void;
    onEditTask: (id: number, newText: string) => void;
};


export default function TaskItem({task,onToggleTask,onDeleteTask,onEditTask,}: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);

    const [editedText, setEditedText] = useState(task.text);
    
    const getPriorityLabel = () => {
        switch (task.priority) {
            case "high":
                return "🔴 Alta";
            case "medium":
                return "🟡 Media";
            case "low":
                return "🟢 Baja";
        }
    };

    if (isEditing) {
        return (
            <li className="bg-white p-4 rounded-lg shadow">
                <input
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                />

                <div className="flex gap-2 mt-3">
                    <button
                        onClick={() => {
                            onEditTask(task.id, editedText);
                            setIsEditing(false);
                        }}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                        💾 Guardar
                    </button>

                    <button
                        onClick={() => {
                            setEditedText(task.text);
                            setIsEditing(false);
                        }}
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                    >
                        Cancelar
                    </button>
                </div>
            </li>
        );
    }
    return (
        <li
            onClick={() => onToggleTask(task.id)}
            className={`p-4 rounded-lg shadow cursor-pointer transition flex justify-between items-center ${
                task.completed
                    ? "bg-green-100 text-gray-500 line-through"
                    : "bg-white"
            }`}
        >
            <span>
                <div>
                    <p>
                        {task.completed ? "✅" : "⬜"} {task.text}
                    </p>
                    <p className="text-sm mt-1">
                        {getPriorityLabel()}
                    </p>
                </div>
            </span>

            <div className="flex gap-3">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(true);
                    }}
                >
                    ✏️
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTask(task.id);
                    }}
                >
                    🗑️
                </button>
            </div>
        </li>
    );
}