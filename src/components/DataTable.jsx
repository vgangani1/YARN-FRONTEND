export default function DataTable({ data, darkMode }){
  if(!data.length) return <div className="text-sm opacity-70">No rows to display</div>;
  const cols = Object.keys(data[0]);
  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="min-w-full text-sm border-collapse">
        <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-200'}>
          <tr>
            {cols.map(c => <th key={c} className="text-left p-2 capitalize">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? (darkMode ? 'bg-gray-800' : 'bg-gray-50') : (darkMode ? 'bg-gray-700' : 'bg-white')}>
              {cols.map((c,j)=> <td key={j} className="p-2 border-b border-gray-300">{String(row[c] ?? '')}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
