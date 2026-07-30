"use client";

import { useEffect, useState } from "react";
import { Task } from "../types";

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem("tasks");

        if (savedTasks) {
            return JSON.parse(savedTasks);
        }

        return [
            {
                id: 1,
                text: "Aprender React",
                completed: false,
                priority: "high",
                dueDate: "2026-08-15",
                projectId: 1,
            },
            {
                id: 2,
                text: "Crear Navbar",
                completed: false,
                priority: "medium",
                dueDate: "2026-08-20",
                projectId: 2,
            },
            {
                id: 3,
                text: "Configurar GitHub",
                completed: false,
                priority: "low",
                dueDate: "2026-08-25",
                projectId: 3,
            },
        ];
    });

    const toggleTask = (id: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
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
                    ? {
                        ...task,
                        text: newText,
                      }
                    : task
            )
        );
    };

    const addTask = (text: string,priority: Task["priority"],dueDate: string,projectId: number) => {
        setTasks((prevTasks) => [
                ...prevTasks,
            {
                id: Date.now(),
                text,
                completed: false,
                priority,
                dueDate,
                projectId,
            },
        ]);
    };

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return {
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        editTask,
    };
}