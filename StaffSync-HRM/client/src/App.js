import React, { useState, useEffect } from 'react';

const initialEmployees = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav@staffsync.io', role: 'HR', department: 'People & Culture', designation: 'Senior HR Manager', status: 'Active' },
  { id: 2, name: 'Priya Patel', email: 'priya@staffsync.io', role: 'Manager', department: 'Engineering', designation: 'Engineering Lead', status: 'Active' },
  { id: 3, name: 'Rohan Verma', email: 'rohan@staffsync.io', role: 'Employee', department: 'Engineering', designation: 'Full-Stack Developer', status: 'Active' },
  { id: 4, name: 'Neha Gupta', email: 'neha@staffsync.io', role: 'Employee', department: 'Product Design', designation: 'UI/UX Specialist', status: 'On Leave' }
];

const initialLeaves = [
  { id: 1, employeeName: 'Neha Gupta', department: 'Product Design', type: 'Medical Leave', startDate: '2026-10-28', endDate: '2026-10-31', reason: 'Flu recovery', status: 'Pending' },
  { id: 2, employeeName: 'Rohan Verma', department: 'Engineering', type: 'Casual Leave', startDate: '2026-11-05', endDate: '2026-11-06', reason: 'Personal errands', status: 'Approved' }
];

const initialAnnouncements = [
  { id: 1, title: 'Annual Health Benefits Renewal 2026', content: 'HR open enrollment window is active until the end of next week. Please complete your biometric declarations.', category: 'Benefits', date: '2026-10-25' },
  { id: 2, title: 'Q4 Product Roadmap All-Hands', content: 'Join the executive presentation this Friday at 4:00 PM IST on Teams.', category: 'Notice', date: '2026-10-27' }
];

export default function App() {
  const [currentRole, setCurrentRole] = useState('HR');
  const [employees, setEmployees] = useState(initialEmployees);
  const [leaves, setLeaves] = useState(initialLeaves);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);

  const [punchState, setPunchState] = useState({ checkedIn: false, checkInTime: null, checkOutTime: null });
  const [newLeave, setNewLeave] = useState({ type: 'Casual Leave', startDate: '', endDate: '', reason: '' });
  const [newEmp, setNewEmp] = useState({ name: '', email: '', department: 'Engineering', designation: '', role: 'Employee' });
  const [newNotice, setNewNotice] = useState({ title: '', content: '', category: 'General' });

  const handlePunch = () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (!punchState.checkedIn) {
      setPunchState({ checkedIn: true, checkInTime: timeStr, checkOutTime: null });
    } else {
      setPunchState(prev => ({ ...prev, checkedIn: false, checkOutTime: timeStr }));
    }
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    if (!newLeave.startDate || !newLeave.reason) return;
    const item = {
      id: Date.now(),
      employeeName: 'Rohan Verma',
      department: 'Engineering',
      ...newLeave,
      status: 'Pending'
    };
    setLeaves([item, ...leaves]);
    setNewLeave({ type: 'Casual Leave', startDate: '', endDate: '', reason: '' });
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.email) return;
    setEmployees([...employees, { id: Date.now(), ...newEmp, status: 'Active' }]);
    setNewEmp({ name: '', email: '', department: 'Engineering', designation: '', role: 'Employee' });
  };

  const handlePostNotice = (e) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.content) return;
    setAnnouncements([{ id: Date.now(), ...newNotice, date: new Date().toISOString().split('T')[0] }, ...announcements]);
    setNewNotice({ title: '', content: '', category: 'General' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-slate-900 text-white px-6 py-4 flex flex-wrap justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-white shadow">SS</div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">StaffSync</h1>
            <p className="text-xs text-slate-400">Human Resource Management Suite</p>
          </div>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center space-x-2 mt-2 sm:mt-0 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2">Role:</span>
          {['HR', 'Manager', 'Employee'].map(role => (
            <button
              key={role}
              onClick={() => setCurrentRole(role)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                currentRole === role ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Role Badge Bar */}
        <div className="bg-indigo-50 border border-indigo-200 text-indigo-900 px-4 py-3 rounded-lg flex items-center justify-between">
          <div className="text-sm">
            Current Active Workspace: <strong>{currentRole} Portal</strong>. Testing live controls and workflows.
          </div>
          <span className="text-xs bg-indigo-200 text-indigo-800 px-2.5 py-1 rounded-full font-semibold">Active Session</span>
        </div>

        {/* HR VIEW */}
        {currentRole === 'HR' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-slate-500 uppercase">Total Workforce</span>
                <p className="text-3xl font-bold text-slate-900 mt-1">{employees.length}</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-slate-500 uppercase">Pending Leave Requests</span>
                <p className="text-3xl font-bold text-amber-600 mt-1">{leaves.filter(l => l.status === 'Pending').length}</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-slate-500 uppercase">Broadcasted Notices</span>
                <p className="text-3xl font-bold text-indigo-600 mt-1">{announcements.length}</p>
              </div>
            </div>

            {/* Add Employee & Directory */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h2 className="text-base font-bold text-slate-900 mb-4">Add New Employee</h2>
                <form onSubmit={handleAddEmployee} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600">Full Name</label>
                    <input className="w-full text-sm border border-slate-300 rounded px-3 py-1.5 focus:outline-indigo-500" value={newEmp.name} onChange={e => setNewEmp({...newEmp, name: e.target.value})} required />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600">Work Email</label>
                    <input className="w-full text-sm border border-slate-300 rounded px-3 py-1.5 focus:outline-indigo-500" type="email" value={newEmp.email} onChange={e => setNewEmp({...newEmp, email: e.target.value})} required />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600">Department</label>
                    <input className="w-full text-sm border border-slate-300 rounded px-3 py-1.5 focus:outline-indigo-500" value={newEmp.department} onChange={e => setNewEmp({...newEmp, department: e.target.value})} required />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600">Designation</label>
                    <input className="w-full text-sm border border-slate-300 rounded px-3 py-1.5 focus:outline-indigo-500" value={newEmp.designation} onChange={e => setNewEmp({...newEmp, designation: e.target.value})} required />
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded text-sm transition">Register Staff</button>
                </form>
              </div>

              <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h2 className="text-base font-bold text-slate-900 mb-4">Staff Directory</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600 text-xs uppercase border-b">
                      <tr>
                        <th className="py-2.5 px-3">Name</th>
                        <th className="py-2.5 px-3">Department</th>
                        <th className="py-2.5 px-3">Role</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {employees.map(emp => (
                        <tr key={emp.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-medium text-slate-900">{emp.name}<div className="text-xs text-slate-400">{emp.email}</div></td>
                          <td className="py-2.5 px-3 text-slate-600">{emp.department}</td>
                          <td className="py-2.5 px-3"><span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">{emp.role}</span></td>
                          <td className="py-2.5 px-3"><span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">{emp.status}</span></td>
                          <td className="py-2.5 px-3">
                            <button onClick={() => setEmployees(employees.filter(e => e.id !== emp.id))} className="text-xs text-rose-600 hover:underline">Remove</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MANAGER VIEW */}
        {currentRole === 'Manager' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-4">Pending Leave Applications Review</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600 text-xs uppercase border-b">
                    <tr>
                      <th className="py-2.5 px-3">Applicant</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Dates</th>
                      <th className="py-2.5 px-3">Reason</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Review</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {leaves.map(l => (
                      <tr key={l.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-medium text-slate-900">{l.employeeName}</td>
                        <td className="py-2.5 px-3 text-slate-600">{l.type}</td>
                        <td className="py-2.5 px-3 text-slate-600 text-xs">{l.startDate} to {l.endDate}</td>
                        <td className="py-2.5 px-3 text-slate-600">{l.reason}</td>
                        <td className="py-2.5 px-3">
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                            l.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                            l.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                          }`}>{l.status}</span>
                        </td>
                        <td className="py-2.5 px-3 text-right space-x-2">
                          {l.status === 'Pending' && (
                            <>
                              <button onClick={() => setLeaves(leaves.map(item => item.id === l.id ? {...item, status: 'Approved'} : item))} className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded">Approve</button>
                              <button onClick={() => setLeaves(leaves.map(item => item.id === l.id ? {...item, status: 'Rejected'} : item))} className="text-xs bg-rose-600 hover:bg-rose-700 text-white px-2 py-1 rounded">Reject</button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* EMPLOYEE VIEW */}
        {currentRole === 'Employee' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900">Daily Punch In / Out</h2>
              <div className="p-4 bg-slate-50 rounded-lg text-center border border-slate-200">
                <p className="text-xs text-slate-500 uppercase font-semibold">Today's Date</p>
                <p className="text-lg font-bold text-slate-800 mt-1">{new Date().toDateString()}</p>
                <div className="mt-3 text-xs text-slate-600 space-y-1">
                  <div>Check-in: <strong>{punchState.checkInTime || '--:--'}</strong></div>
                  <div>Check-out: <strong>{punchState.checkOutTime || '--:--'}</strong></div>
                </div>
              </div>
              <button
                onClick={handlePunch}
                className={`w-full py-2.5 rounded text-sm font-semibold transition ${
                  punchState.checkedIn ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {punchState.checkedIn ? 'Clock Out for the Day' : 'Punch In Now'}
              </button>
            </div>

            <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-4">Submit Leave Request</h2>
              <form onSubmit={handleLeaveSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Leave Type</label>
                  <select className="w-full text-sm border border-slate-300 rounded px-3 py-2 mt-1" value={newLeave.type} onChange={e => setNewLeave({...newLeave, type: e.target.value})}>
                    <option>Casual Leave</option>
                    <option>Sick Leave</option>
                    <option>Paid Time Off</option>
                    <option>Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Start Date</label>
                  <input type="date" className="w-full text-sm border border-slate-300 rounded px-3 py-2 mt-1" value={newLeave.startDate} onChange={e => setNewLeave({...newLeave, startDate: e.target.value})} required />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">End Date</label>
                  <input type="date" className="w-full text-sm border border-slate-300 rounded px-3 py-2 mt-1" value={newLeave.endDate} onChange={e => setNewLeave({...newLeave, endDate: e.target.value})} required />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-600">Reason</label>
                  <textarea rows="2" className="w-full text-sm border border-slate-300 rounded px-3 py-2 mt-1" value={newLeave.reason} onChange={e => setNewLeave({...newLeave, reason: e.target.value})} required />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-5 rounded text-sm transition">Submit Request</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
