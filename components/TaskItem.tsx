import { Task, Project } from "../types";
import { useState } from "react";

type TaskItemProps = {
    task: Task;
    projects: Project[];
    onToggleTask: (id: number) => void;
    onDeleteTask: (id: number) => void;
    onEditTask: (id: number, newText: string) => void;
};


export default function TaskItem({task,projects,onToggleTask,onDeleteTask,onEditTask,}: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);

    const [editedText, setEditedText] = useState(task.text);
    
    const getPriorityLabel = () => {
        switch (task.priority) {
            case "high":
                return "Alta";
            case "medium":
                return "Media";
            case "low":
                return "Baja";
        }
    };

    const project = projects.find(
        (project) => project.id === task.projectId
    );

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

        const [year, month, day] = task.dueDate
            .split("-")
            .map(Number);

        const due = new Date(year, month - 1, day);

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

    const getPriorityColor = () => {
        switch (task.priority) {
            case "high":
                return "bg-red-100 text-red-700";

            case "medium":
                return "bg-yellow-100 text-yellow-700";

            case "low":
                return "bg-green-100 text-green-700";
        }
    };

    return (
        <li
            onClick={() => onToggleTask(task.id)}
            className={`rounded-xl shadow-md border border-gray-200 p-5 transition hover:shadow-lg ${
                task.completed 
                ? "bg-green-50" 
                : "bg-white"
            }`}
        >

            {/* Primera fila */}
            <div className="flex justify-between items-start">
                {/* Texto */}
                <div>
                    <p
                        className={`text-lg font-medium ${
                            task.completed 
                            ? "line-through text-gray-500" 
                            : ""
                        }`}
                    >
                        {task.completed ? "✅" : "⬜"} {task.text}
                    </p>

                    <p className="text-sm text-blue-600 mt-2">
                        📂 {project?.name}
                    </p>

                    {dueStatus === "overdue" && (
                        <p className="text-red-600 font-semibold mt-3">
                            🔴 Vencida
                        </p>
                    )}

                    {dueStatus === "today" && (
                        <p className="text-yellow-600 font-semibold mt-3">
                            🟡 Vence hoy
                        </p>
                    )}
                </div>

                {/* Botones */}
                <div className="flex gap-3 text-xl mt-1">
                    <button className="hover:scale-110 transition"
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
                            const confirmDelete = window.confirm(
                                `¿Eliminar la tarea "${task.text}"?`
                            );
                            if (!confirmDelete) return;
                                onDeleteTask(task.id);
                        }}
                    >
                        🗑️
                    </button>
                </div>
            </div>

            {/* Segunda fila */}
            <div className="flex justify-between items-center mt-4">

                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor()}`}>
                    {getPriorityLabel()}
                </span>

                <p className="text-sm text-gray-500">
                    📅 {formatDate(task.dueDate)}
                </p>
            </div>
        </li>
    );
}