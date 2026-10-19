"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

// Dados mockados simulando o cruzamento da API da Meta + Banco de Dados do E-commerce
const CAMPANHAS_MOCK = [
  { 
    id: 'c1', 
    nome: 'Promo_Combo_Bacon_Local', 
    status: 'Ativo',
    gasto: 150.00, 
    cliques: 420, 
    ctr: 3.2, // %
    vendasGeradas: 35,
    ticketMedio: 45.00,
    cmvTotalInsumos: 525.00, // Custo real dos hambúrgueres produzidos para esses pedidos
    saude: 'Lucrativo'
  },
  { 
    id: 'c2', 
    nome: 'Cheddar_Bomb_Atrair_Insta', 
    status: 'Ativo',
    gasto: 120.00, 
    cliques: 510, 
    ctr: 1.4, // % (CTR baixo = criativo chato)
    vendasGeradas: 8,
    ticketMedio: 32.00,
    cmvTotalInsumos: 104.00,
    saude: 'Alerta'
  },
  { 
    id: 'c3', 
    nome: 'Combo_Familia_FimDeSemana', 
    status: 'Pausado',
    gasto: 0.00, 
    cliques: 0, 
    ctr: 0.0, 
    vendasGeradas: 0,
    ticketMedio: 0.00,
    cmvTotalInsumos: 0.00,
    saude: 'Neutro'
  }
];

export default function MarketingDashboardMock() {
  const [campanhas, setCampanhas] = useState(CAMPANHAS_MOCK);

  // Função para simular o botão de ação imediata (Pausar campanha via API)
  const alternarStatusCampanha = (id: string) => {
    setCampanhas(prev => prev.map(c => {
      if (c.id === id) {
        const novoStatus = c.status === 'Ativo' ? 'Pausado' : 'Ativo';
        return { 
          ...c, 
          status: novoStatus,
          saude: novoStatus === 'Pausado' ? 'Neutro' : c.saude 
        };
      }
      return c;
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-slate-200 rounded-xl text-slate-800 font-sans shadow-xl mt-8">
      
      {/* Cabeçalho do Módulo */}
      <div className="border-b border-slate-100 pb-4 mb-6">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Módulo de Performance</span>
        <h1 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">Anúncios & Diagnósticos de IA</h1>
        <p className="text-xs text-slate-400 mt-1">Dados integrados em tempo real com sua Conta de Anúncios Meta.</p>
      </div>

      {/* SEÇÃO PRINCIPAL: Os Diagnósticos Automatizados baseados em Regras de Negócio */}
      <div className="space-y-4 mb-8">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Alertas e Recomendações de Hoje</h2>
        
        {/* Alerta 1: Analisando c1 (Sucesso) */}
        {campanhas.find(c => c.id === 'c1')?.status === 'Ativo' && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-3">
            <span className="text-lg">🟢</span>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-emerald-800">Campanha "Promo_Combo_Bacon_Local" está voando!</h3>
              <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">
                O custo por clique (CPC) está baixo e o CTR está excelente (3.2%). O faturamento gerado cobre com folga o custo dos insumos e o marketing.
              </p>
              <div className="mt-3 flex gap-2">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8 px-3 font-bold">Aumentar Orçamento (+R$ 20)</Button>
              </div>
            </div>
          </div>
        )}

        {/* Alerta 2: Analisando c2 (Gargalo de Marketing/Ficha Técnica) */}
        {campanhas.find(c => c.id === 'c2')?.status === 'Ativo' && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
            <span className="text-lg">⚠️</span>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-amber-800">Gargalo detectado em "Cheddar_Bomb_Atrair_Insta"</h3>
              <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                O anúncio gerou 510 cliques, mas apenas 8 vendas. Isso indica que o anúncio desperta interesse, mas as pessoas desistem ao ver a página do produto. **Motivo provável:** Preço desalinhado ou taxa de entrega alta para a região.
              </p>
              <div className="mt-3 flex gap-2">
                <Button 
                  onClick={() => alternarStatusCampanha('c2')}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs h-8 px-3 font-bold"
                >
                  Pausar Anúncio no Instagram
                </Button>
                <Button variant="outline" className="text-xs h-8 px-3 border-slate-300 text-slate-700 font-bold bg-white">
                  Editar Preço do Hambúrguer
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* TABELA DE PERFORMANCE DAS CAMPANHAS */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-12 bg-slate-50 p-3.5 text-xs font-bold text-slate-500 tracking-wider uppercase border-b border-slate-200">
          <div className="col-span-5">Campanha Meta</div>
          <div className="col-span-2 text-center">Investido</div>
          <div className="col-span-2 text-center">CTR (Meta)</div>
          <div className="col-span-3 text-right">Retorno Real</div>
        </div>

        <div className="divide-y divide-slate-100">
          {campanhas.map((campanha) => {
            const faturamentoBruto = campanha.vendasGeradas * campanha.ticketMedio;
            // Cálculo do ROI/Lucro real cruzando Marketing + Custos de Produção (CMV)
            const lucroRealMídia = faturamentoBruto - campanha.gasto - campanha.cmvTotalInsumos;

            return (
              <div key={campanha.id} className="grid grid-cols-12 p-4 items-center hover:bg-slate-50/50 transition-colors">
                {/* Nome e Status */}
                <div className="col-span-5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${campanha.status === 'Ativo' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                    <p className="font-bold text-slate-900 text-sm tracking-tight truncate">{campanha.nome}</p>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {campanha.cliques} cliques • {campanha.vendasGeradas} pedidos
                  </p>
                </div>

                {/* Gasto da Campanha */}
                <div className="col-span-2 text-center font-mono font-semibold text-sm text-slate-700">
                  R$ {campanha.gasto.toFixed(2)}
                </div>

                {/* CTR (Métrica do Anúncio) */}
                <div className="col-span-2 text-center font-mono font-semibold text-sm">
                  <span className={campanha.ctr > 2 ? 'text-emerald-600' : 'text-amber-600'}>
                    {campanha.ctr > 0 ? `${campanha.ctr.toFixed(1)}%` : '-'}
                  </span>
                </div>

                {/* Lucro Real com Botão de Ação Rápida */}
                <div className="col-span-3 flex flex-col items-end gap-1.5">
                  <span className={`font-mono font-black text-sm ${lucroRealMídia > 0 ? 'text-emerald-600' : lucroRealMídia < 0 ? 'text-red-600' : 'text-slate-400'}`}>
                    {lucroRealMídia > 0 ? `+ R$ ${lucroRealMídia.toFixed(2)}` : `R$ ${lucroRealMídia.toFixed(2)}`}
                  </span>
                  <button 
                    onClick={() => alternarStatusCampanha(campanha.id)}
                    className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-900 underline transition-colors"
                  >
                    {campanha.status === 'Ativo' ? 'Pausar' : 'Ativar'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
