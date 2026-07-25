type TaskListProps = {
    tasks: string[];
};

export default function TaskList({ tasks }: TaskListProps) {
    return (
        <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
                Mis tareas
            </h2>

            <ul className="space-y-2">
                {tasks.map((task, index) => (
                <li
                    key={index}
                    className="bg-black p-4 rounded-lg shadow"
                >
                    ✅ {task}
                </li>
                ))}
            </ul>
        </div>
  );
}