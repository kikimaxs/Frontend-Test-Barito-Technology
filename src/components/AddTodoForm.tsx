import React, { useState } from "react";
import { AppDispatch } from "../store/index";
import { addTodo } from "../features/todos/todosSlice";
import { useDispatch } from "react-redux";

const CATEGORY_OPTIONS = ["Work", "Personal", "Shopping", "Errands", "Study"];

export default function AddTodoForm() {
  const d = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    d(addTodo({ name, description, category, done: false }));
    setName(""); setDescription(""); setCategory("");
  };

  return (
    <form id="add-todo-form" onSubmit={onSubmit} className="form-grid">
      <input className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select category</option>
        {CATEGORY_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <textarea className="textarea" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Add</button>
      </div>
    </form>
  );
}