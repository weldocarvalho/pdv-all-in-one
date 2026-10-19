"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const INSUMOS_MOCK = [
  { id: '1', nome: 'Pão Brioche', custoPorUnidade: 1.20, unidade: 'un' },
  { id: '2', nome: 'Blend de Carne 150g', custoPorUnidade: 0.03, unidade: 'g' }, 
  { id: '3', nome: 'Queijo Cheddar Fatiado', custoPorUnidade: 0.05, unidade: 'g' }, 
  { id: '4', nome: 'Bacon em Fatias', custoPorUnidade: 0.06, unidade: 'g' }, 
];

const PRODUTO_MOCK = {
  id: 'p1',
  nome: 'Smash Bacon Burger',
  precoVendaInicial: 29.90
};

export default function FichaTecnicaMock() {
  const [precoVenda, setPrecoVenda] = useState<number>(PRODUTO_MOCK.precoVendaInicial);
  const [ingredientesEscolhidos, setIngredientesEscolhidos] = useState([
    { insumoId: '1', quantidade: 1 },   
    { insumoId: '2', quantidade: 150 }, 
    { insumoId: '3', quantidade: 30 },  
    { insumoId: '4', quantidade: 20 },  
  ]);

  const handleQuantidadeChange = (insumoId: string, novaQuantidade: number) => {
    setIngredientesEscolhidos(prev =>
      prev.map(item => item.insumoId === insumoId ? { ...item, quantidade: novaQuantidade } : item)
    );
  };

  const custoTotalProducao = ingredientesEscolhidos.reduce((total, item) => {
    const insumoInfo = INSUMOS_MOCK.find(i => i.id === item.insumoId);
    if (!insumoInfo) return total;
    return total + (insumoInfo.custoPorUnidade * item.quantidade);
  }, 0);

  const margemBrutaEmDinheiro = precoVenda - custoTotalProducao;
  const porcentagemLucro = precoVenda > 0 ? (margemBrutaEmDinheiro / precoVenda) * 100 : 0;
  const cmvPorcentagem = precoVenda > 0 ? (custoTotalProducao / precoVenda) * 100 : 0;

  const temPrejuizo = margemBrutaEmDinheiro <= 0;

  return (
    /* 🎨 MUDANÇA: Fundo branco puro, borda suave e sombra elegante */
    <div className="max-w-4xl mx-auto p-6 bg-white border border-slate-200 rounded-xl text-slate-800 font-sans shadow-xl">
      
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-6 mb-6 gap-4">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Ficha Técnica</span>
          <h1 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">{PRODUTO_MOCK.nome}</h1>
        </div>
        {/* 🎨 MUDANÇA: Caixa de preço clara com borda cinza */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 w-full sm:w-auto">
          <label className="block text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Preço de Venda</label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-slate-400 text-sm font-medium">R$</span>
            <Input 
              type="number" 
              step="0.10"
              value={precoVenda} 
              onChange={(e) => setPrecoVenda(Number(e.target.value))}
              className="pl-9 bg-white font-bold text-slate-900 text-base border-slate-200 focus-visible:ring-amber-500 w-full sm:w-36 h-10 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Alerta Crítico (Visual mais limpo e visível em fundo claro) */}
      {temPrejuizo && (
        <div className="bg-red-50 border border-red-200 text-red-900 p-4 rounded-xl mb-6 flex items-start gap-3">
          <span className="text-xl mt-0.5">🚨</span>
          <div>
            <p className="font-bold text-sm text-red-700">Aviso Crítico: Alerta de Margem de Lucro!</p>
            <p className="text-xs text-red-600 mt-1 leading-relaxed">O custo atual dos insumos ultrapassou o valor de venda do hambúrguer. Aumente o preço de venda ou ajuste as quantidades.</p>
          </div>
        </div>
      )}

      {/* Lista de Insumos */}
      {/* 🎨 MUDANÇA: Estrutura em branco e cinza claro */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-8 shadow-sm">
        <div className="grid grid-cols-12 bg-slate-50 p-3.5 text-xs font-bold text-slate-500 tracking-wider uppercase border-b border-slate-200">
          <div className="col-span-6">Insumo Bruto</div>
          <div className="col-span-3 text-center">Quantidade</div>
          <div className="col-span-3 text-right">Custo Proporcional</div>
        </div>

        <div className="divide-y divide-slate-100">
          {ingredientesEscolhidos.map((item) => {
            const insumo = INSUMOS_MOCK.find(i => i.id === item.insumoId);
            if (!insumo) return null;
            const custoItem = insumo.custoPorUnidade * item.quantidade;

            return (
              <div key={item.insumoId} className="grid grid-cols-12 p-4 items-center hover:bg-slate-50/50 transition-colors">
                <div className="col-span-6">
                  <p className="font-bold text-slate-900 text-sm tracking-tight">{insumo.nome}</p>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">R$ {insumo.custoPorUnidade.toFixed(2)}/{insumo.unidade}</p>
                </div>
                <div className="col-span-3 flex justify-center items-center gap-2">
                  <Input 
                    type="number" 
                    value={item.quantidade}
                    onChange={(e) => handleQuantidadeChange(item.insumoId, Number(e.target.value))}
                    className="w-20 bg-white text-center font-semibold text-sm border-slate-200 focus-visible:ring-amber-500 h-9 shadow-sm"
                  />
                  <span className="text-xs text-slate-500 font-semibold uppercase w-6">{insumo.unidade}</span>
                </div>
                <div className="col-span-3 text-right font-mono font-bold text-slate-800 text-sm">
                  R$ {custoItem.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rodapé Dinâmico com Componentes Shadcn */}
      {/* 🎨 MUDANÇA: Fundo cinza bem claro para destacar os números pretos e laranjas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200 items-center">
        <div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Custo Total (CMV)</p>
          <p className="text-2xl font-mono font-black text-amber-600 mt-1">R$ {custoTotalProducao.toFixed(2)}</p>
          <p className="text-xs text-slate-400 font-medium mt-0.5">({cmvPorcentagem.toFixed(1)}% do preço)</p>
        </div>

        <div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Margem Bruta</p>
          <p className={`text-2xl font-mono font-black mt-1 ${temPrejuizo ? 'text-red-600' : 'text-emerald-600'}`}>
            R$ {margemBrutaEmDinheiro.toFixed(2)}
          </p>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Retorno por venda</p>
        </div>

        <div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Rentabilidade</p>
          <p className={`text-2xl font-mono font-black mt-1 ${porcentagemLucro > 60 ? 'text-emerald-600' : 'text-amber-600'}`}>
            {porcentagemLucro.toFixed(1)}%
          </p>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Margem percentual</p>
        </div>

        <div className="pt-2 md:pt-0">
          <Button 
            disabled={temPrejuizo}
            className={`w-full h-11 font-bold text-sm tracking-wide shadow-md transition-all uppercase border-none ${
              temPrejuizo 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-amber-500 hover:bg-amber-600 text-slate-950 active:scale-98 font-black'
            }`}
          >
            Salvar Receita
          </Button>
        </div>
      </div>
    </div>
  );
}
