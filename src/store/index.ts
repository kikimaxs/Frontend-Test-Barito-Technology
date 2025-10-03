import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import todosReducer from "../features/todos/todosSlice";
import { todosRootSaga } from "../features/todos/todosSaga";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  middleware: (getDefault) => getDefault({ thunk: false }).concat(saga),
});

saga.run(todosRootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;