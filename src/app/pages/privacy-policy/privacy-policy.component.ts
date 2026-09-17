import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConstructionDataService } from '../../services/construction-data.service';

@Component({
  selector: 'app-privacy-policy',
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

      <!-- Header Header -->
      <div class="mb-8 pb-6 border-b border-[#F8FAFC]/10">
        <span class="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
          Legal &middot; Privacy &amp; Data Protection
        </span>
        <h1 class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#F8FAFC] tracking-tight">
          Privacy Policy
        </h1>
        <p class="mt-2 text-xs sm:text-sm font-mono text-[#F8FAFC]/65">
          Effective Date: January 1, 2026 &middot; Applicable to Krishna Construction (Gurugram &amp; Delhi NCR)
        </p>
      </div>

      <!-- Policy Content Body -->
      <div class="space-y-6 text-[#F8FAFC]/85 text-xs sm:text-sm leading-relaxed font-light">
        
        <!-- Section 1 -->
        <div class="rounded-2xl bg-[#0B1019] border border-[#D4AF37]/25 p-5 sm:p-7 shadow-lg space-y-3">
          <h2 class="text-base sm:text-lg font-bold text-[#D4AF37] font-display m-0">
            1. Introduction &amp; Commitment to Privacy
          </h2>
          <p class="m-0">
            Krishna Construction (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), under the leadership of Master Builder Naveen Sharma, operates as a premier residential turnkey construction, civil engineering, and general contracting firm headquartered at Office No. 420, 4th Floor, Soho Precision Tower, Gurugram, Delhi NCR.
          </p>
          <p class="m-0">
            We are committed to maintaining the confidentiality, integrity, and security of all personal, property, and architectural data shared with us by prospective and active homeowners, plot owners, and commercial partners.
          </p>
        </div>

        <!-- Section 2 -->
        <div class="rounded-2xl bg-[#0B1019] border border-[#D4AF37]/25 p-5 sm:p-7 shadow-lg space-y-3">
          <h2 class="text-base sm:text-lg font-bold text-[#D4AF37] font-display m-0">
            2. Information We Collect
          </h2>
          <p class="m-0">
            When you interact with our website, request a turnkey quotation, utilize our Plot Construction Cost Estimator, or book an on-site soil and layout inspection, we collect only relevant project information, including:
          </p>
          <ul class="space-y-1.5 list-none pl-0 text-xs font-mono">
            <li class="flex items-start gap-2">
              <span class="text-[#D4AF37] font-bold">&bull;</span>
              <span><strong>Contact Information:</strong> Full name, mobile phone number, WhatsApp contact handle, and email address.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#D4AF37] font-bold">&bull;</span>
              <span><strong>Project Parameters:</strong> Plot size (in square yards or square feet), sector location in Gurugram / Delhi NCR, planned floor levels, and desired finish tier (Standard, Luxury, or Ultra Luxury).</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#D4AF37] font-bold">&bull;</span>
              <span><strong>Site &amp; Architectural Records:</strong> Survey coordinates, municipal approval records, soil bearing capacity reports, and client-provided reference sketches.</span>
            </li>
          </ul>
        </div>

        <!-- Section 3 -->
        <div class="rounded-2xl bg-[#0B1019] border border-[#D4AF37]/25 p-5 sm:p-7 shadow-lg space-y-3">
          <h2 class="text-base sm:text-lg font-bold text-[#D4AF37] font-display m-0">
            3. Purpose of Processing &amp; Data Utilization
          </h2>
          <p class="m-0">
            Your personal information is strictly utilized for legitimate construction engineering purposes, including:
          </p>
          <ul class="space-y-1.5 list-none pl-0 text-xs font-mono">
            <li class="flex items-start gap-2">
              <span class="text-[#38BDF8] font-bold">&bull;</span>
              <span>Preparing accurate 80-page Bill of Quantities (BOQ) and Cost-Plus transparent estimates.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#38BDF8] font-bold">&bull;</span>
              <span>Scheduling on-site plot topography checks and soil testing with civil engineers.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#38BDF8] font-bold">&bull;</span>
              <span>Facilitating DTCP Haryana, MCG, and HSVP architectural sanction documentation.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#38BDF8] font-bold">&bull;</span>
              <span>Transmitting digital photographic progress reports and weekly weighbridge slips during construction.</span>
            </li>
          </ul>
        </div>

        <!-- Section 4 -->
        <div class="rounded-2xl bg-[#0B1019] border border-[#D4AF37]/25 p-5 sm:p-7 shadow-lg space-y-3">
          <h2 class="text-base sm:text-lg font-bold text-[#D4AF37] font-display m-0">
            4. WhatsApp &amp; Direct Phone Communication Policy
          </h2>
          <p class="m-0">
            By clicking any of our direct WhatsApp quote triggers, telephone dialers, or consultation forms, you explicitly consent to receive one-on-one communication from Naveen Sharma or our certified technical engineers regarding your project.
          </p>
          <p class="m-0">
            <strong>Zero Spam Guarantee:</strong> We never employ automated robocalls, third-party promotional SMS blasts, or unrelated marketing solicitations. Communication is strictly limited to your construction requirements and milestone updates.
          </p>
        </div>

        <!-- Section 5 -->
        <div class="rounded-2xl bg-[#0B1019] border border-[#D4AF37]/25 p-5 sm:p-7 shadow-lg space-y-3">
          <h2 class="text-base sm:text-lg font-bold text-[#D4AF37] font-display m-0">
            5. Non-Disclosure of Architectural &amp; Property Assets
          </h2>
          <p class="m-0">
            All structural drawings, 2D AutoCAD floor plans, 3D BIM models, and title deeds entrusted to Krishna Construction are treated as confidential intellectual property. We do not distribute client floor plans to external builders or real estate brokers without written authorization.
          </p>
        </div>

        <!-- Section 6 -->
        <div class="rounded-2xl bg-[#0B1019] border border-[#D4AF37]/25 p-5 sm:p-7 shadow-lg space-y-3">
          <h2 class="text-base sm:text-lg font-bold text-[#D4AF37] font-display m-0">
            6. Third-Party Sharing &amp; Statutory Disclosures
          </h2>
          <p class="m-0">
            We do not sell, lease, or trade personal information to commercial advertising networks. Information is only shared when strictly required for:
          </p>
          <ul class="space-y-1.5 list-none pl-0 text-xs font-mono">
            <li class="flex items-start gap-2">
              <span class="text-[#D4AF37] font-bold">&bull;</span>
              <span><strong>Government Authorities:</strong> DTCP Haryana, MCG Gurugram, HSVP, or DDA for formal building plan sanctions and Occupancy Certificates (OC).</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#D4AF37] font-bold">&bull;</span>
              <span><strong>Certified Testing Laboratories:</strong> NABL-accredited labs for compressive concrete cube strength testing and soil bearing reports.</span>
            </li>
          </ul>
        </div>

        <!-- Section 7 -->
        <div class="rounded-2xl bg-[#0B1019] border border-[#D4AF37]/25 p-5 sm:p-7 shadow-lg space-y-3">
          <h2 class="text-base sm:text-lg font-bold text-[#D4AF37] font-display m-0">
            7. Grievance Redressal &amp; Master Builder Desk
          </h2>
          <p class="m-0">
            For inquiries regarding this Privacy Policy, your property data, or to request removal of your contact details from our records, please contact our Master Builder Desk directly:
          </p>
          <div class="mt-2 p-3.5 rounded-xl bg-[#070A0F] border border-[#D4AF37]/20 font-mono text-xs space-y-1">
            <div><strong class="text-[#D4AF37]">Design-Build Firm:</strong> Krishna Construction</div>
            <div><strong class="text-[#F8FAFC]">Managing Builder:</strong> Naveen Sharma</div>
            <div><strong class="text-[#F8FAFC]">Office Address:</strong> Office No. 420, 4th Floor, Soho Precision Tower, Gurugram, Delhi NCR</div>
            <div><strong class="text-[#F8FAFC]">Direct Phone / WhatsApp:</strong> +91 {{ dataService.primaryPhone }}</div>
            <div><strong class="text-[#F8FAFC]">Email:</strong> {{ dataService.email }}</div>
          </div>
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
          [href]="dataService.getWhatsAppUrl('Hello Naveen Ji, I have a question regarding privacy and project consultation for my plot.')"
          target="_blank"
          class="luxury-btn bg-[#25D366] hover:bg-[#1EBE5D] text-[#080807] px-5 py-2.5 rounded-xl font-mono text-xs uppercase font-bold flex items-center gap-2 shadow-lg transition-all"
        >
          <span>Contact Naveen Sharma</span>
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/>
          </svg>
        </a>
      </div>

    </div>
  `
})
export class PrivacyPolicyComponent {
  readonly dataService = inject(ConstructionDataService);
}
