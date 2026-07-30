"use client";

import { useState } from "react";
import StatCard from "./StatCard";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { Filter,SortOption,Project, } from "../types";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";
import SortBar from "./SortBar";
import ProjectBar from "./ProjectBar";
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";
import { useTasks } from "../hooks/useTasks";
import { useProjects } from "../hooks/useProjects";

export default function Dashboard() {
    const {
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        editTask,
    } = useTasks();

    const {
        projects,
        addProject,
        deleteProject,
    } = useProjects();

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    const pendingTasks = tasks.filter(
        (task) => !task.completed
    ).length;

    const [search, setSearch] = useState("");

    const [filter, setFilter] =
        useState<Filter>("all");

    const [sortOption, setSortOption] =
        useState<SortOption>("newest");

    const [selectedProject, setSelectedProject] =
        useState<number | "all">("all");

    const stats = [
        {
            title: "Proyectos",
            value: projects.length,
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

        const matchesProject =
            selectedProject === "all"
                ? true
                : task.projectId === selectedProject;

        return (
            matchesFilter &&
            matchesSearch &&
            matchesProject
        );
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
            // Lo implementaremos después
            break;

        case "dueDate":
            // Lo implementaremos después
            break;
    }

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

            <ProjectForm
                onAddProject={addProject}
            />

            <ProjectList
                projects={projects}
                tasks={tasks}
                onDeleteProject={deleteProject}
            />

            <TaskForm
                projects={projects}
                onAddTask={addTask}
            />

            <ProjectBar
                projects={projects}
                selectedProject={selectedProject}
                onSelectProject={setSelectedProject}
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
                projects={projects}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
                onEditTask={editTask}
            />
        </div>
    );
}