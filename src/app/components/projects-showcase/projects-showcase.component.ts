import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructionDataService } from '../../services/construction-data.service';

interface EnhancedProject {
  id: string;
  title: string;
  category: 'Turnkey Construction' | 'Bespoke Villa' | 'Luxury Renovation';
  statusTab: 'In-Progress' | 'Completed';
  location: string;
  plotOrSize: string;
  statusText: string;
  progressPercent: number;
  description: string;
  features: string[];
}

@Component({
  selector: 'app-projects-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="portfolio" class="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
      <!-- Header (Buildhood Style) -->
      <div class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span class="inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
            Our Projects
          </span>
          <h2 class="mt-3 text-3xl sm:text-4xl font-bold text-[#F8FAFC]">
            In-Progress &amp; Completed Projects in Gurugram
          </h2>
          <p class="mt-3 text-sm sm:text-base text-[#F8FAFC]/75 leading-relaxed max-w-2xl">
            Explore homes currently under construction and recently delivered &mdash; live design execution, site supervision, and steady milestone progress.
          </p>
        </div>

        <!-- Filter Pills (All / In-Progress / Completed) -->
        <div class="flex flex-wrap gap-2 flex-shrink-0">
          @for (tab of filterTabs; track tab.key) {
            <button 
              (click)="activeTab.set(tab.key)"
              class="px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer"
              [class.bg-[#D4AF37]]="activeTab() === tab.key"
              [class.text-[#070A0F]]="activeTab() === tab.key"
              [class.border]="activeTab() !== tab.key"
              [class.border-[#F8FAFC]/20]="activeTab() !== tab.key"
              [class.bg-[#0B1019]]="activeTab() !== tab.key"
              [class.text-[#F8FAFC]/70]="activeTab() !== tab.key"
            >
              {{ tab.label }}
            </button>
          }
        </div>
      </div>

      <!-- Project Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        @for (project of filteredProjects(); track project.id) {
          <div class="glass-card rounded-2xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#38BDF8]/50 transition-all duration-500 group flex flex-col justify-between bg-[#0B1019] shadow-lg">
            <div>
              <!-- Stylized Architectural Header Card -->
              <div class="relative h-44 sm:h-48 bg-gradient-to-br from-[#1E1C18] via-[#141310] to-[#0A0A08] p-6 flex flex-col justify-between overflow-hidden border-b border-[#F7F4EE]/10">
                <div class="absolute inset-0 blueprint-grid opacity-20"></div>
                <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl group-hover:bg-[#D4AF37]/20 transition-all"></div>

                <div class="relative z-10 flex items-center justify-between">
                  <span class="px-2.5 py-0.5 rounded text-[0.62rem] font-mono tracking-wider uppercase bg-[#080807]/80 text-[#D4AF37] border border-[#D4AF37]/30">
                    {{ project.category }}
                  </span>

                  <span 
                    class="text-[0.65rem] font-mono px-2.5 py-0.5 rounded-full border uppercase tracking-wider"
                    [class.text-[#6B7A5C]]="project.statusTab === 'Completed'"
                    [class.border-[#6B7A5C]/40]="project.statusTab === 'Completed'"
                    [class.text-[#D97746]]="project.statusTab !== 'Completed'"
                    [class.border-[#D97746]/40]="project.statusTab !== 'Completed'"
                  >
                    {{ project.statusText }}
                  </span>
                </div>

                <div class="relative z-10">
                  <span class="text-[0.68rem] font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
                    Turnkey Execution &middot; Stilt + 4 Floors
                  </span>
                  <h3 class="text-lg sm:text-xl font-display font-medium text-[#F7F4EE] leading-snug group-hover:text-[#D4AF37] transition-colors">
                    {{ project.title }}
                  </h3>
                </div>
              </div>

              <!-- Live Execution Progress Bar -->
              <div class="px-6 pt-4">
                <div class="flex items-center justify-between text-[0.65rem] font-mono text-[#F7F4EE]/60 mb-1.5">
                  <span>Milestone Verification:</span>
                  <span class="text-[#D4AF37] font-bold">{{ project.progressPercent }}% Cast & Certified</span>
                </div>
                <div class="w-full h-1.5 rounded-full bg-[#1A1814] overflow-hidden border border-[#F7F4EE]/10">
                  <div 
                    class="h-full bg-gradient-to-r from-[#B5562C] to-[#D4AF37] rounded-full transition-all duration-500"
                    [style.width.%]="project.progressPercent"
                  ></div>
                </div>
              </div>

              <!-- Card Body -->
              <div class="p-6 space-y-3">
                <div class="space-y-0.5">
                  <div class="text-xs font-mono text-[#F7F4EE]/60 uppercase tracking-wider flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-[#B5562C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>{{ project.location }}</span>
                  </div>

                  <div class="text-xs font-mono text-[#D4AF37] font-semibold">
                    {{ project.plotOrSize }}
                  </div>
                </div>

                <p class="text-xs text-[#F7F4EE]/70 font-light leading-relaxed">
                  {{ project.description }}
                </p>

                <!-- Feature Badges -->
                <div class="space-y-1 pt-1">
                  @for (feat of project.features; track feat) {
                    <div class="text-[0.7rem] font-mono text-[#F7F4EE]/80 flex items-center gap-2">
                      <span class="text-[#6B7A5C]">✓</span>
                      <span>{{ feat }}</span>
                    </div>
                  }
                </div>
              </div>
            </div>

            <!-- Card Bottom Action -->
            <div class="p-6 pt-0">
              <a 
                [href]="dataService.getWhatsAppUrl('Hello Naveen Ji, I want to inspect or know construction specifications for: ' + project.title)"
                target="_blank"
                class="luxury-btn bg-[#0E0E0C] hover:bg-[#B5562C] text-[#F7F4EE] hover:text-[#FFF] py-2.5 px-4 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 border border-[#F7F4EE]/15 hover:border-[#B5562C] w-full transition-all"
              >
                <span>Request Site Inspection</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </a>
            </div>
          </div>
        }
      </div>
    </section>
  `
})
export class ProjectsShowcaseComponent {
  readonly dataService = inject(ConstructionDataService);
  
  readonly filterTabs = [
    { key: 'all', label: 'All Projects (6)' },
    { key: 'inprogress', label: 'In-Progress Sites (3)' },
    { key: 'completed', label: 'Completed Deliveries (3)' }
  ];

  readonly activeTab = signal<string>('all');

  readonly projects: EnhancedProject[] = [
    {
      id: 'p1',
      title: 'The Palm Springs Villa 42',
      category: 'Bespoke Villa',
      statusTab: 'In-Progress',
      location: 'Sector-54, Golf Course Road Corridor',
      plotOrSize: '500 Sq. Yards · Stilt + 4 Floors',
      statusText: '85% Superstructure Cast',
      progressPercent: 85,
      description: 'Ultra-luxury monolithic residential construction with deep RCC raft foundation, double-height living room, private Schindler elevator, and Italian Botticino marble.',
      features: ['M-35 Design Concrete', 'Tata Tiscon Fe-550D Steel', 'Private Gearless Schindler Lift']
    },
    {
      id: 'p2',
      title: 'Rosewood City Modern Kothi',
      category: 'Turnkey Construction',
      statusTab: 'In-Progress',
      location: 'Sector-49, Rosewood City',
      plotOrSize: '250 Sq. Yards · Stilt + 3 Floors',
      statusText: '45% 2nd Floor Slab Cast',
      progressPercent: 45,
      description: 'Vastu-aligned North-East residence with cantilevered front balconies, concealed plumbing shafts, and high-efficiency VRV air conditioning provisions.',
      features: ['Vastu Compliant Layout', 'Full Rainwater Harvesting', 'Schneider Smart Automation']
    },
    {
      id: 'p3',
      title: 'Sushant Lok Contemporary Kothi',
      category: 'Turnkey Construction',
      statusTab: 'In-Progress',
      location: 'Sector-57, Sushant Lok 2',
      plotOrSize: '350 Sq. Yards · Stilt + 4 Floors',
      statusText: '92% Finishing Stage',
      progressPercent: 92,
      description: 'Turnkey residential builder floor customized for joint families with acoustic DGU 24mm glazing, automated basement stilt, and rooftop pergola terrace.',
      features: ['DGU Acoustic Thermal Windows', 'German Viega Plumbing', 'Solar Water Heating 500LPD']
    },
    {
      id: 'p4',
      title: 'South City 2 Luxury Villa',
      category: 'Bespoke Villa',
      statusTab: 'Completed',
      location: 'Sector-50, South City 2',
      plotOrSize: '400 Sq. Yards · Stilt + 4 Floors',
      statusText: '100% Delivered with OC',
      progressPercent: 100,
      description: 'Delivered in 11 months with full HSVP Occupancy Certificate. Features 11.5-ft clear ceiling heights, private glass elevator, and Italian stone louvered exterior facade.',
      features: ['Full HSVP OC Handover', '10-Year Structural Warranty', 'Italian Stone Facade']
    },
    {
      id: 'p5',
      title: 'Soho Corridor Designer Estate',
      category: 'Turnkey Construction',
      statusTab: 'Completed',
      location: 'Sector-67, Golf Course Extension',
      plotOrSize: '500 Sq. Yards · Stilt + 4 Floors',
      statusText: '100% Delivered',
      progressPercent: 100,
      description: 'Flagship builder floor estate executed under Naveen Sharma with double-height living room, 8-SUV stilt parking, Schindler elevator, and rooftop entertainment pergola.',
      features: ['8 SUV Stilt Parking', 'Schindler Capsule Lift', 'Zero Cost Escalation Delivery']
    },
    {
      id: 'p6',
      title: 'Nirvana Country Heritage Mansion Revamp',
      category: 'Luxury Renovation',
      statusTab: 'Completed',
      location: 'Sector-50, Nirvana Country',
      plotOrSize: '300 Sq. Yards Villa',
      statusText: '100% Handed Over',
      progressPercent: 100,
      description: 'Structural reinforcement, complete seepage remediation with Dr. Fixit epoxy loops, load-bearing steel beam retrofitting, and modern designer facade retrofit.',
      features: ['Zero Crack Guarantee', '5-Year Seepage Warranty', 'Vastu Remediation Compliant']
    }
  ];

  filteredProjects() {
    const tab = this.activeTab();
    if (tab === 'all') return this.projects;
    if (tab === 'inprogress') return this.projects.filter(p => p.statusTab === 'In-Progress');
    if (tab === 'completed') return this.projects.filter(p => p.statusTab === 'Completed');
    return this.projects;
  }
}
