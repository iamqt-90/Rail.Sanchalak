import { useState } from 'react';


export default function RulesPage() {
  const TRAIN_TYPES = [
    { key: 'express', label: 'Express' },
    { key: 'passenger', label: 'Passenger' },
    { key: 'goods', label: 'Goods' },
    // Add more train types as needed
  ];
  const [rulesData, setRulesData] = useState<{ [key: string]: string[] }>({
    express: [
      'Express trains must stop only at major stations.',
      'Maximum speed: 110 km/h.',
      'Priority over passenger and goods trains.'
    ],
    passenger: [
      'Passenger trains stop at all stations.',
      'Maximum speed: 80 km/h.',
      'Give way to express trains when required.'
    ],
    goods: [
      'Goods trains operate mainly at night.',
      'Maximum speed: 60 km/h.',
      'Yield to all passenger and express trains.'
    ],
  });
  const [currentTrainType, setCurrentTrainType] = useState('express');
  const [ruleInput, setRuleInput] = useState('');
  const [deleteRuleNo, setDeleteRuleNo] = useState('');

  const handleAddRule = () => {
    const ruleText = ruleInput.trim();
    if (ruleText) {
      setRulesData(prev => ({
        ...prev,
        [currentTrainType]: [...(prev[currentTrainType] || []), ruleText],
      }));
      setRuleInput('');
    }
  };

  const handleDeleteRule = () => {
    const ruleNo = parseInt(deleteRuleNo, 10);
    if (!isNaN(ruleNo) && ruleNo > 0 && (rulesData[currentTrainType] || []).length >= ruleNo) {
      setRulesData(prev => ({
        ...prev,
        [currentTrainType]: (prev[currentTrainType] || []).filter((_: string, idx: number) => idx !== ruleNo - 1),
      }));
      setDeleteRuleNo('');
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-5xl min-h-[600px] p-12 bg-white/80 dark:bg-slate-900/80 rounded-3xl shadow-2xl backdrop-blur flex flex-col">
        <h1 className="text-4xl font-bold mb-8 text-slate-800 dark:text-slate-100 text-center">Rules Management</h1>
        <div className="flex gap-4 mb-8 justify-center">
          {TRAIN_TYPES.map(type => (
            <button
              key={type.key}
              className={`px-6 py-3 rounded-xl font-semibold border transition focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                currentTrainType === type.key
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'bg-white/60 text-slate-800 border-slate-300 hover:bg-slate-100'
              }`}
              onClick={() => setCurrentTrainType(type.key)}
            >
              {type.label}
            </button>
          ))}
        </div>
        <div className="flex gap-4 mb-6">
          <input
            id="rule-input"
            type="text"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg"
            placeholder={`Add rule for ${currentTrainType}`}
            value={ruleInput}
            onChange={e => setRuleInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleAddRule(); }}
          />
          <button
            id="add-rule-btn"
            className="px-6 py-3 rounded-xl bg-slate-800 text-white font-bold border border-slate-800 hover:bg-slate-900 transition text-lg"
            onClick={handleAddRule}
          >
            Add Rule
          </button>
        </div>
        <div className="flex gap-4 mb-8">
          <input
            id="delete-rule-no"
            type="number"
            min="1"
            className="w-32 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg"
            placeholder="Rule #"
            value={deleteRuleNo}
            onChange={e => setDeleteRuleNo(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleDeleteRule(); }}
          />
          <button
            id="delete-rule-btn"
            className="px-6 py-3 rounded-xl bg-red-600 text-white font-bold border border-red-700 hover:bg-red-700 transition text-lg"
            onClick={handleDeleteRule}
          >
            Delete Rule
          </button>
        </div>
        <ul id="rules-list" className="list-decimal pl-8 space-y-3 text-slate-700 dark:text-slate-100 text-lg flex-1">
          {(rulesData[currentTrainType] || []).length === 0 ? (
            <li className="italic text-slate-400">No rules for this train type.</li>
          ) : (
            (rulesData[currentTrainType] || []).map((rule: string, idx: number) => (
              <li key={idx}>{rule}</li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
