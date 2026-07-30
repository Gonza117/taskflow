type SearchBarProps = {
    search: string;
    onSearchChange: (value: string) => void;
};

export default function SearchBar({
    search,
    onSearchChange,
}: SearchBarProps) {
        return (
            <input
                type="text"
                placeholder="🔍 Buscar tarea..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 mt-6"
            />
        );
    }