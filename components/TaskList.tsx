import { Task,Project } from "../types";
import TaskItem from "./TaskItem";

type TaskListProps = {
    tasks: Task[];
    projects: Project[];
    onToggleTask: (id: number) => void;
    onDeleteTask: (id: number) => void;
    onEditTask: (id: number, newText: string) => void;
};

export default function TaskList({tasks,projects,onToggleTask,onDeleteTask,onEditTask,}: TaskListProps){
    return (
        <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
                Mis tareas
            </h2>

            <ul className="space-y-2 text-black">
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        projects={projects}
                        onToggleTask={onToggleTask}
                        onDeleteTask={onDeleteTask}
                        onEditTask={onEditTask}
                    />
                ))}
            </ul>
        </div>
    );
}