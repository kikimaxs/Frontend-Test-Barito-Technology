import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store";
import { fetchWorldTimeData } from "../features/todos/todosSlice";
import moment from "moment";

export default function PublicTime() {
  const dispatch = useDispatch<AppDispatch>();
  const { worldTimeData, worldTimeLoading } = useSelector((s: any) => s.todos);

  const [zone, setZone] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    dispatch(fetchWorldTimeData());
  }, [dispatch]);

  const data = Array.isArray(worldTimeData) ? worldTimeData : [];

  const zones = useMemo(
    () =>
        Array.from(new Set((data || []).map((d: any) => d?.timezone)))
            .filter(Boolean)
            .sort(),
    [data]
  );

  if (worldTimeLoading) return <div>Loading time data...</div>;

  const filtered = data.filter((d: any) => {
    const zoneOk = zone ? d.timezone === zone : true;
    const qOk = q
      ? (d.timezone || "").toLowerCase().includes(q.toLowerCase()) ||
        (d.datetime || "").toLowerCase().includes(q.toLowerCase())
      : true;
    return zoneOk && qOk;
  });

  return (
    <div>
      <h3 style={{ marginBottom: 8 }}>Public Data: World Time</h3>

      <div className="filters-row" style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <select className="select" value={zone} onChange={(e) => setZone(e.target.value)}>
          <option value="">Semua zona</option>
          {zones.map((z: string, i: number) => (
              <option key={`${z}-${i}`} value={z}>
                  {z}
              </option>
          ))}
        </select>

        <input
          className="input"
          placeholder="Cari (zona/datetime)..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <ul className="list">
        {filtered.map((d: any, i: number) => (
          <li
            key={`${d?.timezone || "unknown"}-${i}`}
            className="list-item"
            style={{ padding: 8, borderBottom: "1px solid #eee" }}
          >
            <div className="text">
              <div className="name" style={{ fontWeight: 600 }}>
                {d.timezone} <span className="badge" style={{ marginLeft: 6 }}>{d.utc_offset}</span>
              </div>
              <div className="desc">Datetime: {moment(d.datetime).format("dddd, DD MMM YYYY HH:mm")}</div>
              <div className="desc">Day of week: {d.day_of_week}</div>
              <div className="desc">Week number: {d.week_number}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}