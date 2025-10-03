'use client';
import React, { useEffect, useState } from "react";
import moment from "moment";
import AddTodoForm from "./components/AddTodoForm";
import FiltersBar from "./components/FiltersBar";
import TodoList from "./components/TodoList";
import ExternalInfo from "./components/ExternalInfo";
import PublicTime from "./components/PublicTime";
import "./app/globals.css";
import "./styles/todo.css";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [now, setNow] = useState(moment());

  useEffect(() => {
    const t = setInterval(() => setNow(moment()), 1000);
    return () => clearInterval(t);
  }, []);
  const submitFormAndClose = () => {
      // Submit form via ID, lalu kembali ke list
      document.getElementById("add-todo-form")?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      setShowForm(false);
  };

    return (
    <div className="app-wrapper">
      <header className="header">
        <h1 className="title">To Do</h1>
        <p className="subtitle">Kelola tugas harian Anda dengan cepat dan rapi</p>
      </header>

      <div className="topbar">
        {!showForm ? (
          <>
            <div className="nav-title">To Do</div>
            <div className="nav-actions">
              <button className="btn-icon" aria-label="Add" onClick={() => setShowForm(true)}>＋</button>
            </div>
          </>
        ) : (
          <>
            <button className="btn-icon" aria-label="Back" onClick={() => setShowForm(false)}>←</button>
            <div className="nav-title">Add New</div>
            <div className="nav-actions">
              <button className="btn btn-primary btn-sm" onClick={submitFormAndClose}>Done</button>
            </div>
          </>
        )}
      </div>

      {!showForm ? (
        <main className="content-grid">
          <section className="card">
            <h2 className="card-title">Filters</h2>
            <FiltersBar />
          </section>

          <section className="card card-span-2">
            <h2 className="card-title">List</h2>
            <TodoList />
          </section>

          <section className="card">
            <div className="content-grid">
              <section className="card">
                <div className="card-header">
                  <h2>Public Time</h2>
                </div>
                <div className="card-body">
                  <PublicTime />
                </div>
              </section>
            </div>
          </section>
        </main>
      ) : (
        <main className="content-grid">
          <section className="card card-span-2">
            <h2 className="card-title">Add New</h2>
            <AddTodoForm />
          </section>
        </main>
      )}
    </div>
  );
}