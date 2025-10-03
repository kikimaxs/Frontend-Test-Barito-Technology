import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExternalData } from "../features/todos/todosSlice";
import { AppDispatch } from "../store";

export default function ExternalInfo() {
  const d = useDispatch<AppDispatch>();
  const { externalData, loading } = useSelector((s: any) => s.todos);
  const [company, setCompany] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => { d(fetchExternalData()); }, [d]);

  const data = Array.isArray(externalData) ? externalData : [];
  const companies = useMemo(
    () => Array.from(new Set(data.map((u: any) => u.company || "Unknown"))).sort(),
    [data]
  );

  if (loading) return <div>Loading...</div>;

  const filtered = data.filter((u: any) => {
    const companyOk = company ? u.company === company : true;
    const qOk = q ? (u.name || "").toLowerCase().includes(q.toLowerCase()) : true;
    return companyOk && qOk;
  });

  return (
    <div>
      <div className="filters-row">
        <select className="select" value={company} onChange={(e) => setCompany(e.target.value)}>
          <option value="">All companies</option>
          {companies.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input className="input" placeholder="Search name..." value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <ul className="list">
        {filtered.slice(0, 50).map((u: any, i: number) => (
          <li key={`${u.name}-${i}`} className="list-item">
            <div className="text">
              <div className="name">
                {u.name} <span className="badge">{u.company}</span>
              </div>
              <div className="desc">City: {u.city || "-"}</div>
              <div className="desc">Email: {u.email}</div>
              <div className="desc">Website: {u.website}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}