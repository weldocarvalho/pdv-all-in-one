"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useParams, useRouter } from 'next/navigation';

export default function CheckoutPixPage() {
  const params = useParams();
  const router = useRouter();
  const nomeHamburgueria = (params.slug as string).replace('-', ' ').toUpperCase();

  // Estados do formulário de entrega
  const [etapa, setEtapa] = useState<'dados' | 'pix'>('dados');
  const [nome, setNome] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');

  // Dados do pedido mockado vindo do carrinho
  const totalPedido = 35.90; // Ex: Hambúrguer R$ 29,90 + Entrega R$ 6,00
  const codigoPixCopiaCola = "00020101021226750014br.gov.bcb.pix25530324burgeros2026production540535.905802BR5920BurgerOSHamburgueria6009SaoPaulo62070503001";

  const [copiado, setCopiado] = useState(false);

  const handleCopiarPix = () => {
    navigator.clipboard.writeText(codigoPixCopiaCola);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 3000);
  };

  const handleFinalizarDados = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome && rua && numero && bairro) {
      setEtapa('pix');
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen font-sans flex justify-center items-start md:py-8">
      
      {/* Faixa Relevo Centralizada (Identidade do App) */}
      <div className="w-full max-w-md bg-white min-h-screen md:min-h-[850px] shadow-none md:shadow-2xl md:rounded-2xl border-none md:border border-slate-200 overflow-hidden flex flex-col relative">
        
        {/* Header de Segurança */}
        <div className="bg-slate-900 text-white p-4 shadow-sm flex items-center gap-3">
          <button 
            onClick={() => etapa === 'pix' ? setEtapa('dados') : router.push(`/${params.slug}`)}
            className="text-slate-400 hover:text-white font-bold text-sm"
          >
            ← Voltar
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-sm font-black tracking-tight uppercase">Checkout Seguro</h1>
            <p className="text-[10px] text-slate-400 font-medium">{nomeHamburgueria}</p>
          </div>
          <span className="text-xs">🔒</span>
        </div>

        {/* CONTEÚDO ETAPA 1: Formulário de Entrega */}
        {etapa === 'dados' && (
          <form onSubmit={handleFinalizarDados} className="p-5 space-y-5 flex-1 overflow-y-auto">
            <div className="border-b border-slate-100 pb-2">
              <h2 className="text-base font-black text-slate-900 tracking-tight">Quem vai receber?</h2>
              <p className="text-xs text-slate-400">Insira seus dados para o motoboy te encontrar.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Nome Completo</label>
              <Input 
                required 
                type="text" 
                placeholder="Ex: João Silva" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="border-slate-200 focus-visible:ring-amber-500"
              />
            </div>

            <div className="border-b border-slate-100 pb-2 pt-2">
              <h2 className="text-base font-black text-slate-900 tracking-tight">Endereço de Entrega</h2>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Rua / Av.</label>
                <Input 
                  required 
                  type="text" 
                  placeholder="Ex: Av. Central" 
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                  className="border-slate-200 focus-visible:ring-amber-500"
                />
              </div>
              <div className="col-span-1 space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Número</label>
                <Input 
                  required 
                  type="text" 
                  placeholder="123" 
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  className="border-slate-200 focus-visible:ring-amber-500 text-center"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Bairro</label>
              <Input 
                required 
                type="text" 
                placeholder="Ex: Centro" 
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className="border-slate-200 focus-visible:ring-amber-500"
              />
            </div>

            {/* Resumo de Valores */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 font-medium text-xs text-slate-600 space-y-2 mt-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono">R$ 29,90</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de Entrega</span>
                <span className="font-mono">R$ 6,00</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-black text-slate-900">
                <span>Total a Pagar</span>
                <span className="font-mono text-amber-600">R$ {totalPedido.toFixed(2)}</span>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black uppercase text-xs tracking-wider rounded-xl shadow-md">
              Ir para o Pagamento (PIX) →
            </Button>
          </form>
        )}

        {/* CONTEÚDO ETAPA 2: Tela do PIX */}
        {etapa === 'pix' && (
          <div className="p-5 space-y-6 flex-1 text-center overflow-y-auto flex flex-col justify-center items-center">
            <div className="w-full border-b border-slate-100 pb-3">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2 py-0.5 rounded">Pedido Gerado com Sucesso</span>
              <h2 className="text-lg font-black text-slate-900 tracking-tight mt-2">Aguardando Pagamento</h2>
              <p className="text-xs text-slate-400 mt-0.5">Pague via PIX para enviar o pedido direto para a cozinha.</p>
            </div>

            {/* Simulação Visual do QR Code */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center w-48 h-48 relative">
              {/* Vetor simples imitando um QR Code de alta fidelidade */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                <rect x="5" y="5" width="25" height="25" stroke="currentColor" strokeWidth="4" fill="none" />
                <rect x="12" y="12" width="11" height="11" fill="currentColor" />
                <rect x="70" y="5" width="25" height="25" stroke="currentColor" strokeWidth="4" fill="none" />
                <rect x="77" y="12" width="11" height="11" fill="currentColor" />
                <rect x="5" y="70" width="25" height="25" stroke="currentColor" strokeWidth="4" fill="none" />
                <rect x="12" y="77" width="11" height="11" fill="currentColor" />
                <rect x="40" y="40" width="20" height="20" fill="currentColor" />
                <path d="M40,10 H60 M10,40 V60 M70,40 H90 M40,80 H60 M80,70 V90" stroke="currentColor" strokeWidth="4" />
              </svg>
            </div>

            {/* Bloco Copia e Cola */}
            <div className="w-full space-y-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Ou pague pelo Copia e Cola</p>
              <div className="flex gap-2 w-full bg-slate-50 border border-slate-200 rounded-xl p-2 items-center">
                <p className="text-[10px] font-mono text-slate-400 truncate text-left flex-1 pl-2">
                  {codigoPixCopiaCola}
                </p>
                <Button 
                  onClick={handleCopiarPix}
                  className={`text-xs h-9 px-4 font-bold shadow-sm ${copiado ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
                >
                  {copiado ? 'Copiado! ✓' : 'Copiar Código'}
                </Button>
              </div>
            </div>

            {/* Valor Destacado */}
            <div className="bg-amber-500/10 border border-amber-200 px-6 py-3 rounded-xl font-mono">
              <span className="text-[10px] uppercase font-bold text-amber-700 block">Valor Exato do PIX</span>
              <span className="text-xl font-black text-slate-900">R$ {totalPedido.toFixed(2)}</span>
            </div>

            <p className="text-[10px] text-slate-400 leading-relaxed max-w-xs">
              Assim que o pagamento for confirmado, esta tela atualizará sozinha e o painel da hamburgueria acusará a baixa dos insumos em tempo real.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
