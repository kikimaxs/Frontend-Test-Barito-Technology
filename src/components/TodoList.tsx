import React from "react";
import { AppDispatch } from "../store/index";
import { useDispatch, useSelector } from "react-redux";
import { toggleTodo, reorderTodos } from "../features/todos/todosSlice";

export default function TodoList() {
  const d = useDispatch<AppDispatch>();
  const { items, statusFilter, categoryFilter, search } = useSelector((s: any) => s.todos);

  const filtered = items.filter((t: any) => {
    const statusOk = statusFilter === "all" ? true : statusFilter === "active" ? !t.done : t.done;
    const categoryOk = categoryFilter ? (t.category || "") === categoryFilter : true;
    const searchOk = search ? (t.name + " " + (t.description || "")).toLowerCase().includes(search.toLowerCase()) : true;
    return statusOk && categoryOk && searchOk;
  });

  const move = (from: number, to: number) => d(reorderTodos({ from, to }));

  return (
    <ul className="list">
      {filtered.map((t: any, i: number) => (
        <li key={t.id} className="list-item">
          <label className="item-left">
            <input type="checkbox" className="checkbox" checked={t.done} onChange={() => d(toggleTodo(t.id))} />
            <div className="text">
              <div className="name">
                {t.name}
                {t.category ? <span className="badge">{t.category}</span> : null}
              </div>
              {t.description ? <div className="desc">{t.description}</div> : null}
            </div>
          </label>
          <div className="item-actions">
            <button className="icon-btn" title="Move up" onClick={() => move(i, Math.max(0, i - 1))}>↑</button>
            <button className="icon-btn" title="Move down" onClick={() => move(i, Math.min(filtered.length - 1, i + 1))}>↓</button>
          </div>
        </li>
      ))}
    </ul>
  );
}