import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const T = {
  green: "#2D8B3E",
  greenDark: "#1A5C28",
  greenLight: "#4CAF50",
  white: "#FFFFFF",
  red: "#C1272D",
  gray: "#6B7280",
  grayLight: "#F3F4F6",
  border: "#E5E7EB",
  beige: "#F5F0E8",
  beigeLight: "#FAF7F2",
  beigeDark: "#E8DFD0",
  inkDark: "#2C1A0E",
  inkMid: "#5C3D1E",
};

function SoilbuildLogo({ size = 60, showText = true }) {
  return (
    <div style={{
      display: "inline-flex",
      flexDirection: "row",
      alignItems: "center",
      gap: size * 0.15,
    }}>
      <div style={{ fontSize: size }}>🌱</div>
      {showText && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: size * 0.38,
              color: "#D4A800",
            }}>SOIL</span>
            <span style={{
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: size * 0.38,
              color: "#3A7D1E",
            }}>BUILD</span>
          </div>
        </div>
      )}
    </div>
  );
}

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
    <div style={{ minHeight: "100vh", background: "#F5F0E8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
      <div style={{ marginBottom: 32 }}><SoilbuildLogo size={100} /></div>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(40px,8vw,90px)", fontWeight: 900, color: T.inkDark, lineHeight: 1.05, marginBottom: 12 }}>Soilbuild Annual Dinner</h1>
      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,6vw,48px)", fontWeight: 700, color: T.green, marginBottom: 32 }}>2026</p>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: T.gray, marginBottom: 40, maxWidth: 500, lineHeight: 1.6 }}>
        <p>Saturday, 15 March 2026 | 6:00 PM | Grand Ballroom</p>
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={() => setPage("rsvp")} style={{ background: T.green, color: T.white, border: "none", borderRadius: 10, padding: "14px 28px", fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>RSVP Now</button>
        <button onClick={() => setPage("invitation")} style={{ background: T.white, color: T.green, border: `2px solid ${T.green}`, borderRadius: 10, padding: "14px 28px", fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>View Invitation</button>
      </div>
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
    <div style={{ minHeight: "100vh", background: "#F5F0E8", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ background: "#FAF7F2", borderRadius: 16, padding: 40, width: "100%", maxWidth: 500, border: "1px solid #E8DFD0" }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: T.inkDark, marginBottom: 24, textAlign: "center" }}>RSVP</h1>
        <div style={{ position: "relative", marginBottom: 20 }}>
          <input type="text" placeholder="Start typing your name…" value={query} onChange={e => setQuery(e.target.value)}
            style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: `1.5px solid #E8DFD0`, fontFamily: "'DM Sans',sans-serif", fontSize: 15, outline: "none", background: T.white, color: T.inkDark }} />
          {suggestions.length > 0 && (
            <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: T.white, border: `1px solid #E8DFD0`, borderRadius: 10, zIndex: 50, marginTop: 4, maxHeight: 260, overflowY: "auto" }}>
              {suggestions.map(s => (
                <div key={s.id} onClick={() => { setSelected(s); setQuery(s.name); setSuggestions([]); }}
                  style={{ padding: "12px 16px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 14, borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between" }}>
                  <span>{s.name}</span>
                  <span style={{ fontSize: 12, color: T.gray }}>{s.employeeNumber}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {selected && (
          <>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: T.inkMid, marginBottom: 6, fontWeight: 500 }}>Employee No.</label>
              <input value={selected.employeeNumber} readOnly style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1.5px solid #E8DFD0", fontFamily: "'DM Sans',sans-serif", fontSize: 15, background: "#EDE4D3", color: T.inkMid }} />
            </div>
            <div style={{ marginBottom: 28, display: "flex", gap: 12 }}>
              <button onClick={handleConfirm} style={{ flex: 1, background: T.green, color: T.white, border: "none", borderRadius: 10, padding: "14px", fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>✓ Confirm</button>
              <button onClick={() => { setSelected(null); setQuery(""); }} style={{ flex: 1, background: T.white, color: T.red, border: `2px solid ${T.red}`, borderRadius: 10, padding: "14px", fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>✗ Decline</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function InvitationPage({ setPage }) {
  return (
    <div style={{ minHeight: "100vh", background: "#F5F0E8", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ background: "#0B1A3E", borderRadius: 16, padding: 48, width: "100%", maxWidth: 600, border: "2px solid #F5A623" }}>
        <div style={{ textAlign: "center", color: "#FFD166" }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, marginBottom: 16 }}>You are invited to</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, fontWeight: 900, marginBottom: 20, color: "#F5A623" }}>Soilbuild Annual Dinner</h1>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, color: "#FFD166", marginBottom: 32 }}>2026</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, lineHeight: 1.8, marginBottom: 32, color: "#FFFFFF" }}>
            <p>Saturday, 15 March 2026</p>
            <p>6:00 PM onwards</p>
            <p>Grand Ballroom, Marina Bay Sands</p>
          </div>
          <button onClick={() => setPage("rsvp")} style={{ background: "#F5A623", color: "#0B1A3E", border: "none", borderRadius: 10, padding: "14px 28px", fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>RSVP Now</button>
        </div>
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
    if (email.toLowerCase().trim() === "admin@soilbuild.com" && pass === "Admin@1234") {
      onLogin();
    } else {
      setErr("Invalid credentials.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #F5F0E8 0%, #EDE4D3 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#FAF7F2", borderRadius: 20, padding: 48, width: 420, boxShadow: "0 24px 60px rgba(92,61,30,0.15)", border: "1px solid #E8DFD0" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: T.inkDark, fontWeight: 700, marginBottom: 4 }}>Admin Portal</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: T.gray }}>Soilbuild Annual Dinner 2026</div>
        </div>
        {err && <div style={{ background: "#FEE2E2", color: T.red, padding: "10px 14px", borderRadius: 8, marginBottom: 16, fontFamily: "'DM Sans',sans-serif", fontSize: 13 }}>⚠️ {err}</div>}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: T.inkMid, marginBottom: 6, fontWeight: 600 }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@soilbuild.com"
            style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1.5px solid #E8DFD0", fontFamily: "'DM Sans',sans-serif", fontSize: 14, outline: "none", color: T.inkDark, background: T.white }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: T.inkMid, marginBottom: 6, fontWeight: 600 }}>Password</label>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••"
            style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1.5px solid #E8DFD0", fontFamily: "'DM Sans',sans-serif", fontSize: 14, outline: "none", color: T.inkDark, background: T.white }} />
        </div>
        <button onClick={handle} style={{ width: "100%", background: T.green, color: T.white, border: "none", borderRadius: 8, padding: 14, fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 16 }}>Sign In</button>
        <div style={{ background: "#EEF7EE", border: "1px solid #BBF7D0", borderRadius: 8, padding: "12px 16px" }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: T.green, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Demo Credentials</div>
          <div style={{ fontFamily: "monospace", fontSize: 12, color: T.inkDark, lineHeight: 1.8 }}>
            <div><span style={{ color: T.inkMid }}>Email: </span>admin@soilbuild.com</div>
            <div><span style={{ color: T.inkMid }}>Pass: </span>Admin@1234</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ employees, tables, prizes, onLogout, setPage }) {
  return (
    <div style={{ minHeight: "100vh", background: "#F5F0E8", padding: "80px 24px 40px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", background: "#FAF7F2", borderRadius: 16, padding: 32, border: "1px solid #E8DFD0" }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, color: T.inkDark, marginBottom: 16 }}>Admin Dashboard</h1>
        <p style={{ fontFamily: "'DM Sans',sans-serif", color: T.gray, marginBottom: 20 }}>Employees: {employees.length}, Tables: {tables.length}, Prizes: {prizes.length}</p>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => setPage("home")} style={{ background: T.green, color: T.white, border: "none", borderRadius: 8, padding: "10px 20px", fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Home</button>
          <button onClick={onLogout} style={{ background: "#FEE2E2", color: T.red, border: "none", borderRadius: 8, padding: "10px 20px", fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Logout</button>
        </div>
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
      {page === "invitation" && <InvitationPage setPage={setPage} />}
      {page === "admin" && !adminLoggedIn && <AdminLogin onLogin={() => setAdminLoggedIn(true)} />}
      {page === "admin" && adminLoggedIn && <AdminDashboard employees={employees} tables={tables} prizes={prizes} onLogout={() => { setAdminLoggedIn(false); setPage("home"); }} setPage={setPage} />}
    </div>
  );
}
