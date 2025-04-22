import { Span } from "next/dist/trace";
import Image from "next/image";


export default function Home() {
  
  const forecasts = [
    { date: "21 May", icon: "☀️", range: "11‑17 °C" },
    { date: "22 May", icon: "☁️", range: "20‑24 °C" },
    { date: "23 May", icon: "☀️", range: "16‑20 °C" },
  ];
  return (
    
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/*Left Panel*/}
        <div className="flex flex-col items-center text-center space-y-4 border-r-2 border-gray-300 pr-4 min-h-screen overflow-x-hidden">
          <div className="text-7xl">☀️⛅</div>
          <div className="text-4xl font-bold">13 °C</div>
          <div className="text-xl text-gray-700">Sunny</div>
          <div className="text-sm text-gray-500 fixed bottom-0 left-0 p-4">
            30<sup>th</sup> May 2027 <br /> Nairobi
          </div>
        </div>
        {/*Middle Panel*/}
        <div className="md:col-span-3 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
          <input className="input-block input" placeholder="Search City ..." />
            <button className="btn btn-primary">GO</button>
            <button className="btn btn-outline">°C</button>
            <button className="btn btn-outline">°F</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {forecasts.map(({ date, icon, range }) => (
              <div key={date} className="card">
                <div className="card-body text-center space-y-2">
                  <h3 className="text-base-content text-sm font-semibold">{date}</h3>
                  <div className="text-4xl">{icon}</div>
                  <p className="text-sm">{range}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card">
              <div className="card-body space-y-2 text-center">
                <h3 className="text-base-content text-sm font-semibold">Wind Status</h3>
                <p className="text-2xl font-bold">3 km/h</p>
                <p className="text-sm text-gray-500">WSW</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body space-y-2">
                <h3 className="text-base-content text-sm font-semibold text-center">Humidity</h3>
                <p className="text-2xl font-bold text-center">80 %</p>
                {/* RippleUI’s progress bar */}
                <progress className="progress w-full " value={80} max={100} />
              </div>
            </div>
        </div>
        
        </div>
      </div>
      </div>
  );
}
