"use client";

import { useState } from "react";

export default function TaskForm() {
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
        </div>
    );
}