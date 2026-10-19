"use client";

import React from 'react';
import { CARDAPIO_MOCK } from '@/mocks/cardapio';
import { Button } from '@/components/ui/button';
import { IconeCardapio } from '@/components/IconesCardapio'; // 👈 Importa o renderizador vetorial
import { useParams, useSearchParams } from 'next/navigation';

export default function CardapioHome() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const nomeHamburgueria = (params.slug as string)
    .replace('-', ' ')
    .toUpperCase();

  const utmCampaign = searchParams.get('utm_campaign') || 'Organico (Direto)';

  return (
    <div className="bg-slate-100 min-h-screen font-sans flex justify-center items-start md:py-8">
      
      {/* Faixa Relevo Centralizada */}
      <div className="w-full max-w-md bg-white min-h-screen md:min-h-[850px] shadow-none md:shadow-2xl md:rounded-2xl border-none md:border border-slate-200 overflow-hidden flex flex-col relative">
        
        {/* Banner do E-commerce */}
        <div className="bg-amber-500 text-slate-950 p-6 shadow-sm text-center">
          <h1 className="text-xl font-black tracking-tight">{nomeHamburgueria} 🍔</h1>
          <p className="text-[11px] font-bold opacity-80 mt-0.5">Aberto • Entrega em 30-45 min</p>
          <div className="mt-2 inline-block bg-amber-600/30 px-2 py-0.5 rounded text-[10px] font-mono font-semibold">
            Origem: {utmCampaign}
          </div>
        </div>

        {/* Lista de Produtos */}
        <div className="p-4 space-y-6 flex-1 pb-28 overflow-y-auto">
          
          {/* 1. SEÇÃO DE HAMBÚRGUERES */}
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Hambúrgueres Artesanais</h2>
            <div className="space-y-3">
              {CARDAPIO_MOCK.filter(p => p.categoria === 'burgers').map((produto) => (
                <div key={produto.id} className="bg-white border border-slate-200/80 rounded-xl p-3 flex gap-3 shadow-sm hover:border-amber-400 transition-colors cursor-pointer">
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm tracking-tight">{produto.nome}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{produto.descricao}</p>
                    </div>
                    <p className="font-mono font-black text-amber-600 text-sm mt-2">R$ {produto.preco.toFixed(2)}</p>
                  </div>
                  {/* Container da Ilustração SVG */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                    <IconeCardapio id={produto.idImagem} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. SEÇÃO DE ACOMPANHAMENTOS */}
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Acompanhamentos</h2>
            <div className="space-y-3">
              {CARDAPIO_MOCK.filter(p => p.categoria === 'porcoes').map((produto) => (
                <div key={produto.id} className="bg-white border border-slate-200/80 rounded-xl p-3 flex gap-3 shadow-sm">
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm tracking-tight">{produto.nome}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{produto.descricao}</p>
                    </div>
                    <p className="font-mono font-black text-amber-600 text-sm mt-2">R$ {produto.preco.toFixed(2)}</p>
                  </div>
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                    <IconeCardapio id={produto.idImagem} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. SEÇÃO DE BEBIDAS (Nova Seção Adicionada!) */}
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Bebidas Geladas</h2>
            <div className="space-y-3">
              {CARDAPIO_MOCK.filter(p => p.categoria === 'bebidas').map((produto) => (
                <div key={produto.id} className="bg-white border border-slate-200/80 rounded-xl p-3 flex gap-3 shadow-sm hover:border-amber-400 transition-colors cursor-pointer">
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm tracking-tight">{produto.nome}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{produto.descricao}</p>
                    </div>
                    <p className="font-mono font-black text-amber-600 text-sm mt-2">R$ {produto.preco.toFixed(2)}</p>
                  </div>
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                    <IconeCardapio id={produto.idImagem} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Carrinho Flutuante Inferior */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-3 flex justify-center z-50">
          <div className="w-full flex justify-between items-center bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase">1 Item adicionado</span>
              <span className="text-sm font-mono font-black">R$ 29,90</span>
            </div>
            <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase h-9 px-4 rounded-lg">
              Ver Carrinho →
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
