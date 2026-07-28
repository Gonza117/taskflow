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

    const formatDate = (date: string) => {
        if (!date) return "Sin fecha";

        const [year, month, day] = date.split("-");

        return `${day}/${month}/${year}`;
    };

    const getDueStatus = () => {
        if (!task.dueDate) return null;

        const today = new Date();
        const due = new Date(task.dueDate);

        // Ignoramos la hora para comparar solo la fecha
        today.setHours(0, 0, 0, 0);
        due.setHours(0, 0, 0, 0);

        if (due < today) {
            return "overdue";
        }

        if (due.getTime() === today.getTime()) {
            return "today";
        }

        return "future";
    };

    const dueStatus = getDueStatus();

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
                    
                    {dueStatus === "overdue" && (
                        <p className="text-red-600 font-semibold">
                            🔴 Vencida
                        </p>
                    )}

                    {dueStatus === "today" && (
                        <p className="text-yellow-600 font-semibold">
                            🟡 Vence hoy
                        </p>
                    )}

                    <p className="text-sm text-gray-500">
                        📅 {formatDate(task.dueDate)}
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