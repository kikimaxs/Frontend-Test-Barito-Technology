import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import { Todo } from "../../types/todo";

export type StatusFilter = "all" | "active" | "completed";

export interface TodosState {
  items: Todo[];
  statusFilter: StatusFilter;
  categoryFilter: string;
  search: string;
  loading: boolean;
  externalData?: any;
  worldTimeLoading: boolean;
  worldTimeData: any[];
}

const initialState: TodosState = {
  items: [],
  statusFilter: "all",
  categoryFilter: "",
  search: "",
  loading: false,
  externalData: undefined,
  worldTimeLoading: false,
  worldTimeData: [],
};

export const fetchExternalData = createAction("todos/fetchExternalData");

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, "id" | "createdAt">>) => {
      const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
      state.items.unshift({ ...action.payload, id, createdAt: Date.now() });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const t = state.items.find((x) => x.id === action.payload);
      if (t) t.done = !t.done;
    },
    reorderTodos: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload;
      if (from === to || from < 0 || to < 0 || from >= state.items.length || to >= state.items.length) return;
      const [moved] = state.items.splice(from, 1);
      state.items.splice(to, 0, moved);
    },
    setStatusFilter: (state, action: PayloadAction<StatusFilter>) => {
      state.statusFilter = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setExternalData: (state, action: PayloadAction<any>) => {
      state.externalData = action.payload;
    },
    setWorldTimeLoading(state, action: PayloadAction<boolean>) {
      state.worldTimeLoading = action.payload;
    },
    setWorldTimeData(state, action: PayloadAction<any[]>) {
      state.worldTimeData = action.payload;
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  reorderTodos,
  setStatusFilter,
  setCategoryFilter,
  setSearch,
  setLoading,
  setExternalData,
  setWorldTimeLoading,
  setWorldTimeData,
} = todosSlice.actions;
export default todosSlice.reducer;
export const fetchWorldTimeData = createAction("todos/fetchWorldTimeData");