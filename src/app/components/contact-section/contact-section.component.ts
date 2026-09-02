import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConstructionDataService } from '../../services/construction-data.service';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="py-7 sm:py-9 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        <!-- Left: Office Credentials & Contact (6 cols) -->
        <div class="lg:col-span-6 space-y-4">
          <div>
            <div class="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#38BDF8] mb-2">
              <span class="w-6 h-[1px] bg-[#1D4ED8]"></span>
              <span>Corporate Desk &middot; Delhi NCR</span>
            </div>

            <h2 class="text-3xl sm:text-4xl md:text-5xl font-display font-light text-[#F8FAFC] leading-tight mb-3">
              Meet Naveen Sharma at <span class="italic text-[#D4AF37]">Soho Precision Tower</span>.
            </h2>

            <p class="text-base text-[#F8FAFC]/75 font-light leading-relaxed">
              We welcome prospective home builders and plot owners across Delhi NCR to our corporate office for a cup of tea, structural blueprint review, and transparent Cost-Plus BOQ discussion.
            </p>
          </div>

          <!-- Official Office Visiting Card Card -->
          <div class="glass-card rounded-2xl p-7 border border-[#D4AF37]/35 relative overflow-hidden space-y-5 bg-[#0B1019] shadow-xl">
            <div class="flex items-center justify-between pb-3 border-b border-[#F8FAFC]/10">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl p-[2px] bg-gradient-to-br from-[#FFDF73] via-[#D4AF37] to-[#38BDF8] shadow-[0_0_18px_rgba(212,175,55,0.4)] flex-shrink-0">
                  <img src="images/krishna_logo.jpg" alt="Krishna Logo" class="w-full h-full object-cover rounded-[9px] bg-[#070A0F]" />
                </div>
                <div>
                  <span class="text-xs font-hindi text-[#D4AF37] font-semibold block">
                    {{ dataService.invocation }}
                  </span>
                  <span class="font-display text-xl text-[#F8FAFC] font-semibold tracking-wide">
                    KRISHNA CONSTRUCTION
                  </span>
                </div>
              </div>
              <span class="text-[0.65rem] font-mono text-[#38BDF8] uppercase tracking-wider font-semibold">
                Delhi NCR Desk
              </span>
            </div>

            <div class="space-y-3 text-sm">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div class="text-[#F8FAFC]/85 font-light leading-snug">
                  <strong class="font-medium text-[#F8FAFC] block">Office Location:</strong>
                  Office No. 420, 4th Floor, Soho Precision Tower, Gurugram, Delhi NCR.
                </div>
              </div>

              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <div class="text-[#F7F4EE]/85 font-mono text-xs">
                  <span class="text-[#F7F4EE]/50 block uppercase text-[0.65rem]">Direct Dial Line:</span>
                  <div class="flex flex-wrap gap-4 mt-0.5">
                    <a [href]="'tel:+91' + dataService.primaryPhone" class="hover:text-[#D4AF37] underline transition-colors">
                      +91 {{ dataService.primaryPhone }}
                    </a>
                    <span class="text-[#F7F4EE]/30">|</span>
                    <a [href]="'tel:+91' + dataService.secondaryPhone" class="hover:text-[#D4AF37] underline transition-colors">
                      +91 {{ dataService.secondaryPhone }}
                    </a>
                  </div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#25D366] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.073.043.419-.101.824z"/>
                </svg>
                <div class="text-[#F7F4EE]/85 text-xs font-mono">
                  <span class="text-[#F7F4EE]/50 block uppercase text-[0.65rem]">Instant WhatsApp:</span>
                  <a [href]="dataService.getWhatsAppUrl()" target="_blank" class="text-[#25D366] hover:underline">
                    Chat Directly with Naveen Sharma
                  </a>
                </div>
              </div>
            </div>

            <!-- Google Maps Button -->
            <div class="pt-2">
              <a 
                [href]="dataService.googleMapsUrl"
                target="_blank"
                class="luxury-btn border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#D4AF37] py-2.5 px-4 rounded text-xs font-mono flex items-center justify-center gap-2 w-full transition-colors"
              >
                <span>Open Google Maps Directions</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Right: Inquiry Form (6 cols) -->
        <div class="lg:col-span-6 glass-card rounded-2xl p-8 sm:p-10 border border-[#D4AF37]/30 shadow-2xl relative">
          <div class="mb-6">
            <h3 class="text-2xl font-display font-medium text-[#F7F4EE]">
              Book Consultation & Site Review
            </h3>
            <p class="text-xs font-mono text-[#D97746] mt-1">
              Personalized callback from Naveen Sharma within 2 hours.
            </p>
          </div>

          @if (isSubmitted()) {
            <div class="py-12 text-center space-y-4">
              <div class="w-16 h-16 rounded-full bg-[#6B7A5C]/20 border border-[#6B7A5C] flex items-center justify-center mx-auto text-[#6B7A5C]">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h4 class="font-display text-2xl text-[#F7F4EE]">Inquiry Registered!</h4>
              <p class="text-sm text-[#F7F4EE]/70 max-w-sm mx-auto font-light">
                Thank you. Naveen Sharma will review your requirements and call you at <span class="text-[#D4AF37] font-mono">{{ clientPhone }}</span> shortly.
              </p>
              <button 
                (click)="isSubmitted.set(false)"
                class="luxury-btn border border-[#D4AF37]/40 text-[#D4AF37] px-6 py-2 rounded text-xs"
              >
                Submit Another Inquiry
              </button>
            </div>
          } @else {
            <form (ngSubmit)="submitForm()" class="space-y-4">
              <div>
                <label class="block text-[0.65rem] font-mono uppercase tracking-wider text-[#F7F4EE]/60 mb-1.5">
                  Your Full Name *
                </label>
                <input 
                  type="text" 
                  name="clientName"
                  [(ngModel)]="clientName" 
                  required
                  placeholder="e.g. Rahul Verma"
                  class="w-full bg-[#080807] border border-[#F7F4EE]/15 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-lg px-4 py-3 text-sm text-[#F7F4EE] placeholder-[#F7F4EE]/30 outline-none transition-all"
                />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[0.65rem] font-mono uppercase tracking-wider text-[#F7F4EE]/60 mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input 
                    type="tel" 
                    name="clientPhone"
                    [(ngModel)]="clientPhone" 
                    required
                    placeholder="+91 98765 43210"
                    class="w-full bg-[#080807] border border-[#F7F4EE]/15 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-lg px-4 py-3 text-sm text-[#F7F4EE] placeholder-[#F7F4EE]/30 outline-none transition-all"
                  />
                </div>

                <div>
                  <label class="block text-[0.65rem] font-mono uppercase tracking-wider text-[#F7F4EE]/60 mb-1.5">
                    Primary Requirement
                  </label>
                  <select 
                    name="serviceType"
                    [(ngModel)]="serviceType"
                    class="w-full bg-[#080807] border border-[#F7F4EE]/15 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-lg px-3 py-3 text-sm text-[#F7F4EE] outline-none transition-all"
                  >
                    <option value="Turnkey House Construction (Stilt+4)">Turnkey House Construction (Stilt+4)</option>
                    <option value="Custom Luxury Villa Construction">Custom Luxury Villa Construction</option>
                    <option value="Architectural Layout & Municipal Sanctions">Architectural Layout & Municipal Sanctions</option>
                    <option value="Cost-Plus Model Construction">Cost-Plus Model Construction</option>
                    <option value="Full Kothi Structural Renovation">Full Kothi Structural Renovation</option>
                    <option value="Soil Testing & Structural Audit">Soil Testing & Structural Audit</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[0.65rem] font-mono uppercase tracking-wider text-[#F7F4EE]/60 mb-1.5">
                    Plot / Property Location
                  </label>
                  <input 
                    type="text" 
                    name="plotLocation"
                    [(ngModel)]="plotLocation" 
                    placeholder="e.g. Sector 57, 67, Golf Course Extn"
                    class="w-full bg-[#080807] border border-[#F7F4EE]/15 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-lg px-4 py-3 text-sm text-[#F7F4EE] placeholder-[#F7F4EE]/30 outline-none transition-all"
                  />
                </div>

                <div>
                  <label class="block text-[0.65rem] font-mono uppercase tracking-wider text-[#F7F4EE]/60 mb-1.5">
                    Plot Size or Budget
                  </label>
                  <input 
                    type="text" 
                    name="plotSize"
                    [(ngModel)]="plotSize" 
                    placeholder="e.g. 250 sq.yd / ₹3 Cr"
                    class="w-full bg-[#080807] border border-[#F7F4EE]/15 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-lg px-4 py-3 text-sm text-[#F7F4EE] placeholder-[#F7F4EE]/30 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label class="block text-[0.65rem] font-mono uppercase tracking-wider text-[#F7F4EE]/60 mb-1.5">
                  Specific Notes / Timelines
                </label>
                <textarea 
                  name="message"
                  [(ngModel)]="message" 
                  rows="3"
                  placeholder="Tell us about your plot status, construction approvals, or desired floor plan..."
                  class="w-full bg-[#080807] border border-[#F7F4EE]/15 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-lg px-4 py-3 text-sm text-[#F7F4EE] placeholder-[#F7F4EE]/30 outline-none transition-all"
                ></textarea>
              </div>

              <button 
                type="submit"
                class="luxury-btn bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] hover:from-[#1E40AF] hover:to-[#1D4ED8] text-white py-4 px-6 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold w-full flex items-center justify-center gap-2 shadow-xl shadow-[#1D4ED8]/30 border border-[#38BDF8]/40 transition-all cursor-pointer"
              >
                <span>Submit & Receive Direct Callback</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </button>
            </form>
          }
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
