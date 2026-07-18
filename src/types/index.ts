export type UserRole = 'user' | 'admin';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type TaskCategory = 'Work' | 'Personal' | 'Shopping' | 'Health' | 'Finance' | 'Education' | 'Other';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface ITaskCreatedBy {
  userId: string;
  name: string;
  email: string;
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdBy: ITaskCreatedBy;
  tags: string[];
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskFiltersState {
  category: string[];
  priority: string;
  status: string[];
  dueDateStart: string;
  dueDateEnd: string;
  search: string;
  sortBy: string;
  order: 'asc' | 'desc';
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface CompletionTrendPoint {
  date: string;
  completed: number;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  activeUsers: number;
  avgCompletionRate: number;
  categoryData: ChartDataPoint[];
  statusData: ChartDataPoint[];
  completionTrend: CompletionTrendPoint[];
}
