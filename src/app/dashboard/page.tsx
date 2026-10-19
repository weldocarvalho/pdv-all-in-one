import FichaTecnicaMock from "@/components/FichaTecnicaMock";
import MetaMetricsSection from "@/components/MetaMetricsSection"; // 👈 Importe a nova seção
import MarketingDashboardMock from "@/components/MarketingDashboardMock";
import EstoqueDashboardMock from "@/components/EstoqueDashboardMock";

export default function DashboardPage() {
  return (
    <main className="bg-slate-50 min-h-screen py-10 px-4">
      
      {/* Título do Sistema */}
      <div className="max-w-4xl mx-auto mb-6 text-center sm:text-left">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Burger OS 🍔</h1>
        <p className="text-sm text-slate-500 mt-1">O motor financeiro, de marketing e operacional da sua hamburgueria.</p>
      </div>

      {/* Módulo 1: Ficha Técnica */}
      <FichaTecnicaMock />

      {/* Módulo Novo Isolado: Gráficos e Dados brutos de entrega da Meta */}
      <MetaMetricsSection />

      {/* Módulo 2: O Diagnóstico Inteligente Cruzado */}
      <MarketingDashboardMock />

      {/* Módulo 3: Estoque Reverso */}
      <EstoqueDashboardMock />
    </main>
  );
}
