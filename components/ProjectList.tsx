import { Project, Task } from "../types";

type ProjectListProps = {
    projects: Project[];
    tasks: Task[];
    onDeleteProject: (id: number) => void;
};

export default function ProjectList({
    projects,
    tasks,
    onDeleteProject,
}: ProjectListProps) {
    return (
        <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
                Mis proyectos
            </h2>

            {projects.map((project) => {
                const taskCount = tasks.filter(
                    (task) => task.projectId === project.id
                ).length;

                return (
                    <div
                        key={project.id}
                        className="flex justify-between text-black items-center bg-white rounded-lg shadow p-4 mb-3"
                    >
                        <div>
                            <h3 className="font-semibold text-lg">
                                📂 {project.name}
                            </h3>

                            <p className="text-gray-500 text-sm">
                                {taskCount} {taskCount === 1 ? "tarea" : "tareas"}
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                if (taskCount > 0) {
                                    alert("No podés eliminar un proyecto con tareas.");
                                    return;
                                }

                                const confirmDelete = window.confirm(
                                    `¿Eliminar el proyecto "${project.name}"?`
                                );

                                if (!confirmDelete) return;

                                onDeleteProject(project.id);
                            }}
                            className="text-red-600 hover:text-red-800 text-xl"
                        >
                            🗑️
                        </button>
                    </div>
                );
            })}
        </div>
    );
}