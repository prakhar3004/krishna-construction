import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConstructionDataService } from '../../services/construction-data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#070A0F]/95 backdrop-blur-xl border-b border-[#D4AF37]/20 shadow-md"
    >
      <!-- Main Navbar Container -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
        
        <!-- Brand Wordmark with Logo -->
        <a routerLink="/" class="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
          <div class="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl p-[1.5px] bg-gradient-to-br from-[#FFDF73] via-[#D4AF37] to-[#38BDF8] shadow-[0_0_20px_rgba(212,175,55,0.4)] flex-shrink-0 transition-transform group-hover:scale-105">
            <img 
              src="images/krishna_logo.jpg" 
              alt="Krishna Construction Logo" 
              class="w-full h-full object-cover rounded-[9px] bg-[#070A0F]"
            />
          </div>
          
          <div class="flex items-center gap-2">
            <span class="font-display font-semibold text-base sm:text-lg lg:text-xl text-[#F8FAFC] tracking-tight whitespace-nowrap">
              KRISHNA <span class="font-light text-[#D4AF37]">CONSTRUCTION</span><span class="text-[#38BDF8]">.</span>
            </span>
            <span class="hidden 2xl:inline-block px-2 py-0.5 rounded text-[0.6rem] font-hindi text-[#D4AF37] border border-[#D4AF37]/30 bg-[#0E1420] whitespace-nowrap">
              {{ dataService.invocation }}
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Links (Clean, Spacious, Only 4 Essential Links) -->
        <nav class="hidden lg:flex items-center gap-6 xl:gap-8 font-mono text-xs tracking-wider uppercase text-[#F8FAFC]/80 whitespace-nowrap">
          <a href="/#packages" class="hover:text-[#D4AF37] transition-colors py-1">Packages</a>
          <a href="/#visualizer" class="hover:text-[#D4AF37] transition-colors py-1">Before &amp; After</a>
          <a href="/#calculator" class="hover:text-[#D4AF37] transition-colors py-1">Estimator</a>
          <a href="/#portfolio" class="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 py-1">
            <span>Projects</span>
            <span class="px-1.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[0.65rem] font-bold">29</span>
          </a>
        </nav>

        <!-- Right Quick Contact & CTAs -->
        <div class="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          <a 
            [href]="'tel:+91' + dataService.primaryPhone" 
            class="hidden md:flex font-mono text-[0.72rem] uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.25)] rounded-full px-3 py-1.5 transition-all items-center gap-2 whitespace-nowrap bg-[#0B1019]/70"
            title="Direct Call to Naveen Sharma"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
            <span>+91 {{ dataService.primaryPhone }}</span>
          </a>

          <!-- Theme Toggle (Light / Dark Mode) -->
          <button 
            type="button"
            (click)="dataService.toggleTheme()" 
            class="p-2 rounded-full border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all cursor-pointer flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 shadow-sm"
            [attr.aria-label]="dataService.isDarkMode() ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            [title]="dataService.isDarkMode() ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          >
            @if (dataService.isDarkMode()) {
              <!-- Sun Icon for Light Mode -->
              <svg class="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            } @else {
              <!-- Moon Icon for Dark Mode -->
              <svg class="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            }
          </button>

          <!-- WhatsApp Get Quote Button -->
          <a 
            [href]="dataService.getWhatsAppUrl('Hello Naveen Ji, I want to discuss a turnkey house construction quote for my plot in Gurugram / Delhi NCR.')"
            target="_blank"
            class="luxury-btn bg-gradient-to-r from-[#D4AF37] to-[#C4971A] hover:from-[#DFBA44] hover:to-[#D4AF37] text-[#070A0F] px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-xs tracking-wider uppercase font-bold flex items-center gap-1.5 shadow-md shadow-[#D4AF37]/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Get Quote</span>
            <svg class="w-3.5 h-3.5 hidden sm:inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>

          <!-- Mobile & Tablet Hamburger Toggle (Shown below lg) -->
          <button 
            (click)="toggleMobileMenu()" 
            class="lg:hidden p-2 rounded-lg border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 focus:outline-none flex-shrink-0 transition-colors cursor-pointer"
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
      </div>

      <!-- Mobile & Tablet Navigation Drawer (Clean, Exactly 4 Essential Links) -->
      @if (isMobileMenuOpen()) {
        <div class="lg:hidden bg-[#070A0F]/98 backdrop-blur-2xl border-b border-[#D4AF37]/20 px-6 py-5 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
          <div class="flex items-center justify-between pb-3 border-b border-[#F8FAFC]/10">
            <span class="font-display font-semibold text-lg text-[#F8FAFC]">KRISHNA <span class="text-[#D4AF37]">CONSTRUCTION</span></span>
            <span class="text-xs font-hindi text-[#D4AF37] font-semibold">{{ dataService.invocation }}</span>
          </div>

          <nav class="flex flex-col gap-2 font-display text-base text-[#F8FAFC]">
            <a href="/#packages" (click)="closeMobileMenu()" class="hover:text-[#D4AF37] py-2 border-b border-[#F8FAFC]/5 flex items-center justify-between">
              <span>Construction Packages</span>
              <span class="text-xs text-[#D4AF37] font-mono">&rarr;</span>
            </a>
            <a href="/#visualizer" (click)="closeMobileMenu()" class="hover:text-[#D4AF37] py-2 border-b border-[#F8FAFC]/5 flex items-center justify-between">
              <span>Before &amp; After</span>
              <span class="text-xs text-[#D4AF37] font-mono">&rarr;</span>
            </a>
            <a href="/#calculator" (click)="closeMobileMenu()" class="hover:text-[#D4AF37] py-2 border-b border-[#F8FAFC]/5 flex items-center justify-between">
              <span>Cost Estimator</span>
              <span class="text-xs text-[#D4AF37] font-mono">&rarr;</span>
            </a>
            <a href="/#portfolio" (click)="closeMobileMenu()" class="hover:text-[#D4AF37] py-2 flex items-center justify-between">
              <span>Site Execution Photos</span>
              <span class="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-mono font-bold">29 Pics</span>
            </a>
          </nav>

          <div class="pt-3 border-t border-[#F8FAFC]/10 flex flex-col gap-2.5">
            <a 
              [href]="'tel:+91' + dataService.primaryPhone"
              class="w-full text-center py-2.5 rounded-xl border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-xs uppercase font-semibold bg-[#0B1019]"
            >
              Direct Call: +91 {{ dataService.primaryPhone }}
            </a>
            <a 
              [href]="'https://wa.me/91' + dataService.primaryPhone + '?text=Hello%20Naveen%20Ji,%20I%20want%20to%20consult%20about%20house%20construction%20in%20Gurugram.'"
              target="_blank"
              class="w-full text-center py-2.5 rounded-xl bg-[#25D366] text-black font-mono text-xs uppercase font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Chat on WhatsApp</span>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/>
              </svg>
            </a>
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

