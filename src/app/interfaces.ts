export interface TodoItem {
  title: string;
  completed: boolean;
}

export type Filter = 'all' | 'active' | 'done';
