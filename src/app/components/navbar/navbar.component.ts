import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructionDataService } from '../../services/construction-data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#070A0F]/95 backdrop-blur-xl border-b border-[#D4AF37]/20"
      [class.py-0]="isScrolled()"
      [class.py-0]="!isScrolled()"
    >
      <!-- Top Announcement Bar in Royal Midnight Navy & Gold -->
      <div class="bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] text-[#F8FAFC] text-[0.68rem] font-mono py-1.5 px-4 border-b border-[#38BDF8]/20">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span class="font-semibold tracking-wider uppercase text-[#38BDF8]">Delhi NCR 2026 Turnkey Offer:</span>
            <span class="text-[#F8FAFC]/90 hidden sm:inline">Save Up to 10% on Plot Construction with our Transparent Cost-Plus Model</span>
          </div>
          <div class="flex items-center gap-4">
            <span class="hidden md:inline text-xs font-hindi text-[#D4AF37] font-semibold">{{ dataService.invocation }}</span>
            <a [href]="'tel:+91' + dataService.primaryPhone" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1 font-bold text-[#F8FAFC]">
              <span>📞 +91 {{ dataService.primaryPhone }}</span>
            </a>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-2.5 flex items-center justify-between gap-4 sm:gap-6">
        
        <!-- Brand Wordmark with Generated Architectural Logo -->
        <a href="#" class="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0 whitespace-nowrap">
          <div class="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl p-[2px] bg-gradient-to-br from-[#FFDF73] via-[#D4AF37] to-[#38BDF8] shadow-[0_0_25px_rgba(212,175,55,0.5)] flex-shrink-0 transition-transform group-hover:scale-105">
            <img 
              src="images/krishna_logo.jpg" 
              alt="Krishna Construction Logo" 
              class="w-full h-full object-cover rounded-[9px] bg-[#070A0F]"
            />
          </div>
          
          <div class="flex items-center gap-2 whitespace-nowrap">
            <span class="font-display font-medium text-base sm:text-xl lg:text-2xl text-[#F8FAFC] whitespace-nowrap tracking-tight leading-none">
              KRISHNA <span class="font-light text-[#D4AF37]">CONSTRUCTION</span><span class="text-[#38BDF8]">.</span>
            </span>
            <span class="hidden xl:inline-block px-2 py-0.5 rounded text-[0.6rem] font-hindi text-[#D4AF37] border border-[#D4AF37]/30 bg-[#0E1420] whitespace-nowrap">
              {{ dataService.invocation }}
            </span>
          </div>
        </a>

        <!-- Center Links (Single Row) -->
        <nav class="hidden lg:flex items-center gap-5 xl:gap-7 font-mono text-[0.72rem] tracking-[0.12em] uppercase text-[#F8FAFC]/75 whitespace-nowrap">
          <a href="#three-stage" class="hover:text-[#D4AF37] transition-colors whitespace-nowrap">Build</a>
          <a href="#packages" class="hover:text-[#D4AF37] transition-colors whitespace-nowrap">Packages</a>
          <a href="#standards" class="hover:text-[#D4AF37] transition-colors whitespace-nowrap">Standards</a>
          <a href="#services" class="hover:text-[#D4AF37] transition-colors whitespace-nowrap">Services</a>
          <a href="#calculator" class="hover:text-[#D4AF37] transition-colors whitespace-nowrap">Estimator</a>
          <a href="#visualizer" class="hover:text-[#D4AF37] transition-colors whitespace-nowrap">Renovations</a>
          <a href="#faq" class="hover:text-[#D4AF37] transition-colors whitespace-nowrap">FAQ</a>
          <a href="#contact" class="hover:text-[#D4AF37] transition-colors whitespace-nowrap">Office Desk</a>
        </nav>

        <!-- Right Quick Contact Pills (Single Line) -->
        <div class="hidden sm:flex items-center gap-3 flex-shrink-0 whitespace-nowrap">
          <a 
            [href]="'tel:+91' + dataService.primaryPhone" 
            class="font-mono text-[0.72rem] uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] rounded-full px-3.5 py-1.5 transition-all flex items-center gap-2 whitespace-nowrap bg-[#0B1019]/60"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
            <span>+91 {{ dataService.primaryPhone }}</span>
          </a>

          <button 
            (click)="dataService.openConsultationModal('Fixed Quote Request')"
            class="luxury-btn bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] hover:from-[#1E40AF] hover:to-[#1D4ED8] text-white px-4 sm:px-5 py-2 rounded-full font-mono text-[0.72rem] tracking-wider uppercase font-semibold flex items-center gap-2 shadow-lg shadow-[#1D4ED8]/30 border border-[#38BDF8]/40 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Get Fixed Quote</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </div>

        <!-- Mobile Hamburger Button -->
        <button 
          (click)="toggleMobileMenu()" 
          class="lg:hidden p-2 rounded-lg border border-[#D4AF37]/40 text-[#D4AF37] focus:outline-none flex-shrink-0"
          aria-label="Toggle Navigation Menu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            @if (!isMobileMenuOpen()) {
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            } @else {
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            }
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation Drawer -->
      @if (isMobileMenuOpen()) {
        <div class="lg:hidden bg-[#070A0F]/98 backdrop-blur-2xl border-b border-[#D4AF37]/20 px-6 py-6 space-y-5">
          <div class="flex items-center justify-between pb-3 border-b border-[#F8FAFC]/10">
            <span class="font-display text-lg text-[#F8FAFC]">KRISHNA <span class="text-[#D4AF37]">CONSTRUCTION</span></span>
            <span class="text-xs font-hindi text-[#D4AF37]">{{ dataService.invocation }}</span>
          </div>

          <nav class="flex flex-col gap-3 font-display text-base text-[#F8FAFC]">
            <a href="#three-stage" (click)="closeMobileMenu()" class="hover:text-[#D4AF37] py-1">3D Blueprint Stage</a>
            <a href="#packages" (click)="closeMobileMenu()" class="hover:text-[#D4AF37] py-1">Packages</a>
            <a href="#standards" (click)="closeMobileMenu()" class="hover:text-[#D4AF37] py-1">Engineering Standards</a>
            <a href="#services" (click)="closeMobileMenu()" class="hover:text-[#D4AF37] py-1">Core Services</a>
            <a href="#calculator" (click)="closeMobileMenu()" class="hover:text-[#D4AF37] py-1">Cost Estimator</a>
            <a href="#visualizer" (click)="closeMobileMenu()" class="hover:text-[#D4AF37] py-1">Renovations</a>
            <a href="#contact" (click)="closeMobileMenu()" class="hover:text-[#D4AF37] py-1">Soho Tower Office Desk</a>
          </nav>

          <div class="pt-3 border-t border-[#F8FAFC]/10 flex flex-col gap-2.5">
            <a 
              [href]="'tel:+91' + dataService.primaryPhone"
              class="w-full text-center py-2.5 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-xs uppercase"
            >
              Call: +91 {{ dataService.primaryPhone }}
            </a>
            <button 
              (click)="dataService.openConsultationModal('Mobile Menu Request'); closeMobileMenu()"
              class="w-full text-center py-2.5 rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] text-white font-mono text-xs uppercase font-semibold shadow-lg shadow-[#1D4ED8]/30"
            >
              Get Fixed Quote &rarr;
            </button>
          </div>
        </div>
      }
    </header>
  `
})
export class NavbarComponent {
  readonly dataService = inject(ConstructionDataService);
  readonly isScrolled = signal<boolean>(false);
  readonly isMobileMenuOpen = signal<boolean>(false);

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
