import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructionDataService } from '../../services/construction-data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-[#04060A] border-t border-[#D4AF37]/20 pt-10 pb-8 px-6 sm:px-10 lg:px-16 relative z-10 text-[#F8FAFC]/75">
      <div class="max-w-7xl mx-auto">
        <!-- Main Footer Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-[#F8FAFC]/10">
          <!-- Col 1: Identity & Builder Credentials (5 cols) -->
          <div class="lg:col-span-5 space-y-5">
            <div class="flex items-center gap-3.5 mb-2">
              <div class="relative w-12 h-12 rounded-xl p-[1.5px] bg-gradient-to-br from-[#D4AF37] via-[#38BDF8] to-[#1D4ED8] shadow-[0_0_20px_rgba(212,175,55,0.3)] flex-shrink-0">
                <img 
                  src="images/krishna_logo.jpg" 
                  alt="Krishna Construction Logo" 
                  class="w-full h-full object-cover rounded-[10px] bg-[#070A0F]"
                />
              </div>
              <div>
                <span class="text-xs font-hindi text-[#D4AF37] font-semibold block tracking-wider">
                  {{ dataService.invocation }}
                </span>
                <h3 class="font-display font-semibold text-2xl sm:text-3xl text-[#F8FAFC] tracking-tight m-0">
                  KRISHNA CONSTRUCTION<span class="text-[#38BDF8]">.</span>
                </h3>
              </div>
            </div>

            <p class="text-xs font-mono text-[#38BDF8] uppercase tracking-wider font-semibold">
              Master Turnkey Builder &middot; Stilt + 4 Floors &middot; Gurugram
            </p>

            <p class="text-xs sm:text-sm text-[#F8FAFC]/70 font-light leading-relaxed max-w-md">
              Gurugram&rsquo;s premier residential design-build contractor led by Naveen Sharma. Specializing in bespoke villas, Stilt+4 independent builder floors, and structural renovations with 100% transparent Cost-Plus material billing.
            </p>

            <div class="pt-2 text-xs font-mono text-[#F8FAFC]/60 space-y-1">
              <div><strong class="text-[#F8FAFC]">Master Builder:</strong> Naveen Sharma</div>
              <div><strong class="text-[#F8FAFC]">Head Office:</strong> Office No. 420, 4th Floor, Soho Precision Tower, Sector-67, Gurugram</div>
              <div><strong class="text-[#F8FAFC]">Direct Phones:</strong> +91 {{ dataService.primaryPhone }} &middot; +91 {{ dataService.secondaryPhone }}</div>
            </div>
          </div>

          <!-- Col 2: Services Navigation (2 cols) -->
          <div class="lg:col-span-2 space-y-3">
            <h4 class="font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Builder Services
            </h4>
            <ul class="space-y-2 text-xs font-mono text-[#F7F4EE]/70">
              <li><a href="#services" class="hover:text-[#D4AF37] transition-colors">Turnkey Construction</a></li>
              <li><a href="#packages" class="hover:text-[#D4AF37] transition-colors">Construction Packages</a></li>
              <li><a href="#services" class="hover:text-[#D4AF37] transition-colors">Architectural & 3D BIM</a></li>
              <li><a href="#visualizer" class="hover:text-[#D4AF37] transition-colors">Luxury Renovation</a></li>
              <li><a href="#calculator" class="hover:text-[#D4AF37] transition-colors">Cost Estimator</a></li>
              <li><a href="#three-stage" class="hover:text-[#D4AF37] transition-colors">3D Blueprint Stage</a></li>
            </ul>
          </div>

          <!-- Col 3: Engineering Standards & Norms (3 cols) -->
          <div class="lg:col-span-3 space-y-3">
            <h4 class="font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Engineering Norms
            </h4>
            <ul class="space-y-2 text-xs font-mono text-[#F7F4EE]/70">
              <li><a href="#standards" class="hover:text-[#D4AF37] transition-colors">HSVP & DTCP Building Bye-Laws</a></li>
              <li><a href="#standards" class="hover:text-[#D4AF37] transition-colors">BIS IS:456 & IS:1893 Seismic IV</a></li>
              <li><a href="#standards" class="hover:text-[#D4AF37] transition-colors">NABL 28-Day Cube Strength Tests</a></li>
              <li><a href="#standards" class="hover:text-[#D4AF37] transition-colors">Tata Tiscon Fe-550D Steel</a></li>
              <li><a href="#standards" class="hover:text-[#D4AF37] transition-colors">UltraTech / ACC M-30 Concrete</a></li>
              <li><a href="#standards" class="hover:text-[#D4AF37] transition-colors">10-Year Structural Guarantee</a></li>
            </ul>
          </div>

          <!-- Col 4: Active Gurugram Sectors (2 cols) -->
          <div class="lg:col-span-2 space-y-3">
            <h4 class="font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Active Sectors
            </h4>
            <ul class="space-y-2 text-xs font-mono text-[#F7F4EE]/70">
              <li>Sector-67 & Sector-63</li>
              <li>Sector-57 Sushant Lok</li>
              <li>Sector-50 Nirvana Country</li>
              <li>Sector-49 Rosewood City</li>
              <li>Sector-54 Golf Course Road</li>
              <li>Sector-46 & South City</li>
            </ul>
          </div>
        </div>

        <!-- Builder Assurance Notice -->
        <div class="pt-6 text-[0.68rem] font-mono text-[#F7F4EE]/45 leading-relaxed space-y-2">
          <p>
            <strong>Engineering & Regulatory Assurance:</strong> Krishna Construction operates as an independent general contracting firm registered in Gurugram, Haryana. All residential construction adheres strictly to the Haryana Building Code (2017 & amendments), Bureau of Indian Standards (BIS) structural design parameters, and Municipal Corporation of Gurugram (MCG) statutory requirements. Every construction milestone is certified by licensed civil engineers with original material test reports handed over to homeowners.
          </p>
        </div>

        <!-- Bottom Copyright -->
        <div class="pt-6 mt-4 border-t border-[#F7F4EE]/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#F7F4EE]/50 gap-4">
          <div>
            &copy; 2026 Krishna Construction. Naveen Sharma &middot; Sector-67 Gurugram. All rights reserved.
          </div>
          <div class="flex items-center gap-6">
            <a href="#" class="hover:text-[#D4AF37]">Privacy Policy</a>
            <a href="#" class="hover:text-[#D4AF37]">Quality Charter</a>
            <a [href]="dataService.googleMapsUrl" target="_blank" class="hover:text-[#D4AF37]">Office Map</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  readonly dataService = inject(ConstructionDataService);
}
