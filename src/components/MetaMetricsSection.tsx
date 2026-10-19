"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Dados mockados de entrega por dia (simulando a última semana do Meta Ads)
const DADOS_GRAFICO_MOCK = [
  { dia: 'Seg', alcance: 1200, impressoes: 1500, gasto: 30 },
  { dia: 'Ter', alcance: 1800, impressoes: 2200, gasto: 40 },
  { dia: 'Qua', alcance: 1500, impressoes: 1900, gasto: 35 },
  { dia: 'Qui', alcance: 2200, impressoes: 2900, gasto: 50 },
  { dia: 'Sex', alcance: 3500, impressoes: 5100, gasto: 75 },
  { dia: 'Sáb', alcance: 4100, impressoes: 6200, gasto: 90 },
  { dia: 'Dom', alcance: 3100, impressoes: 4200, gasto: 65 },
];

const METRICAS_TOTAIS_MOCK = {
  alcance: 17400,
  impressoes: 24000,
  frequencia: 1.37,
  cpmMedio: 15.83,
  gastoTotal: 385.00
};

export default function MetaMetricsSection() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-slate-200 rounded-xl text-slate-800 font-sans shadow-xl mt-8">
      
      {/* Cabeçalho da Seção */}
      <div className="border-b border-slate-100 pb-4 mb-6">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Painel de Mídia</span>
        <h1 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">Métricas de Entrega (Meta Ads)</h1>
        <p className="text-xs text-slate-400 mt-1">Volume bruto de distribuição e visualizações dos seus anúncios locais.</p>
      </div>

      {/* 🚀 Os Cards Principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Alcance Total</span>
          <p className="text-xl font-mono font-black text-slate-900 mt-1">
            {METRICAS_TOTAIS_MOCK.alcance.toLocaleString('pt-BR')}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">Pessoas únicas viram</p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Impressões</span>
          <p className="text-xl font-mono font-black text-slate-900 mt-1">
            {METRICAS_TOTAIS_MOCK.impressoes.toLocaleString('pt-BR')}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">Exibições totais no feed/stories</p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Frequência</span>
          <p className="text-xl font-mono font-black text-slate-900 mt-1">
            {METRICAS_TOTAIS_MOCK.frequencia.toFixed(2)}x
          </p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Média por pessoa</p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CPM Médio</span>
          <p className="text-xl font-mono font-black text-blue-600 mt-1">
            R$ {METRICAS_TOTAIS_MOCK.cpmMedio.toFixed(2)}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">Custo por 1.000 telas</p>
        </div>
      </div>

      {/* 📊 O Gráfico de Barras Responsivo */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 shadow-sm">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Volume de Alcance vs Impressões por Dia</h3>
        
        <div className="w-full h-64 font-mono text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={DADOS_GRAFICO_MOCK}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="dia" stroke="#94a3b8" tickLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
              />
              {/* Barra de Alcance (Azul Claro) */}
              <Bar dataKey="alcance" name="Alcance Único" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              {/* Barra de Impressões (Azul Escuro/Slate) */}
              <Bar dataKey="impressoes" name="Impressões Totais" fill="#1e293b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center gap-6 mt-4 text-[11px] font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-blue-500 rounded-sm"></span>
            <span className="text-slate-600">Alcance (Pessoas Únicas)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-slate-800 rounded-sm"></span>
            <span className="text-slate-600">Impressões (Repetições)</span>
          </div>
        </div>
      </div>

    </div>
  );
}
