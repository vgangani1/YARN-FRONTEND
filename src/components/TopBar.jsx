import { Moon, Sun, Upload, Download, LogOut, Users } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { exportJsonToExcel } from '../utils/excel';

export default function TopBar({ darkMode, setDarkMode, onUpload, filteredData, auth, onUsers }){
  return (
    <header className="flex justify-between items-center p-4 shadow bg-blue-600 text-white">
      <div className="flex items-center gap-3">
        <img src="/logo.png" className="w-10 h-10 rounded-full" alt="logo" />
        <h1 className="text-lg font-semibold">Omkar Filaments</h1>
      </div>
      <div className="flex items-center gap-3">
        <label className="cursor-pointer bg-white text-blue-600 px-3 py-1 rounded flex items-center gap-2 hover:bg-gray-200">
          <Upload size={16} /> Upload Excel
          <input type="file" accept=".xlsx,.xls" hidden onChange={onUpload} />
        </label>
        <button onClick={()=>exportJsonToExcel(filteredData)} className="bg-white text-blue-600 px-3 py-1 rounded flex items-center gap-2 hover:bg-gray-200">
          <Download size={16} /> Export
        </button>
        <button onClick={onUsers} className="bg-white text-blue-600 px-3 py-1 rounded flex items-center gap-2 hover:bg-gray-200">
          <Users size={16}/> Users
        </button>
        <button onClick={()=>setDarkMode(!darkMode)} className="bg-white text-blue-600 p-2 rounded-full hover:bg-gray-200">
          {darkMode ? <Sun size={18}/> : <Moon size={18}/>}
        </button>
        <button onClick={()=>signOut(auth)} className="bg-white text-blue-600 px-3 py-1 rounded flex items-center gap-2 hover:bg-gray-200">
          <LogOut size={16}/> Logout
        </button>
      </div>
    </header>
  );
}
