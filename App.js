import { useState } from 'react';

const instruments = {
  MGC: { name: 'Micro Gold', tickValue: 10 },
  MES: { name: 'Micro S&P', tickValue: 5 },
  MNQ: { name: 'Micro Nasdaq', tickValue: 2 },
  MCL: { name: 'Micro Crude Oil', tickValue: 10 },
  '6A': { name: 'Australian Dollar (6A)', tickValue: 10 },
  '6B': { name: 'British Pound (6B)', tickValue: 6.25 },
  '6E': { name: 'Euro (6E)', tickValue: 12.5 },
  GOLD: { name: 'Gold', tickValue: 10 },
  NASDAQ: { name: 'Nasdaq', tickValue: 2 }
};

export default function App() {
  const [theme, setTheme] = useState('light');
  const [instrument, setInstrument] = useState('MGC');
  const [usePercentRisk, setUsePercentRisk] = useState(false);
  const [accountSize, setAccountSize] = useState(150000);
  const [accountRisk, setAccountRisk] = useState(600);
  const [riskPercent, setRiskPercent] = useState(1);
  const [entry, setEntry] = useState(4215.1540);
  const [stop, setStop] = useState(4208.1035);

  const bg = theme === 'light' ? 'bg-gray-100' : 'bg-gray-900';
  const card = theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white';

  const pointMove = Math.abs(entry - stop);
  const tickValue = instruments[instrument].tickValue;
  const riskPerContract = pointMove * tickValue;

  const calculatedRisk = usePercentRisk ? (accountSize * (riskPercent / 100)) : accountRisk;
  const contracts = Math.floor(calculatedRisk / riskPerContract) || 0;

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${bg}`}>
      <div className={`${card} p-6 rounded-2xl shadow-xl w-full max-w-md space-y-6`}>
        <h1 className="text-2xl font-bold text-center">Futures Contract Calculator</h1>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="px-4 py-2 rounded-xl border w-full">
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <div>
          <label className="font-medium">Instrument</label>
          <select value={instrument} onChange={(e) => setInstrument(e.target.value)} className="w-full p-2 mt-1 rounded-lg border bg-transparent">
            {Object.keys(instruments).map((key) => (<option key={key} value={key}>{key} ({instruments[key].name})</option>))}
          </select>
        </div>
        <div>
          <label className="font-medium">Risk Mode</label>
          <select value={usePercentRisk ? 'percent' : 'dollars'} onChange={(e) => setUsePercentRisk(e.target.value === 'percent')} className="w-full p-2 mt-1 rounded-lg border bg-transparent">
            <option value="dollars">Dollar Risk</option>
            <option value="percent">% Risk</option>
          </select>
        </div>
        {!usePercentRisk ? (
          <div>
            <label className="font-medium">Account Risk ($)</label>
            <input type="number" value={accountRisk} onChange={(e) => setAccountRisk(Number(e.target.value))} className="w-full p-2 mt-1 rounded-lg border" />
          </div>
        ) : (
          <>
            <div>
              <label className="font-medium">Account Size ($)</label>
              <input type="number" value={accountSize} onChange={(e) => setAccountSize(Number(e.target.value))} className="w-full p-2 mt-1 rounded-lg border" />
            </div>
            <div>
              <label className="font-medium">Risk %</label>
              <input type="number" value={riskPercent} onChange={(e) => setRiskPercent(Number(e.target.value))} className="w-full p-2 mt-1 rounded-lg border" />
            </div>
          </>
        )}
        <div>
          <label className="font-medium">Entry Price</label>
          <input type="number" value={entry} onChange={(e) => setEntry(Number(e.target.value))} className="w-full p-2 mt-1 rounded-lg border" />
        </div>
        <div>
          <label className="font-medium">Stop Loss Price</label>
          <input type="number" value={stop} onChange={(e) => setStop(Number(e.target.value))} className="w-full p-2 mt-1 rounded-lg border" />
        </div>
        <div className="p-4 rounded-xl border bg-gray-50 dark:bg-gray-700">
          <p><strong>Point Move:</strong> {pointMove.toFixed(4)} pts</p>
          <p><strong>Tick Value:</strong> ${tickValue}</p>
          <p><strong>Risk Per Contract:</strong> ${riskPerContract.toFixed(2)}</p>
          <p><strong>Max Contracts:</strong> {contracts}</p>
        </div>
      </div>
    </div>
  );
}
