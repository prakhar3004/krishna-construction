import { Component, signal, ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';
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

      <!-- Interactive Split Visualizer Container (Real Imagery) -->
      <div 
        #sliderContainer
        class="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] rounded-2xl overflow-hidden select-none border-2 border-[#D4AF37]/40 shadow-2xl cursor-ew-resize bg-[#080807]"
        (mousedown)="startDrag($event)"
        (touchstart)="startDrag($event)"
      >
        <!-- LAYER 1 (BASE / RIGHT): BEFORE - Real Unrenovated Builder Floor Photo -->
        <div class="absolute inset-0 w-full h-full overflow-hidden">
          <img 
            src="/images/renovation_before.jpg" 
            alt="Before Structural Renovation - 15-Year Old Builder Floor" 
            class="w-full h-full object-cover object-center pointer-events-none select-none"
          />
          <!-- Ambient Vignette -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none"></div>

          <!-- Top-Right Pill -->
          <div class="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 pointer-events-none">
            <span class="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-black/85 text-[#D97746] border border-[#B5562C]/70 backdrop-blur-md shadow-xl">
              BEFORE: 15-Year Old Raw Layout
            </span>
          </div>

          <!-- Bottom-Right Specs Card -->
          <div class="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 max-w-xs sm:max-w-sm bg-black/85 backdrop-blur-xl p-4 sm:p-5 rounded-xl border border-white/15 space-y-1.5 shadow-2xl z-10 pointer-events-none">
            <h4 class="font-display text-sm sm:text-base text-[#D97746] font-medium">
              Pre-Renovation Flaws:
            </h4>
            <ul class="text-[0.72rem] sm:text-xs font-mono text-white/80 space-y-1">
              <li>&bull; Yellowed peeling plaster & damp wall seepage</li>
              <li>&bull; Corroded GI plumbing & dangling wire conduits</li>
              <li>&bull; Dull cracked mosaic terrazzo floor</li>
              <li>&bull; Low ceiling with outdated hanging fan</li>
            </ul>
          </div>
        </div>

        <!-- LAYER 2 (CLIPPED OVERLAY / LEFT): AFTER - Real Luxury Transformed Photo -->
        <div 
          class="absolute inset-0 h-full overflow-hidden border-r-2 border-[#D4AF37] z-20"
          [style.width.%]="sliderPosition()"
        >
          <!-- Fixed-width inner image wrapper maintains pixel-perfect scale with background -->
          <div 
            class="absolute top-0 left-0 h-full overflow-hidden pointer-events-none"
            [style.width.px]="containerWidth()"
          >
            <img 
              src="/images/renovation_after.jpg" 
              alt="After Krishna Construction Luxury Renovation" 
              class="w-full h-full object-cover object-center max-w-none pointer-events-none select-none"
            />
            <!-- Ambient Vignette -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none"></div>
          </div>

          <!-- Top-Left Pill -->
          <div class="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 whitespace-nowrap pointer-events-none">
            <span class="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-black/85 text-[#D4AF37] border border-[#D4AF37]/80 backdrop-blur-md shadow-xl">
              AFTER: Krishna Signature Handover
            </span>
          </div>

          <!-- Bottom-Left Specs Card -->
          <div class="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 max-w-xs sm:max-w-sm bg-black/85 backdrop-blur-xl p-4 sm:p-5 rounded-xl border border-[#D4AF37]/50 space-y-1.5 shadow-2xl z-10 pointer-events-none">
            <h4 class="font-display text-sm sm:text-base text-[#D4AF37] font-medium">
              Revamped Luxury Estate:
            </h4>
            <ul class="text-[0.72rem] sm:text-xs font-mono text-white/95 space-y-1">
              <li>✓ Book-matched Italian Statuario marble slabs</li>
              <li>✓ Fluted teak wood panelling & modern chandelier</li>
              <li>✓ DGU acoustic thermal soundproof glass doors</li>
              <li>✓ Smart KNX automation & concealed German piping</li>
            </ul>
          </div>
        </div>

        <!-- Draggable Golden Divider Line & Handle -->
        <div 
          class="absolute top-0 bottom-0 w-[3px] bg-[#D4AF37] cursor-ew-resize z-30 shadow-[0_0_25px_#D4AF37]"
          [style.left.%]="sliderPosition()"
        >
          <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#0E0E0C] border-2 border-[#D4AF37] flex items-center justify-center shadow-2xl text-[#D4AF37] hover:scale-110 transition-transform">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
            </svg>
          </div>
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
export class RenovationVisualizerComponent implements AfterViewInit {
  @ViewChild('sliderContainer') sliderContainer!: ElementRef<HTMLDivElement>;

  readonly sliderPosition = signal<number>(50);
  readonly containerWidth = signal<number>(1000);
  private isDragging = false;

  ngAfterViewInit(): void {
    this.measureWidth();
  }

  @HostListener('window:resize')
  measureWidth(): void {
    if (this.sliderContainer) {
      this.containerWidth.set(this.sliderContainer.nativeElement.getBoundingClientRect().width);
    }
  }

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
