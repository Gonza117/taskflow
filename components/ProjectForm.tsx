"use client";
import { useState } from "react";

type ProjectFormProps = {
    onAddProject: (name: string) => void;
};

export default function ProjectForm({
    onAddProject,
}: ProjectFormProps) {
    const [name, setName] = useState("");

    return (
        <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
                Nuevo proyecto
            </h2>

            <input
                type="text"
                placeholder="Nombre del proyecto..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
            />

            <button
                onClick={() => {
                    if (name.trim() === "") return;

                    onAddProject(name);
                    setName("");
                }}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
            >
                Crear proyecto
            </button>
        </div>
    );
}