import { useEffect, useState } from 'react';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export default function UserAdmin(){
  const [email, setEmail] = useState('');
  const [rows, setRows] = useState([]);

  useEffect(()=>{
    const q = query(collection(db,'allowlist'), orderBy('email'));
    const unsub = onSnapshot(q, (snap)=>{
      setRows(snap.docs.map(d=> ({ id:d.id, ...(d.data()) })));
    });
    return unsub;
  },[]);

  async function add(){
    if(!email) return;
    await addDoc(collection(db,'allowlist'), { email: email.trim().toLowerCase() });
    setEmail('');
  }
  async function remove(id){ await deleteDoc(doc(db,'allowlist', id)); }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">User Management (Owner)</h2>
      <div className="flex gap-2">
        <input className="p-2 border rounded text-gray-800" placeholder="user@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
        <button onClick={add} className="px-3 py-2 bg-blue-600 text-white rounded">Add</button>
      </div>
      <div className="text-sm opacity-70">Create accounts in Firebase → Authentication → Users. This list controls access.</div>
      <ul className="divide-y">
        {rows.map(r=> (
          <li key={r.id} className="flex justify-between py-2 items-center">
            <span>{r.email}</span>
            <button onClick={()=>remove(r.id)} className="px-2 py-1 border rounded">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
