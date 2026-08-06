import React from 'react';
import { Header } from './components/Header';
import { DeprivationCalculator } from './components/DeprivationCalculator';
import { ExternalLink, Globe } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F4F6F8] font-sans flex flex-col text-slate-900 selection:bg-[#4A6B82] selection:text-white">
      {/* Header */}
      <Header />

      {/* Main Container Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        <DeprivationCalculator />
      </main>

      {/* Footer with links to firadza.pl and odnowalab.pl */}
      <footer className="bg-[#1E2A34] text-slate-300 border-t-2 border-[#4A6B82] py-8 px-4 sm:px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="space-y-2 text-center md:text-left max-w-3xl">
            <p className="font-extrabold text-white text-sm flex items-center justify-center md:justify-start gap-2">
              <span className="w-2.5 h-2.5 bg-[#F4D03F] inline-block" />
              Symulator koncentracji problemów społecznych
            </p>
            <p className="text-slate-400 leading-relaxed">
              Symulator przedstawia kilka sposobów łączenia problemów społecznych, opisanych w dokumentach rewitalizacyjnych różnych samorządów. Jest narzędziem edukacyjnym i nie stanowi oficjalnego systemu żadnego urzędu.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="https://firadza.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#2C3E50] hover:bg-[#384E64] text-white rounded-none border border-[#4A6B82] transition-all font-bold hover:border-[#F4D03F]"
            >
              <Globe className="w-4 h-4 text-[#F4D03F]" />
              <span>firadza.pl</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href="https://waluty.firadza.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#2C3E50] hover:bg-[#384E64] text-white rounded-none border border-[#4A6B82] transition-all font-bold hover:border-[#F4D03F]"
            >
              <Globe className="w-4 h-4 text-[#F4D03F]" />
              <span>waluty.firadza.pl</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href="https://odnowalab.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#2C3E50] hover:bg-[#384E64] text-white rounded-none border border-[#4A6B82] transition-all font-bold hover:border-[#A3C1AD]"
            >
              <Globe className="w-4 h-4 text-[#A3C1AD]" />
              <span>odnowalab.pl</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

