import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructionDataService } from '../../services/construction-data.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-12 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto z-10">
      <!-- Sacred Invocation & Sector-67 Eyebrow -->
      <div class="space-y-3">
        <div class="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#0E0E0C]/80 backdrop-blur-md">
          <span class="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping"></span>
          <span class="text-xs font-hindi text-[#D4AF37] font-semibold tracking-wider">
            {{ dataService.invocation }}
          </span>
          <span class="text-xs font-mono text-[#F7F4EE]/40">|</span>
          <span class="text-[0.68rem] font-mono tracking-widest uppercase text-[#F7F4EE]/80">
            Sector-67, Soho Precision Tower, Gurugram
          </span>
        </div>

        <div class="text-[0.72rem] font-mono tracking-[0.24em] uppercase text-[#D97746] flex items-center gap-3">
          <span class="w-8 h-8 h-[1px] bg-gradient-to-r from-[#B5562C] to-transparent"></span>
          <span>Master Turnkey Builder & General Contractor</span>
        </div>
      </div>

      <!-- Main Typographic Hero Statement (Vidastu Inspired) -->
      <div class="my-auto py-8 max-w-4xl">
        <h1 class="font-display font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F7F4EE] leading-[0.95] mb-6">
          <span>We <em class="italic font-normal text-[#D97746]">build</em> on your plot.</span>
          <br />
          <span>We <em class="italic font-normal text-[#D4AF37]">guarantee</em> the quality.</span>
        </h1>

        <p class="font-display italic text-lg sm:text-2xl text-[#F7F4EE]/75 max-w-2xl leading-relaxed mb-8">
          One named desk, 25+ years of engineering pedigree. Led by <strong class="text-[#F7F4EE] font-medium not-italic">Naveen Sharma</strong>, Krishna Construction executes turnkey luxury homes, Stilt+4 independent floors, and architectural sanctions from drawings to keys across Gurugram with 100% transparent Cost-Plus billing.
        </p>

        <!-- CTA Action Cluster -->
        <div class="flex flex-wrap items-center gap-4">
          <a 
            href="#calculator" 
            class="luxury-btn bg-[#B5562C] hover:bg-[#97431F] text-[#F7F4EE] px-7 py-4 rounded font-mono text-xs font-semibold tracking-wider flex items-center gap-3 shadow-xl shadow-[#B5562C]/25 border border-[#B5562C]"
          >
            <span>Estimate Construction Cost</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>

          <a 
            href="#packages" 
            class="luxury-btn border border-[#D4AF37]/50 hover:border-[#D4AF37] bg-[#0E0E0C]/70 hover:bg-[#1A1916] text-[#D4AF37] px-6 py-4 rounded font-mono text-xs font-semibold tracking-wider flex items-center gap-3 backdrop-blur-md"
          >
            <span>View Turnkey Packages</span>
          </a>

          <a 
            [href]="'tel:+91' + dataService.primaryPhone" 
            class="luxury-btn text-[#F7F4EE]/80 hover:text-[#FFF] px-4 py-4 font-mono text-xs flex items-center gap-2"
          >
            <span class="w-2 h-2 rounded-full bg-[#6B7A5C]"></span>
            <span>Call Desk: +91 {{ dataService.primaryPhone }}</span>
          </a>
        </div>
      </div>

      <!-- Certified Primary Materials Ribbon -->
      <div class="pt-6 border-t border-[#F7F4EE]/10">
        <p class="text-[0.65rem] font-mono uppercase tracking-[0.2em] text-[#F7F4EE]/40 mb-3">
          100% Certified Primary Material Alliances:
        </p>
        
        <div class="flex flex-wrap items-center gap-6 sm:gap-10 text-xs font-mono uppercase tracking-wider text-[#F7F4EE]/70">
          <div class="flex items-center gap-2 text-[#F7F4EE] font-bold">
            <span class="text-[#D4AF37] font-display text-base">Tata Tiscon</span>
            <span class="text-[0.6rem] text-[#D4AF37] px-1.5 py-0.5 border border-[#D4AF37]/40 rounded">Fe-550D</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[#D4AF37] font-display text-base">UltraTech</span>
            <span class="text-[0.6rem] text-[#F7F4EE]/40">M-30 Concrete</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[#D4AF37] font-display text-base">JSW Steel</span>
            <span class="text-[0.6rem] text-[#F7F4EE]/40">Neosteel Rebars</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[#D4AF37] font-display text-base">Asian Paints</span>
            <span class="text-[0.6rem] text-[#F7F4EE]/40">Royale Luxury</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[#D4AF37] font-display text-base">Jaquar</span>
            <span class="text-[0.6rem] text-[#F7F4EE]/40">Bath Fittings</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[#D4AF37] font-display text-base">Dr. Fixit</span>
            <span class="text-[0.6rem] text-[#F7F4EE]/40">Waterproofing</span>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  readonly dataService = inject(ConstructionDataService);
}
