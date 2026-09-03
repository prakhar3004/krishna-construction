import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructionDataService } from '../../services/construction-data.service';

interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  location: string;
  plotSize: string;
  projectType: string;
  rating: number;
  quote: string;
  highlight: string;
  savingsOrOutcome: string;
  avatarInitials: string;
  avatarBg: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="testimonials" class="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
      
      <!-- Section Header (Buildhood Style: What Our Clients Say) -->
      <div class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span class="inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
            Testimonials
          </span>
          <h2 class="mt-3 text-3xl sm:text-4xl font-bold text-[#F8FAFC]">
            What Our Clients Say
          </h2>
          <p class="mt-3 text-sm sm:text-base text-[#F8FAFC]/75 leading-relaxed max-w-2xl">
            Hear directly from homeowners who trusted Krishna Construction to build their dream homes in Gurugram &amp; Delhi NCR.
          </p>
        </div>

        <!-- Google Rating Trust Pill -->
        <div class="p-3.5 rounded-2xl bg-[#0B1019] border border-[#D4AF37]/30 flex items-center gap-3 flex-shrink-0 shadow-lg">
          <div class="w-11 h-11 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-lg font-bold text-[#D4AF37] font-mono">
            4.9
          </div>
          <div>
            <div class="flex items-center gap-1 text-[#D4AF37] text-xs">
              <span>★★★★★</span>
              <span class="font-bold text-[#F8FAFC] ml-1">Google Reviews</span>
            </div>
            <p class="text-[11px] text-[#F8FAFC]/60 font-mono m-0">120+ Verified Homeowners</p>
          </div>
        </div>
      </div>

      <!-- Testimonial Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        @for (item of testimonials; track item.id) {
          <div class="rounded-2xl p-6 flex flex-col justify-between border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 relative group overflow-hidden bg-[#0B1019] shadow-lg">
            
            <!-- Top Tag & Sector -->
            <div>
              <div class="flex items-center justify-between gap-2 pb-3 border-b border-[#F7F4EE]/10 mb-4">
                <span class="text-[0.62rem] font-mono uppercase tracking-wider text-[#D97746] bg-[#B5562C]/15 px-2 py-0.5 rounded border border-[#B5562C]/30">
                  {{ item.projectType }}
                </span>
                <span class="text-[0.68rem] font-mono text-[#F7F4EE]/50">
                  {{ item.plotSize }}
                </span>
              </div>

              <!-- Rating Stars -->
              <div class="text-[#D4AF37] text-xs mb-3 tracking-widest">
                ★★★★★
              </div>

              <!-- Quote Content -->
              <p class="text-xs sm:text-[0.82rem] text-[#F7F4EE]/85 font-light leading-relaxed mb-4 italic">
                &ldquo;{{ item.quote }}&rdquo;
              </p>

              <!-- Outcome Highlight Pill -->
              <div class="p-2 rounded-lg bg-[#0E0E0C] border border-[#D4AF37]/20 text-[0.68rem] font-mono text-[#D4AF37] mb-4">
                <strong class="font-semibold text-[#F7F4EE]">Outcome:</strong> {{ item.savingsOrOutcome }}
              </div>
            </div>

            <!-- Client Identity Card -->
            <div class="pt-4 border-t border-[#F7F4EE]/10 flex items-center gap-3">
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white font-mono flex-shrink-0 shadow"
                [style.backgroundColor]="item.avatarBg"
              >
                {{ item.avatarInitials }}
              </div>
              <div class="min-w-0">
                <h4 class="text-sm font-display text-[#F7F4EE] font-medium leading-tight truncate m-0">
                  {{ item.clientName }}
                </h4>
                <p class="text-[0.68rem] text-[#F7F4EE]/50 font-mono truncate m-0">
                  {{ item.location }}
                </p>
              </div>
            </div>

          </div>
        }
      </div>

      <!-- Video / Site Visit Assurance Banner -->
      <div class="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#14120D] via-[#1E1911] to-[#14120D] border border-[#D4AF37]/35 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-[#B5562C]/20 border border-[#B5562C]/50 flex items-center justify-center text-[#D97746] flex-shrink-0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          </div>
          <div>
            <h4 class="font-display text-base sm:text-lg text-[#F7F4EE] m-0">Want to inspect our ongoing construction sites in Gurugram?</h4>
            <p class="text-xs text-[#F7F4EE]/65 font-mono mt-0.5 m-0">Walk through our active Sector 67 & 57 sites with Naveen Sharma before making any commitment.</p>
          </div>
        </div>

        <button 
          (click)="dataService.openConsultationModal('Live Site Visit Request')"
          class="luxury-btn bg-[#B5562C] hover:bg-[#97431F] text-[#F7F4EE] px-6 py-2.5 rounded-full font-mono text-xs uppercase font-semibold tracking-wider whitespace-nowrap shadow-lg shadow-[#B5562C]/30 flex-shrink-0 cursor-pointer"
        >
          Book Physical Site Visit &rarr;
        </button>
      </div>

    </section>
  `
})
export class TestimonialsComponent {
  readonly dataService = inject(ConstructionDataService);

  readonly testimonials: Testimonial[] = [
    {
      id: 't1',
      clientName: 'Col. Rajesh Bakshi (Retd.)',
      role: 'Homeowner',
      location: 'Sector-57, Sushant Lok 2',
      plotSize: '350 Sq. Yds',
      projectType: 'Turnkey Stilt+4 Floors',
      rating: 5,
      quote: 'Naveen Sharma delivered on the exact promised BOQ with zero cost escalation. Tata Tiscon steel and M-30 concrete batching were verified at every casting. Handed over on schedule with full HSVP OC.',
      highlight: 'Zero Cost Escalation Guarantee',
      savingsOrOutcome: 'Delivered in 11 Months with Full HSVP OC',
      avatarInitials: 'RB',
      avatarBg: '#5A3E2B'
    },
    {
      id: 't2',
      clientName: 'Vikram & Ananya Singhania',
      role: 'Villa Owners',
      location: 'Sector-67, Golf Course Extn',
      plotSize: '500 Sq. Yds',
      projectType: 'Ultra-Luxury Villa',
      rating: 5,
      quote: 'We chose the Cost-Plus model and saved over ₹14 Lakhs on materials and Italian marble. Naveen Ji provided original distributor bills every week. 100% financial clarity.',
      highlight: 'Cost-Plus 10% Wholesale Savings',
      savingsOrOutcome: 'Saved ₹14.5 Lakhs on Materials + Italian Marble',
      avatarInitials: 'VS',
      avatarBg: '#8B4513'
    },
    {
      id: 't3',
      clientName: 'Dr. Harpreet Singh Sethi',
      role: 'Surgeon & Resident',
      location: 'Nirvana Country, Sector-50',
      plotSize: '250 Sq. Yds',
      projectType: 'Complete Renovation',
      rating: 5,
      quote: 'Our 18-year-old kothi was transformed into a modern open-concept home in 75 days. Complete structural reinforcement and zero wall dampness with a 5-year warranty.',
      highlight: 'Rapid Turnaround & Waterproofing',
      savingsOrOutcome: '100% Seepage-Free with 5-Year Warranty',
      avatarInitials: 'HS',
      avatarBg: '#2E4A3E'
    },
    {
      id: 't4',
      clientName: 'Er. Sanjay Varma',
      role: 'Chartered Structural Consultant',
      location: 'Sector-46, Gurugram',
      plotSize: '300 Sq. Yds',
      projectType: 'Turnkey Stilt+4 Floors',
      rating: 5,
      quote: 'As a civil engineer, I personally audited the steel bar-bending schedules and concrete cube test reports. Outstanding structural integrity and zero quality shortcuts.',
      highlight: 'Zero Lapses & Full HSVP OC',
      savingsOrOutcome: 'Passed All NABL Cube Strength Tests with 100% Score',
      avatarInitials: 'SV',
      avatarBg: '#3B3A5A'
    }
  ];
}
