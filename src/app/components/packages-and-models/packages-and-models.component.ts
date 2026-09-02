import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructionDataService } from '../../services/construction-data.service';

interface ConstructionPackage {
  id: string;
  name: string;
  badge?: string;
  tier: string;
  ratePerSqFt: number;
  tagline: string;
  popular?: boolean;
  structure: string;
  flooring: string;
  bathrooms: string;
  doorsWindows: string;
  paint: string;
  electrical: string;
  highlights: string[];
}

interface SpecRow {
  category: string;
  silver: string;
  gold: string;
  diamond: string;
  platinum: string;
}

@Component({
  selector: 'app-packages-and-models',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="packages" class="py-7 sm:py-9 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
      
      <!-- 1. TRUSTED MATERIAL BRANDS CAROUSEL/GRID (Buildhood Reference) -->
      <div class="mb-8 pb-6 border-b border-[#F8FAFC]/10">
        <p class="text-center text-xs font-mono tracking-[0.24em] uppercase text-[#D4AF37] mb-4 font-semibold">
          100% Guaranteed Genuine Materials &middot; We Build Exclusively With Tier-1 Brands
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3 text-center">
          @for (brand of materialBrands; track brand.name) {
            <div class="p-3 rounded-xl bg-[#0B1019] border border-[#D4AF37]/20 hover:border-[#38BDF8]/60 transition-all group flex flex-col items-center justify-center shadow">
              <span class="text-xs font-mono font-bold text-[#F8FAFC] group-hover:text-[#D4AF37] transition-colors block">
                {{ brand.name }}
              </span>
              <span class="text-[0.6rem] font-mono text-[#F8FAFC]/50 uppercase tracking-wider block mt-0.5">
                {{ brand.category }}
              </span>
            </div>
          }
        </div>
      </div>

      <!-- 2. SECTION HEADER: PACKAGES -->
      <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#38BDF8] mb-2">
            <span class="w-6 h-[1px] bg-[#1D4ED8]"></span>
            <span>Turnkey Construction Packages</span>
          </div>

          <h2 class="text-3xl sm:text-4xl md:text-5xl font-display font-light text-[#F8FAFC] leading-tight max-w-2xl mb-2">
            Standardized Pricing. <span class="italic text-[#D4AF37]">Bespoke Craftsmanship</span>.
          </h2>

          <p class="text-sm sm:text-base text-[#F8FAFC]/75 font-light max-w-2xl">
            Clear turnkey rates for Gurugram plots. Includes soil testing, DTCP municipal sanctions, Vastu planning, and a 10-year warranty.
          </p>
        </div>

        <!-- Navigation Tabs: Packages vs Contract Models vs Spec Comparison -->
        <div class="flex flex-wrap items-center gap-2 bg-[#0B1019] p-1.5 rounded-2xl sm:rounded-full border border-[#D4AF37]/30 shadow-lg">
          <button 
            (click)="selectedTab.set('packages')"
            class="px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
            [class.bg-gradient-to-r]="selectedTab() === 'packages'"
            [class.from-[#D4AF37]]="selectedTab() === 'packages'"
            [class.to-[#C4971A]]="selectedTab() === 'packages'"
            [class.text-[#070A0F]]="selectedTab() === 'packages'"
            [class.font-bold]="selectedTab() === 'packages'"
            [class.shadow-[0_0_15px_rgba(212,175,55,0.3)]]="selectedTab() === 'packages'"
            [class.text-[#F8FAFC]/70]="selectedTab() !== 'packages'"
          >
            4 Packages
          </button>

          <button 
            (click)="selectedTab.set('models')"
            class="px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
            [class.bg-gradient-to-r]="selectedTab() === 'models'"
            [class.from-[#D4AF37]]="selectedTab() === 'models'"
            [class.to-[#C4971A]]="selectedTab() === 'models'"
            [class.text-[#070A0F]]="selectedTab() === 'models'"
            [class.font-bold]="selectedTab() === 'models'"
            [class.shadow-[0_0_15px_rgba(212,175,55,0.3)]]="selectedTab() === 'models'"
            [class.text-[#F8FAFC]/70]="selectedTab() !== 'models'"
          >
            Cost-Plus vs Lump-Sum
          </button>

          <button 
            (click)="selectedTab.set('compare')"
            class="px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
            [class.bg-gradient-to-r]="selectedTab() === 'compare'"
            [class.from-[#D4AF37]]="selectedTab() === 'compare'"
            [class.to-[#C4971A]]="selectedTab() === 'compare'"
            [class.text-[#070A0F]]="selectedTab() === 'compare'"
            [class.font-bold]="selectedTab() === 'compare'"
            [class.shadow-[0_0_15px_rgba(212,175,55,0.3)]]="selectedTab() === 'compare'"
            [class.text-[#F8FAFC]/70]="selectedTab() !== 'compare'"
          >
            Compare Specs
          </button>
        </div>
      </div>

      <!-- VIEW A: 4 PACKAGES CARDS -->
      @if (selectedTab() === 'packages') {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          @for (pkg of packages; track pkg.id) {
            <div 
              class="glass-card rounded-2xl p-6 flex flex-col justify-between border transition-all duration-300 relative group overflow-hidden bg-[#0B1019]"
              [class.border-[#D4AF37]]="pkg.popular"
              [class.shadow-2xl]="pkg.popular"
              [class.shadow-[#38BDF8]/20]="pkg.popular"
              [class.border-[#D4AF37]/25]="!pkg.popular"
            >
              @if (pkg.popular) {
                <div class="absolute top-0 right-0 bg-gradient-to-r from-[#D4AF37] to-[#C4971A] text-[#070A0F] font-mono font-bold text-[0.62rem] uppercase tracking-widest px-3 py-1 rounded-bl-xl shadow">
                  Most Popular
                </div>
              }

              <div>
                <span class="text-[0.65rem] font-mono tracking-widest uppercase text-[#38BDF8] font-semibold block">
                  {{ pkg.tier }}
                </span>
                <h3 class="font-display text-2xl text-[#F8FAFC] font-medium mt-1">
                  {{ pkg.name }}
                </h3>
                <p class="text-xs text-[#F8FAFC]/60 font-light mt-1">
                  {{ pkg.tagline }}
                </p>

                <!-- Rate Tag -->
                <div class="mt-4 p-3 rounded-xl bg-[#070A0F] border border-[#D4AF37]/20 flex items-baseline gap-1.5">
                  <span class="text-xs font-mono text-[#D4AF37]">Starting from</span>
                  <span class="text-2xl font-mono font-bold text-[#F8FAFC]">₹{{ pkg.ratePerSqFt | number }}</span>
                  <span class="text-[0.68rem] font-mono text-[#F8FAFC]/60">/sq.ft*</span>
                </div>

                <!-- Specs List -->
                <div class="mt-5 space-y-2.5 text-xs font-mono text-[#F8FAFC]/80">
                  <div class="flex items-start gap-2">
                    <span class="text-[#D4AF37] mt-0.5">&bull;</span>
                    <div><strong class="text-[#F8FAFC]">Structure:</strong> {{ pkg.structure }}</div>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="text-[#D4AF37] mt-0.5">&bull;</span>
                    <div><strong class="text-[#F8FAFC]">Flooring:</strong> {{ pkg.flooring }}</div>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="text-[#D4AF37] mt-0.5">&bull;</span>
                    <div><strong class="text-[#F8FAFC]">Sanitary:</strong> {{ pkg.bathrooms }}</div>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="text-[#D4AF37] mt-0.5">&bull;</span>
                    <div><strong class="text-[#F8FAFC]">Windows:</strong> {{ pkg.doorsWindows }}</div>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="text-[#D4AF37] mt-0.5">&bull;</span>
                    <div><strong class="text-[#F8FAFC]">Paints:</strong> {{ pkg.paint }}</div>
                  </div>
                </div>
              </div>

              <!-- Button CTA -->
              <div class="mt-6 pt-4 border-t border-[#F8FAFC]/10">
                <button 
                  (click)="inquirePackage(pkg.name, pkg.ratePerSqFt)"
                  class="w-full py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
                  [class.bg-gradient-to-r]="pkg.popular"
                  [class.from-[#1D4ED8]]="pkg.popular"
                  [class.to-[#2563EB]]="pkg.popular"
                  [class.hover:from-[#1E40AF]]="pkg.popular"
                  [class.hover:to-[#1D4ED8]]="pkg.popular"
                  [class.text-white]="pkg.popular"
                  [class.shadow-lg]="pkg.popular"
                  [class.shadow-[#1D4ED8]/30]="pkg.popular"
                  [class.border]="!pkg.popular"
                  [class.border-[#D4AF37]/40]="!pkg.popular"
                  [class.text-[#D4AF37]]="!pkg.popular"
                  [class.hover:bg-[#D4AF37]]="!pkg.popular"
                  [class.hover:text-[#070A0F]]="!pkg.popular"
                >
                  <span>Select {{ pkg.name }}</span>
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </button>
              </div>
            </div>
          }
        </div>
      }

      <!-- VIEW B: DETAILED SPECIFICATIONS COMPARISON TABLE (Buildhood Compare Matrix) -->
      @if (selectedTab() === 'compare') {
        <div class="glass-card rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/35 overflow-x-auto bg-[#0A0A08]">
          <div class="min-w-[760px]">
            <div class="mb-4 pb-4 border-b border-[#F7F4EE]/10 flex items-center justify-between">
              <div>
                <h3 class="font-display text-2xl text-[#F7F4EE]">Side-by-Side Specification Benchmark</h3>
                <p class="text-xs font-mono text-[#F7F4EE]/60 mt-1">Calibrated to 2026 Haryana HSVP & DTCP Residential Norms</p>
              </div>
              <span class="text-xs font-mono text-[#D4AF37] px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                Guaranteed M-30 Batching & Fe-550D
              </span>
            </div>

            <table class="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr class="border-b border-[#F7F4EE]/15 text-[#D4AF37] uppercase tracking-wider">
                  <th class="py-3 px-4 w-1/5">Specification Area</th>
                  <th class="py-3 px-3 w-1/5">Silver (₹1,850/sft)</th>
                  <th class="py-3 px-3 w-1/5">Gold (₹2,150/sft)</th>
                  <th class="py-3 px-3 w-1/5 bg-[#D4AF37]/10 text-white font-bold rounded-t-lg">Diamond (₹2,750/sft)</th>
                  <th class="py-3 px-3 w-1/5">Platinum (₹3,600+/sft)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#F7F4EE]/5 text-[#F7F4EE]/80">
                @for (row of specMatrix; track row.category) {
                  <tr class="hover:bg-[#161410] transition-colors">
                    <td class="py-3.5 px-4 font-semibold text-[#F7F4EE]">{{ row.category }}</td>
                    <td class="py-3.5 px-3 text-[#F7F4EE]/70">{{ row.silver }}</td>
                    <td class="py-3.5 px-3 text-[#F7F4EE]/80">{{ row.gold }}</td>
                    <td class="py-3.5 px-3 bg-[#D4AF37]/5 text-white font-medium">{{ row.diamond }}</td>
                    <td class="py-3.5 px-3 text-[#D4AF37]">{{ row.platinum }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }

      <!-- VIEW C: CONTRACT MODELS (Buildhood Cost-Plus vs Lump-Sum Model) -->
      @if (selectedTab() === 'models') {
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <!-- Cost-Plus Contract Card (Recommended) -->
          <div class="glass-card rounded-2xl p-7 border-2 border-[#D4AF37] relative overflow-hidden bg-gradient-to-b from-[#14120D] to-[#0A0A08]">
            <div class="flex items-center justify-between mb-4">
              <div>
                <span class="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-semibold">Model 01 &middot; Recommended</span>
                <h3 class="text-2xl font-display text-[#F7F4EE] mt-1">Cost-Plus Management Contract</h3>
              </div>
              <span class="px-3 py-1 rounded-full bg-[#D4AF37] text-[#080807] font-mono font-bold text-xs uppercase">
                Save Up to 10%
              </span>
            </div>

            <p class="text-sm text-[#F7F4EE]/80 font-light leading-relaxed mb-6">
              Pay actual wholesale material costs with weekly GST invoices and weighbridge slips, plus a transparent fixed management fee. Save up to 10% on steel, cement, and marble.
            </p>

            <div class="space-y-3 font-mono text-xs text-[#F7F4EE]/85 mb-8">
              <div class="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#0E0E0C]">
                <span class="text-[#6B7A5C] font-bold">✓</span>
                <span>100% Invoice Transparency &mdash; Zero Contractor Markups</span>
              </div>
              <div class="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#0E0E0C]">
                <span class="text-[#6B7A5C] font-bold">✓</span>
                <span>Wholesale Distributor Rates for Steel, Cement & Italian Marble</span>
              </div>
              <div class="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#0E0E0C]">
                <span class="text-[#6B7A5C] font-bold">✓</span>
                <span>Complete Flexibility to Upgrade Materials Mid-Way</span>
              </div>
              <div class="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#0E0E0C]">
                <span class="text-[#6B7A5C] font-bold">✓</span>
                <span>Weekly Physical Audit & Photographic Progress Ledger</span>
              </div>
            </div>

            <button 
              (click)="dataService.openConsultationModal('Cost-Plus Model Inquiry')"
              class="w-full py-3 rounded-full bg-[#B5562C] hover:bg-[#97431F] text-[#F7F4EE] font-mono text-xs font-semibold uppercase tracking-wider shadow-lg shadow-[#B5562C]/30 cursor-pointer"
            >
              Opt for Cost-Plus Model &rarr;
            </button>
          </div>

          <!-- Lump-Sum Fixed Price Contract Card -->
          <div class="glass-card rounded-2xl p-7 border border-[#F7F4EE]/15 relative overflow-hidden bg-[#0A0A08]">
            <div class="flex items-center justify-between mb-4">
              <div>
                <span class="text-xs font-mono uppercase tracking-widest text-[#F7F4EE]/50">Model 02 &middot; Fixed Budget</span>
                <h3 class="text-2xl font-display text-[#F7F4EE] mt-1">Lump-Sum BOQ Price-Lock</h3>
              </div>
              <span class="px-3 py-1 rounded-full bg-[#0E0E0C] text-[#F7F4EE]/70 font-mono text-xs uppercase border border-[#F7F4EE]/20">
                Guaranteed Fixed
              </span>
            </div>

            <p class="text-sm text-[#F7F4EE]/80 font-light leading-relaxed mb-6">
              A fixed, all-inclusive price locked before excavation. We absorb all material price fluctuations with guaranteed zero budget escalation.
            </p>

            <div class="space-y-3 font-mono text-xs text-[#F7F4EE]/85 mb-8">
              <div class="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#0E0E0C]">
                <span class="text-[#D4AF37] font-bold">✓</span>
                <span>Strictly Guaranteed Zero Cost Escalations</span>
              </div>
              <div class="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#0E0E0C]">
                <span class="text-[#D4AF37] font-bold">✓</span>
                <span>Comprehensive 80-Page BOQ Spec Lock Prior to Excavation</span>
              </div>
              <div class="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#0E0E0C]">
                <span class="text-[#D4AF37] font-bold">✓</span>
                <span>Fixed Milestone-Linked Payment Tranches</span>
              </div>
              <div class="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#0E0E0C]">
                <span class="text-[#D4AF37] font-bold">✓</span>
                <span>Ideal for Bank Home Construction Loan Approvals</span>
              </div>
            </div>

            <button 
              (click)="dataService.openConsultationModal('Lump-Sum BOQ Inquiry')"
              class="w-full py-3 rounded-full border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#D4AF37] font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Opt for Lump-Sum Contract &rarr;
            </button>
          </div>

        </div>
      }

      <!-- 3. THE KRISHNA ADVANTAGE: 4 PILLARS (Buildhood's "Why Choose Us" Architecture) -->
      <div class="mt-8 pt-6 border-t border-[#F8FAFC]/10">
        <div class="text-center max-w-xl mx-auto mb-6">
          <span class="text-xs font-mono uppercase tracking-[0.2em] text-[#D97746]">Institutional Trust</span>
          <h3 class="text-2xl sm:text-3xl font-display text-[#F7F4EE] mt-1">The Krishna Construction Advantage</h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-6 rounded-2xl bg-[#0E0E0C] border border-[#F7F4EE]/10 group hover:border-[#D4AF37]/40 transition-all">
            <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h4 class="font-display text-lg text-[#F7F4EE] mb-2">100% Invoice Transparency</h4>
            <p class="text-xs text-[#F7F4EE]/65 font-light leading-relaxed m-0">
              No inflated margins. Every weighbridge slip, GST bill, and steel test certificate is verified and handed directly to you weekly.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-[#0E0E0C] border border-[#F7F4EE]/10 group hover:border-[#D4AF37]/40 transition-all">
            <div class="w-12 h-12 rounded-xl bg-[#B5562C]/20 border border-[#B5562C]/40 flex items-center justify-center text-[#D97746] mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h4 class="font-display text-lg text-[#F7F4EE] mb-2">Save Up to 10% on Cost</h4>
            <p class="text-xs text-[#F7F4EE]/65 font-light leading-relaxed m-0">
              Our direct institutional alliances with UltraTech and Tata Tiscon distributors pass bulk pricing savings directly into your pocket.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-[#0E0E0C] border border-[#F7F4EE]/10 group hover:border-[#D4AF37]/40 transition-all">
            <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <h4 class="font-display text-lg text-[#F7F4EE] mb-2">Only Tier-1 Brands</h4>
            <p class="text-xs text-[#F7F4EE]/65 font-light leading-relaxed m-0">
              Strictly zero duplicate or B-grade materials. Certified testing for sand silt content, cube crush tests, and rebar yield strength.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-[#0E0E0C] border border-[#F7F4EE]/10 group hover:border-[#D4AF37]/40 transition-all">
            <div class="w-12 h-12 rounded-xl bg-[#6B7A5C]/20 border border-[#6B7A5C]/40 flex items-center justify-center text-[#6B7A5C] mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h4 class="font-display text-lg text-[#F7F4EE] mb-2">On-Time Handover Guarantee</h4>
            <p class="text-xs text-[#F7F4EE]/65 font-light leading-relaxed m-0">
              Daily on-site supervision by qualified civil engineers and milestone penalty clauses protecting your committed move-in date.
            </p>
          </div>
        </div>
      </div>

      <!-- 4. HOW IT WORKS: 4-STEP TIMELINE (Buildhood Exact Methodology) -->
      <div class="mt-8 pt-6 border-t border-[#F8FAFC]/10">
        <div class="text-center max-w-xl mx-auto mb-6">
          <span class="text-xs font-mono uppercase tracking-[0.2em] text-[#38BDF8]">Execution Protocol</span>
          <h3 class="text-2xl sm:text-3xl font-display text-[#F8FAFC] mt-1">From Raw Plot to Griha Pravesh in 4 Steps</h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-6 rounded-2xl bg-[#0E0E0C] border border-[#F7F4EE]/10 relative group">
            <span class="text-3xl font-display text-[#D4AF37] font-light">01</span>
            <h4 class="font-display text-lg text-[#F7F4EE] mt-2 mb-1">Plot Survey & Vastu Soil Test</h4>
            <p class="text-xs text-[#F7F4EE]/65 font-light leading-relaxed">
              Physical boundary contour survey, cardinal orientation alignment, and borewell bearing test at your Gurugram plot.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-[#0E0E0C] border border-[#F7F4EE]/10 relative group">
            <span class="text-3xl font-display text-[#D4AF37] font-light">02</span>
            <h4 class="font-display text-lg text-[#F7F4EE] mt-2 mb-1">3D Design & Sanction</h4>
            <p class="text-xs text-[#F7F4EE]/65 font-light leading-relaxed">
              2D floor plans, 3D photorealistic elevations, MEP drawings, and municipal sanctioning under Haryana building bye-laws.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-[#0E0E0C] border border-[#F7F4EE]/10 relative group">
            <span class="text-3xl font-display text-[#D4AF37] font-light">03</span>
            <h4 class="font-display text-lg text-[#F7F4EE] mt-2 mb-1">Milestone Construction</h4>
            <p class="text-xs text-[#F7F4EE]/65 font-light leading-relaxed">
              Fe-550D TMT casting, daily site engineer presence, and live WhatsApp progress reporting directly from Naveen Sharma's team.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-[#0E0E0C] border border-[#F7F4EE]/10 relative group">
            <span class="text-3xl font-display text-[#D4AF37] font-light">04</span>
            <h4 class="font-display text-lg text-[#F7F4EE] mt-2 mb-1">Handover & 10-Yr Warranty</h4>
            <p class="text-xs text-[#F7F4EE]/65 font-light leading-relaxed">
              Zero-punchlist Griha Pravesh handover, complete as-built documentation, and 10-year structural warranty certificate.
            </p>
          </div>
        </div>
      </div>

    </section>
  `
})
export class PackagesAndModelsComponent {
  readonly dataService = inject(ConstructionDataService);
  readonly selectedTab = signal<'packages' | 'models' | 'compare'>('packages');

  readonly materialBrands = [
    { name: 'UltraTech', category: 'Cement' },
    { name: 'Tata Tiscon', category: 'TMT Steel' },
    { name: 'JSW Steel', category: 'Rebars' },
    { name: 'Asian Paints', category: 'Royale Luxury' },
    { name: 'Jaquar', category: 'Sanitary' },
    { name: 'Kohler', category: 'Bath Fittings' },
    { name: 'Havells', category: 'Electrical' },
    { name: 'Kajaria', category: 'Ceramics' },
    { name: 'Supreme', category: 'Pipes & MEP' },
    { name: 'Dr. Fixit', category: 'Waterproofing' }
  ];

  readonly packages: ConstructionPackage[] = [
    {
      id: 'silver',
      name: 'Silver Essential',
      tier: 'Standard Turnkey',
      ratePerSqFt: 1850,
      tagline: 'High quality essentials for investment builder floors',
      structure: 'Fe-500D TMT, M-25 Grade RMC',
      flooring: 'Vitrified tiles (₹65/sq.ft allowance)',
      bathrooms: 'Cera / Hindware sanitaryware & chrome fittings',
      doorsWindows: 'Flush doors with Teak veneer & UPVC frames',
      paint: 'Asian Paints Tractor Emulsion internal',
      electrical: 'Anchor Roma modular switches, Finolex wires',
      highlights: ['Dedicated Site Engineer', '1-Year Maintenance Guarantee']
    },
    {
      id: 'gold',
      name: 'Gold Premium',
      tier: 'Family Residence',
      ratePerSqFt: 2150,
      tagline: 'Ideal for modern Gurugram kothis & independent floors',
      structure: 'Tata Tiscon Fe-550D, M-30 Grade RMC',
      flooring: 'Kajaria 4x2 GVT tiles & wooden flooring in master',
      bathrooms: 'Jaquar Kubix series & wall-hung commodes',
      doorsWindows: '8 ft Malaysian Sal wood frames & Fenesta UPVC',
      paint: 'Asian Paints Apex Royale internal & exterior',
      electrical: 'Schneider Opale / Havells Fabio switches',
      highlights: ['Anti-Termite 10-Yr Guarantee', 'Soil Bearing Certified']
    },
    {
      id: 'diamond',
      name: 'Diamond Luxury',
      tier: 'Ultra Luxury Estate',
      ratePerSqFt: 2750,
      popular: true,
      tagline: 'Our flagship specification matching Golf Course Road villas',
      structure: 'JSW / Tata Tiscon Fe-550D, M-35 RMC with waterproofers',
      flooring: 'Imported Italian Botticino / Statuario marble living',
      bathrooms: 'Grohe & Kohler vanity counters with concealed cisterns',
      doorsWindows: 'Teak wood main entrance door, DGU acoustic glass',
      paint: 'Asian Paints Royale Aspira with PU polish on woodwork',
      electrical: 'Legrand Arteor / Smart KNX automated switches',
      highlights: ['Schindler Elevator Provision', 'Italian Marble Flooring', 'Zero Defect Handover']
    },
    {
      id: 'platinum',
      name: 'Platinum Bespoke',
      tier: 'Custom Mansion',
      ratePerSqFt: 3600,
      tagline: 'Bespoke architectural masterpiece with private amenities',
      structure: 'Seismic Zone IV monolithic shear wall design',
      flooring: 'High-end Greek & Italian marble throughout all levels',
      bathrooms: 'Villeroy & Boch / Hansgrohe custom fittings',
      doorsWindows: 'Schüco German aluminum slimline thermal facades',
      paint: 'Stucco, microcement & imported textured Italian coatings',
      electrical: 'Full KNX home automation with Daikin VRV HVAC',
      highlights: ['Rooftop Pergola & Infinity Pool', 'Private High-Speed Lift', 'Complete Smart Living']
    }
  ];

  readonly specMatrix: SpecRow[] = [
    {
      category: 'Steel & Rebars',
      silver: 'Primary Fe-500D (Kamdhenu / Rathi)',
      gold: 'Tata Tiscon Fe-550D Super Ductile',
      diamond: 'Tata Tiscon / JSW Neosteel Fe-550D',
      platinum: 'Corrosion-Resistant Epoxy Coated Fe-550D'
    },
    {
      category: 'Cement & Concrete',
      silver: 'UltraTech / ACC Grade 43/53',
      gold: 'UltraTech Weather Plus / M-30 RMC',
      diamond: 'M-30 / M-35 Design Mix with BASF waterproofing',
      platinum: 'M-35 High Performance Self-Compacting RMC'
    },
    {
      category: 'Floor-to-Ceiling Height',
      silver: '10.0 Feet clear',
      gold: '10.5 Feet clear',
      diamond: '11.5 Feet clear with double height living area',
      platinum: '12.5 Feet grand ceiling height throughout'
    },
    {
      category: 'Living & Dining Flooring',
      silver: 'Double Charge Vitrified Tiles (₹65/sft)',
      gold: 'Kajaria 4x2 GVT Large Slabs (₹120/sft)',
      diamond: 'Imported Italian Botticino / Statuario Marble',
      platinum: 'Book-matched Greek Thassos & Statuario Marble'
    },
    {
      category: 'Master Bedroom Flooring',
      silver: 'Anti-skid Vitrified Tiles',
      gold: 'Laminated Wooden Flooring (AC4 German)',
      diamond: 'Engineered Hardwood / Italian Marble',
      platinum: 'Herringbone Pattern Burmese Teak Parquet'
    },
    {
      category: 'Sanitary & CP Fittings',
      silver: 'Cera / Hindware Premium',
      gold: 'Jaquar Kubix / Florentine Wall-Hung',
      diamond: 'Kohler / Grohe Concealed Diverters',
      platinum: 'Villeroy & Boch / Hansgrohe Axor Luxury'
    },
    {
      category: 'Plumbing & Drainage',
      silver: 'Prince / Supreme PVC & CPVC',
      gold: 'Supreme SDR-11 CPVC & SWR pipes',
      diamond: 'German Viega / Astral Silencio Low-Noise',
      platinum: 'Geberit Concealed Piping & Dual Drainage'
    },
    {
      category: 'Windows & Glazing',
      silver: 'UPVC 2-Track Windows with 5mm glass',
      gold: 'Fenesta 3-Track UPVC with mesh',
      diamond: 'DGU 24mm Acoustic Soundproof Glass',
      platinum: 'Schüco German Thermal-Break Slimline Aluminum'
    },
    {
      category: 'Doors & Frames',
      silver: 'Marandi wood frames with flush doors',
      gold: 'Malaysian Sal wood with Teak veneer',
      diamond: '8-ft Teak main door with Italian mortise locks',
      platinum: 'Solid Burma Teak pivot door with biometric lock'
    },
    {
      category: 'Electrical & Switches',
      silver: 'Anchor Roma / Finolex FRLS wires',
      gold: 'Havells Fabio / Schneider Opale',
      diamond: 'Legrand Arteor with Smart KNX provisions',
      platinum: 'Full KNX Home Automation & Smart Lighting'
    },
    {
      category: 'Passenger Elevator',
      silver: 'Lift shaft civil opening only',
      gold: 'Reinforced lift shaft + electrical tie-in',
      diamond: 'Schindler / Otis provision with granite cladding',
      platinum: 'Private Glass Panoramic Gearless Elevator Included'
    },
    {
      category: 'Structural Warranty',
      silver: '1 Year Free Maintenance',
      gold: '5 Years Seepage & Core Warranty',
      diamond: '10 Years Structural Integrity Certificate',
      platinum: '10 Years Comprehensive + Annual Health Audits'
    }
  ];

  inquirePackage(packageName: string, rate: number): void {
    const text = `Hello Naveen Ji, I am interested in the *${packageName}* package (approx ₹${rate}/sq.ft) for my Gurugram plot construction. Please share complete specifications and arrange a consultation.`;
    window.open(`https://wa.me/91${this.dataService.primaryPhone}?text=${encodeURIComponent(text)}`, '_blank');
  }
}
