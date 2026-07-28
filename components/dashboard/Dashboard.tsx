"use client";

import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import {Task, Filter,SortOption} from "./types";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";
import SortBar from "./SortBar";

export default function Dashboard() {
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
            },

            {
                id: 2,
                text: "Crear Navbar",
                completed: false,
                priority: "medium",
                dueDate: "2021-02-14",
            },

            {
                id: 3,
                text: "Configurar GitHub",
                completed: false,
                priority: "low",
                dueDate: "2024-12-20",
            },

        ];
    });


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

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState<Filter>("all");

    const [sortOption, setSortOption] = useState<SortOption>("newest");


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
        const matchesFilter =
            filter === "all"
                ? true
                : filter === "completed"
                ? task.completed
                : !task.completed;

        const matchesSearch = task.text
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const sortedTasks = [...filteredTasks];
    
    switch (sortOption) {
        case "newest":
            sortedTasks.sort((a, b) => b.id - a.id);
            break;

        case "oldest":
            sortedTasks.sort((a, b) => a.id - b.id);
            break;

        case "priority":
            break;

        case "dueDate":
        break;
    }

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

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
                onAddTask={(newTask, priority,dueDate) =>
                    setTasks((prevTasks) => [
                        ...prevTasks,
                        {
                            id: Date.now(),
                            text: newTask,
                            completed: false,
                            priority,
                            dueDate,
                        },
                    ])
                }
            />

            <SearchBar
                search={search}
                onSearchChange={setSearch}
            />

            <SortBar
                sortOption={sortOption}
                onSortChange={setSortOption}
            />

            <FilterBar
                filter={filter}
                onChangeFilter={setFilter}
            />

            <TaskList
                tasks={sortedTasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
                onEditTask={editTask}
            />

        </div>
    );
}