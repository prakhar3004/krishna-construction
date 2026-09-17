import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConstructionDataService } from '../../services/construction-data.service';

interface PhaseMilestone {
  num: string;
  stage: string;
  title: string;
  desc: string;
  spec: string;
  heightRatio: number; // 0.15 to 1.0
}

@Component({
  selector: 'app-three-stage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="relative pt-8 sm:pt-10 pb-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      <!-- HERO TWO-COLUMN GRID: LEFT COPY & STATS + RIGHT QUICK QUOTE / 3D BLUEPRINT -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-start">
        
        <!-- LEFT COLUMN: BUILDHOOD EDITORIAL CONTENT & 4 STAT BOXES -->
        <div class="lg:col-span-7 space-y-3">
          
          <!-- ISO Badge (Buildhood Style) -->
          <div>
            <span class="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#0B1019] px-3 py-0.5 text-xs font-medium uppercase tracking-wide text-[#F8FAFC] shadow-sm backdrop-blur-sm">
              <svg class="h-3.5 w-3.5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              <span>ISO 9001:2015 Certified &middot; DTCP Haryana Compliant</span>
            </span>
          </div>

          <!-- Main Headline -->
          <div>
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F8FAFC] leading-[1.15] tracking-tight m-0">
              Best House Construction Company <span class="text-[#D4AF37]">in Gurugram</span>
            </h1>
            <p class="mt-1 text-base sm:text-lg font-semibold text-[#38BDF8]">
              Build Right with Krishna Construction
            </p>
          </div>

          <!-- 2-Line Crisp Description -->
          <p class="text-xs sm:text-sm leading-relaxed text-[#F8FAFC]/80 max-w-xl m-0 font-normal">
            Delivering bespoke luxury homes, independent villas, and custom multi-storey floors with transparent cost-plus construction contracts, expert architecture, and exceptional value. Gurugram's trusted home builder.
          </p>

          <!-- 3 Primary Action Buttons -->
          <div class="flex flex-wrap items-center gap-2 pt-0.5">
            <a 
              href="#packages"
              class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C4971A] hover:from-[#DFBA44] hover:to-[#D4AF37] text-[#070A0F] px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-lg shadow-[#D4AF37]/25"
            >
              <span>View Packages</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </a>

            <a 
              href="#portfolio"
              class="inline-flex items-center rounded-xl border border-[#F8FAFC]/25 hover:border-[#D4AF37] hover:text-[#D4AF37] text-[#F8FAFC] px-4 py-2.5 text-xs sm:text-sm font-medium transition-all bg-[#0B1019]/60 backdrop-blur-sm"
            >
              Our Projects
            </a>

            <a 
              [href]="dataService.getWhatsAppUrl('Hello Naveen Ji, I want to consult about house construction on my plot in Gurugram / Delhi NCR.')"
              target="_blank"
              class="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all shadow-md"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/>
              </svg>
              <span>WhatsApp</span>
            </a>

            <a 
              [href]="'tel:+91' + dataService.primaryPhone"
              class="inline-flex items-center gap-2 rounded-xl border border-[#38BDF8]/40 hover:border-[#38BDF8] text-[#38BDF8] px-3.5 py-2.5 text-xs sm:text-sm font-medium transition-all bg-[#0B1019]/60"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span>Call</span>
            </a>
          </div>

          <!-- 4 Stat Boxes (Compact & Tight) -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div class="rounded-xl border border-[#D4AF37]/20 bg-[#0B1019] p-3 text-center">
              <p class="text-xl sm:text-2xl font-extrabold text-[#D4AF37] font-mono">25+</p>
              <p class="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-[#F8FAFC]/70">Years Experience</p>
            </div>

            <div class="rounded-xl border border-[#D4AF37]/20 bg-[#0B1019] p-3 text-center">
              <p class="text-xl sm:text-2xl font-extrabold text-[#F8FAFC] font-mono">180+</p>
              <p class="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-[#F8FAFC]/70">Homes Delivered</p>
            </div>

            <div class="rounded-xl border border-[#D4AF37]/20 bg-[#0B1019] p-3 text-center">
              <p class="text-xl sm:text-2xl font-extrabold text-[#38BDF8] font-mono">100%</p>
              <p class="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-[#F8FAFC]/70">Transparent Cost</p>
            </div>

            <div class="rounded-xl border border-[#D4AF37]/20 bg-[#0B1019] p-3 text-center">
              <p class="text-xl sm:text-2xl font-extrabold text-[#D4AF37] font-mono">10-Yr</p>
              <p class="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-[#F8FAFC]/70">Structural Warranty</p>
            </div>
          </div>

        </div>

        <!-- RIGHT COLUMN: BUILDHOOD "GET A FREE QUOTE IN JUST 1 HOUR" FORM + 3D TOGGLE -->
        <div class="lg:col-span-5 w-full">
          
          <!-- Mode Switcher: Quick Quote vs 3D Blueprint -->
          <div class="flex items-center justify-end gap-2 mb-3">
            <button 
              type="button"
              (click)="rightPanelMode.set('quote')"
              class="px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase transition-all cursor-pointer"
              [class.bg-[#D4AF37]]="rightPanelMode() === 'quote'"
              [class.text-[#070A0F]]="rightPanelMode() === 'quote'"
              [class.font-bold]="rightPanelMode() === 'quote'"
              [class.text-[#F8FAFC]/60]="rightPanelMode() !== 'quote'"
              [class.bg-[#0B1019]]="rightPanelMode() !== 'quote'"
            >
              Get Quote
            </button>
            <button 
              type="button"
              (click)="rightPanelMode.set('blueprint')"
              class="px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase transition-all cursor-pointer"
              [class.bg-[#D4AF37]]="rightPanelMode() === 'blueprint'"
              [class.text-[#070A0F]]="rightPanelMode() === 'blueprint'"
              [class.font-bold]="rightPanelMode() === 'blueprint'"
              [class.text-[#F8FAFC]/60]="rightPanelMode() !== 'blueprint'"
              [class.bg-[#0B1019]]="rightPanelMode() !== 'blueprint'"
            >
              3D Blueprint
            </button>
          </div>

          <!-- PANEL A: THE BUILDHOOD 1-HOUR QUOTE FORM -->
          @if (rightPanelMode() === 'quote') {
            <div class="rounded-2xl border border-[#D4AF37]/35 bg-[#0B1019] p-4 sm:p-5 shadow-xl relative overflow-hidden">
              <div class="flex items-center justify-between pb-2.5 border-b border-[#F8FAFC]/10 mb-3">
                <div>
                  <h2 class="text-base sm:text-lg font-bold text-[#F8FAFC]">Get a Free Quote in 1 Hour</h2>
                  <p class="text-[11px] text-[#F8FAFC]/70 mt-0.5">Know your construction cost &amp; plan your home with confidence.</p>
                </div>
                <div class="w-8 h-8 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-bold text-xs">
                  ₹
                </div>
              </div>

              <form (submit)="onHeroSubmit($event)" class="space-y-3">
                <div>
                  <label class="block text-[11px] font-medium uppercase tracking-wider text-[#F8FAFC]/80 mb-1">
                    Your Name *
                  </label>
                  <input 
                    type="text" 
                    required 
                    [(ngModel)]="heroName"
                    name="heroName"
                    placeholder="e.g. Rahul Sharma" 
                    class="w-full rounded-xl border border-[#F8FAFC]/20 bg-[#070A0F] px-3 py-2 text-xs text-[#F8FAFC] placeholder:text-[#F8FAFC]/40 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label class="block text-[11px] font-medium uppercase tracking-wider text-[#F8FAFC]/80 mb-1">
                    Mobile Number *
                  </label>
                  <input 
                    type="tel" 
                    required 
                    [(ngModel)]="heroPhone"
                    name="heroPhone"
                    placeholder="10-digit mobile number" 
                    pattern="[0-9]{10}"
                    class="w-full rounded-xl border border-[#F8FAFC]/20 bg-[#070A0F] px-3 py-2 text-xs text-[#F8FAFC] placeholder:text-[#F8FAFC]/40 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label class="block text-[11px] font-medium uppercase tracking-wider text-[#F8FAFC]/80 mb-1">
                    Select Project Type *
                  </label>
                  <select 
                    [(ngModel)]="heroService"
                    name="heroService"
                    class="w-full rounded-xl border border-[#F8FAFC]/20 bg-[#070A0F] px-3 py-2 text-xs text-[#F8FAFC] focus:border-[#D4AF37] focus:outline-none transition-colors"
                  >
                    <option value="Residential Turnkey Villa">Residential Turnkey Villa / Kothi</option>
                    <option value="Independent Multi-Storey Floors">Independent Multi-Storey Floors</option>
                    <option value="Luxury Home Renovation">Luxury Home Renovation</option>
                    <option value="Architectural & Vastu Design">Architectural & Vastu Design</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  class="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C4971A] hover:from-[#DFBA44] hover:to-[#D4AF37] text-[#070A0F] text-xs font-bold uppercase tracking-wider shadow-md shadow-[#D4AF37]/20 transition-all cursor-pointer"
                >
                  Get Free Consultation &rarr;
                </button>

                <div class="flex flex-wrap items-center justify-between text-[10px] text-[#F8FAFC]/60 pt-0.5">
                  <span class="inline-flex items-center gap-1">
                    <svg class="w-3 h-3 text-[#38BDF8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    Response within 1 hour
                  </span>
                  <span class="inline-flex items-center gap-1">
                    <svg class="w-3 h-3 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    No spam &middot; Zero obligation
                  </span>
                </div>
              </form>
            </div>
          }

          <!-- PANEL B: 3D BLUEPRINT VISUALIZER -->
          @if (rightPanelMode() === 'blueprint') {
            <div class="space-y-2.5">
              <div class="relative w-full h-[280px] sm:h-[320px] rounded-2xl overflow-hidden border border-[#D4AF37]/35 shadow-2xl bg-[#0B1019]">
                <canvas #canvasRef class="absolute inset-0 w-full h-full block"></canvas>
                <div class="absolute inset-0 bg-radial-[at_50%_25%] from-[#1D4ED8]/15 via-transparent to-[#070A0F]/90 pointer-events-none"></div>

                <!-- Top HUD Badge -->
                <div class="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                  <span class="px-2.5 py-0.5 rounded-full text-[0.62rem] font-mono tracking-widest uppercase bg-[#070A0F]/90 text-[#D4AF37] border border-[#D4AF37]/40 backdrop-blur-md flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse"></span>
                    <span>3D Villa Blueprint</span>
                  </span>
                  <span class="text-[0.62rem] font-mono text-[#38BDF8] bg-[#1D4ED8]/25 px-2.5 py-0.5 rounded-full border border-[#38BDF8]/40 backdrop-blur-md font-semibold">
                    Build: {{ currentProgressPercent() }}%
                  </span>
                </div>

                <!-- Bottom Floating Phase Label -->
                <div class="absolute bottom-2.5 left-2.5 right-2.5 bg-[#070A0F]/95 backdrop-blur-md border border-[#D4AF37]/25 rounded-xl p-2.5 z-10 pointer-events-none shadow-xl">
                  <div class="flex items-center justify-between mb-0.5">
                    <span class="text-xs font-mono text-[#D4AF37] font-semibold">{{ activePhase().stage }}</span>
                    <span class="text-[0.62rem] font-mono text-[#38BDF8] font-bold uppercase">{{ activePhase().spec }}</span>
                  </div>
                  <h4 class="text-xs sm:text-sm font-display text-[#F8FAFC] leading-snug m-0">
                    {{ activePhase().title }}
                  </h4>
                </div>
              </div>

              <!-- Phase Selector Buttons -->
              <div class="w-full grid grid-cols-5 gap-1.5">
                @for (phase of phases; track phase.num; let i = $index) {
                  <button 
                    type="button"
                    (click)="selectPhase(i)"
                    class="py-2 px-1 rounded-lg border text-center transition-all duration-300 flex flex-col items-center justify-center cursor-pointer"
                    [class.bg-gradient-to-br]="selectedPhaseIndex() === i"
                    [class.from-[#D4AF37]]="selectedPhaseIndex() === i"
                    [class.to-[#C4971A]]="selectedPhaseIndex() === i"
                    [class.text-[#070A0F]]="selectedPhaseIndex() === i"
                    [class.border-[#D4AF37]]="selectedPhaseIndex() === i"
                    [class.font-bold]="selectedPhaseIndex() === i"
                    [class.bg-[#0B1019]]="selectedPhaseIndex() !== i"
                    [class.border-[#38BDF8]/20]="selectedPhaseIndex() !== i"
                    [class.text-[#F8FAFC]/65]="selectedPhaseIndex() !== i"
                  >
                    <span class="text-[0.52rem] font-mono uppercase tracking-wider block leading-none">Phase</span>
                    <span class="text-xs font-mono font-bold block mt-0.5">{{ phase.num }}</span>
                  </button>
                }
              </div>
            </div>
          }

        </div>

      </div>

    </section>
  `
})
export class ThreeStageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasRef') canvasRef!: ElementRef<HTMLCanvasElement>;

  readonly dataService = inject(ConstructionDataService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly selectedPhaseIndex = signal<number>(2); // Default to Phase 03 Superstructure
  readonly currentProgressPercent = signal<number>(65);

  readonly rightPanelMode = signal<'quote' | 'blueprint'>('quote');
  heroName = '';
  heroPhone = '';
  heroService = 'Residential Turnkey Villa';

  onHeroSubmit(event: Event) {
    event.preventDefault();
    const name = this.heroName.trim() || 'Valued Client';
    const phone = this.heroPhone.trim() || 'N/A';
    const service = this.heroService;
    
    const msg = `Hello Naveen Ji (Krishna Construction),
I submitted a 1-Hour Quote Request on your website:
• Name: ${name}
• Mobile: ${phone}
• Project Type: ${service}

Please provide a free consultation and construction estimate.`;

    window.open(`https://wa.me/91${this.dataService.primaryPhone}?text=${encodeURIComponent(msg)}`, '_blank');
    this.dataService.openConsultationModal(`Quote Request: ${service} (${name})`);
  }

  readonly phases: PhaseMilestone[] = [
    {
      num: '01',
      stage: 'Phase 01 · Planning',
      title: 'Plot Survey, Soil Testing & Vastu Grid',
      desc: 'Cardinal direction alignment, soil bearing capacity test, and structural grid mapping sanctioned under Haryana Municipal norms.',
      spec: 'Soil Testing & Layout Sanction',
      heightRatio: 0.15
    },
    {
      num: '02',
      stage: 'Phase 02 · Foundation',
      title: 'Deep RCC Raft Footing & Entrance Porch Plinth',
      desc: 'Corrosion-resistant Fe-550D TMT steel cages, mechanical concrete batching, multi-layer bitumen waterproofing, and subterranean drainage loops.',
      spec: 'Seismic Zone IV Base',
      heightRatio: 0.35
    },
    {
      num: '03',
      stage: 'Phase 03 · Superstructure',
      title: 'Ground Floor, Cantilevered Balcony & Slabs',
      desc: 'High-tensile RCC column framing, 11.5 ft clear ceiling slab casting, entrance porch columns, front cantilevered balconies, and window lintels.',
      spec: 'M-30 Concrete & Fe-550D Rebars',
      heightRatio: 0.65
    },
    {
      num: '04',
      stage: 'Phase 04 · Exterior Facade',
      title: 'Windows, Balcony Glass & Sloping Eaves',
      desc: 'DGU 24mm acoustic soundproof windows, French balcony glass railings, entrance door architrave, and architectural sloping eaves.',
      spec: 'Acoustic Soundproof Glass',
      heightRatio: 0.85
    },
    {
      num: '05',
      stage: 'Phase 05 · Complete Ghar Handover',
      title: 'Pitched Gabled Roof, Chimney & Griha Pravesh',
      desc: 'Iconic triangular pitched roof ridge, illuminated warm windows, pergola terrace, German fittings, and turnkey key handover.',
      spec: 'Zero-Defect Turnkey Delivery',
      heightRatio: 1.0
    }
  ];

  readonly activePhase = () => this.phases[this.selectedPhaseIndex()];

  // Canvas Engine
  private cv!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private W = 0;
  private H = 0;
  private DPR = 1;
  private cx = 0;
  private cy = 0;
  private CAM = 10.2;
  private CYE = 0;
  private RY = 0.62;
  private RX = -0.26;
  private targetBuildRatio = 0.65;
  private currentBuildRatio = 0.65;
  private mx = 0;
  private my = 0;
  private tmx = 0;
  private tmy = 0;
  private t0: number | null = null;
  private rafId = 0;
  private isRunning = true;

  // Geometry - Proper Ghar (House) Architecture
  private S = 0.74; // Calibrated so full house with pitched gable roof fits comfortably
  private maxYm = 5.0 * 0.74;
  private V: number[][] = [];
  private E: [number, number, boolean][] = [];
  private P: [number, number, number, number, boolean][] = [];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initCanvas();
    this.initGeometry();
    this.seedParticles();
    this.handleResize();
    this.startLoop();
  }

  ngOnDestroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

  selectPhase(index: number): void {
    this.selectedPhaseIndex.set(index);
    this.targetBuildRatio = this.phases[index].heightRatio;
    this.currentProgressPercent.set(Math.round(this.targetBuildRatio * 100));
  }

  @HostListener('window:resize')
  handleResize(): void {
    if (!this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    this.W = rect.width || 450;
    this.H = rect.height || 450;
    this.DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = this.W * this.DPR;
    canvas.height = this.H * this.DPR;
    this.ctx.setTransform(this.DPR, 0, 0, this.DPR, 0, 0);

    this.cx = this.W * 0.5;
    this.cy = this.H * 0.68; // Ground baseline lower down so full house + roof fits comfortably
    this.seedParticles();
  }

  @HostListener('window:mousemove', ['$event'])
  handleMouseMove(e: MouseEvent): void {
    this.tmx = (e.clientX / window.innerWidth - 0.5);
    this.tmy = (e.clientY / window.innerHeight - 0.5);
  }

  private initCanvas(): void {
    this.cv = this.canvasRef.nativeElement;
    this.ctx = this.cv.getContext('2d', { alpha: true })!;
  }

  /**
   * PROPER GHAR (HOUSE / VILLA) GEOMETRY:
   * - Ground Boundary & Pathway
   * - Foundation Raft
   * - Ground Floor with Grand Entrance Porch & Main Door & Windows
   * - 1st Floor with Cantilevered Front Balcony & Railings
   * - 2nd Floor with Picture Windows
   * - Roof Eaves Overhang
   * - Triangular Pitched Gable Roof with Ridge & Rafters (The iconic "Ghar" silhouette)
   * - Rooftop Chimney
   */
  private initGeometry(): void {
    const s = this.S;
    const rawV: [number, number, number][] = [
      // 0-3: Plot Boundary
      [-3.2, 0, -2.6], [3.2, 0, -2.6], [3.2, 0, 2.6], [-3.2, 0, 2.6],

      // 4-7: Foundation Raft Base
      [-1.9, 0, -1.6], [1.9, 0, -1.6], [1.9, 0, 1.6], [-1.9, 0, 1.6],

      // 8-11: Ground Floor Ceiling / 1st Floor Slab
      [-1.9, 1.3, -1.6], [1.9, 1.3, -1.6], [1.9, 1.3, 1.6], [-1.9, 1.3, 1.6],

      // 12-13: Entrance Porch Columns at front (y = 0 to 1.3)
      [-0.7, 0, 2.3], [0.7, 0, 2.3],
      // 14-15: Entrance Porch Canopy Top (y = 1.3)
      [-0.7, 1.3, 2.3], [0.7, 1.3, 2.3],

      // 16-19: Main Front Entrance Door Frame (Ground Floor)
      [-0.45, 0, 1.6], [0.45, 0, 1.6], [0.45, 1.05, 1.6], [-0.45, 1.05, 1.6],

      // 20-23: Ground Floor Left Window
      [-1.6, 0.4, 1.6], [-0.8, 0.4, 1.6], [-0.8, 1.0, 1.6], [-1.6, 1.0, 1.6],

      // 24-27: Ground Floor Right Window
      [0.8, 0.4, 1.6], [1.6, 0.4, 1.6], [1.6, 1.0, 1.6], [0.8, 1.0, 1.6],

      // 28-31: 1st Floor Slab & Cantilevered Front Balcony (y = 1.3 to 2.5)
      [-1.9, 2.5, -1.6], [1.9, 2.5, -1.6], [1.9, 2.5, 1.6], [-1.9, 2.5, 1.6],
      // 32-33: Front Balcony Floor Projection (y = 1.3)
      [-1.9, 1.3, 2.2], [1.9, 1.3, 2.2],
      // 34-35: Front Balcony Railing Top Bar (y = 1.7)
      [-1.9, 1.7, 2.2], [1.9, 1.7, 2.2],

      // 36-39: 1st Floor French Balcony Window / Door
      [-0.7, 1.3, 1.6], [0.7, 1.3, 1.6], [0.7, 2.2, 1.6], [-0.7, 2.2, 1.6],

      // 40-43: 2nd Floor Slab & Eaves Base (y = 3.6)
      [-2.1, 3.6, -1.8], [2.1, 3.6, -1.8], [2.1, 3.6, 1.8], [-2.1, 3.6, 1.8],

      // 44-47: 2nd Floor Picture Windows
      [-1.5, 2.7, 1.6], [-0.3, 2.7, 1.6], [-0.3, 3.3, 1.6], [-1.5, 3.3, 1.6],
      // 48-51: 2nd Floor Right Window
      [0.3, 2.7, 1.6], [1.5, 2.7, 1.6], [1.5, 3.3, 1.6], [0.3, 3.3, 1.6],

      // 52-53: ICONIC PITCHED GABLE ROOF RIDGE PEAK (y = 4.8 - Classic Ghar Silhouette!)
      [0, 4.8, -1.8], [0, 4.8, 1.8],

      // 54-57: Rooftop Chimney (y = 4.2 to 5.0)
      [-1.3, 4.2, -0.6], [-0.8, 4.2, -0.6], [-0.8, 4.2, -0.1], [-1.3, 4.2, -0.1],
      [-1.3, 5.0, -0.6], [-0.8, 5.0, -0.6], [-0.8, 5.0, -0.1], [-1.3, 5.0, -0.1]
    ];

    this.V = rawV.map(p => [p[0] * s, p[1] * s, p[2] * s]);

    this.E = [
      // 0-3: Plot Boundary
      [0, 1, true], [1, 2, true], [2, 3, true], [3, 0, true],
      [0, 4, true], [1, 5, true], [2, 6, true], [3, 7, true],

      // Foundation to Ground Floor Slabs
      [4, 5, false], [5, 6, false], [6, 7, false], [7, 4, false],
      [4, 8, false], [5, 9, false], [6, 10, false], [7, 11, false],
      [8, 9, false], [9, 10, false], [10, 11, false], [11, 8, false],

      // Entrance Porch (Columns + Canopy)
      [12, 14, false], [13, 15, false],
      [14, 15, false], [14, 11, false], [15, 10, false],

      // Main Entrance Front Door Frame
      [16, 17, false], [17, 18, false], [18, 19, false], [19, 16, false],

      // Ground Floor Left Window
      [20, 21, false], [21, 22, false], [22, 23, false], [23, 20, false],
      // Ground Floor Right Window
      [24, 25, false], [25, 26, false], [26, 27, false], [27, 24, false],

      // Floor 1 Columns & Slab
      [8, 28, false], [9, 29, false], [10, 30, false], [11, 31, false],
      [28, 29, false], [29, 30, false], [30, 31, false], [31, 28, false],

      // Front Balcony Extension & Railings
      [11, 32, false], [10, 33, false], [32, 33, false],
      [32, 34, false], [33, 35, false], [34, 35, false],
      [34, 11, false], [35, 10, false],

      // Floor 1 French Doors
      [36, 37, false], [37, 38, false], [38, 39, false], [39, 36, false],

      // Floor 2 Columns & Eaves Base
      [28, 40, false], [29, 41, false], [30, 42, false], [31, 43, false],
      [40, 41, false], [41, 42, false], [42, 43, false], [43, 40, false],

      // Floor 2 Windows
      [44, 45, false], [45, 46, false], [46, 47, false], [47, 44, false],
      [48, 49, false], [49, 50, false], [50, 51, false], [51, 48, false],

      // CLASSIC PITCHED GABLE ROOF (The Ghar Silhouette):
      // Front Gable Triangle
      [43, 53, false], [42, 53, false],
      // Rear Gable Triangle
      [40, 52, false], [41, 52, false],
      // Central Ridge Line
      [52, 53, false],

      // Roof Slopes / Rafters connecting Ridge to Eaves
      // Front & Rear eave corners already connected. Let's add mid-rafters:
      [40, 43, false], [41, 42, false],

      // Rooftop Chimney
      [54, 55, false], [55, 56, false], [56, 57, false], [57, 54, false],
      [58, 59, false], [59, 60, false], [60, 61, false], [61, 58, false],
      [54, 58, false], [55, 59, false], [56, 60, false], [57, 61, false]
    ];
  }

  private seedParticles(): void {
    this.P = [];
    const count = 30;
    for (let i = 0; i < count; i++) {
      this.P.push([
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 16,
        Math.random() * 1.0 + 0.3,
        Math.random() < 0.4
      ]);
    }
  }

  private project(p: number[], ry: number, rx: number): [number, number, number, number] {
    const c = Math.cos(ry);
    const s = Math.sin(ry);
    const x = p[0] * c - p[2] * s;
    const z = p[0] * s + p[2] * c;
    const y = p[1];

    const cxr = Math.cos(rx);
    const sxr = Math.sin(rx);
    const y2 = y * cxr - z * sxr;
    const z2 = y * sxr + z * cxr;

    const d = z2 + this.CAM;
    const safeD = d < 0.3 ? 0.3 : d;
    const f = Math.min(this.W, 430) * 0.72 / safeD;

    return [this.cx + x * f, this.CYE - y2 * f, safeD, f];
  }

  private drawSegment(A: number[], B: number[], isBuilt: boolean): void {
    const a = this.project(A, this.RY, this.RX);
    const b = this.project(B, this.RY, this.RX);
    const depth = (a[2] + b[2]) / 2;
    const w = Math.max(0.6, (isBuilt ? 2.0 : 0.8) * (7 / depth));

    this.ctx.beginPath();
    this.ctx.moveTo(a[0], a[1]);
    this.ctx.lineTo(b[0], b[1]);
    this.ctx.lineWidth = w;

    if (isBuilt) {
      this.ctx.strokeStyle = `rgba(212, 175, 55, ${Math.min(1, 7 / depth * 0.95)})`;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
    } else {
      this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      this.ctx.shadowBlur = 4;
      this.ctx.shadowColor = 'rgba(56, 189, 248, 0.2)';
    }

    this.ctx.stroke();
    this.ctx.shadowBlur = 0;
  }

  private startLoop(): void {
    const renderFrame = (t: number) => {
      if (!this.t0) this.t0 = t;
      const el = t - this.t0;

      // Damped mouse rotation
      this.mx += (this.tmx - this.mx) * 0.05;
      this.my += (this.tmy - this.my) * 0.05;

      // Smooth build height interpolation
      this.currentBuildRatio += (this.targetBuildRatio - this.currentBuildRatio) * 0.06;
      const bh = this.currentBuildRatio * (this.maxYm * 1.05);

      this.CYE = this.cy;
      this.RY = el * 0.00035 + this.mx * 0.45 + 0.65;
      this.RX = -0.26 + (-this.my * 0.15);

      this.ctx.clearRect(0, 0, this.W, this.H);

      // 1. Atmospheric floating golden & azure sparks
      for (let i = 0; i < this.P.length; i++) {
        const pp = this.P[i];
        const pr = this.project([pp[0], pp[1], pp[2]], this.RY * 0.7, this.RX * 0.7);
        const a = Math.max(0, Math.min(1, 1.5 - pr[2] / 10));

        this.ctx.beginPath();
        this.ctx.arc(pr[0], pr[1], pp[3] * Math.min(pr[3] * 0.02, 1.2), 0, 6.283);
        this.ctx.fillStyle = pp[4]
          ? `rgba(212, 175, 55, ${a * 0.45})`
          : `rgba(56, 189, 248, ${a * 0.35})`;
        this.ctx.fill();
      }

      // 2. Plot Ground Grid (Cardinal alignment in Cyan Blueprint)
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      for (let g = -5; g <= 5; g += 1.5) {
        const A = this.project([g * this.S, 0, -5.5 * this.S], this.RY, this.RX);
        const B = this.project([g * this.S, 0, 5.5 * this.S], this.RY, this.RX);
        this.ctx.beginPath();
        this.ctx.moveTo(A[0], A[1]);
        this.ctx.lineTo(B[0], B[1]);
        this.ctx.stroke();

        const C = this.project([-5.5 * this.S, 0, g * this.S], this.RY, this.RX);
        const D = this.project([6.5 * this.S, 0, g * this.S], this.RY, this.RX);
        this.ctx.beginPath();
        this.ctx.moveTo(C[0], C[1]);
        this.ctx.lineTo(D[0], D[1]);
        this.ctx.stroke();
      }

      // 3. Render all Edges with Elevation Threshold
      for (let e = 0; e < this.E.length; e++) {
        const A = this.V[this.E[e][0]];
        const B = this.V[this.E[e][1]];
        const isPlot = this.E[e][2];
        const ya = A[1];
        const yb = B[1];

        if (isPlot) {
          this.drawSegment(A, B, true);
          continue;
        }

        if (ya <= bh && yb <= bh) {
          this.drawSegment(A, B, true);
        } else if (ya > bh && yb > bh) {
          this.drawSegment(A, B, false);
        } else {
          const tt = (bh - ya) / (yb - ya);
          const M = [A[0] + (B[0] - A[0]) * tt, bh, A[2] + (B[2] - A[2]) * tt];
          if (ya <= bh) {
            this.drawSegment(A, M, true);
            this.drawSegment(M, B, false);
          } else {
            this.drawSegment(A, M, false);
            this.drawSegment(M, B, true);
          }
        }
      }

      // 4. ROOFTOP GABLE SLOPES COVER ("Ghar Ki Chhat / Roof Cover")
      // When build reaches the roof (Phase 04 & 05), draw translucent glowing roof slopes!
      if (bh >= this.V[40][1]) {
        const pLeftFront = this.project(this.V[43], this.RY, this.RX);
        const pLeftRear = this.project(this.V[40], this.RY, this.RX);
        const pRightFront = this.project(this.V[42], this.RY, this.RX);
        const pRightRear = this.project(this.V[41], this.RY, this.RX);
        const pRidgeFront = this.project(this.V[53], this.RY, this.RX);
        const pRidgeRear = this.project(this.V[52], this.RY, this.RX);

        // Front Triangular Gable Fill
        this.ctx.fillStyle = 'rgba(56, 189, 248, 0.22)';
        this.ctx.beginPath();
        this.ctx.moveTo(pLeftFront[0], pLeftFront[1]);
        this.ctx.lineTo(pRightFront[0], pRightFront[1]);
        this.ctx.lineTo(pRidgeFront[0], pRidgeFront[1]);
        this.ctx.closePath();
        this.ctx.fill();

        // Left Sloping Roof Plane
        this.ctx.fillStyle = 'rgba(212, 175, 55, 0.16)';
        this.ctx.beginPath();
        this.ctx.moveTo(pLeftFront[0], pLeftFront[1]);
        this.ctx.lineTo(pRidgeFront[0], pRidgeFront[1]);
        this.ctx.lineTo(pRidgeRear[0], pRidgeRear[1]);
        this.ctx.lineTo(pLeftRear[0], pLeftRear[1]);
        this.ctx.closePath();
        this.ctx.fill();

        // Right Sloping Roof Plane
        this.ctx.fillStyle = 'rgba(212, 175, 55, 0.12)';
        this.ctx.beginPath();
        this.ctx.moveTo(pRightFront[0], pRightFront[1]);
        this.ctx.lineTo(pRidgeFront[0], pRidgeFront[1]);
        this.ctx.lineTo(pRidgeRear[0], pRidgeRear[1]);
        this.ctx.lineTo(pRightRear[0], pRightRear[1]);
        this.ctx.closePath();
        this.ctx.fill();
      }

      // 5. Glowing Sweep Laser Ring at Active Build Elevation
      if (bh > 0.05 && bh < this.maxYm * 1.02) {
        const fc = [
          [this.V[4][0], bh, this.V[4][2]],
          [this.V[5][0], bh, this.V[5][2]],
          [this.V[6][0], bh, this.V[6][2]],
          [this.V[7][0], bh, this.V[7][2]]
        ];

        this.ctx.beginPath();
        for (let r = 0; r < 4; r++) {
          const q = this.project(fc[r], this.RY, this.RX);
          if (r === 0) this.ctx.moveTo(q[0], q[1]);
          else this.ctx.lineTo(q[0], q[1]);
        }
        this.ctx.closePath();
        this.ctx.lineWidth = 2.0;
        this.ctx.strokeStyle = 'rgba(255, 223, 115, 0.95)';
        this.ctx.shadowBlur = 14;
        this.ctx.shadowColor = 'rgba(212, 175, 55, 1)';
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;
      }

      // 6. Glowing Key Nodes (Doors, Windows, Balcony & Roof Peak)
      for (let v = 0; v < this.V.length; v++) {
        if (this.V[v][1] > bh + 0.02 && v >= 4) continue;
        const q = this.project(this.V[v], this.RY, this.RX);
        this.ctx.beginPath();
        this.ctx.arc(q[0], q[1], Math.max(1.3, q[3] * 0.024), 0, 6.283);
        this.ctx.fillStyle = (v === 52 || v === 53)
          ? 'rgba(255, 235, 160, 1)' // Golden Peak nodes
          : 'rgba(255, 220, 140, 0.9)';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
      }

      if (this.isRunning) {
        this.rafId = requestAnimationFrame(renderFrame);
      }
    };

    this.rafId = requestAnimationFrame(renderFrame);
  }
}
