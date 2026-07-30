type StatCardProps = {
    title: string;
    value: number;
};

export default function StatCard({ title, value }: StatCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-gray-500 text-sm">{title}</h3>

            <p className="text-3xl text-black mt-2">
                {value}
            </p>
        </div>
    );
}