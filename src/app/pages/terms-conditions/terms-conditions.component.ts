import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConstructionDataService } from '../../services/construction-data.service';

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
      
      <!-- Top Breadcrumb Navigation -->
      <div class="mb-6">
        <a 
          routerLink="/" 
          class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4AF37] hover:text-[#38BDF8] transition-colors"
        >
          <span>&larr;</span>
          <span>Return to Home</span>
        </a>
      </div>

      <!-- Header -->
      <div class="mb-8 pb-6 border-b border-[#F8FAFC]/10">
        <span class="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
          Legal &middot; Engagement &amp; Contracting Terms
        </span>
        <h1 class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#F8FAFC] tracking-tight">
          Terms &amp; Conditions
        </h1>
        <p class="mt-2 text-xs sm:text-sm font-mono text-[#F8FAFC]/65">
          General Conditions of Residential Turnkey Construction &middot; Krishna Construction (Gurugram)
        </p>
      </div>

      <!-- Terms Body -->
      <div class="space-y-6 text-[#F8FAFC]/85 text-xs sm:text-sm leading-relaxed font-light">
        
        <!-- Clause 1 -->
        <div class="rounded-2xl bg-[#0B1019] border border-[#D4AF37]/25 p-5 sm:p-7 shadow-lg space-y-3">
          <h2 class="text-base sm:text-lg font-bold text-[#D4AF37] font-display m-0">
            1. Scope of Engagement &amp; Contract Models
          </h2>
          <p class="m-0">
            Krishna Construction provides turnkey residential construction, civil contracting, architectural design, and structural renovation services across Gurugram and the Delhi NCR region under the stewardship of Master Builder Naveen Sharma.
          </p>
          <p class="m-0">
            All construction works are governed by a formal written agreement executed between the property owner (&ldquo;Client&rdquo;) and Krishna Construction (&ldquo;Builder&rdquo;) under one of our two primary contract models:
          </p>
          <ul class="space-y-2 list-none pl-0 text-xs font-mono">
            <li class="flex items-start gap-2">
              <span class="text-[#D4AF37] font-bold">&bull;</span>
              <span><strong>Cost-Plus Model (Recommended):</strong> The Client pays the actual wholesale distributor cost of materials and verified civil labor with weekly GST invoices and weighbridge slips, plus an agreed fixed management fee. Scope changes and material upgrades remain completely flexible.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#D4AF37] font-bold">&bull;</span>
              <span><strong>Lump-Sum Model:</strong> The project is delivered for a fixed, predetermined price based on an agreed 80-page Bill of Quantities (BOQ), with zero contractor budget escalations guaranteed.</span>
            </li>
          </ul>
        </div>

        <!-- Clause 2 -->
        <div class="rounded-2xl bg-[#0B1019] border border-[#D4AF37]/25 p-5 sm:p-7 shadow-lg space-y-3">
          <h2 class="text-base sm:text-lg font-bold text-[#D4AF37] font-display m-0">
            2. Plot Title, Demarcation &amp; Site Possession
          </h2>
          <p class="m-0">
            The Client warrants that the plot or property upon which construction is to take place has clear marketable title, is free of legal encumbrances, and possesses municipal sanction readiness.
          </p>
          <p class="m-0">
            Prior to excavation, the Client shall provide unhindered site possession, verified boundary demarcation by an authorized revenue patwari or municipal surveyor, and uninterrupted temporary electricity/water connections for civil works.
          </p>
        </div>

        <!-- Clause 3 -->
        <div class="rounded-2xl bg-[#0B1019] border border-[#D4AF37]/25 p-5 sm:p-7 shadow-lg space-y-3">
          <h2 class="text-base sm:text-lg font-bold text-[#D4AF37] font-display m-0">
            3. Regulatory Compliance &amp; Engineering Norms
          </h2>
          <p class="m-0">
            All structural design and civil execution strictly conforms to the Haryana Building Code, DTCP Haryana bye-laws, and Bureau of Indian Standards (BIS):
          </p>
          <ul class="space-y-1.5 list-none pl-0 text-xs font-mono">
            <li class="flex items-start gap-2">
              <span class="text-[#38BDF8] font-bold">&bull;</span>
              <span><strong>Seismic Resiliency:</strong> BIS IS:456 (Plain and Reinforced Concrete) and IS:1893 (Earthquake Resistant Design for Seismic Zone IV).</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#38BDF8] font-bold">&bull;</span>
              <span><strong>Quality Assurance:</strong> Mandatory 7-day and 28-day concrete cube compressive tests conducted through independent NABL-accredited laboratories.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#38BDF8] font-bold">&bull;</span>
              <span><strong>Municipal Approvals:</strong> Sanctions from MCG (Municipal Corporation of Gurugram) / DTCP Haryana prior to foundation casting.</span>
            </li>
          </ul>
        </div>

        <!-- Clause 4 -->
        <div class="rounded-2xl bg-[#0B1019] border border-[#D4AF37]/25 p-5 sm:p-7 shadow-lg space-y-3">
          <h2 class="text-base sm:text-lg font-bold text-[#D4AF37] font-display m-0">
            4. Milestone-Linked Payments &amp; Financial Security
          </h2>
          <p class="m-0">
            Krishna Construction adheres to a strict milestone-linked payment structure. The Client never pays upfront lump-sum advances for unexecuted work. Payments are disbursed strictly upon physical civil verification of defined stages:
          </p>
          <ul class="space-y-1.5 list-none pl-0 text-xs font-mono">
            <li class="flex items-start gap-2">
              <span class="text-[#D4AF37] font-bold">1.</span>
              <span>Mobilization, Site Demarcation &amp; Foundation Raft (15%)</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#D4AF37] font-bold">2.</span>
              <span>Ground / Parking Slab Casting (15%)</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#D4AF37] font-bold">3.</span>
              <span>Superstructure Floor Slabs Casting (25%)</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#D4AF37] font-bold">4.</span>
              <span>Internal Brickwork, Plaster &amp; MEP Rough-Ins (15%)</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#D4AF37] font-bold">5.</span>
              <span>Flooring, Marble Polish, Woodwork &amp; Paint (15%)</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#D4AF37] font-bold">6.</span>
              <span>Final Snag Clearance &amp; Griha Pravesh Handover (5%)</span>
            </li>
          </ul>
        </div>

        <!-- Clause 5 -->
        <div class="rounded-2xl bg-[#0B1019] border border-[#D4AF37]/25 p-5 sm:p-7 shadow-lg space-y-3">
          <h2 class="text-base sm:text-lg font-bold text-[#D4AF37] font-display m-0">
            5. Handover, Structural Warranty &amp; Snagging
          </h2>
          <p class="m-0">
            Upon completion, a joint inspection is performed under Master Builder Naveen Sharma with a structured snag checklist. Handover includes:
          </p>
          <ul class="space-y-1.5 list-none pl-0 text-xs font-mono">
            <li class="flex items-start gap-2">
              <span class="text-[#38BDF8] font-bold">&bull;</span>
              <span><strong>10-Year Structural Warranty:</strong> Guaranteeing the structural integrity of all RCC columns, beams, footings, and load-bearing elements.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#38BDF8] font-bold">&bull;</span>
              <span><strong>5-Year Waterproofing Warranty:</strong> Certified protection for wet areas, sunken slabs, and rooftop terraces.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#38BDF8] font-bold">&bull;</span>
              <span><strong>12 Months Free Maintenance:</strong> On-call civil and MEP snag support post-possession.</span>
            </li>
          </ul>
        </div>

        <!-- Clause 6 -->
        <div class="rounded-2xl bg-[#0B1019] border border-[#D4AF37]/25 p-5 sm:p-7 shadow-lg space-y-3">
          <h2 class="text-base sm:text-lg font-bold text-[#D4AF37] font-display m-0">
            6. Force Majeure &amp; CAQM Environmental Bans
          </h2>
          <p class="m-0">
            Neither party shall be liable for project delays caused by occurrences beyond reasonable operational control, including government-mandated winter pollution bans under the Commission for Air Quality Management (CAQM GRAP-III / GRAP-IV), national pandemics, natural earthquakes, or statutory municipal halts. In such events, project delivery schedules shall be mutually extended by the exact duration of the statutory stoppage.
          </p>
        </div>

        <!-- Clause 7 -->
        <div class="rounded-2xl bg-[#0B1019] border border-[#D4AF37]/25 p-5 sm:p-7 shadow-lg space-y-3">
          <h2 class="text-base sm:text-lg font-bold text-[#D4AF37] font-display m-0">
            7. Governing Law &amp; Dispute Resolution
          </h2>
          <p class="m-0">
            This agreement and all related construction transactions shall be governed by and construed in accordance with the laws of the Republic of India. Any dispute arising out of or in connection with the construction agreement shall be submitted to arbitration in Gurugram under the Indian Arbitration and Conciliation Act, 1996. The courts at Gurugram, Haryana shall have exclusive jurisdiction.
          </p>
        </div>

      </div>

      <!-- Bottom Return & WhatsApp CTA -->
      <div class="mt-8 pt-6 border-t border-[#F8FAFC]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a 
          routerLink="/" 
          class="luxury-btn border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#070A0F] px-5 py-2.5 rounded-xl font-mono text-xs uppercase font-semibold transition-all"
        >
          &larr; Back to Main Website
        </a>

        <a 
          [href]="dataService.getWhatsAppUrl('Hello Naveen Ji, I would like to review the construction terms and schedule a contract discussion for my plot.')"
          target="_blank"
          class="luxury-btn bg-[#25D366] hover:bg-[#1EBE5D] text-[#080807] px-5 py-2.5 rounded-xl font-mono text-xs uppercase font-bold flex items-center gap-2 shadow-lg transition-all"
        >
          <span>Discuss Terms on WhatsApp</span>
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/>
          </svg>
        </a>
      </div>

    </div>
  `
})
export class TermsConditionsComponent {
  readonly dataService = inject(ConstructionDataService);
}
