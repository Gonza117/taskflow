"use client";

import { useState } from "react";
import StatCard from "./StatCard";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { Task } from "./types";

export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            text: "Aprender React",
            completed: false,
        },
        {
            id: 2,
            text: "Crear Navbar",
            completed: false,
        },
        {
            id: 3,
            text: "Configurar GitHub",
            completed: false,
        },
    ]);

    const toggleTask = (id: number) => {
    setTasks(
        tasks.map((task) =>
            task.id === id
                ? { ...task, completed: !task.completed }
                : task
        )
    );
};

    const stats = [
    {
        title: "Proyectos",
        value: 3,
    },

    {
        title: "Tareas",
        value: tasks.length,
    },

    {
        title: "Pendientes",
        value: 7,
    },

    {
        title: "Completadas",
        value: 8,
    },

];
    return (
        <div>
            <h1 className="text-4xl font-bold text-slate-700">
                Hola Gonzalo 👋
            </h1>

            <p className="mt-2 text-slate-500">
                Comencemos a organizar tus proyectos
            </p>

            <div className="grid grid-cols-4 gap-6 mt-8">
                {stats.map((stat) => (
                    <StatCard
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                    />
                ))}
            </div>
            <TaskForm onAddTask={(newTask) =>
                setTasks([...tasks,
                {
                    id: Date.now(),
                    text: newTask,
                    completed: false,
                },
                ])
            }
            />
            <TaskList
                tasks={tasks}
                onToggleTask={toggleTask}
            />
        </div>

    );
}