import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConstructionDataService } from '../../services/construction-data.service';

@Component({
  selector: 'app-cost-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="calculator" class="py-7 sm:py-9 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
      <!-- Section Title -->
      <div class="mb-5">
        <div class="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#38BDF8] mb-2">
          <span class="w-6 h-[1px] bg-[#1D4ED8]"></span>
          <span>Transparent Pricing Engine</span>
        </div>

        <h2 class="text-3xl sm:text-4xl md:text-5xl font-display font-light text-[#F8FAFC] leading-tight max-w-3xl mb-2">
          Interactive <span class="italic text-[#D4AF37]">Plot Construction Cost</span> Estimator.
        </h2>

        <p class="text-sm sm:text-base text-[#F8FAFC]/75 font-light max-w-2xl">
          Calibrated to 2026 Gurugram benchmark rates (Golf Course Extn, Sector 67, SPR & New Gurgaon). Calculate turnkey construction budgets with guaranteed zero cost escalations.
        </p>
      </div>

      <!-- Main Calculator Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Controls Column (7 cols) -->
        <div class="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-7 border border-[#D4AF37]/25 space-y-6">
          <!-- 1. Plot Size (Sq. Yards) -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <label class="font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                1. Select Plot Size (Sq. Yards)
              </label>
              <span class="font-mono text-xs text-[#F7F4EE]/60">
                {{ dataService.selectedPlotSqYards() }} Sq. Yds ({{ dataService.selectedPlotSqYards() * 9 }} sq.ft)
              </span>
            </div>

            <!-- Quick Pill Buttons -->
            <div class="grid grid-cols-5 gap-2 mb-4">
              @for (size of plotPresets; track size) {
                <button 
                  type="button"
                  (click)="dataService.selectedPlotSqYards.set(size)"
                  class="py-2.5 rounded text-xs font-mono tracking-wider transition-all duration-300"
                  [class.bg-[#D4AF37]]="dataService.selectedPlotSqYards() === size"
                  [class.text-[#080807]]="dataService.selectedPlotSqYards() === size"
                  [class.font-bold]="dataService.selectedPlotSqYards() === size"
                  [class.bg-[#080807]]="dataService.selectedPlotSqYards() !== size"
                  [class.border]="dataService.selectedPlotSqYards() !== size"
                  [class.border-[#F7F4EE]/10]="dataService.selectedPlotSqYards() !== size"
                  [class.text-[#F7F4EE]/80]="dataService.selectedPlotSqYards() !== size"
                >
                  {{ size }}
                </button>
              }
            </div>

            <!-- Range Slider for Fine-Tuning -->
            <input 
              type="range" 
              min="100" 
              max="1000" 
              step="25"
              [ngModel]="dataService.selectedPlotSqYards()" 
              (ngModelChange)="dataService.selectedPlotSqYards.set($event)"
              class="w-full accent-[#D4AF37] h-1.5 bg-[#1F1E1B] rounded-lg cursor-pointer"
            />
          </div>

          <!-- 2. Floors Planned -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <label class="font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                2. Select Floor Structure
              </label>
              <span class="font-mono text-xs text-[#F7F4EE]/60">
                {{ getFloorLabel(dataService.selectedFloors()) }}
              </span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              @for (f of floorOptions; track f.count) {
                <button 
                  type="button"
                  (click)="dataService.selectedFloors.set(f.count)"
                  class="p-3 rounded-lg border text-left transition-all duration-300 flex flex-col justify-between h-20"
                  [class.border-[#D4AF37]]="dataService.selectedFloors() === f.count"
                  [class.bg-[#D4AF37]/10]="dataService.selectedFloors() === f.count"
                  [class.border-[#F7F4EE]/10]="dataService.selectedFloors() !== f.count"
                  [class.bg-[#080807]]="dataService.selectedFloors() !== f.count"
                >
                  <span class="text-xs font-mono font-semibold" [class.text-[#D4AF37]]="dataService.selectedFloors() === f.count">
                    {{ f.title }}
                  </span>
                  <span class="text-[0.68rem] text-[#F7F4EE]/50">
                    {{ f.sub }}
                  </span>
                </button>
              }
            </div>
          </div>

          <!-- 3. Finish Grade -->
          <div>
            <label class="font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-3">
              3. Select Finishing Specification Tier
            </label>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <!-- Standard -->
              <button 
                type="button"
                (click)="dataService.selectedTier.set('standard')"
                class="p-4 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between"
                [class.border-[#D4AF37]]="dataService.selectedTier() === 'standard'"
                [class.bg-[#D4AF37]/10]="dataService.selectedTier() === 'standard'"
                [class.border-[#F7F4EE]/10]="dataService.selectedTier() !== 'standard'"
                [class.bg-[#080807]]="dataService.selectedTier() !== 'standard'"
              >
                <div>
                  <span class="text-xs font-mono uppercase tracking-wider block font-bold text-[#F7F4EE]">Standard</span>
                  <span class="text-sm font-display text-[#D4AF37] font-semibold mt-1 block">₹1,950 / sq.ft</span>
                </div>
                <p class="text-[0.7rem] text-[#F7F4EE]/60 mt-2 font-light">
                  UltraTech cement, Tata Tiscon steel, vitrified tiles & premium standard fittings.
                </p>
              </button>

              <!-- Luxury -->
              <button 
                type="button"
                (click)="dataService.selectedTier.set('luxury')"
                class="p-4 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                [class.border-[#D4AF37]]="dataService.selectedTier() === 'luxury'"
                [class.bg-[#D4AF37]/10]="dataService.selectedTier() === 'luxury'"
                [class.border-[#F7F4EE]/10]="dataService.selectedTier() !== 'luxury'"
                [class.bg-[#080807]]="dataService.selectedTier() !== 'luxury'"
              >
                <span class="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[0.55rem] font-mono uppercase bg-[#B5562C] text-[#FFF]">Most Popular</span>
                <div>
                  <span class="text-xs font-mono uppercase tracking-wider block font-bold text-[#F7F4EE]">Luxury</span>
                  <span class="text-sm font-display text-[#D4AF37] font-semibold mt-1 block">₹2,850 / sq.ft</span>
                </div>
                <p class="text-[0.7rem] text-[#F7F4EE]/60 mt-2 font-light">
                  Italian Botticino touch, teak doors, Grohe/Kohler CP, designer false ceiling.
                </p>
              </button>

              <!-- Ultra Luxury -->
              <button 
                type="button"
                (click)="dataService.selectedTier.set('ultra-luxury')"
                class="p-4 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between"
                [class.border-[#D4AF37]]="dataService.selectedTier() === 'ultra-luxury'"
                [class.bg-[#D4AF37]/10]="dataService.selectedTier() === 'ultra-luxury'"
                [class.border-[#F7F4EE]/10]="dataService.selectedTier() !== 'ultra-luxury'"
                [class.bg-[#080807]]="dataService.selectedTier() !== 'ultra-luxury'"
              >
                <div>
                  <span class="text-xs font-mono uppercase tracking-wider block font-bold text-[#F7F4EE]">Ultra Luxury</span>
                  <span class="text-sm font-display text-[#D4AF37] font-semibold mt-1 block">₹4,200 / sq.ft</span>
                </div>
                <p class="text-[0.7rem] text-[#F7F4EE]/60 mt-2 font-light">
                  Statuario marble throughout, VRV AC, home elevator, smart KNX home, heated terrace pool.
                </p>
              </button>
            </div>
          </div>
        </div>

        <!-- Output & Instant Quote Summary (5 cols) -->
        <div class="lg:col-span-5 glass-card rounded-2xl p-7 sm:p-9 border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden bg-gradient-to-b from-[#161512] to-[#0A0A08]">
          <!-- Corner Ambient Light -->
          <div class="absolute -top-12 -right-12 w-40 h-40 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none"></div>

          <div class="flex items-center justify-between pb-4 border-b border-[#F7F4EE]/10 mb-6">
            <span class="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              Turnkey Cost Estimate
            </span>
            <span class="text-[0.65rem] font-mono text-[#6B7A5C] bg-[#6B7A5C]/15 px-2 py-0.5 rounded border border-[#6B7A5C]/30">
              Gurugram 2026 Rates
            </span>
          </div>

          <!-- Big Price Output -->
          <div class="mb-6">
            <span class="text-xs font-mono text-[#F7F4EE]/50 uppercase tracking-widest block mb-1">
              Estimated Project Investment
            </span>
            <div class="text-4xl sm:text-5xl font-display font-medium text-[#F7F4EE] tracking-tight">
              ₹{{ formatCrore(res().totalCost) }}
              <span class="text-xl sm:text-2xl font-normal text-[#D4AF37]">
                {{ res().totalCost >= 10000000 ? 'Crore' : 'Lakhs' }}
              </span>
            </div>
            <div class="text-xs font-mono text-[#D97746] mt-1">
              ≈ ₹{{ res().ratePerSqFt.toLocaleString() }} per sq.ft built-up
            </div>
          </div>

          <!-- Key Metrics Pills -->
          <div class="grid grid-cols-2 gap-3 mb-6">
            <div class="bg-[#080807] p-3 rounded-lg border border-[#F7F4EE]/10">
              <span class="text-[0.65rem] font-mono text-[#F7F4EE]/50 block uppercase">Total Built-Up Area</span>
              <span class="text-base font-display text-[#F7F4EE] font-semibold mt-0.5 block">
                {{ res().totalBuiltUpSqFt.toLocaleString() }} sq.ft
              </span>
            </div>

            <div class="bg-[#080807] p-3 rounded-lg border border-[#F7F4EE]/10">
              <span class="text-[0.65rem] font-mono text-[#F7F4EE]/50 block uppercase">Estimated Delivery</span>
              <span class="text-base font-display text-[#D4AF37] font-semibold mt-0.5 block">
                ~{{ res().durationMonths }} Months
              </span>
            </div>
          </div>

          <!-- Component Cost Breakdown -->
          <div class="space-y-2.5 mb-8 pb-6 border-b border-[#F7F4EE]/10 text-xs font-mono">
            <span class="text-[0.65rem] font-mono uppercase tracking-widest text-[#F7F4EE]/50 block mb-2">
              Itemized Allocation Breakdown:
            </span>

            <div class="flex items-center justify-between">
              <span class="text-[#F7F4EE]/70">Civil Structure & Concrete (46%)</span>
              <span class="text-[#F7F4EE]">₹{{ formatLakhs(res().breakdown.civilAndStructure) }} L</span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-[#F7F4EE]/70">Flooring, Marble & Finishes (24%)</span>
              <span class="text-[#F7F4EE]">₹{{ formatLakhs(res().breakdown.finishingAndFlooring) }} L</span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-[#F7F4EE]/70">MEP, Sanitary & Concealed Wire (14%)</span>
              <span class="text-[#F7F4EE]">₹{{ formatLakhs(res().breakdown.mepAndElectrical) }} L</span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-[#F7F4EE]/70">Woodwork, Doors & Windows (11%)</span>
              <span class="text-[#F7F4EE]">₹{{ formatLakhs(res().breakdown.doorsWindowsWoodwork) }} L</span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-[#F7F4EE]/70">Architectural Naksha & Sanctions (5%)</span>
              <span class="text-[#F7F4EE]">₹{{ formatLakhs(res().breakdown.architecturalAndApprovals) }} L</span>
            </div>
          </div>

          <!-- Direct Actions -->
          <div class="space-y-3">
            <a 
              [href]="dataService.getCalculatorWhatsAppUrl()" 
              target="_blank"
              class="luxury-btn bg-[#25D366] hover:bg-[#1EBE5D] text-[#080807] px-6 py-3.5 rounded font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 w-full shadow-lg shadow-[#25D366]/20 transition-all"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.073.043.419-.101.824z"/>
              </svg>
              <span>Send Estimate to Naveen Sharma (WhatsApp)</span>
            </a>

            <button 
              (click)="dataService.openConsultationModal('Book On-Site Plot Inspection')"
              class="luxury-btn border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#D4AF37] hover:text-[#FFF] px-6 py-3 rounded font-mono text-xs tracking-wider w-full justify-center"
            >
              Book On-Site Soil & Plot Inspection
            </button>
          </div>
        </div>
      </div>
    </section>
  `
})
export class CostCalculatorComponent {
  readonly dataService = inject(ConstructionDataService);
  readonly res = this.dataService.calculationResult;

  readonly plotPresets = [150, 250, 350, 500, 1000];

  readonly floorOptions = [
    { count: 2, title: 'G + 1 Villa', sub: 'Compact Duplex' },
    { count: 3, title: 'G + 2 Floors', sub: 'Independent Villa' },
    { count: 4, title: 'Stilt + 4 Floors', sub: 'Gurugram Standard' },
    { count: 5, title: 'Basement + S+4', sub: 'Full Built Potential' }
  ];

  getFloorLabel(count: number): string {
    const found = this.floorOptions.find(f => f.count === count);
    return found ? `${found.title} (${count} Floors)` : `${count} Floors`;
  }

  formatCrore(total: number): string {
    if (total >= 10000000) {
      return (total / 10000000).toFixed(2);
    }
    return (total / 100000).toFixed(1);
  }

  formatLakhs(amount: number): string {
    return (amount / 100000).toFixed(1);
  }
}
