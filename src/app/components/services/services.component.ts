import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructionDataService } from '../../services/construction-data.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="services" class="py-7 sm:py-9 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
      <!-- Section Tagline & Header -->
      <div class="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
        <div>
          <div class="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#38BDF8] mb-2">
            <span class="w-6 h-[1px] bg-[#1D4ED8]"></span>
            <span>Master Builder Disciplines</span>
          </div>

          <h2 class="text-3xl sm:text-4xl md:text-5xl font-display font-light text-[#F8FAFC] leading-tight max-w-3xl">
            Comprehensive Turnkey Construction, <span class="italic text-[#D4AF37]">Architecture & Renovations</span>.
          </h2>

          <p class="text-sm sm:text-base text-[#F8FAFC]/75 font-light max-w-2xl mt-1.5">
            Single-point residential design-build on your Gurugram plot: monolithic Stilt+4 floors, municipal DTCP sanctions, and luxury structural renovations.
          </p>
        </div>

        <button 
          (click)="dataService.openConsultationModal('Construction Scope Consultation')"
          class="luxury-btn bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] hover:from-[#1E40AF] hover:to-[#1D4ED8] text-white px-6 py-3 rounded-full font-mono text-xs uppercase font-semibold tracking-wider whitespace-nowrap shadow-lg shadow-[#1D4ED8]/30 border border-[#38BDF8]/40 flex-shrink-0 cursor-pointer"
        >
          Discuss Your Plot Scope &rarr;
        </button>
      </div>

      <!-- 3 Split Service Pillars -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        @for (service of dataService.servicePillars; track service.id; let i = $index) {
          <div class="glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-[#D4AF37]/20 hover:border-[#38BDF8]/60 transition-all duration-500 relative group overflow-hidden bg-[#0B1019]">
            <!-- Accent Top Line -->
            <div 
              class="absolute top-0 left-0 right-0 h-1 transition-all duration-500"
              [style.backgroundColor]="service.accentColor"
            ></div>

            <div>
              <!-- Pillar Number & Tag -->
              <div class="flex items-center justify-between gap-4 mb-6">
                <span class="text-3xl font-display font-light text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors">
                  0{{ i + 1 }}
                </span>
                <span class="text-[0.68rem] font-hindi text-[#D4AF37] tracking-wider">
                  {{ service.hindiTitle }}
                </span>
              </div>

              <!-- Title & Subtitle -->
              <h3 class="text-2xl font-display font-normal text-[#F7F4EE] mb-2 leading-snug">
                {{ service.title }}
              </h3>
              
              <p class="text-xs font-mono text-[#D97746] uppercase tracking-wider mb-5">
                {{ service.subtitle }}
              </p>

              <p class="text-sm text-[#F7F4EE]/75 font-light leading-relaxed mb-6">
                {{ service.description }}
              </p>

              <!-- Technical Specifications Table -->
              <div class="mb-6 bg-[#080807]/70 rounded-xl p-4 border border-[#F7F4EE]/10 space-y-2">
                @for (spec of service.specifications; track spec.label) {
                  <div class="flex items-center justify-between text-[0.72rem] font-mono border-b border-[#F7F4EE]/5 pb-1.5 last:border-0 last:pb-0">
                    <span class="text-[#F7F4EE]/50">{{ spec.label }}</span>
                    <span class="text-[#F7F4EE] font-medium">{{ spec.detail }}</span>
                  </div>
                }
              </div>

              <!-- Feature Checkpoints -->
              <div class="space-y-2 mb-6">
                @for (feature of service.features; track feature) {
                  <div class="flex items-start gap-2 text-xs font-mono text-[#F7F4EE]/85">
                    <span class="text-[#6B7A5C] font-bold mt-0.5">✓</span>
                    <span>{{ feature }}</span>
                  </div>
                }
              </div>
            </div>

            <!-- CTA Button -->
            <div class="pt-4 border-t border-[#F7F4EE]/10">
              <button 
                (click)="dataService.openConsultationModal(service.title)"
                class="w-full py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#080807] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book Site Consultation</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </button>
            </div>
          </div>
        }
      </div>
    </section>
  `
})
export class ServicesComponent {
  readonly dataService = inject(ConstructionDataService);
}
