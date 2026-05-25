import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const T = { green: "#2D8B3E", white: "#FFFFFF", red: "#C1272D", gray: "#6B7280", border: "#E5E7EB", beige: "#F5F0E8", beigeDark: "#E8DFD0", inkDark: "#2C1A0E", inkMid: "#5C3D1E" };

const INIT_EMPLOYEES = [
  { id: "e1", name: "Ahmad Bin Hassan", employeeNumber: "SB001", pax: 2, rsvpStatus: "pending", tableId: null },
  { id: "e2", name: "Siti Nurhaliza Binte Azman", employeeNumber: "SB002", pax: 1, rsvpStatus: "pending", tableId: null },
  { id: "e3", name: "Raj Kumar Suppiah", employeeNumber: "SB003", pax: 2, rsvpStatus: "pending", tableId: null },
  { id: "e4", name: "Wong Wei Liang", employeeNumber: "SB004", pax: 1, rsvpStatus: "pending", tableId: null },
  { id: "e5", name: "Priya Sundaram", employeeNumber: "SB005", pax: 2, rsvpStatus: "pending", tableId: null },
  { id: "e6", name: "Tan Ah Kow", employeeNumber: "SB006", pax: 1, rsvpStatus: "pending", tableId: null },
  { id: "e7", name: "Nurul Ain Binte Ali", employeeNumber: "SB007", pax: 2, rsvpStatus: "pending", tableId: null },
  { id: "e8", name: "David Lim Chin Huat", employeeNumber: "SB008", pax: 1, rsvpStatus: "pending", tableId: null },
  { id: "e9", name: "Sarah Chen Mei Ling", employeeNumber: "SB009", pax: 2, rsvpStatus: "pending", tableId: null },
  { id: "e10", name: "Mohammed Faizal Bin Ismail", employeeNumber: "SB010", pax: 1, rsvpStatus: "pending", tableId: null },
  { id: "e11", name: "Lee Boon Heng", employeeNumber: "SB011", pax: 2, rsvpStatus: "pending", tableId: null },
  { id: "e12", name: "Kavitha Nair", employeeNumber: "SB012", pax: 1, rsvpStatus: "pending", tableId: null },
  { id: "e13", name: "Zainudin Bin Nordin", employeeNumber: "SB013", pax: 2, rsvpStatus: "pending", tableId: null },
  { id: "e14", name: "Grace Loh Pei Shan", employeeNumber: "SB014", pax: 1, rsvpStatus: "pending", tableId: null },
  { id: "e15", name: "Suresh Pillai", employeeNumber: "SB015", pax: 2, rsvpStatus: "pending", tableId: null },
];

const INIT_TABLES = [
  { id: "t1", name: "Table 1", capacity: 10, assignedCount: 0 },
  { id: "t2", name: "Table 2", capacity: 10, assignedCount: 0 },
  { id: "t3", name: "Table 3", capacity: 10, assignedCount: 0 },
];

const INIT_PRIZES = [
  { id: "p1", label: "Grand Prize", description: "Luxury Weekend Getaway for 2", drawn: false },
  { id: "p2", label: "Prize 1", description: 'Sony 65" 4K Smart TV', drawn: false },
  { id: "p3", label: "Prize 2", description: "$500 Shopping Voucher", drawn: false },
];

function HomePage({ setPage }) {
  return (
    <div style={{ minHeight: "100vh", background: "#F5F0E8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px" }}>
      <h1 style={{ fontSize: 48, fontWeight: 900, color: T.inkDark, marginBottom: 10 }}>Soilbuild</h1>
      <p style={{ fontSize: 32, color: T.green, marginBottom: 30 }}>Annual Dinner 2026</p>
      <p style={{ fontSize: 16, color: T.gray, marginBottom: 40, maxWidth: 500, textAlign: "center" }}>Saturday, 15 March 2026 | 6:00 PM | Grand Ballroom</p>
      <button onClick={() => setPage("rsvp")} style={{ background: T.green, color: T.white, border: "none", borderRadius: 10, padding: "12px 24px", fontWeight: 600, cursor: "pointer" }}>RSVP Now</button>
    </div>
  );
}

function RSVPPage({ employees, setEmployees, tables, setTables }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    setSuggestions(query.length > 0 ? employees.filter(e => e.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8) : []);
  }, [query, employees]);
  const handleConfirm = () => {
    if (!selected) return;
    const emptyTable = tables.find(t => t.assignedCount < t.capacity);
    if (!emptyTable) { alert("No available tables"); return; }
    setEmployees(employees.map(e => e.id === selected.id ? { ...e, rsvpStatus: "confirmed", tableId: emptyTable.id } : e));
    setTables(tables.map(t => t.id === emptyTable.id ? { ...t, assignedCount: t.assignedCount + 1 } : t));
    alert(`Confirmed! Assigned to ${emptyTable.name}`);
    setSelected(null);
    setQuery("");
  };
  return (
    <div style={{ minHeight: "100vh", background: "#F5F0E8", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
      <div style={{ background: "#FAF7F2", borderRadius: 16, padding: 40, width: "100%", maxWidth: 500 }}>
        <h1 style={{ fontSize: 28, color: T.inkDark, marginBottom: 24, textAlign: "center" }}>RSVP</h1>
        <div style={{ position: "relative", marginBottom: 20 }}>
          <input type="text" placeholder="Search by name..." value={query} onChange={e => setQuery(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: 8, border: `1px solid ${T.border}`, fontSize: 15 }} />
          {suggestions.length > 0 && (
            <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: T.white, border: `1px solid ${T.border}`, borderRadius: 8, zIndex: 50, marginTop: 4, maxHeight: 260, overflowY: "auto" }}>
              {suggestions.map(s => (
                <div key={s.id} onClick={() => { setSelected(s); setQuery(s.name); setSuggestions([]); }} style={{ padding: "12px", cursor: "pointer", borderBottom: `1px solid ${T.border}` }}>
                  {s.name} ({s.employeeNumber})
                </div>
              ))}
            </div>
          )}
        </div>
        {selected && (
          <>
            <p style={{ marginBottom: 16, color: T.gray }}>Employee: {selected.employeeNumber}</p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={handleConfirm} style={{ flex: 1, background: T.green, color: T.white, border: "none", borderRadius: 8, padding: "12px", fontWeight: 600, cursor: "pointer" }}>Confirm</button>
              <button onClick={() => { setSelected(null); setQuery(""); }} style={{ flex: 1, background: T.white, color: T.red, border: `2px solid ${T.red}`, borderRadius: 8, padding: "12px", fontWeight: 600, cursor: "pointer" }}>Decline</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const handle = () => {
    setErr("");
    if (email === "admin@soilbuild.com" && pass === "Admin@1234") {
      onLogin();
    } else {
      setErr("Invalid credentials");
    }
  };
  return (
    <div style={{ minHeight: "100vh", background: "#F5F0E8", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#FAF7F2", borderRadius: 16, padding: 40, width: 400 }}>
        <h1 style={{ fontSize: 24, color: T.inkDark, marginBottom: 20, textAlign: "center" }}>Admin Login</h1>
        {err && <div style={{ background: "#FEE2E2", color: T.red, padding: "10px", borderRadius: 6, marginBottom: 16 }}>{err}</div>}
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@soilbuild.com" style={{ width: "100%", padding: "10px", borderRadius: 6, border: `1px solid ${T.border}`, marginBottom: 12 }} />
        <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" style={{ width: "100%", padding: "10px", borderRadius: 6, border: `1px solid ${T.border}`, marginBottom: 16 }} />
        <button onClick={handle} style={{ width: "100%", background: T.green, color: T.white, border: "none", borderRadius: 6, padding: 10, fontWeight: 600, cursor: "pointer" }}>Sign In</button>
      </div>
    </div>
  );
}

function AdminDashboard({ employees, tables, prizes, onLogout }) {
  return (
    <div style={{ minHeight: "100vh", background: "#F5F0E8", padding: "40px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", background: "#FAF7F2", borderRadius: 16, padding: 32 }}>
        <h1 style={{ fontSize: 28, color: T.inkDark, marginBottom: 16 }}>Admin Dashboard</h1>
        <p style={{ color: T.gray, marginBottom: 20 }}>Employees: {employees.length} | Tables: {tables.length} | Prizes: {prizes.length}</p>
        <button onClick={onLogout} style={{ background: T.red, color: T.white, border: "none", borderRadius: 6, padding: "10px 20px", fontWeight: 600, cursor: "pointer" }}>Logout</button>
      </div>
    </div>
  );
}

function FontLoader() {
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');`;
    document.head.appendChild(s);
  }, []);
  return null;
}

export default function App() {
  const [page, setPage] = useState("home");
  const [employees, setEmployees] = useState(INIT_EMPLOYEES);
  const [tables, setTables] = useState(INIT_TABLES);
  const [prizes, setPrizes] = useState(INIT_PRIZES);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  return (
    <div>
      <FontLoader />
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "rsvp" && <RSVPPage employees={employees} setEmployees={setEmployees} tables={tables} setTables={setTables} />}
      {page === "admin" && !adminLoggedIn && <AdminLogin onLogin={() => setAdminLoggedIn(true)} />}
      {page === "admin" && adminLoggedIn && <AdminDashboard employees={employees} tables={tables} prizes={prizes} onLogout={() => { setAdminLoggedIn(false); setPage("home"); }} />}
    </div>
  );
}
