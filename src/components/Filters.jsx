import { useMemo } from 'react';

export default function Filters({ data, filters, setFilters, search, setSearch }){
  const columns = data.length ? Object.keys(data[0]) : [];

  const options = useMemo(()=>{
    const opts = {};
    columns.forEach((col)=>{
      opts[col] = Array.from(new Set(data.map(r => String(r[col]||'').trim()))).filter(Boolean).sort();
    });
    return opts;
  }, [data]);

  return (
    <div className="flex flex-wrap items-end gap-3 mb-4">
      <input
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        placeholder="Search any column..."
        className="p-2 border rounded min-w-[260px] text-gray-800"
      />
      {columns.map((col)=>(
        <select
          key={col}
          value={filters[col]||''}
          onChange={(e)=> setFilters(prev => ({...prev, [col]: e.target.value}))}
          className="p-2 border rounded text-gray-800"
        >
          <option value="">{col} (All)</option>
          {options[col]?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ))}
    </div>
  );
}
