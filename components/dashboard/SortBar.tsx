import { SortOption } from "./types";

type SortBarProps = {
    sortOption: SortOption;
    onSortChange: (option: SortOption) => void;
};

export default function SortBar({
    sortOption,
    onSortChange,
}: SortBarProps) {
    return (
        <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="border rounded-lg px-4 py-2 mt-4"
        >
            <option value="newest">Más nuevas</option>
            <option value="oldest">Más antiguas</option>
            <option value="priority">Prioridad</option>
            <option value="dueDate">Fecha de vencimiento</option>
        </select>
    );
}