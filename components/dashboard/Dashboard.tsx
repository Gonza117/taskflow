"use client";

import { useState } from "react";
import StatCard from "./StatCard";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { Task, Filter } from "./types";
import FilterBar from "./FilterBar";

export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            text: "Aprender React",
            completed: false,
            priority: "high",
        },
        {
            id: 2,
            text: "Crear Navbar",
            completed: false,
            priority: "medium",
        },
        {
            id: 3,
            text: "Configurar GitHub",
            completed: false,
            priority: "low",
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

    const deleteTask = (id: number) => {
        setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== id)
        );
    };

    const editTask = (id: number, newText: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id
                    ?{
                        ...task,
                        text: newText,
                    }
                    : task
            )
        );
    };

    const completedTasks = tasks.filter((task) => task.completed).length;

    const pendingTasks = tasks.filter((task) => !task.completed).length;

    const [filter, setFilter] = useState<Filter>("all");


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
            value: pendingTasks,
        },
    
        {
            title: "Completadas",
            value: completedTasks,
        },
    ];

    const filteredTasks = tasks.filter((task) => {
        switch (filter) {
            case "pending":
                return !task.completed;

            case "completed":
                return task.completed;

            default:
                return true;
        }
    });

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

            <TaskForm
                onAddTask={(newTask, priority) =>
                    setTasks((prevTasks) => [
                        ...prevTasks,
                        {
                            id: Date.now(),
                            text: newTask,
                            completed: false,
                            priority,
                        },
                    ])
                }
            />

            <FilterBar
                filter={filter}
                onChangeFilter={setFilter}
            />

            <TaskList
                tasks={filteredTasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
                onEditTask={editTask}
            />

        </div>
    );
}