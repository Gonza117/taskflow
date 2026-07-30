"use client";

import { useState } from "react";
import { Project } from "../types";

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([
        {
            id: 1,
            name: "Facultad",
        },
        {
            id: 2,
            name: "Trabajo",
        },
        {
            id: 3,
            name: "Personal",
        },
    ]);

    const addProject = (name: string) => {
        setProjects((prevProjects) => [
            ...prevProjects,
            {
                id: Date.now(),
                name,
            },
        ]);
    };

    const deleteProject = (id: number) => {
        setProjects((prevProjects) =>
            prevProjects.filter(
                (project) => project.id !== id
            )
        );
    };

    return {
        projects,
        addProject,
        deleteProject,
    };
}