import { Component, signal, ElementRef, ViewChild, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructionDataService } from '../../services/construction-data.service';

@Component({
  selector: 'app-renovation-visualizer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="visualizer" class="pt-6 pb-4 sm:pt-8 sm:pb-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      <!-- Section Header: Clean & Concise -->
      <div class="mb-3 flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <span class="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
            Real Transformation &middot; Gurugram
          </span>
          <h2 class="mt-1.5 text-xl sm:text-2xl lg:text-3xl font-display font-semibold text-[#F8FAFC] tracking-tight m-0">
            Before &amp; After: <span class="text-[#D4AF37]">Execution Mastery</span>
          </h2>
          <p class="mt-1 text-xs sm:text-sm text-[#F8FAFC]/75 max-w-2xl leading-relaxed m-0 font-light">
            Slide horizontally to inspect actual transformation &mdash; from raw stripped walls to a bespoke luxury living suite.
          </p>
        </div>

        <!-- Indicator Badges -->
        <div class="flex items-center gap-2 text-xs font-mono flex-shrink-0">
          <span class="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm text-[11px]">
            <span class="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span>AFTER (Handover)</span>
          </span>
          <span class="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0B1019] text-[#38BDF8] border border-[#38BDF8]/40 shadow-sm text-[11px]">
            <span class="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
            <span>BEFORE (Raw Stage)</span>
          </span>
        </div>
      </div>

      <!-- Interactive Split Visualizer Container -->
      <div 
        #sliderContainer
        class="relative w-full h-[260px] sm:h-[340px] lg:h-[380px] rounded-2xl overflow-hidden select-none border border-[#D4AF37]/35 shadow-2xl cursor-ew-resize bg-[#070A0F] touch-none"
        (mousedown)="startDrag($event)"
        (touchstart)="startDrag($event)"
      >
        <!-- BASE IMAGE: BEFORE -->
        <img 
          [src]="project.beforeImg" 
          [alt]="project.beforeLabel" 
          class="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none"></div>

        <!-- Top-Right Pill (BEFORE) -->
        <div class="absolute top-3 right-3 z-10 pointer-events-none">
          <span class="px-2.5 py-0.5 rounded-full text-[0.62rem] font-mono uppercase tracking-wider bg-[#070A0F]/90 text-[#38BDF8] border border-[#38BDF8]/60 backdrop-blur-md shadow whitespace-nowrap">
            BEFORE: {{ project.beforeLabel }}
          </span>
        </div>

        <!-- CLIPPED IMAGE: AFTER -->
        <div 
          class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          [style.clip-path]="'polygon(0 0, ' + sliderPosition() + '% 0, ' + sliderPosition() + '% 100%, 0 100%)'"
        >
          <img 
            [src]="project.afterImg" 
            [alt]="project.afterLabel" 
            class="w-full h-full object-cover object-center pointer-events-none select-none"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none"></div>
        </div>

        <!-- Top-Left Pill (AFTER) -->
        <div class="absolute top-3 left-3 z-10 pointer-events-none">
          <span class="px-2.5 py-0.5 rounded-full text-[0.62rem] font-mono uppercase tracking-wider bg-[#070A0F]/90 text-[#D4AF37] border border-[#D4AF37]/80 backdrop-blur-md shadow whitespace-nowrap">
            AFTER: {{ project.afterLabel }}
          </span>
        </div>

        <!-- Draggable Handle Bar -->
        <div 
          class="absolute top-0 bottom-0 w-[2px] sm:w-[3px] bg-[#D4AF37] cursor-ew-resize z-30 shadow-[0_0_15px_#D4AF37]"
          [style.left]="sliderPosition() + '%'"
        >
          <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#070A0F] border-2 border-[#D4AF37] flex items-center justify-center shadow-2xl text-[#D4AF37] hover:scale-110 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- SPECS COMPARISON CARDS: Clean, uncluttered details -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        <!-- After Specs Card -->
        <div class="p-3 sm:p-3.5 rounded-xl bg-[#0B1019] border border-[#D4AF37]/35 shadow-lg space-y-1.5">
          <div class="flex items-center justify-between">
            <h4 class="font-display text-xs sm:text-sm text-[#D4AF37] font-semibold flex items-center gap-1.5 m-0">
              <span class="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
              Delivered Handover (After)
            </h4>
            <span class="text-[0.62rem] font-mono text-[#F8FAFC]/60">{{ project.duration }}</span>
          </div>
          <ul class="text-xs font-mono text-[#F8FAFC]/85 space-y-1 pt-0.5 m-0 list-none pl-0">
            @for (note of project.afterNotes; track note) {
              <li class="flex items-start gap-1.5">
                <span class="text-[#D4AF37] font-bold">✓</span>
                <span class="text-[11px]">{{ note }}</span>
              </li>
            }
          </ul>
        </div>

        <!-- Before Specs Card -->
        <div class="p-3 sm:p-3.5 rounded-xl bg-[#0B1019] border border-[#38BDF8]/25 shadow-lg space-y-1.5">
          <div class="flex items-center justify-between">
            <h4 class="font-display text-xs sm:text-sm text-[#38BDF8] font-semibold flex items-center gap-1.5 m-0">
              <span class="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
              Initial Raw Stage (Before)
            </h4>
            <span class="text-[0.62rem] font-mono text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-0.5 rounded-full">{{ project.location }}</span>
          </div>
          <ul class="text-xs font-mono text-[#F8FAFC]/70 space-y-1 pt-0.5 m-0 list-none pl-0">
            @for (note of project.beforeNotes; track note) {
              <li class="flex items-start gap-1.5">
                <span class="text-[#38BDF8] font-bold">&bull;</span>
                <span class="text-[11px]">{{ note }}</span>
              </li>
            }
          </ul>
        </div>
      </div>

      <!-- Direct WhatsApp CTA for Renovation & Construction -->
      <div class="mt-4 text-center">
        <a 
          [href]="dataService.getWhatsAppUrl('Hello Naveen Ji, I saw your Before & After living room transformation and would like to get a quote for my house renovation / construction.')"
          target="_blank"
          class="luxury-btn inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-black px-5 py-2.5 rounded-full font-mono text-xs uppercase font-bold shadow-lg transition-all"
        >
          <span>Get WhatsApp Quote for Your Project</span>
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/>
          </svg>
        </a>
      </div>

    </section>
  `
})
export class RenovationVisualizerComponent {
  readonly dataService = inject(ConstructionDataService);
  @ViewChild('sliderContainer') sliderContainer!: ElementRef<HTMLDivElement>;

  readonly sliderPosition = signal<number>(50);
  private isDragging = false;

  readonly project = {
    title: 'Full Living Hall Transformation',
    category: 'Luxury Interior Renovation',
    location: 'Sector 57, Gurugram',
    duration: 'Delivered Handover',
    beforeImg: 'images/renovation_before.jpg',
    beforeLabel: 'Raw Stripped Room',
    beforeNotes: [
      'Bare unplastered brick/concrete walls with dangling surface wiring',
      'Outdated low-height ceiling without ambient recessed lighting',
      'Uneven base floor lacking moisture barrier and luxury tiling'
    ],
    afterImg: 'images/renovation_after.jpg',
    afterLabel: 'Complete Luxury Handover',
    afterNotes: [
      'Imported Italian Botticino marble flooring with diamond-grit mirror polish',
      'Bespoke designer false ceiling with perimeter warm LED coves',
      'Custom wall mouldings, luxury contemporary furnishings and chandelier'
    ]
  };

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
