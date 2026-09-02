import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructionDataService } from '../../services/construction-data.service';

@Component({
  selector: 'app-floating-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Floating Bottom Bar (Sticky Quick Actions) -->
    <aside aria-label="Quick Connect Actions" class="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      <!-- Call Dialers Flyout (Visible on Desktop / Tablet) -->
      <div class="hidden sm:flex items-center gap-2 pointer-events-auto bg-[#0E0E0C]/90 backdrop-blur-xl p-2 rounded-full border border-[#D4AF37]/30 shadow-2xl">
        <a 
          [href]="'tel:+91' + dataService.primaryPhone"
          class="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[0.72rem] font-mono text-[#F7F4EE] hover:text-[#D4AF37] hover:bg-[#1A1916] transition-all"
        >
          <span class="w-2 h-2 rounded-full bg-[#6B7A5C] animate-pulse"></span>
          <span>Naveen Sharma: <strong>{{ dataService.primaryPhone }}</strong></span>
        </a>

        <span class="text-[#F7F4EE]/20">|</span>

        <a 
          [href]="'tel:+91' + dataService.secondaryPhone"
          class="flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.72rem] font-mono text-[#F7F4EE]/70 hover:text-[#D4AF37] hover:bg-[#1A1916] transition-all"
        >
          <span>Desk: <strong>{{ dataService.secondaryPhone }}</strong></span>
        </a>
      </div>

      <!-- Main WhatsApp Floating Trigger -->
      <a 
        [href]="dataService.getWhatsAppUrl()" 
        target="_blank"
        class="pointer-events-auto flex items-center gap-3 bg-[#25D366] hover:bg-[#1EBE5D] text-[#080807] px-5 py-3.5 rounded-full shadow-2xl shadow-[#25D366]/40 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 group"
      >
        <svg class="w-5 h-5 text-[#080807]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.073.043.419-.101.824z"/>
        </svg>
        <span>Chat with Naveen Ji</span>
      </a>
    </aside>
  `
})
export class FloatingBarComponent {
  readonly dataService = inject(ConstructionDataService);
}
