import { Component, signal, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-renovation-visualizer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="visualizer" class="py-7 sm:py-9 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
      
      <!-- Section Header -->
      <div class="mb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#38BDF8] mb-2">
            <span class="w-6 h-[1px] bg-[#1D4ED8]"></span>
            <span>Real Gurugram Transformation</span>
          </div>

          <h2 class="text-3xl sm:text-4xl md:text-5xl font-display font-light text-[#F8FAFC] leading-tight max-w-3xl mb-2">
            Before & After: <span class="italic text-[#D4AF37]">Structural Renovation</span> Mastery.
          </h2>

          <p class="text-sm sm:text-base text-[#F8FAFC]/75 font-light max-w-2xl">
            Drag the golden divider horizontally to see an unrenovated 15-year-old builder floor transformed into an ultra-luxury contemporary estate with Italian marble & acoustic glazing.
          </p>
        </div>

        <!-- Static Indicator Badges -->
        <div class="flex items-center gap-3 font-mono text-xs">
          <span class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/50 shadow-md">
            <span class="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span>AFTER: Luxury Handover</span>
          </span>

          <span class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0E0E0C] text-[#F7F4EE]/70 border border-[#F7F4EE]/20 shadow-md">
            <span class="w-2 h-2 rounded-full bg-[#B5562C]"></span>
            <span>BEFORE: Dilapidated Shell</span>
          </span>
        </div>
      </div>

      <!-- Interactive Split Visualizer Container (Pure CSS clip-path, zero overflow) -->
      <div 
        #sliderContainer
        class="relative w-full h-[280px] sm:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden select-none border-2 border-[#D4AF37]/40 shadow-2xl cursor-ew-resize bg-[#070A0F] touch-none"
        (mousedown)="startDrag($event)"
        (touchstart)="startDrag($event)"
      >
        <!-- BASE IMAGE: BEFORE (15-Year Old Raw Layout) -->
        <img 
          src="/images/renovation_before.jpg" 
          alt="Before Structural Renovation - 15-Year Old Builder Floor" 
          class="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/35 pointer-events-none"></div>

        <!-- Top-Right Pill -->
        <div class="absolute top-3 sm:top-5 right-3 sm:right-5 z-10 pointer-events-none">
          <span class="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[0.62rem] sm:text-xs font-mono uppercase tracking-wider bg-[#070A0F]/90 text-[#38BDF8] border border-[#38BDF8]/60 backdrop-blur-md shadow-lg whitespace-nowrap">
            BEFORE: Raw Shell
          </span>
        </div>

        <!-- CLIPPED IMAGE: AFTER (Krishna Signature Luxury Handover) -->
        <div 
          class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          [style.clip-path]="'polygon(0 0, ' + sliderPosition() + '% 0, ' + sliderPosition() + '% 100%, 0 100%)'"
        >
          <img 
            src="/images/renovation_after.jpg" 
            alt="After Krishna Construction Luxury Renovation" 
            class="w-full h-full object-cover object-center pointer-events-none select-none"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/30 pointer-events-none"></div>
        </div>

        <!-- Top-Left Pill -->
        <div class="absolute top-3 sm:top-5 left-3 sm:left-5 z-10 pointer-events-none">
          <span class="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[0.62rem] sm:text-xs font-mono uppercase tracking-wider bg-[#070A0F]/90 text-[#D4AF37] border border-[#D4AF37]/80 backdrop-blur-md shadow-lg whitespace-nowrap">
            AFTER: Luxury Handover
          </span>
        </div>

        <!-- Draggable Golden Divider Line & Handle -->
        <div 
          class="absolute top-0 bottom-0 w-[2px] sm:w-[3px] bg-[#D4AF37] cursor-ew-resize z-30 shadow-[0_0_20px_#D4AF37]"
          [style.left.%]="sliderPosition()"
        >
          <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#070A0F] border-2 border-[#D4AF37] flex items-center justify-center shadow-2xl text-[#D4AF37] hover:scale-110 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- SPECS COMPARISON CARDS (Positioned below the slider: No cut-off, 100% visible photos) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-4">
        <!-- After Specs Card -->
        <div class="p-4 sm:p-5 rounded-xl bg-[#0B1019] border border-[#D4AF37]/35 shadow-lg space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="font-display text-sm sm:text-base text-[#D4AF37] font-semibold flex items-center gap-2 m-0">
              <span class="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
              Revamped Luxury Estate (After)
            </h4>
            <span class="text-[0.62rem] font-mono uppercase text-[#D4AF37] bg-[#D4AF37]/15 px-2 py-0.5 rounded-full border border-[#D4AF37]/30">Handover Standard</span>
          </div>
          <ul class="text-xs font-mono text-[#F8FAFC]/85 space-y-1.5 pt-1 m-0 list-none pl-0">
            <li class="flex items-start gap-2">
              <span class="text-[#D4AF37] font-bold">✓</span>
              <span>Book-matched Italian Statuario marble slabs &amp; acoustic thermal glass</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#D4AF37] font-bold">✓</span>
              <span>Fluted teak wood panelling, ambient cove lighting &amp; luxury chandelier</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#D4AF37] font-bold">✓</span>
              <span>Concealed German plumbing lines, Viega drainage &amp; KNX smart automation</span>
            </li>
          </ul>
        </div>

        <!-- Before Specs Card -->
        <div class="p-4 sm:p-5 rounded-xl bg-[#0B1019] border border-[#38BDF8]/25 shadow-lg space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="font-display text-sm sm:text-base text-[#38BDF8] font-semibold flex items-center gap-2 m-0">
              <span class="w-2 h-2 rounded-full bg-[#38BDF8]"></span>
              Original Dilapidated Shell (Before)
            </h4>
            <span class="text-[0.62rem] font-mono uppercase text-[#38BDF8] bg-[#38BDF8]/15 px-2 py-0.5 rounded-full border border-[#38BDF8]/30">15-Year Old Layout</span>
          </div>
          <ul class="text-xs font-mono text-[#F8FAFC]/70 space-y-1.5 pt-1 m-0 list-none pl-0">
            <li class="flex items-start gap-2">
              <span class="text-[#38BDF8] font-bold">&bull;</span>
              <span>Yellowed peeling wall plaster with heavy subterranean damp seepage</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#38BDF8] font-bold">&bull;</span>
              <span>Corroded GI plumbing, exposed electrical conduits &amp; outdated hanging fans</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#38BDF8] font-bold">&bull;</span>
              <span>Cracked mosaic terrazzo flooring with hollow air pockets &amp; poor slope</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Benchmark Metrics Strip -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-5 pt-5 border-t border-[#F8FAFC]/10 text-center sm:text-left">
        <div class="p-3.5 sm:p-4 rounded-xl bg-[#0B1019] border border-[#D4AF37]/20 shadow">
          <span class="text-2xl sm:text-3xl font-display text-[#D4AF37] font-semibold block">45-90 Days</span>
          <span class="text-[0.65rem] font-mono text-[#F8FAFC]/55 uppercase tracking-widest mt-1 block">
            Rapid Execution Turnaround
          </span>
        </div>

        <div class="p-3.5 sm:p-4 rounded-xl bg-[#0B1019] border border-[#D4AF37]/20 shadow">
          <span class="text-2xl sm:text-3xl font-display text-[#F8FAFC] font-semibold block">Zero Crack</span>
          <span class="text-[0.65rem] font-mono text-[#F8FAFC]/55 uppercase tracking-widest mt-1 block">
            Core Structural Integrity
          </span>
        </div>

        <div class="p-3.5 sm:p-4 rounded-xl bg-[#0B1019] border border-[#D4AF37]/20 shadow">
          <span class="text-2xl sm:text-3xl font-display text-[#D4AF37] font-semibold block">100%</span>
          <span class="text-[0.65rem] font-mono text-[#F8FAFC]/55 uppercase tracking-widest mt-1 block">
            Vastu Remediation Compliant
          </span>
        </div>

        <div class="p-3.5 sm:p-4 rounded-xl bg-[#0B1019] border border-[#D4AF37]/20 shadow">
          <span class="text-2xl sm:text-3xl font-display text-[#38BDF8] font-semibold block">5-Year</span>
          <span class="text-[0.65rem] font-mono text-[#F8FAFC]/55 uppercase tracking-widest mt-1 block">
            Seepage & Finish Warranty
          </span>
        </div>
      </div>

    </section>
  `
})
export class RenovationVisualizerComponent {
  @ViewChild('sliderContainer') sliderContainer!: ElementRef<HTMLDivElement>;

  readonly sliderPosition = signal<number>(50);
  private isDragging = false;

  startDrag(e: MouseEvent | TouchEvent): void {
    this.isDragging = true;
    this.updatePosition(e);
  }

  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:touchmove', ['$event'])
  onDrag(e: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;
    this.updatePosition(e);
  }

  @HostListener('window:mouseup')
  @HostListener('window:touchend')
  stopDrag(): void {
    this.isDragging = false;
  }

  private updatePosition(e: MouseEvent | TouchEvent): void {
    if (!this.sliderContainer) return;
    const rect = this.sliderContainer.nativeElement.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    this.sliderPosition.set(percentage);
  }
}
