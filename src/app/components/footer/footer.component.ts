import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConstructionDataService } from '../../services/construction-data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
              Master Turnkey Builder &middot; Luxury Villas, Kothis &amp; Floors &middot; Gurugram &amp; Delhi NCR
            </p>

            <p class="text-xs sm:text-sm text-[#F8FAFC]/70 font-light leading-relaxed max-w-md">
              Gurugram and Delhi NCR&rsquo;s premier residential design-build contractor led by Naveen Sharma. Specializing in bespoke villas, luxury independent residences, custom builder floors, and structural renovations with 100% transparent Cost-Plus material billing.
            </p>

            <div class="pt-2 text-xs font-mono text-[#F8FAFC]/60 space-y-1">
              <div><strong class="text-[#F8FAFC]">Master Builder:</strong> Naveen Sharma</div>
              <div><strong class="text-[#F8FAFC]">Corporate Office:</strong> Office No. 420, 4th Floor, Soho Precision Tower, Gurugram (Delhi NCR)</div>
              <div><strong class="text-[#F8FAFC]">Direct Phones:</strong> +91 {{ dataService.primaryPhone }} &middot; +91 {{ dataService.secondaryPhone }}</div>
            </div>
          </div>

          <!-- Col 2: Services Navigation (2 cols) -->
          <div class="lg:col-span-2 space-y-3">
            <h4 class="font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Builder Services
            </h4>
            <ul class="space-y-2 text-xs font-mono text-[#F8FAFC]/70">
              <li><a href="/#services" class="hover:text-[#D4AF37] transition-colors">Turnkey Construction</a></li>
              <li><a href="/#packages" class="hover:text-[#D4AF37] transition-colors">Construction Packages</a></li>
              <li><a href="/#visualizer" class="hover:text-[#D4AF37] transition-colors">Before &amp; After</a></li>
              <li><a href="/#calculator" class="hover:text-[#D4AF37] transition-colors">Cost Estimator</a></li>
              <li><a href="/#portfolio" class="hover:text-[#D4AF37] transition-colors">Site Projects (29 Photos)</a></li>
              <li><a href="/#contact" class="hover:text-[#D4AF37] transition-colors">Direct Consultation</a></li>
            </ul>
          </div>

          <!-- Col 3: Engineering Standards & Norms (3 cols) -->
          <div class="lg:col-span-3 space-y-3">
            <h4 class="font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Engineering Norms
            </h4>
            <ul class="space-y-2 text-xs font-mono text-[#F8FAFC]/70">
              <li><a href="/#services" class="hover:text-[#D4AF37] transition-colors">HSVP &amp; DTCP Building Bye-Laws</a></li>
              <li><a href="/#services" class="hover:text-[#D4AF37] transition-colors">BIS IS:456 / IS:1893 Seismic Zone IV</a></li>
              <li><a href="/#services" class="hover:text-[#D4AF37] transition-colors">NABL Tested Batch Reports</a></li>
              <li><a href="/#services" class="hover:text-[#D4AF37] transition-colors">100% Genuine Tier-1 Material Seal</a></li>
              <li><a href="/#services" class="hover:text-[#D4AF37] transition-colors">10-Year Structural Handover Warranty</a></li>
            </ul>
          </div>

          <!-- Col 4: Service Areas (2 cols) -->
          <div class="lg:col-span-2 space-y-3">
            <h4 class="font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Service Regions
            </h4>
            <ul class="space-y-2 text-xs font-mono text-[#F8FAFC]/70">
              <li>Gurugram (All Sectors)</li>
              <li>Golf Course Extn &amp; SPR</li>
              <li>Sushant Lok &amp; DLF</li>
              <li>South Delhi &amp; NCR</li>
              <li>Faridabad &amp; Noida</li>
              <li>Across Delhi NCR</li>
            </ul>
          </div>
        </div>

        <!-- Builder Assurance Notice -->
        <div class="pt-6 text-[0.68rem] font-mono text-[#F8FAFC]/50 leading-relaxed space-y-2">
          <p>
            <strong>Engineering &amp; Regulatory Assurance:</strong> Krishna Construction operates as an independent design-build and general contracting firm based in Gurugram, serving the entire Delhi NCR region. All residential construction adheres strictly to the Haryana Building Code, Delhi Unified Building Bye-Laws, Bureau of Indian Standards (BIS) structural design parameters, and statutory municipal requirements.
          </p>
        </div>

        <!-- Bottom Copyright -->
        <div class="pt-6 mt-4 border-t border-[#F8FAFC]/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#F8FAFC]/55 gap-4">
          <div>
            &copy; 2026 Krishna Construction. Naveen Sharma &middot; Gurugram &amp; Delhi NCR. All rights reserved.
          </div>
          <div class="flex items-center gap-6">
            <a routerLink="/privacy-policy" class="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
            <a routerLink="/terms-and-conditions" class="hover:text-[#D4AF37] transition-colors">Terms &amp; Conditions</a>
            <a [href]="dataService.googleMapsUrl" target="_blank" class="hover:text-[#D4AF37] transition-colors">Office Map</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  readonly dataService = inject(ConstructionDataService);
}
