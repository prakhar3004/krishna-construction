import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConstructionDataService } from '../../services/construction-data.service';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
      <div class="rounded-3xl border border-[#D4AF37]/30 bg-[#0B1019] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <!-- Left: Call to Action & Value Points (7 cols) -->
          <div class="lg:col-span-7 space-y-6">
            <div>
              <span class="inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
                Start Your Project
              </span>
              <h2 class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8FAFC] leading-tight">
                Ready to Build Your Dream Home?
              </h2>
              <p class="mt-3 text-base text-[#F8FAFC]/75 leading-relaxed font-light max-w-xl">
                Get a transparent construction estimate from Gurugram's trusted residential builder. Our experts will help you choose the right package and contract model.
              </p>
            </div>

            <!-- 3 Trust Points (Buildhood Exact Feature) -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div class="rounded-2xl border border-[#F8FAFC]/15 bg-[#070A0F] p-4">
                <svg class="h-5 w-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <p class="mt-2 text-xs font-semibold text-[#F8FAFC]">Package Recommendation</p>
                <p class="mt-1 text-[11px] text-[#F8FAFC]/60">Customized to your budget &amp; plot size.</p>
              </div>

              <div class="rounded-2xl border border-[#F8FAFC]/15 bg-[#070A0F] p-4">
                <svg class="h-5 w-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <p class="mt-2 text-xs font-semibold text-[#F8FAFC]">Estimate in 24 Hours</p>
                <p class="mt-1 text-[11px] text-[#F8FAFC]/60">Clear itemized cost breakdown.</p>
              </div>

              <div class="rounded-2xl border border-[#F8FAFC]/15 bg-[#070A0F] p-4">
                <svg class="h-5 w-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <p class="mt-2 text-xs font-semibold text-[#F8FAFC]">Zero Obligation</p>
                <p class="mt-1 text-[11px] text-[#F8FAFC]/60">Explore at your pace with full freedom.</p>
              </div>
            </div>

            <!-- Direct Contact Link & Corporate Address -->
            <div class="pt-2 flex flex-wrap items-center gap-4">
              <a 
                [href]="'tel:+91' + dataService.primaryPhone" 
                class="inline-flex items-center gap-2 rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 px-5 py-3 text-sm font-bold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#070A0F] transition-all"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>+91 {{ dataService.primaryPhone }}</span>
              </a>
              <span class="text-xs text-[#F8FAFC]/60">
                Desk: Soho Precision Tower, Sector-67 Gurugram
              </span>
            </div>
          </div>

          <!-- Right: Tell Us About Your Site Form (5 cols) -->
          <div class="lg:col-span-5 rounded-2xl border border-[#D4AF37]/25 bg-[#070A0F] p-6 sm:p-8 shadow-xl">
            <div class="mb-5">
              <span class="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Free Estimate</span>
              <h3 class="text-xl font-bold text-[#F8FAFC] mt-1">Tell Us About Your Site</h3>
              <p class="text-xs text-[#F8FAFC]/60 mt-1">Name, mobile and project type &mdash; we'll call back within 24 hours.</p>
            </div>

            @if (isSubmitted()) {
              <div class="py-8 text-center space-y-3">
                <div class="w-12 h-12 rounded-full bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center mx-auto text-[#10B981]">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h4 class="text-lg font-bold text-[#F8FAFC]">Consultation Booked!</h4>
                <p class="text-xs text-[#F8FAFC]/70 max-w-xs mx-auto">
                  Thank you! Our engineering team will review your requirements and reach out shortly.
                </p>
                <button 
                  (click)="isSubmitted.set(false)"
                  class="text-xs font-semibold text-[#D4AF37] underline pt-2"
                >
                  Send another inquiry
                </button>
              </div>
            } @else {
              <form (ngSubmit)="submitForm()" class="space-y-3.5">
                <div>
                  <label class="block text-xs font-medium uppercase tracking-wider text-[#F8FAFC]/70 mb-1">
                    Your Name *
                  </label>
                  <input 
                    type="text" 
                    name="clientName"
                    [(ngModel)]="clientName" 
                    required
                    placeholder="e.g. Rahul Sharma"
                    class="w-full bg-[#0B1019] border border-[#F8FAFC]/20 focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder-[#F8FAFC]/30 outline-none transition-all"
                  />
                </div>

                <div>
                  <label class="block text-xs font-medium uppercase tracking-wider text-[#F8FAFC]/70 mb-1">
                    Mobile Number *
                  </label>
                  <input 
                    type="tel" 
                    name="clientPhone"
                    [(ngModel)]="clientPhone" 
                    required
                    pattern="[0-9]{10}"
                    placeholder="10-digit mobile number"
                    class="w-full bg-[#0B1019] border border-[#F8FAFC]/20 focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder-[#F8FAFC]/30 outline-none transition-all"
                  />
                </div>

                <div>
                  <label class="block text-xs font-medium uppercase tracking-wider text-[#F8FAFC]/70 mb-1">
                    Select Service *
                  </label>
                  <select 
                    name="serviceType"
                    [(ngModel)]="serviceType"
                    class="w-full bg-[#0B1019] border border-[#F8FAFC]/20 focus:border-[#D4AF37] rounded-xl px-3 py-2.5 text-sm text-[#F8FAFC] outline-none transition-all"
                  >
                    <option value="Residential Turnkey Villa">Residential Turnkey Villa / Kothi</option>
                    <option value="Stilt+4 Floors Independent">Stilt + 4 Floors (Builder Floor)</option>
                    <option value="Luxury Home Renovation">Luxury Home Renovation</option>
                    <option value="Cost-Plus Model Construction">Cost-Plus Model Construction</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-medium uppercase tracking-wider text-[#F8FAFC]/70 mb-1">
                    Plot Location / Sector
                  </label>
                  <input 
                    type="text" 
                    name="plotLocation"
                    [(ngModel)]="plotLocation" 
                    placeholder="e.g. Sector 57, Golf Course Extn"
                    class="w-full bg-[#0B1019] border border-[#F8FAFC]/20 focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder-[#F8FAFC]/30 outline-none transition-all"
                  />
                </div>

                <button 
                  type="submit"
                  class="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C4971A] hover:from-[#DFBA44] hover:to-[#D4AF37] text-[#070A0F] text-sm font-bold uppercase tracking-wider shadow-lg shadow-[#D4AF37]/20 transition-all cursor-pointer mt-2"
                >
                  Get Free Consultation &rarr;
                </button>

                <div class="flex items-center justify-between text-[11px] text-[#F8FAFC]/50 pt-1">
                  <span>⏱️ Response in 24 hours</span>
                  <span>🛡️ No spam &middot; Zero obligation</span>
                </div>
              </form>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactSectionComponent {
  readonly dataService = inject(ConstructionDataService);

  clientName = '';
  clientPhone = '';
  serviceType = 'Turnkey Plot Construction';
  plotLocation = '';
  plotSize = '';
  message = '';

  readonly isSubmitted = signal<boolean>(false);

  submitForm() {
    if (!this.clientName || !this.clientPhone) return;

    // Trigger WhatsApp connection with the details
    const text = `Hello Naveen Ji,
I submitted an inquiry via Krishna Construction website:
• Name: ${this.clientName}
• Phone: ${this.clientPhone}
• Requirement: ${this.serviceType}
• Location: ${this.plotLocation || 'Gurugram'}
• Size/Budget: ${this.plotSize || 'Not specified'}
• Note: ${this.message || 'Please connect for discussion'}`;

    window.open(`https://wa.me/91${this.dataService.primaryPhone}?text=${encodeURIComponent(text)}`, '_blank');
    this.isSubmitted.set(true);
  }
}
