"use client";

import { useState } from "react";

type TaskFormProps = {
    onAddTask: (task: string) => void;
};

export default function TaskForm({ onAddTask }: TaskFormProps) {
    const [task, setTask] = useState("");

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

            <button onClick={() => {
                    if (task.trim() === "") return;
                        onAddTask(task);
                        setTask("");
                }}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
                Agregar
            </button>
        </div>
    );
}