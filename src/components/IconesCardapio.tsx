import React from 'react';

export function IconeCardapio({ id }: { id: string }) {
  switch (id) {
    case 'smash':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full bg-amber-50 p-2 text-amber-600">
          {/* Pão Superior */}
          <path d="M15,45 C15,20 85,20 85,45 Z" fill="#D97706" />
          {/* Alface */}
          <path d="M10,48 Q25,40 40,48 Q55,40 70,48 Q85,40 90,48" stroke="#16A34A" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Queijo */}
          <polygon points="12,50 88,50 80,60 50,55 20,60" fill="#FBBF24" />
          {/* Carne/Blend */}
          <rect x="12" y="56" width="76" height="12" rx="4" fill="#78350F" />
          {/* Bacon */}
          <path d="M20,53 Q35,47 50,53 Q65,47 80,53" stroke="#DC2626" strokeWidth="4" fill="none" />
          {/* Pão Inferior */}
          <rect x="15" y="70" width="70" height="12" rx="3" fill="#B45309" />
        </svg>
      );
    case 'cheddar':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full bg-amber-50 p-2">
          {/* Pão Superior */}
          <path d="M15,40 C15,15 85,15 85,40 Z" fill="#D97706" />
          {/* Carne 1 */}
          <rect x="12" y="44" width="76" height="10" rx="4" fill="#78350F" />
          {/* Cascata de Cheddar Derretido */}
          <path d="M10,48 Q30,55 45,75 Q55,85 65,52 Q85,55 90,48" fill="#F59E0B" />
          {/* Carne 2 */}
          <rect x="12" y="58" width="76" height="10" rx="4" fill="#78350F" />
          {/* Pão Inferior */}
          <rect x="15" y="72" width="70" height="12" rx="3" fill="#B45309" />
        </svg>
      );
    case 'fritas':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full bg-red-50 p-2">
          {/* Embalagem de Batata (Vermelha) */}
          <polygon points="25,50 75,50 68,90 32,90" fill="#DC2626" />
          {/* Batatas Palito (Amarelo) */}
          <rect x="30" y="20" width="6" height="40" rx="2" fill="#FBBF24" transform="rotate(-10 30 20)" />
          <rect x="40" y="15" width="6" height="45" rx="2" fill="#F59E0B" />
          <rect x="50" y="10" width="6" height="50" rx="2" fill="#FBBF24" />
          <rect x="60" y="22" width="6" height="38" rx="2" fill="#F59E0B" transform="rotate(15 60 22)" />
          <rect x="45" y="25" width="7" height="35" rx="2" fill="#FBBF24" transform="rotate(5 45 25)" />
          {/* Logo Suave na Embalagem */}
          <circle cx="50" cy="70" r="10" fill="#FBBF24" opacity="0.9" />
        </svg>
      );
    case 'refri':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full bg-red-50 p-2">
          {/* Corpo da Lata */}
          <rect x="30" y="20" width="40" height="65" rx="8" fill="#DC2626" />
          {/* Detalhes de Alumínio Superior/Inferior */}
          <ellipse cx="50" cy="20" rx="20" ry="4" fill="#94A3B8" />
          <ellipse cx="50" cy="85" rx="20" ry="4" fill="#64748B" />
          {/* Linha Curva Decorativa */}
          <path d="M30,45 Q50,60 70,45" stroke="#FFFFFF" strokeWidth="4" fill="none" opacity="0.8" />
          {/* Lacre da Lata */}
          <rect x="46" y="14" width="8" height="4" rx="1" fill="#64748B" />
        </svg>
      );
    case 'suco':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full bg-amber-50 p-2">
          {/* Copo Transparente/Cinza */}
          <polygon points="28,25 72,25 64,85 36,85" fill="#E2E8F0" opacity="0.8" stroke="#94A3B8" strokeWidth="2" />
          {/* Líquido do Suco (Laranja) */}
          <polygon points="30,38 70,38 64,83 36,83" fill="#F97316" />
          {/* Canudo */}
          <rect x="48" y="8" width="5" height="40" rx="1" fill="#3B82F6" transform="rotate(-20 48 8)" />
          {/* Rodela de Laranja na Borda */}
          <circle cx="70" cy="25" r="12" fill="#FBBF24" stroke="#F97316" strokeWidth="2" />
        </svg>
      );
    default:
      return null;
  }
}
