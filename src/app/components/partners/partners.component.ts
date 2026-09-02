import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructionDataService } from '../../services/construction-data.service';
import { EngineeringStandard } from '../../models/data.models';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="standards" class="py-7 sm:py-9 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
        <div>
          <div class="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#38BDF8] mb-2">
            <span class="w-6 h-[1px] bg-[#1D4ED8]"></span>
            <span>Engineering Rigor & Municipal Sanctions</span>
          </div>

          <h2 class="text-3xl sm:text-4xl md:text-5xl font-display font-light text-[#F8FAFC] leading-tight max-w-3xl">
            Engineered for <span class="italic text-[#D4AF37]">Seismic Zone IV</span>. Sanctioned by DTCP Haryana.
          </h2>

          <p class="text-sm sm:text-base text-[#F8FAFC]/75 font-light max-w-2xl mt-1.5">
            Built strictly to BIS Seismic Zone IV standards and Haryana DTCP bye-laws, with mandatory NABL lab strength test reports for every slab casting.
          </p>
        </div>

        <!-- 10-Year Warranty Trust Badge -->
        <div class="p-4 rounded-2xl bg-[#0B1019] border border-[#D4AF37]/30 flex items-center gap-4 flex-shrink-0 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-xl font-bold text-[#D4AF37] font-mono shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            10Y
          </div>
          <div>
            <div class="text-[#D4AF37] font-mono font-bold text-xs uppercase tracking-wider">Structural Warranty</div>
            <p class="text-xs text-[#F8FAFC]/60 font-mono m-0">Zero Settlement & Crack Guarantee</p>
          </div>
        </div>
      </div>

      <!-- 6 Engineering Standards Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        @for (item of standards; track item.id) {
          <div class="glass-card rounded-2xl p-7 flex flex-col justify-between border border-[#D4AF37]/20 hover:border-[#38BDF8]/60 transition-all duration-500 group bg-[#0B1019] relative overflow-hidden">
            
            <div>
              <!-- Top Badge & Authority -->
              <div class="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#F8FAFC]/10">
                <span class="px-2.5 py-1 rounded text-[0.62rem] font-mono tracking-widest uppercase bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-semibold">
                  {{ item.badge }}
                </span>
                <span class="text-[0.68rem] font-mono text-[#F8FAFC]/50">
                  {{ item.authority }}
                </span>
              </div>

              <!-- Title & Compliance Code -->
              <div class="mb-3">
                <h3 class="text-xl font-display font-medium text-[#F8FAFC] group-hover:text-[#D4AF37] transition-colors leading-snug">
                  {{ item.title }}
                </h3>
                <span class="text-[0.68rem] font-mono text-[#38BDF8] block mt-1">
                  Code: {{ item.complianceCode }}
                </span>
              </div>

              <!-- Description -->
              <p class="text-xs text-[#F8FAFC]/70 font-light leading-relaxed mb-5">
                {{ item.description }}
              </p>

              <!-- Protocols List -->
              <div class="space-y-2 mb-6">
                @for (protocol of item.protocols; track protocol) {
                  <div class="flex items-start gap-2 text-xs font-mono text-[#F8FAFC]/85">
                    <span class="text-[#10B981] font-bold mt-0.5">✓</span>
                    <span>{{ protocol }}</span>
                  </div>
                }
              </div>
            </div>

            <!-- Bottom Scope Bar -->
            <div class="pt-4 border-t border-[#F8FAFC]/10 flex items-center justify-between text-[0.68rem] font-mono text-[#F8FAFC]/50">
              <span>Scope:</span>
              <span class="text-[#D4AF37]">{{ item.scope }}</span>
            </div>

          </div>
        }
      </div>

      <!-- Builder Quality Protocol Audit Bar -->
      <div class="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#0B132B] via-[#101B38] to-[#0B132B] border border-[#38BDF8]/30 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full lg:w-auto text-center lg:text-left">
          <div>
            <span class="text-2xl sm:text-3xl font-mono font-bold text-[#D4AF37] block">430+</span>
            <span class="text-[0.68rem] font-mono text-[#F8FAFC]/60 uppercase tracking-wider block mt-1">Quality Checkpoints</span>
          </div>
          <div>
            <span class="text-2xl sm:text-3xl font-mono font-bold text-[#F8FAFC] block">M-30/35</span>
            <span class="text-[0.68rem] font-mono text-[#F8FAFC]/60 uppercase tracking-wider block mt-1">Minimum Concrete Batch</span>
          </div>
          <div>
            <span class="text-2xl sm:text-3xl font-mono font-bold text-[#38BDF8] block">Fe-550D</span>
            <span class="text-[0.68rem] font-mono text-[#F8FAFC]/60 uppercase tracking-wider block mt-1">Super Ductile Steel</span>
          </div>
          <div>
            <span class="text-2xl sm:text-3xl font-mono font-bold text-[#10B981] block">100%</span>
            <span class="text-[0.68rem] font-mono text-[#F8FAFC]/60 uppercase tracking-wider block mt-1">In-House Supervision</span>
          </div>
        </div>

        <button 
          (click)="dataService.openConsultationModal('Structural Quality Audit Request')"
          class="luxury-btn bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] hover:from-[#1E40AF] hover:to-[#1D4ED8] text-white px-6 py-3 rounded-full font-mono text-xs uppercase font-semibold tracking-wider whitespace-nowrap shadow-lg shadow-[#1D4ED8]/30 border border-[#38BDF8]/40 flex-shrink-0 cursor-pointer"
        >
          Request Structural Spec Sheet &rarr;
        </button>
      </div>

    </section>
  `
})
export class PartnersComponent {
  readonly dataService = inject(ConstructionDataService);
  readonly standards: EngineeringStandard[] = this.dataService.engineeringStandards;
}
