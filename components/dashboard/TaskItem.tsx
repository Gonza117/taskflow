import { Task } from "./types";

type TaskItemProps = {
    task: Task;
    onToggleTask: (id: number) => void;
    onDeleteTask: (id: number) => void;
};

export default function TaskItem({task,onToggleTask,onDeleteTask,}: TaskItemProps) {
    return (
        <li
            onClick={() => onToggleTask(task.id)}
            className={`p-4 rounded-lg shadow cursor-pointer transition flex justify-between items-center ${
                task.completed
                    ? "bg-green-100 text-gray-500 line-through"
                    : "bg-white"
            }`}
        >
            <span>
                {task.completed ? "✅" : "⬜"} {task.text}
            </span>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTask(task.id);
                }}
                className="text-red-500 hover:text-red-700"
            >
                🗑️
            </button>
        </li>
    );
}