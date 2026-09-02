import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
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
  imports: [CommonModule],
  template: `
    <section class="relative pt-20 sm:pt-24 pb-6 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto z-10">
      
      <!-- HERO TWO-COLUMN GRID: LEFT COPY + RIGHT 3D STAGE (TIGHT, ZERO BLANK SPACE) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center py-2 sm:py-3">
        
        <!-- LEFT COLUMN: EDITORIAL TYPOGRAPHY -->
        <div class="lg:col-span-6 xl:col-span-7 space-y-4 sm:space-y-4.5">
          
          <!-- Eyebrow -->
          <div class="flex items-center gap-3">
            <span class="w-8 h-[1px] bg-gradient-to-r from-[#1D4ED8] to-transparent"></span>
            <p class="font-mono text-[0.68rem] tracking-[0.24em] uppercase text-[#D4AF37] m-0 font-semibold">
              Turnkey Home Builder &middot; Gurugram &amp; Delhi NCR
            </p>
          </div>

          <!-- Main Typographic Headline -->
          <h1 class="font-display font-semibold text-4xl sm:text-6xl md:text-7xl lg:text-[4.5rem] text-[#F8FAFC] leading-[1.02] tracking-tight m-0">
            We <span class="text-[#38BDF8] font-bold">Build</span> On Your Plot.<br />
            We <span class="text-[#D4AF37] font-bold">Guarantee</span> The Quality.
          </h1>

          <!-- Subhead -->
          <p class="text-base sm:text-lg text-[#F8FAFC]/80 font-normal leading-relaxed max-w-xl m-0">
            Turnkey luxury villas and Stilt+4 floors built on your plot in Gurugram &amp; Delhi NCR. Transparent Cost-Plus billing, certified Tier-1 materials, and a 10-year structural warranty.
          </p>

          <!-- CTAs & Reviews -->
          <div class="flex flex-wrap items-center gap-3 pt-1">
            <button 
              (click)="dataService.openConsultationModal('Fixed Quote Request')"
              class="luxury-btn bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] hover:from-[#1E40AF] hover:to-[#1D4ED8] text-white px-6 py-3 rounded-full text-xs font-mono font-semibold tracking-wider flex items-center gap-2.5 shadow-xl shadow-[#1D4ED8]/35 border border-[#38BDF8]/40 cursor-pointer"
            >
              <span>Get Fixed Quote</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>

            <a 
              href="#calculator"
              class="luxury-btn border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#D4AF37] hover:text-[#FFF] px-5 py-3 rounded-full text-xs font-mono tracking-wider flex items-center gap-2 bg-[#0B1019]/60"
            >
              <span>Cost Estimator</span>
            </a>

            <div class="flex items-center gap-2 font-mono text-xs text-[#F7F4EE]/80 pl-1">
              <span class="text-[#D4AF37] tracking-widest">★★★★★</span>
              <span class="font-bold text-[#F7F4EE]">4.9</span>
              <span class="text-[#F7F4EE]/40">&middot;</span>
              <span class="text-[#F7F4EE]/60">120+ Gurugram Reviews</span>
            </div>
          </div>

          <!-- Hindi Devotional Slogan -->
          <p class="font-hindi italic text-sm sm:text-base text-[#F7F4EE]/90 m-0 pt-0.5">
            <span class="text-[#D4AF37] font-semibold not-italic">{{ dataService.invocation }}</span> 
            आपका सपना, हमारा संकल्प
            <span class="text-xs font-display text-[#F7F4EE]/50 not-italic"> &mdash; your dream, our commitment.</span>
          </p>

          <!-- Founder Leadership Badge with Brand Logo -->
          <div class="flex items-center gap-3.5 pt-2.5 border-t border-[#F8FAFC]/10 max-w-xl">
            <div class="relative w-12 h-12 rounded-xl p-[2px] bg-gradient-to-br from-[#FFDF73] via-[#D4AF37] to-[#38BDF8] shadow-[0_0_20px_rgba(212,175,55,0.45)] flex-shrink-0">
              <img 
                src="images/krishna_logo.jpg" 
                alt="Krishna Construction Monogram" 
                class="w-full h-full object-cover rounded-[9px] bg-[#070A0F]"
              />
            </div>
            <p class="text-xs text-[#F8FAFC]/80 leading-snug font-sans m-0">
              <strong class="text-[#F8FAFC] font-medium">25+ years experience</strong> &middot; 
              <strong class="text-[#D4AF37] font-medium">Naveen Sharma</strong> on-site leadership &middot; 
              Corporate Office: Soho Precision Tower &middot; Serving Gurugram &amp; Delhi NCR.
            </p>
          </div>
        </div>

        <!-- RIGHT COLUMN: 3D PROPER GHAR BLUEPRINT CANVAS + PHASE SELECTOR -->
        <div class="lg:col-span-6 xl:col-span-5 flex flex-col items-center w-full">
          
          <!-- 3D Canvas Box (Responsive Height, No Blank Space) -->
          <div class="relative w-full h-[320px] sm:h-[400px] lg:h-[440px] rounded-2xl overflow-hidden glass-card border border-[#D4AF37]/35 shadow-2xl bg-[#0B1019]">
            <canvas #canvasRef class="absolute inset-0 w-full h-full block"></canvas>
            
            <!-- Atmospheric Gradients -->
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

          <!-- Interactive Phase Control Pills (Compact & Responsive Grid) -->
          <div class="w-full grid grid-cols-5 gap-1 sm:gap-1.5 mt-2">
            @for (phase of phases; track phase.num; let i = $index) {
              <button 
                type="button"
                (click)="selectPhase(i)"
                class="py-1.5 px-0.5 sm:py-2 sm:px-1 rounded-lg border text-center transition-all duration-300 flex flex-col items-center justify-center cursor-pointer"
                [class.bg-gradient-to-br]="selectedPhaseIndex() === i"
                [class.from-[#D4AF37]]="selectedPhaseIndex() === i"
                [class.to-[#C4971A]]="selectedPhaseIndex() === i"
                [class.text-[#070A0F]]="selectedPhaseIndex() === i"
                [class.border-[#D4AF37]]="selectedPhaseIndex() === i"
                [class.shadow-[0_0_15px_rgba(212,175,55,0.4)]]="selectedPhaseIndex() === i"
                [class.font-bold]="selectedPhaseIndex() === i"
                [class.bg-[#0B1019]]="selectedPhaseIndex() !== i"
                [class.border-[#38BDF8]/20]="selectedPhaseIndex() !== i"
                [class.text-[#F8FAFC]/65]="selectedPhaseIndex() !== i"
                [class.hover:border-[#38BDF8]/50]="selectedPhaseIndex() !== i"
              >
                <span class="text-[0.5rem] sm:text-[0.56rem] font-mono uppercase tracking-wider block leading-none">Phase</span>
                <span class="text-[0.68rem] sm:text-xs font-mono font-bold block mt-0.5">{{ phase.num }}</span>
              </button>
            }
          </div>

        </div>

      </div>

      <!-- BOTTOM TICKER STRIP (Compact & Responsive) -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 py-2 px-4 rounded-xl bg-[#0B1019]/90 border border-[#D4AF37]/20 font-mono text-[0.62rem] sm:text-[0.65rem] tracking-wider uppercase text-[#F8FAFC]/60 mt-3 shadow-lg">
        <div class="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start">
          <span class="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
          <span class="text-[#D4AF37] font-semibold">Krishna Construction</span>
          <span>&middot;</span>
          <span class="text-[#F8FAFC]/90">Naveen Sharma Desk</span>
          <span class="hidden md:inline">&middot;</span>
          <span class="hidden md:inline text-[#38BDF8]">Corporate Office: Soho Precision Tower &middot; Delhi NCR</span>
        </div>

        <div class="flex items-center gap-4">
          <span class="text-[#D4AF37]">Turnkey Residential Construction, Stilt+4 Floors &amp; Architecture &middot; Delhi NCR</span>
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
