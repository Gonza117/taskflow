import { Task } from "./types";

type TaskListProps = {
    tasks: Task[];
    onToggleTask: (id: number) => void;
};

export default function TaskList({tasks,onToggleTask,}: TaskListProps) {
    return (
        <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
                Mis tareas
            </h2>

            <ul className="space-y-2">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        onClick={() => onToggleTask(task.id)}
                        className={`p-4 rounded-lg shadow cursor-pointer transition duration-200 ${
                            task.completed
                            ? "bg-green-100 text-gray-500 line-through"
                            : "bg-white text-black hover:bg-gray-100"
                        }`}
                    >
                        {task.completed ? "✅" : "⬜"} {task.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}