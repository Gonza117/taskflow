import { Task } from "./types";
import TaskItem from "./TaskItem";

type TaskListProps = {
    tasks: Task[];
    onToggleTask: (id: number) => void;
    onDeleteTask: (id: number) => void;
};

export default function TaskList({tasks,onToggleTask,onDeleteTask,}: TaskListProps){
    return (
        <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
                Mis tareas
            </h2>

            <ul className="space-y-2">
                {tasks.map((task) => (
                    <ul className="space-y-2">
                        {tasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onToggleTask={onToggleTask}
                                onDeleteTask={onDeleteTask}
                            />
                        ))}
                    </ul>
                ))}
            </ul>
        </div>
    );
}