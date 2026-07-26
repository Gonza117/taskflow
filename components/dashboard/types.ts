export type Priority = "low" | "medium" | "high";
export type Filter = "all" | "pending" | "completed";

export type Task = {
    id: number;
    text: string;
    completed: boolean;
    priority: Priority;
};