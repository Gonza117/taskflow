"use client";
import { useState } from "react";
import { Priority } from "./types";

type TaskFormProps = {
    onAddTask: (task: string, priority: Priority) => void;
};

export default function TaskForm({ onAddTask }: TaskFormProps) {
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState<Priority>("medium");

    return (
        <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
                Nueva tarea
            </h2>

            <input
                type="text"
                placeholder="Escribí una tarea..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
            />

            <h2 className="text-xl font-semibold mt-4">
                Prioridad
            </h2>

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full border rounded-lg px-4 py-2 mt-4"
            >
                <option value="low">🟢 Baja</option>
                <option value="medium">🟡 Media</option>
                <option value="high">🔴 Alta</option>
            </select>

            <button onClick={() => {
                    if (task.trim() === "") return;
                        onAddTask(task, priority);
                        setTask("");
                        setPriority("medium");
                }}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
                Agregar
            </button>
        </div>
    );
}