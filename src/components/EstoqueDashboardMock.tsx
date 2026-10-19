"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

// Dados mockados representando o inventário bruto e os lotes na geladeira/dispensa
const ESTOQUE_MOCK = [
  {
    id: 'e1',
    nome: 'Pão Brioche',
    quantidadeAtual: 42,
    unidade: 'un',
    ritmoSaidaDiaria: 35, // Baseado nas vendas recentes do Meta Ads
    status: 'Critico', // Acaba em pouco mais de 24h
    loteVencimento: '10/07/2026',
    fornecedor: 'Panificadora Alvorada (WhatsApp)'
  },
  {
    id: 'e2',
    nome: 'Queijo Cheddar Fatiado',
    quantidadeAtual: 12000, // 12kg
    unidade: 'g',
    ritmoSaidaDiaria: 1500, // 1.5kg por dia
    status: 'Alerta', // Quantidade ok, mas o lote atual está vencendo muito rápido!
    loteVencimento: '05/07/2026', // Faltam 3 dias para vencer (considerando hoje 02/07/2026)
    fornecedor: 'Laticínios Central'
  },
  {
    id: 'e3',
    nome: 'Blend de Carne 150g',
    quantidadeAtual: 180,
    unidade: 'un',
    ritmoSaidaDiaria: 40,
    status: 'Saudavel', // Dura 4.5 dias de operação normal
    loteVencimento: '14/07/2026',
    fornecedor: 'Frigorífico Premium'
  }
];

export default function EstoqueDashboardMock() {
  const [estoque, setEstoque] = useState(ESTOQUE_MOCK);
  const [mensagemEnviada, setMensagemEnviada] = useState<string | null>(null);

  // Simulação da Feature 2.3: Disparo de mensagem formatada para o fornecedor
  const enviarPedidoWhatsApp = (insumoNome: string, fornecedor: string) => {
    setMensagemEnviada(insumoNome);
    setTimeout(() => setMensagemEnviada(null), 4000); // Remove o feedback visual após 4s
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-slate-200 rounded-xl text-slate-800 font-sans shadow-xl mt-8">
      
      {/* Cabeçalho do Módulo */}
      <div className="border-b border-slate-100 pb-4 mb-6">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Módulo de Suprimentos</span>
        <h1 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">Estoque Reverso & Validades</h1>
        <p className="text-xs text-slate-400 mt-1">Baixa automática baseada nas vendas confirmadas do seu cardápio.</p>
      </div>

      {/* ALERTAS INTELIGENTES DE ESTOQUE (Previsão de Ruína + Desperdício) */}
      <div className="space-y-4 mb-8">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Alertas de Operação</h2>

        {/* Alerta de Ruína: Falta de Insumo para queimar a demanda dos anúncios */}
        {estoque.some(e => e.status === 'Critico') && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3">
            <span className="text-lg">🔴</span>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-red-800">Risco de Ruptura de Estoque Imediata!</h3>
              <p className="text-xs text-red-700 mt-0.5 leading-relaxed">
                Seu estoque de **Pão Brioche** (42 un) vai zerar em **1.2 dias** baseado no ritmo de vendas atual impulsionado pelos seus anúncios ativos no Instagram.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <Button 
                  onClick={() => enviarPedidoWhatsApp('Pão Brioche', 'Panificadora Alvorada')}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs h-8 px-3 font-bold"
                >
                  {mensagemEnviada === 'Pão Brioche' ? '✓ Texto enviado ao WhatsApp!' : 'Pedir +100 un ao Fornecedor'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Alerta de Validade Próxima (Risco de Perda de Insumo/Dinheiro) */}
        {estoque.some(e => e.status === 'Alerta') && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
            <span className="text-lg">⚠️</span>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-amber-800">Insumo Próximo do Vencimento!</h3>
              <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                Você tem **12kg de Queijo Cheddar** que vencem em **3 dias** (Lote: 05/07/2026). No ritmo atual de vendas, você perderá cerca de 7.5kg deste insumo por falta de saída.
              </p>
              <div className="mt-3 flex gap-2">
                <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs h-8 px-3 font-black uppercase">
                  Criar Combo Relâmpago (Queimar Estoque)
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* LISTA GERAL DE INVENTÁRIO DO DELIVERY */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-12 bg-slate-50 p-3.5 text-xs font-bold text-slate-500 tracking-wider uppercase border-b border-slate-200">
          <div className="col-span-5">Insumo</div>
          <div className="col-span-3 text-center">Volume em Estoque</div>
          <div className="col-span-2 text-center">Previsão de Duração</div>
          <div className="col-span-2 text-right">Vencimento Lote</div>
        </div>

        <div className="divide-y divide-slate-100">
          {estoque.map((item) => {
            // Cálculo dinâmico do Burn-Rate (Dias restantes de estoque)
            const diasRestantes = item.quantidadeAtual / item.ritmoSaidaDiaria;

            return (
              <div key={item.id} className="grid grid-cols-12 p-4 items-center hover:bg-slate-50/50 transition-colors">
                
                {/* Nome e Fornecedor */}
                <div className="col-span-5">
                  <p className="font-bold text-slate-900 text-sm tracking-tight">{item.nome}</p>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{item.fornecedor}</p>
                </div>

                {/* Quantidade Formatada */}
                <div className="col-span-3 text-center font-mono font-bold text-sm text-slate-800">
                  {item.unidade === 'g' 
                    ? `${(item.quantidadeAtual / 1000).toFixed(1)} kg` 
                    : `${item.quantidadeAtual} ${item.unidade}`}
                </div>

                {/* Status/Previsão de Duração do Insumo */}
                <div className="col-span-2 text-center">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
                    item.status === 'Critico' ? 'bg-red-100 text-red-700' :
                    item.status === 'Alerta' ? 'bg-amber-100 text-amber-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {diasRestantes.toFixed(1)} dias
                  </span>
                </div>

                {/* Data de Vencimento do Lote */}
                <div className="col-span-2 text-right font-mono text-xs font-medium text-slate-500">
                  {item.loteVencimento}
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
