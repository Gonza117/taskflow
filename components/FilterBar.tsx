import { Filter } from "../types";

type FilterBarProps = {
    filter: Filter;
    onChangeFilter: (filter: Filter) => void;
};

export default function FilterBar({
    filter,
    onChangeFilter,
}: FilterBarProps) {
    return (
        <div className="flex gap-3 mt-8 mb-6">
            <button
                onClick={() => onChangeFilter("all")}
                className={`px-4 py-2 rounded-lg ${
                    filter === "all"
                        ? "bg-blue-600 text-black"
                        : "bg-gray-200 text-black"
                }`}
            >
                Todas
            </button>

            <button
                onClick={() => onChangeFilter("pending")}
                className={`px-4 py-2 rounded-lg ${
                    filter === "pending"
                        ? "bg-blue-600 text-black"
                        : "bg-gray-200 text-black"
                }`}
            >
                Pendientes
            </button>

            <button
                onClick={() => onChangeFilter("completed")}
                className={`px-4 py-2 rounded-lg ${
                    filter === "completed"
                        ? "bg-blue-600 text-black"
                        : "bg-gray-200 text-black"
                }`}
            >
                Completadas
            </button>
        </div>
    );
}