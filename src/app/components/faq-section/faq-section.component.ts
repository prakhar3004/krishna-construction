import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructionDataService } from '../../services/construction-data.service';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="faq" class="pt-5 pb-5 sm:pt-7 sm:pb-7 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      <!-- Section Header (Buildhood Style) -->
      <div class="text-center max-w-3xl mx-auto mb-4">
        <span class="inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
          FAQ
        </span>
        <h2 class="mt-2 text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
          Frequently Asked Questions
        </h2>
        <p class="mt-1.5 text-xs sm:text-sm text-[#F8FAFC]/75 leading-relaxed">
          Common questions about our packages, contract models, building permissions, and warranties.
        </p>
      </div>

      <!-- FAQ Accordion Grid -->
      <div class="max-w-4xl mx-auto space-y-2.5">
        @for (item of faqs; track item.question; let i = $index) {
          <div 
            class="rounded-2xl border transition-all duration-300 overflow-hidden shadow"
            [class.border-[#D4AF37]/40]="openIndex() === i"
            [class.bg-[#0B1019]]="openIndex() === i"
            [class.border-[#F8FAFC]/10]="openIndex() !== i"
            [class.bg-[#070A0F]]="openIndex() !== i"
          >
            <button 
              type="button"
              (click)="toggleFAQ(i)"
              class="w-full py-3.5 px-5 text-left flex items-center justify-between gap-4 cursor-pointer"
            >
              <span class="font-display text-sm sm:text-base text-[#F7F4EE] font-medium leading-snug">
                {{ item.question }}
              </span>
              <div 
                class="w-7 h-7 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] flex-shrink-0 transition-transform duration-300"
                [class.rotate-180]="openIndex() === i"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </button>

            @if (openIndex() === i) {
              <div class="px-5 pb-4 pt-1 border-t border-[#F7F4EE]/5">
                <p class="text-xs sm:text-sm text-[#F7F4EE]/80 font-light leading-relaxed m-0">
                  {{ item.answer }}
                </p>
              </div>
            }
          </div>
        }
      </div>

      <!-- Quick Desk Assistance Strip -->
      <div class="mt-4 p-4 sm:p-5 rounded-2xl bg-[#0B1019] border-2 border-[#D4AF37]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 max-w-4xl mx-auto">
        <div>
          <h4 class="font-display text-sm sm:text-base font-bold text-[#F7F4EE] m-0">Have a specific plot in Sector 57, 67, or Golf Course Extn?</h4>
          <p class="text-xs text-[#F7F4EE]/70 font-mono mt-0.5 m-0">Talk directly to Naveen Sharma for a customized feasibility check &amp; layout draft.</p>
        </div>

        <a 
          [href]="'https://wa.me/91' + dataService.primaryPhone + '?text=Hello%20Naveen%20Ji,%20I%20have%20a%20question%20regarding%20my%20plot%20construction%20in%20Gurugram.'"
          target="_blank"
          class="luxury-btn bg-[#25D366] hover:bg-[#1EBE5D] text-black font-mono text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 whitespace-nowrap flex-shrink-0"
        >
          <span>Ask On WhatsApp</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </a>
      </div>

    </section>
  `
})
export class FaqSectionComponent {
  readonly dataService = inject(ConstructionDataService);
  readonly openIndex = signal<number>(0);

  readonly faqs: FAQItem[] = [
    {
      question: 'What is the turnkey construction cost per square foot in Gurugram for 2026?',
      answer: 'Turnkey packages start at ₹1,850/sq.ft (Silver), ₹2,150/sq.ft (Gold Premium), ₹2,750/sq.ft (Diamond Luxury with Italian marble), and ₹3,600+/sq.ft (Platinum Bespoke with elevator). All packages include soil testing, DTCP municipal sanctions, and labor.',
      category: 'Pricing'
    },
    {
      question: 'How does your Cost-Plus contract model save up to 10% on construction?',
      answer: 'You pay actual wholesale distributor rates for steel, cement, and marble with weekly GST invoices, plus a fixed management fee. This eliminates hidden contractor markups and saves 8-10% on total project cost.',
      category: 'Contracts'
    },
    {
      question: 'What types of residential construction and builder floors do you build in Gurugram?',
      answer: 'We construct all types of residential projects &mdash; from bespoke duplex villas and independent luxury kothis to multi-storey builder floors. All construction adheres strictly to HSVP and DTCP Haryana bye-laws, Seismic Zone IV structural parameters, and Occupancy Certificate (OC) norms.',
      category: 'Approvals'
    },
    {
      question: 'How do you guarantee material quality and prevent counterfeit brands?',
      answer: 'We source exclusively from primary distributors (Tata Tiscon, UltraTech, JSW, Dr. Fixit). Homeowners receive original mill test certificates, digital weighbridge slips, and mandatory NABL lab cube strength reports for each casting.',
      category: 'Quality'
    },
    {
      question: 'What is the payment schedule throughout the construction process?',
      answer: 'Payments are strictly milestone-linked: Foundation Raft (15%), Stilt Slab (15%), Superstructure Floors (25%), Brickwork & MEP (15%), Finishing & Flooring (15%), and Final Handover (5%). You never pay in advance.',
      category: 'Payments'
    },
    {
      question: 'What structural warranties and post-handover support do you provide on completed homes?',
      answer: 'We provide a 10-Year Structural Warranty on foundation, columns, and slabs, a 5-Year Waterproofing Warranty with Dr. Fixit epoxy treatments, and 12 months of free on-call maintenance.',
      category: 'Warranty'
    }
  ];

  toggleFAQ(index: number): void {
    this.openIndex.set(this.openIndex() === index ? -1 : index);
  }
}
