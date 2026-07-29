import { Project } from "./types";

type ProjectBarProps = {
    projects: Project[];
    selectedProject: number | "all";
    onSelectProject: (project: number | "all") => void;
};

export default function ProjectBar({
    projects,
    selectedProject,
    onSelectProject,
}: ProjectBarProps) {
    return (
        <div className="flex gap-3 mt-6 flex-wrap">
            <button
                onClick={() => onSelectProject("all")}
                className={`px-4 py-2 rounded-lg ${
                    selectedProject === "all"
                        ? "bg-blue-600 text-black"
                        : "bg-gray-200 text-black"
                }`}
            >
                Todos
            </button>

            {projects.map((project) => (
                <button
                    key={project.id}
                    onClick={() => onSelectProject(project.id)}
                    className={`px-4 py-2 rounded-lg ${
                        selectedProject === project.id
                            ? "bg-blue-600 text-black"
                            : "bg-gray-200 text-black"
                    }`}
                >
                    {project.name}
                </button>
            ))}
        </div>
    );
}