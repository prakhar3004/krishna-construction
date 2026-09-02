import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructionDataService } from '../../services/construction-data.service';

@Component({
  selector: 'app-trust-metrics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-10 sm:py-14 px-6 sm:px-10 lg:px-16 border-y border-[#D4AF37]/20 bg-gradient-to-b from-[#0B1019] via-[#070A0F] to-[#070A0F] relative z-10">
      <div class="max-w-7xl mx-auto">
        <!-- 5 Key Quantitative Metric Columns -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 pb-8 border-b border-[#F8FAFC]/10">
          <div class="space-y-1">
            <span class="font-display text-4xl sm:text-5xl font-normal text-[#D4AF37] block">25+</span>
            <span class="text-[0.65rem] font-mono tracking-widest uppercase text-[#F8FAFC]/50 block">
              Years Construction Track Record
            </span>
          </div>

          <div class="space-y-1">
            <span class="font-display text-4xl sm:text-5xl font-normal text-[#F8FAFC] block">180+</span>
            <span class="text-[0.65rem] font-mono tracking-widest uppercase text-[#F8FAFC]/50 block">
              Completed Residencies & Floors
            </span>
          </div>

          <div class="space-y-1">
            <span class="font-display text-4xl sm:text-5xl font-normal text-[#38BDF8] block">10-Yr</span>
            <span class="text-[0.65rem] font-mono tracking-widest uppercase text-[#F8FAFC]/50 block">
              Comprehensive Structural Warranty
            </span>
          </div>

          <div class="space-y-1">
            <span class="font-display text-4xl sm:text-5xl font-normal text-[#D4AF37] block">100%</span>
            <span class="text-[0.65rem] font-mono tracking-widest uppercase text-[#F8FAFC]/50 block">
              On-Record BOQ & Price Lock
            </span>
          </div>

          <div class="space-y-1 col-span-2 md:col-span-1">
            <div class="flex items-center gap-1.5">
              <span class="font-display text-4xl sm:text-5xl font-normal text-[#F8FAFC]">4.9</span>
              <span class="text-[#D4AF37] text-lg">★★★★★</span>
            </div>
            <span class="text-[0.65rem] font-mono tracking-widest uppercase text-[#F8FAFC]/50 block">
              Client Satisfaction Rating
            </span>
          </div>
        </div>

        <!-- 4 Institutional Guarantees (Vidastu Model) -->
        <div class="pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div class="space-y-3">
            <div class="w-10 h-10 rounded-lg bg-[#1D4ED8]/20 border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h4 class="font-display text-lg text-[#F7F4EE] font-normal">Seismic Zone IV Structural Base</h4>
            <p class="text-xs text-[#F7F4EE]/65 font-light leading-relaxed">
              Every foundation and column footing is certified under Indian Structural Codes (IS 456 & IS 1893) using primary steel brands (Tata Tiscon / Jindal Panther).
            </p>
          </div>

          <div class="space-y-3">
            <div class="w-10 h-10 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h4 class="font-display text-lg text-[#F7F4EE] font-normal">Zero Surprise Escalations</h4>
            <p class="text-xs text-[#F7F4EE]/65 font-light leading-relaxed">
              Our written construction agreement locks every raw material specification, rate per sq.ft, and payment tranche. No surprise additions mid-build.
            </p>
          </div>

          <div class="space-y-3">
            <div class="w-10 h-10 rounded-lg bg-[#6B7A5C]/20 border border-[#6B7A5C]/40 flex items-center justify-center text-[#6B7A5C]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h4 class="font-display text-lg text-[#F7F4EE] font-normal">Named Senior Leadership</h4>
            <p class="text-xs text-[#F7F4EE]/65 font-light leading-relaxed">
              Led directly by Naveen Sharma with direct on-site presence. You converse with the builder who signs the contract, not an anonymous call-centre.
            </p>
          </div>

          <div class="space-y-3">
            <div class="w-10 h-10 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <h4 class="font-display text-lg text-[#F8FAFC] font-normal">Gurugram &amp; Delhi NCR Physical Desk</h4>
            <p class="text-xs text-[#F8FAFC]/70 font-light leading-relaxed">
              Meet our leadership at Soho Precision Tower, Gurugram. Serving plot owners across Gurugram, South Delhi, Faridabad, and greater Delhi NCR with verified deeds and complete transparency.
            </p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class TrustMetricsComponent {
  readonly dataService = inject(ConstructionDataService);
}
