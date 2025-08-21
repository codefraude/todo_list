export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type FilterType = 'all' | 'completed' | 'inprogress';

export interface ToastMessage {
  message: string;
  visible: boolean;
}
