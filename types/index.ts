export type Priority = "low" | "medium" | "high";
export type Filter = "all" | "pending" | "completed";
export type SortOption =| "newest" | "oldest" | "priority" | "dueDate";

export type Task = {
    id: number;
    text: string;
    completed: boolean;
    priority: Priority;
    dueDate: string;
    projectId: number;
};

export type Project = {
    id: number;
    name: string;
};