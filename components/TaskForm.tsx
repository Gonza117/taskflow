"use client";
import { useState } from "react";
import { Project, Priority } from "../types";

type TaskFormProps = {
    projects: Project[];
    onAddTask: (task: string, priority: Priority, dueDate: string,projectId: number) => void;
};

export default function TaskForm({ projects,onAddTask }: TaskFormProps) {
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState<Priority>("medium");
    const [dueDate, setDueDate] = useState("");
    const [projectId, setProjectId] = useState(1);

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
                <option value="low" className="text-black">🟢 Baja</option>
                <option value="medium" className="text-black">🟡 Media</option>                    
                <option value="high" className="text-black">🔴 Alta</option>
            </select>
            
            <select
                value={projectId}
                onChange={(e) => setProjectId(Number(e.target.value))}
                className="w-full border rounded-lg px-4 py-2 mt-4"
            >
                {projects.map((project) => (
                <option key={project.id} value={project.id} className="text-black">
                    {project.name}
                </option>
                ))}
            </select>

            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 mt-4"
            />

            <button onClick={() => {
                    if (task.trim() === "") return;
                        onAddTask(task, priority, dueDate,projectId);
                        setTask("");
                        setPriority("medium");
                        setDueDate("");
                }}
                className="mt-4 bg-blue-600 text-black px-4 py-2 rounded-lg"
            >
                Agregar
            </button>
        </div>
    );
}