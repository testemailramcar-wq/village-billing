"use client";
import { useState, useEffect } from 'react';
import { calculateMonthlyDue } from '@/lib/billing';
import { CreditCard, CheckCircle, Clock, Info } from 'lucide-react';

export default function Home() {
  const [billing, setBilling] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    setBilling(calculateMonthlyDue());
  }, []);

  if (!billing) return <div className="p-10 text-center">Loading Dashboard...</div>;

  return (
    <div className="max-w-md mx-auto min-h-screen p-4 pb-10">
      <header className="py-6">
        <h1 className="text-2xl font-black text-blue-600 tracking-tight italic">HOA_PORTAL</h1>
      </header>

      {/* Balance Card */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100 overflow-hidden border border-gray-50">
        <div className={`p-10 text-center ${isPaid ? 'bg-green-500' : 'bg-blue-600'} text-white transition-all`}>
          <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Current Balance Due</p>
          <h2 className="text-6xl font-black italic">₱{isPaid ? "0.00" : billing.total}</h2>
          <div className="mt-4 inline-flex items-center gap-2 bg-black/10 px-4 py-1 rounded-full text-xs font-bold uppercase">
            {isPaid ? <CheckCircle size={14}/> : <Clock size={14}/>}
            {isPaid ? "Verified" : "Unpaid"}
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400 font-medium">Billing Period</span>
              <span className="font-bold">{billing.month} {billing.year}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400 font-medium">Tier Applied</span>
              <span className="font-bold text-blue-600">{billing.tier}</span>
            </div>
          </div>

          <button 
            onClick={() => setIsPaid(true)}
            disabled={isPaid}
            className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${
              isPaid ? 'bg-gray-100 text-gray-400' : 'bg-blue-600 text-white shadow-lg shadow-blue-200 active:scale-95'
            }`}
          >
            {isPaid ? "ALREADY SETTLED" : "PAY NOW"}
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-6 bg-blue-50 p-6 rounded-3xl border border-blue-100">
        <h3 className="text-blue-800 font-bold flex items-center gap-2 mb-2 text-sm">
          <Info size={16}/> Tiered Pricing Info
        </h3>
        <p className="text-xs text-blue-600 leading-relaxed font-medium">
          Dues are calculated based on your payment date. Pay before the 7th to avail the lowest rate of ₱360.
        </p>
      </div>
    </div>
  );
}