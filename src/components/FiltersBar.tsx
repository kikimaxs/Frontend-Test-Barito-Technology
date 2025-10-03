import React from "react";
import { AppDispatch } from "../store/index";
import { useDispatch, useSelector } from "react-redux";
import { setStatusFilter, setCategoryFilter, setSearch, StatusFilter } from "../features/todos/todosSlice";

const CATEGORY_OPTIONS = ["", "Work", "Personal", "Shopping", "Errands", "Study"];

export default function FiltersBar() {
  const d = useDispatch<AppDispatch>();
  const { statusFilter, categoryFilter, search } = useSelector((s: any) => s.todos);

  return (
    <div className="filters-row">
      <select className="select" value={statusFilter} onChange={(e) => d(setStatusFilter(e.target.value as StatusFilter))}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      <select className="select" value={categoryFilter} onChange={(e) => d(setCategoryFilter(e.target.value))}>
        {CATEGORY_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>{opt || "All categories"}</option>
        ))}
      </select>
      <input className="input" placeholder="Search..." value={search} onChange={(e) => d(setSearch(e.target.value))} />
    </div>
  );
}