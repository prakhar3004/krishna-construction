import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructionDataService } from '../../services/construction-data.service';

interface ConstructionPackage {
  id: string;
  name: string;
  tier: string;
  ratePerSqFt: number;
  tagline: string;
  popular?: boolean;
  bestFor: string;
  highlights: string[];
}

@Component({
  selector: 'app-packages-and-models',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="packages" class="py-10 sm:py-14 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
      
      <!-- 1. TRUSTED BRANDS STRIP (Buildhood Pattern) -->
      <div class="mb-14 pb-8 border-b border-[#F8FAFC]/10 text-center">
        <p class="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-6">
          We use only trusted brands
        </p>

        <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          @for (brand of materialBrands; track brand.name) {
            <div class="px-4 py-2 rounded-xl bg-[#0B1019] border border-[#D4AF37]/15 hover:border-[#38BDF8]/60 transition-all flex flex-col items-center justify-center">
              <span class="text-sm font-semibold text-[#F8FAFC] tracking-wide">
                {{ brand.name }}
              </span>
              <span class="text-[0.62rem] font-mono text-[#F8FAFC]/50 uppercase tracking-wider mt-0.5">
                {{ brand.category }}
              </span>
            </div>
          }
        </div>
      </div>

      <!-- 2. OUR EXPERTISE: 3 COMPREHENSIVE SERVICES (Buildhood Pattern) -->
      <div id="services" class="mb-16 pb-12 border-b border-[#F8FAFC]/10">
        <div class="text-center max-w-3xl mx-auto mb-10">
          <span class="inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
            Our Expertise
          </span>
          <h2 class="mt-3 text-3xl sm:text-4xl font-bold text-[#F8FAFC]">
            Comprehensive Home Construction Services in Gurugram
          </h2>
          <p class="mt-3 text-sm sm:text-base text-[#F8FAFC]/75 leading-relaxed">
            At Krishna Construction, we offer a complete range of residential services tailored to your plot &mdash; from initial design to final Griha Pravesh handover.
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Service 01 -->
          <div class="group relative rounded-2xl border border-[#D4AF37]/20 bg-[#0B1019] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50 shadow-xl flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-4 mb-6">
                <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#070A0F] transition-colors">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <span class="rounded-full border border-[#D4AF37]/30 bg-[#070A0F] px-3 py-1 text-xs font-bold text-[#D4AF37]">01</span>
              </div>
              <h3 class="text-xl font-bold text-[#F8FAFC]">Home Construction</h3>
              <p class="mt-3 text-sm leading-relaxed text-[#F8FAFC]/70">
                Independent house, luxury villa, and Stilt+4 floors construction in Gurugram with high engineering standards, certified materials, and great value for money.
              </p>
            </div>
            <div class="mt-7 pt-4 border-t border-[#F8FAFC]/10 flex items-center justify-between">
              <span class="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">Turnkey Execution</span>
              <button 
                (click)="dataService.openConsultationModal('Turnkey Construction')"
                class="w-9 h-9 rounded-full bg-[#070A0F] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-[#070A0F] transition-all cursor-pointer"
                title="Consult for Home Construction"
              >
                &rarr;
              </button>
            </div>
          </div>

          <!-- Service 02 -->
          <div class="group relative rounded-2xl border border-[#D4AF37]/20 bg-[#0B1019] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50 shadow-xl flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-4 mb-6">
                <div class="w-12 h-12 rounded-xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] group-hover:bg-[#38BDF8] group-hover:text-[#070A0F] transition-colors">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                  </svg>
                </div>
                <span class="rounded-full border border-[#38BDF8]/30 bg-[#070A0F] px-3 py-1 text-xs font-bold text-[#38BDF8]">02</span>
              </div>
              <h3 class="text-xl font-bold text-[#F8FAFC]">Architecture &amp; Structural Design</h3>
              <p class="mt-3 text-sm leading-relaxed text-[#F8FAFC]/70">
                2D/3D floor plans, photorealistic 3D elevations, and Vastu-compliant structural drawings engineered to Seismic Zone IV and DTCP Haryana building bye-laws.
              </p>
            </div>
            <div class="mt-7 pt-4 border-t border-[#F8FAFC]/10 flex items-center justify-between">
              <span class="text-xs uppercase tracking-wider text-[#38BDF8] font-semibold">Architectural Design</span>
              <button 
                (click)="dataService.openConsultationModal('Architectural Design')"
                class="w-9 h-9 rounded-full bg-[#070A0F] border border-[#38BDF8]/30 text-[#38BDF8] flex items-center justify-center group-hover:bg-[#38BDF8] group-hover:text-[#070A0F] transition-all cursor-pointer"
                title="Consult for Architectural Design"
              >
                &rarr;
              </button>
            </div>
          </div>

          <!-- Service 03 -->
          <div class="group relative rounded-2xl border border-[#D4AF37]/20 bg-[#0B1019] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50 shadow-xl flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-4 mb-6">
                <div class="w-12 h-12 rounded-xl bg-[#6B7A5C]/20 border border-[#6B7A5C]/40 flex items-center justify-center text-[#6B7A5C] group-hover:bg-[#6B7A5C] group-hover:text-white transition-colors">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                  </svg>
                </div>
                <span class="rounded-full border border-[#6B7A5C]/40 bg-[#070A0F] px-3 py-1 text-xs font-bold text-[#6B7A5C]">03</span>
              </div>
              <h3 class="text-xl font-bold text-[#F8FAFC]">Planning, Sanctions &amp; Renovation</h3>
              <p class="mt-3 text-sm leading-relaxed text-[#F8FAFC]/70">
                End-to-end project management from DTCP/MCG municipal sanctions to turnkey site supervision, as well as complete structural revamps of existing residential properties.
              </p>
            </div>
            <div class="mt-7 pt-4 border-t border-[#F8FAFC]/10 flex items-center justify-between">
              <span class="text-xs uppercase tracking-wider text-[#6B7A5C] font-semibold">Project Management</span>
              <button 
                (click)="dataService.openConsultationModal('Project Management & Sanctions')"
                class="w-9 h-9 rounded-full bg-[#070A0F] border border-[#6B7A5C]/40 text-[#6B7A5C] flex items-center justify-center group-hover:bg-[#6B7A5C] group-hover:text-white transition-all cursor-pointer"
                title="Consult for Project Management"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. OUR CONTRACT MODELS: COST-PLUS VS LUMP-SUM (Buildhood Pattern) -->
      <div id="models" class="mb-16 pb-12 border-b border-[#F8FAFC]/10">
        <div class="text-center max-w-3xl mx-auto mb-10">
          <span class="inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
            Our Contract Models
          </span>
          <h2 class="mt-3 text-3xl sm:text-4xl font-bold text-[#F8FAFC]">
            Transparent Construction Contracts Built Around Your Needs
          </h2>
          <p class="mt-3 text-sm sm:text-base text-[#F8FAFC]/75 leading-relaxed">
            At Krishna Construction, we offer two construction contract models to suit your preferences &mdash; the Cost-Plus model for maximum transparency or the Lump-Sum model for a fixed-price guarantee.
          </p>
        </div>

        <div class="grid gap-8 lg:grid-cols-2">
          <!-- Cost-Plus Contract Card (Recommended) -->
          <div class="group relative rounded-2xl border-2 border-[#D4AF37] bg-[#0B1019] p-8 transition duration-300 hover:-translate-y-1 shadow-2xl relative overflow-hidden">
            <div class="flex items-center justify-between gap-3 mb-4">
              <h3 class="text-2xl font-bold text-[#F8FAFC]">Cost-Plus Contract</h3>
              <span class="rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wide bg-[#D4AF37] text-[#070A0F]">
                Recommended
              </span>
            </div>

            <p class="text-sm leading-relaxed text-[#F8FAFC]/75 mb-6">
              The Cost-Plus Contract provides full transparency, flexibility, and potential cost savings by allowing you to pay the actual wholesale cost of materials and labour plus an agreed fixed management fee.
            </p>

            <ul class="space-y-3 text-sm text-[#F8FAFC]/85 mb-8">
              <li class="flex items-start gap-3 rounded-xl bg-[#070A0F] px-3.5 py-2.5">
                <svg class="h-5 w-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Complete cost transparency &mdash; every rupee accounted for</span>
              </li>
              <li class="flex items-start gap-3 rounded-xl bg-[#070A0F] px-3.5 py-2.5">
                <svg class="h-5 w-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Pay for actual materials with weekly GST bills &amp; weighbridge slips</span>
              </li>
              <li class="flex items-start gap-3 rounded-xl bg-[#070A0F] px-3.5 py-2.5">
                <svg class="h-5 w-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Save up to 10% compared to traditional contractor markups</span>
              </li>
              <li class="flex items-start gap-3 rounded-xl bg-[#070A0F] px-3.5 py-2.5">
                <svg class="h-5 w-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Flexible scope &amp; material upgrades anytime during construction</span>
              </li>
              <li class="flex items-start gap-3 rounded-xl bg-[#070A0F] px-3.5 py-2.5">
                <svg class="h-5 w-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Weekly cost reports and digital photographic progress updates</span>
              </li>
            </ul>

            <button 
              (click)="dataService.openConsultationModal('Cost-Plus Contract Model')"
              class="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C4971A] text-[#070A0F] text-sm font-bold uppercase tracking-wider shadow-lg shadow-[#D4AF37]/25 hover:from-[#DFBA44] hover:to-[#D4AF37] transition-all cursor-pointer"
            >
              Opt for Cost-Plus Model &rarr;
            </button>
          </div>

          <!-- Lump-Sum Contract Card (Fixed Price) -->
          <div class="group relative rounded-2xl border border-[#F8FAFC]/20 bg-[#0B1019] p-8 transition duration-300 hover:-translate-y-1 hover:border-[#F8FAFC]/40 shadow-xl relative overflow-hidden">
            <div class="flex items-center justify-between gap-3 mb-4">
              <h3 class="text-2xl font-bold text-[#F8FAFC]">Lump-Sum Contract</h3>
              <span class="rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wide bg-[#070A0F] text-[#F8FAFC]/70 border border-[#F8FAFC]/20">
                Fixed Price
              </span>
            </div>

            <p class="text-sm leading-relaxed text-[#F8FAFC]/75 mb-6">
              A set price for the entire construction project based on agreed specifications, materials and detailed BOQ. Ideal for clients who prefer a fixed, predictable budget.
            </p>

            <ul class="space-y-3 text-sm text-[#F8FAFC]/85 mb-8">
              <li class="flex items-start gap-3 rounded-xl bg-[#070A0F] px-3.5 py-2.5">
                <svg class="h-5 w-5 text-[#38BDF8] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Fixed, predictable project price locked before excavation</span>
              </li>
              <li class="flex items-start gap-3 rounded-xl bg-[#070A0F] px-3.5 py-2.5">
                <svg class="h-5 w-5 text-[#38BDF8] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Defined scope and specifications upfront with detailed 80-page BOQ</span>
              </li>
              <li class="flex items-start gap-3 rounded-xl bg-[#070A0F] px-3.5 py-2.5">
                <svg class="h-5 w-5 text-[#38BDF8] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Zero budget escalation guaranteed &mdash; contractor absorbs price hikes</span>
              </li>
              <li class="flex items-start gap-3 rounded-xl bg-[#070A0F] px-3.5 py-2.5">
                <svg class="h-5 w-5 text-[#38BDF8] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Milestone-linked payment schedule ideal for bank construction loans</span>
              </li>
              <li class="flex items-start gap-3 rounded-xl bg-[#070A0F] px-3.5 py-2.5">
                <svg class="h-5 w-5 text-[#38BDF8] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Simple budgeting &amp; planning for standard home builds</span>
              </li>
            </ul>

            <button 
              (click)="dataService.openConsultationModal('Lump-Sum Fixed Price Contract')"
              class="w-full py-3 rounded-xl border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#070A0F] text-sm font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Opt for Lump-Sum Contract &rarr;
            </button>
          </div>
        </div>
      </div>

      <!-- 4. OUR PACKAGES: 4 CLEAN CARDS + COST-PLUS ADVANTAGE BANNER (Buildhood Pattern) -->
      <div class="mb-16 pb-12 border-b border-[#F8FAFC]/10">
        <div class="text-center max-w-3xl mx-auto mb-10">
          <span class="inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
            Our Packages
          </span>
          <h2 class="mt-3 text-3xl sm:text-4xl font-bold text-[#F8FAFC]">
            House Construction Packages in Gurugram
          </h2>
          <p class="mt-3 text-sm sm:text-base text-[#F8FAFC]/75 leading-relaxed">
            Choose from our range of construction packages designed for every budget. All packages include GST, architectural design, and site supervision.
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (pkg of packages; track pkg.id) {
            <div 
              class="rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 relative group bg-[#0B1019]"
              [class.border-[#D4AF37]]="pkg.popular"
              [class.shadow-2xl]="pkg.popular"
              [class.shadow-[#D4AF37]/20]="pkg.popular"
              [class.border-[#F8FAFC]/15]="!pkg.popular"
            >
              @if (pkg.popular) {
                <div class="absolute top-0 right-0 bg-[#D4AF37] text-[#070A0F] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-bl-xl shadow">
                  Most Popular
                </div>
              }

              <div>
                <span class="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-semibold block">
                  {{ pkg.tier }}
                </span>
                <h3 class="text-2xl font-bold text-[#F8FAFC] mt-1">
                  {{ pkg.name }}
                </h3>
                <p class="text-xs text-[#F8FAFC]/60 mt-1">
                  Best for {{ pkg.bestFor }}
                </p>

                <!-- Rate Box -->
                <div class="mt-5 p-4 rounded-xl bg-[#070A0F] border border-[#D4AF37]/20">
                  <p class="text-[11px] uppercase tracking-wider text-[#F8FAFC]/50">Starting from</p>
                  <p class="mt-1 font-mono font-extrabold text-[#D4AF37] text-3xl leading-none">
                    ₹{{ pkg.ratePerSqFt | number }}<span class="text-sm font-normal text-[#F8FAFC]/70">/sq.ft*</span>
                  </p>
                </div>

                <p class="mt-4 text-xs leading-relaxed text-[#F8FAFC]/75">
                  {{ pkg.tagline }}
                </p>

                <!-- Clean Bullets -->
                <ul class="mt-4 space-y-2.5 text-xs text-[#F8FAFC]/80">
                  @for (item of pkg.highlights; track item) {
                    <li class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-[#D4AF37] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      <span>{{ item }}</span>
                    </li>
                  }
                </ul>
              </div>

              <!-- Button CTA -->
              <div class="mt-6 pt-4 border-t border-[#F8FAFC]/10">
                <button 
                  (click)="inquirePackage(pkg.name, pkg.ratePerSqFt)"
                  class="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                  [class.bg-gradient-to-r]="pkg.popular"
                  [class.from-[#D4AF37]]="pkg.popular"
                  [class.to-[#C4971A]]="pkg.popular"
                  [class.text-[#070A0F]]="pkg.popular"
                  [class.border]="!pkg.popular"
                  [class.border-[#D4AF37]/40]="!pkg.popular"
                  [class.text-[#D4AF37]]="!pkg.popular"
                  [class.hover:bg-[#D4AF37]]="!pkg.popular"
                  [class.hover:text-[#070A0F]]="!pkg.popular"
                >
                  <span>Select {{ pkg.name }}</span>
                  &rarr;
                </button>
              </div>
            </div>
          }
        </div>

        <!-- Cost-Plus Advantage Banner (Buildhood Exact Feature) -->
        <div class="mt-8 rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#0B1019] via-[#121824] to-[#0B1019] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-xl bg-[#D4AF37] text-[#070A0F] font-bold text-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              ₹
            </div>
            <div>
              <span class="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Cost-Plus Advantage</span>
              <h3 class="text-xl sm:text-2xl font-bold text-[#F8FAFC] mt-1">
                Save up to 10% on all packages with the Cost-Plus contract model
              </h3>
              <p class="text-xs sm:text-sm text-[#F8FAFC]/75 mt-1.5 max-w-2xl leading-relaxed">
                Choose any construction package above, then switch to Cost-Plus for transparent actual-cost billing, flexible upgrades, weekly cost visibility, and complete control over your home budget.
              </p>
            </div>
          </div>

          <button 
            (click)="dataService.openConsultationModal('Cost-Plus Advantage Inquiry')"
            class="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#DFBA44] text-[#070A0F] font-bold text-xs uppercase tracking-wider flex-shrink-0 shadow-lg cursor-pointer whitespace-nowrap"
          >
            Explore Cost-Plus &rarr;
          </button>
        </div>

        <p class="mt-4 text-center text-xs text-[#F8FAFC]/50">
          *Per sq.ft values are approximate based on Gurugram 2026 standards. Cost-plus model follows actual material costs.
        </p>
      </div>

      <!-- 5. HOW IT WORKS: 4 SIMPLE STEPS (Buildhood Pattern) -->
      <div id="how-it-works" class="mb-16 pb-12 border-b border-[#F8FAFC]/10">
        <div class="text-center max-w-3xl mx-auto mb-10">
          <span class="inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
            How It Works
          </span>
          <h2 class="mt-3 text-3xl sm:text-4xl font-bold text-[#F8FAFC]">
            From Concept to Completion in 4 Simple Steps
          </h2>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-2xl border border-[#F8FAFC]/15 bg-[#0B1019] p-6 text-center shadow transition hover:-translate-y-1 hover:border-[#D4AF37]/40">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37] text-[#070A0F] shadow-lg mb-4 font-bold text-xl">
              01
            </div>
            <span class="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Step 01</span>
            <h3 class="mt-2 text-lg font-bold text-[#F8FAFC]">Select Package &amp; Book</h3>
            <p class="mt-2 text-xs leading-relaxed text-[#F8FAFC]/70">
              Choose a construction package, review our completed projects, and schedule an on-site plot survey with our team.
            </p>
          </div>

          <div class="rounded-2xl border border-[#F8FAFC]/15 bg-[#0B1019] p-6 text-center shadow transition hover:-translate-y-1 hover:border-[#D4AF37]/40">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37] text-[#070A0F] shadow-lg mb-4 font-bold text-xl">
              02
            </div>
            <span class="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Step 02</span>
            <h3 class="mt-2 text-lg font-bold text-[#F8FAFC]">Design &amp; Agreement</h3>
            <p class="mt-2 text-xs leading-relaxed text-[#F8FAFC]/70">
              Finalize 2D/3D floor plans, Vastu layout, and elevations. Sign a transparent agreement with clear BOQ specifications.
            </p>
          </div>

          <div class="rounded-2xl border border-[#F8FAFC]/15 bg-[#0B1019] p-6 text-center shadow transition hover:-translate-y-1 hover:border-[#D4AF37]/40">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37] text-[#070A0F] shadow-lg mb-4 font-bold text-xl">
              03
            </div>
            <span class="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Step 03</span>
            <h3 class="mt-2 text-lg font-bold text-[#F8FAFC]">Construction &amp; Tracking</h3>
            <p class="mt-2 text-xs leading-relaxed text-[#F8FAFC]/70">
              Construction begins with genuine Tier-1 materials. Track every milestone with regular video &amp; photo progress updates.
            </p>
          </div>

          <div class="rounded-2xl border border-[#F8FAFC]/15 bg-[#0B1019] p-6 text-center shadow transition hover:-translate-y-1 hover:border-[#D4AF37]/40">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37] text-[#070A0F] shadow-lg mb-4 font-bold text-xl">
              04
            </div>
            <span class="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Step 04</span>
            <h3 class="mt-2 text-lg font-bold text-[#F8FAFC]">Handover &amp; Warranty</h3>
            <p class="mt-2 text-xs leading-relaxed text-[#F8FAFC]/70">
              On-time Griha Pravesh handover of your dream home with up to 10 years structural warranty and complete handover kit.
            </p>
          </div>
        </div>
      </div>

      <!-- 6. WHY CHOOSE KRISHNA CONSTRUCTION: THE 4 ADVANTAGES (Buildhood Pattern) -->
      <div>
        <div class="text-center max-w-3xl mx-auto mb-10">
          <span class="inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
            Why Choose Krishna Construction
          </span>
          <h2 class="mt-3 text-3xl sm:text-4xl font-bold text-[#F8FAFC]">
            The Krishna Construction Advantage
          </h2>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-2xl border border-[#F8FAFC]/15 bg-[#0B1019] p-7 text-center shadow transition hover:-translate-y-1 hover:border-[#D4AF37]/40">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#D4AF37] mb-4">
              <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 class="text-base font-bold text-[#F8FAFC]">Transparent Process</h3>
            <p class="mt-2 text-xs leading-relaxed text-[#F8FAFC]/70">
              No hidden costs &mdash; every rupee accounted for with weekly weighbridge slips and GST billing reports.
            </p>
          </div>

          <div class="rounded-2xl border border-[#F8FAFC]/15 bg-[#0B1019] p-7 text-center shadow transition hover:-translate-y-1 hover:border-[#D4AF37]/40">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#D4AF37] mb-4">
              <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-base font-bold text-[#F8FAFC]">Save Up to 10%</h3>
            <p class="mt-2 text-xs leading-relaxed text-[#F8FAFC]/70">
              Our direct wholesale alliances with UltraTech and Tata Tiscon distributors pass actual savings directly to you.
            </p>
          </div>

          <div class="rounded-2xl border border-[#F8FAFC]/15 bg-[#0B1019] p-7 text-center shadow transition hover:-translate-y-1 hover:border-[#D4AF37]/40">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#D4AF37] mb-4">
              <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <h3 class="text-base font-bold text-[#F8FAFC]">Quality Material</h3>
            <p class="mt-2 text-xs leading-relaxed text-[#F8FAFC]/70">
              We use only trusted brands &mdash; UltraTech Cement, Tata Tiscon Rebars, Asian Paints, Jaquar, and Kohler.
            </p>
          </div>

          <div class="rounded-2xl border border-[#F8FAFC]/15 bg-[#0B1019] p-7 text-center shadow transition hover:-translate-y-1 hover:border-[#D4AF37]/40">
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#D4AF37] mb-4">
              <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-base font-bold text-[#F8FAFC]">On-Time Delivery</h3>
            <p class="mt-2 text-xs leading-relaxed text-[#F8FAFC]/70">
              Dedicated on-site civil engineers, stage-wise milestone tracking, and penalty commitments protect your move-in date.
            </p>
          </div>
        </div>
      </div>

    </section>
  `
})
export class PackagesAndModelsComponent {
  readonly dataService = inject(ConstructionDataService);

  readonly materialBrands = [
    { name: 'UltraTech', category: 'Cement' },
    { name: 'Tata Tiscon', category: 'TMT Steel' },
    { name: 'JSW Steel', category: 'Rebars' },
    { name: 'Asian Paints', category: 'Royale Luxury' },
    { name: 'Jaquar', category: 'Sanitary' },
    { name: 'Kohler', category: 'Bath Fittings' },
    { name: 'Havells', category: 'Electrical' },
    { name: 'Kajaria', category: 'Tiles' },
    { name: 'Supreme', category: 'Piping' },
    { name: 'Dr. Fixit', category: 'Waterproofing' }
  ];

  readonly packages: ConstructionPackage[] = [
    {
      id: 'silver',
      name: 'Silver Essential',
      tier: 'Standard Turnkey',
      ratePerSqFt: 1850,
      bestFor: 'Budget-conscious builders',
      tagline: 'High quality essential specifications for investment builder floors.',
      highlights: [
        'Fe-500D TMT, Grade M-25 RMC',
        'Vitrified tile flooring (₹65/sft)',
        'Cera / Hindware sanitaryware',
        'Dedicated on-site civil supervisor'
      ]
    },
    {
      id: 'gold',
      name: 'Gold Premium',
      tier: 'Family Residence',
      ratePerSqFt: 2150,
      bestFor: 'Value-focused families',
      tagline: 'Balanced finishes and quality materials with great value for money.',
      highlights: [
        'Tata Tiscon Fe-550D, M-30 RMC',
        'Kajaria 4x2 GVT Large Slabs',
        'Jaquar Kubix series bath fittings',
        'Fenesta UPVC soundproof windows'
      ]
    },
    {
      id: 'diamond',
      name: 'Diamond Luxury',
      tier: 'Ultra Luxury Estate',
      ratePerSqFt: 2750,
      popular: true,
      bestFor: 'Most homeowners',
      tagline: 'Premium materials and finishes matching Golf Course Road villas.',
      highlights: [
        'Tata / JSW Fe-550D, M-35 RMC',
        'Imported Italian marble living room',
        'Kohler / Grohe concealed fittings',
        'Schindler elevator provision'
      ]
    },
    {
      id: 'platinum',
      name: 'Platinum Bespoke',
      tier: 'Custom Mansion',
      ratePerSqFt: 3600,
      bestFor: 'Luxury estates & mansions',
      tagline: 'Top-tier luxury specifications, bespoke detailing & smart living.',
      highlights: [
        'Monolithic shear-wall engineering',
        'Full Italian marble throughout',
        'Schüco German aluminum facades',
        'Full KNX smart home automation'
      ]
    }
  ];

  inquirePackage(packageName: string, rate: number): void {
    const text = `Hello Naveen Ji, I am interested in the *${packageName}* package (approx ₹${rate}/sq.ft) for my Gurugram plot construction. Please share complete specifications and arrange a consultation.`;
    window.open(`https://wa.me/91${this.dataService.primaryPhone}?text=${encodeURIComponent(text)}`, '_blank');
  }
}
