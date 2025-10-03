export interface Todo {
  id: string;
  name: string;
  description?: string;
  category?: string;
  done: boolean;
  createdAt: number;
}