import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConstructionDataService } from '../../services/construction-data.service';

@Component({
  selector: 'app-consultation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (dataService.isModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-[#080807]/85 backdrop-blur-xl transition-opacity"
          (click)="dataService.closeConsultationModal()"
        ></div>

        <!-- Modal Box -->
        <div class="relative z-10 w-full max-w-lg glass-card rounded-2xl p-7 sm:p-9 border border-[#D4AF37]/40 shadow-2xl overflow-hidden bg-gradient-to-b from-[#0F172A] to-[#070A0F]">
          <!-- Close Button -->
          <button 
            (click)="dataService.closeConsultationModal()"
            class="absolute top-5 right-5 w-8 h-8 rounded-full border border-[#F8FAFC]/20 flex items-center justify-center text-[#F8FAFC]/60 hover:text-[#FFF] hover:border-[#D4AF37] transition-all"
          >
            ✕
          </button>

          <!-- Header -->
          <div class="mb-6">
            <span class="text-xs font-hindi text-[#D4AF37] font-semibold block mb-1">
              {{ dataService.invocation }}
            </span>
            <h3 class="text-2xl font-display font-medium text-[#F8FAFC]">
              {{ dataService.activeModalTopic() }}
            </h3>
            <p class="text-xs font-mono text-[#38BDF8] mt-1">
              Direct Desk: Naveen Sharma · Gurugram &amp; Delhi NCR
            </p>
          </div>

          <!-- Form -->
          <form (ngSubmit)="sendModalInquiry()" class="space-y-4">
            <div>
              <label class="block text-[0.65rem] font-mono uppercase tracking-wider text-[#F8FAFC]/60 mb-1">
                Your Name *
              </label>
              <input 
                type="text" 
                name="mName"
                [(ngModel)]="name" 
                required
                placeholder="e.g. Vikram Singhania"
                class="w-full bg-[#070A0F] border border-[#D4AF37]/30 focus:border-[#38BDF8] rounded-lg px-4 py-2.5 text-sm text-[#F8FAFC] outline-none"
              />
            </div>

            <div>
              <label class="block text-[0.65rem] font-mono uppercase tracking-wider text-[#F8FAFC]/60 mb-1">
                Phone Number (WhatsApp) *
              </label>
              <input 
                type="tel" 
                name="mPhone"
                [(ngModel)]="phone" 
                required
                placeholder="e.g. 98100 XXXXX"
                class="w-full bg-[#070A0F] border border-[#D4AF37]/30 focus:border-[#38BDF8] rounded-lg px-4 py-2.5 text-sm text-[#F8FAFC] outline-none"
              />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-[0.65rem] font-mono uppercase tracking-wider text-[#F8FAFC]/60 mb-1">
                  Location (Gurugram / Delhi NCR)
                </label>
                <input 
                  type="text" 
                  name="mLoc"
                  [(ngModel)]="location" 
                  placeholder="e.g. Gurugram / South Delhi / Noida"
                  class="w-full bg-[#070A0F] border border-[#D4AF37]/30 focus:border-[#38BDF8] rounded-lg px-3 py-2.5 text-sm text-[#F8FAFC] outline-none"
                />
              </div>

              <div>
                <label class="block text-[0.65rem] font-mono uppercase tracking-wider text-[#F7F4EE]/60 mb-1">
                  Plot / Floor Size
                </label>
                <input 
                  type="text" 
                  name="mSize"
                  [(ngModel)]="size" 
                  placeholder="e.g. 250 sq.yd"
                  class="w-full bg-[#080807] border border-[#F7F4EE]/15 focus:border-[#D4AF37] rounded-lg px-3 py-2.5 text-sm text-[#F7F4EE] outline-none"
                />
              </div>
            </div>

            <div>
              <label class="block text-[0.65rem] font-mono uppercase tracking-wider text-[#F7F4EE]/60 mb-1">
                Preferred Consultation Mode
              </label>
              <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                <label class="flex items-center gap-2 p-2.5 rounded bg-[#080807] border border-[#F7F4EE]/10 cursor-pointer">
                  <input type="radio" name="mode" value="Office Visit" [(ngModel)]="mode" />
                  <span>Soho Tower Visit</span>
                </label>
                <label class="flex items-center gap-2 p-2.5 rounded bg-[#080807] border border-[#F7F4EE]/10 cursor-pointer">
                  <input type="radio" name="mode" value="Site Inspection" [(ngModel)]="mode" />
                  <span>On-Site Inspection</span>
                </label>
              </div>
            </div>

            <div class="pt-2 space-y-2">
              <button 
                type="submit"
                class="luxury-btn bg-[#B5562C] hover:bg-[#97431F] text-[#F7F4EE] py-3 px-5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold w-full flex items-center justify-center gap-2 shadow-xl shadow-[#B5562C]/20 border border-[#B5562C]"
              >
                <span>Send via WhatsApp Desk</span>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.073.043.419-.101.824z"/>
                </svg>
              </button>

              <button 
                type="button"
                (click)="dataService.closeConsultationModal()"
                class="w-full py-2 text-center text-xs font-mono text-[#F7F4EE]/50 hover:text-[#F7F4EE]"
              >
                Cancel & Return
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `
})
export class ConsultationModalComponent {
  readonly dataService = inject(ConstructionDataService);

  name = '';
  phone = '';
  location = '';
  size = '';
  mode = 'Office Visit';

  @HostListener('window:keydown.escape')
  onEscape() {
    this.dataService.closeConsultationModal();
  }

  sendModalInquiry() {
    if (!this.name || !this.phone) return;
    const msg = `Hello Naveen Ji,
I would like to schedule a ${this.dataService.activeModalTopic()}:
• Name: ${this.name}
• Phone: ${this.phone}
• Preferred Meeting: ${this.mode}
• Location: ${this.location || 'Gurugram'}
• Size/Scope: ${this.size || 'To be discussed'}`;

    window.open(`https://wa.me/91${this.dataService.primaryPhone}?text=${encodeURIComponent(msg)}`, '_blank');
    this.dataService.closeConsultationModal();
  }
}
