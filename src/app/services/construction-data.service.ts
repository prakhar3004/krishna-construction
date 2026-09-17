import { Injectable, signal, computed } from '@angular/core';
import { CalculationResult, EngineeringStandard, ProjectShowcase, ServicePillar } from '../models/data.models';

@Injectable({
  providedIn: 'root'
})
export class ConstructionDataService {
  // Business Constants
  readonly companyName = 'Krishna Construction';
  readonly founderName = 'Naveen Sharma';
  readonly invocation = '!! Jai Guru Ji !!';
  readonly primaryPhone = '9717077387';
  readonly secondaryPhone = '7982100504';
  readonly fullAddress = 'Office No. 420, 4th Floor, Soho Precision Tower, Gurugram, Delhi NCR';
  readonly googleMapsUrl = 'https://maps.google.com/?q=Soho+Precision+Tower+Gurugram';
  readonly email = 'contact@krishnaconstructiondelhincr.com';

  // Theme Management (Light / Dark Mode)
  readonly isDarkMode = signal<boolean>(true);

  constructor() {
    this.initTheme();
  }

  initTheme() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('krishna_theme');
      const isDark = saved !== null ? saved === 'dark' : true;
      this.setTheme(isDark);
    }
  }

  toggleTheme() {
    this.setTheme(!this.isDarkMode());
  }

  setTheme(isDark: boolean) {
    this.isDarkMode.set(isDark);
    if (typeof window !== 'undefined') {
      localStorage.setItem('krishna_theme', isDark ? 'dark' : 'light');
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    }
  }

  // Calculator State Signals
  readonly selectedPlotSqYards = signal<number>(250);
  readonly selectedFloors = signal<number>(4); // Stilt + 4 Floors (Standard Gurugram Builder Floor model)
  readonly selectedTier = signal<'standard' | 'luxury' | 'ultra-luxury'>('luxury');
  readonly isModalOpen = signal<boolean>(false);
  readonly activeModalTopic = signal<string>('General Construction Consultation');

  // Rates per sq.ft (Gurugram builder market benchmark 2026)
  private readonly tierRates = {
    standard: 1850,
    luxury: 2750,
    'ultra-luxury': 3600
  };

  // Reactive Calculation Result
  readonly calculationResult = computed<CalculationResult>(() => {
    const sqYds = this.selectedPlotSqYards();
    const floors = this.selectedFloors();
    const tier = this.selectedTier();

    const plotAreaSqFt = sqYds * 9;
    // Ground coverage typical 66% - 75% plus stilt parking & balconies in Gurugram
    const groundCoverageRatio = 0.72;
    const builtUpPerFloor = plotAreaSqFt * groundCoverageRatio;
    const totalBuiltUpSqFt = Math.round(builtUpPerFloor * floors);

    const rate = this.tierRates[tier];
    const totalCost = totalBuiltUpSqFt * rate;

    // Realistic construction cost breakdown
    const civilAndStructure = Math.round(totalCost * 0.46);
    const finishingAndFlooring = Math.round(totalCost * 0.24);
    const mepAndElectrical = Math.round(totalCost * 0.14);
    const doorsWindowsWoodwork = Math.round(totalCost * 0.11);
    const architecturalAndApprovals = Math.round(totalCost * 0.05);

    // Estimated months of construction
    const durationMonths = sqYds > 400 ? (floors > 3 ? 13 : 11) : (floors > 3 ? 11 : 9);

    return {
      plotAreaSqYards: sqYds,
      plotAreaSqFt,
      floors,
      totalBuiltUpSqFt,
      finishTier: tier,
      ratePerSqFt: rate,
      totalCost,
      breakdown: {
        civilAndStructure,
        finishingAndFlooring,
        mepAndElectrical,
        doorsWindowsWoodwork,
        architecturalAndApprovals
      },
      durationMonths
    };
  });

  // Solid Engineering Standards & Regulatory Certifications
  readonly engineeringStandards: EngineeringStandard[] = [
    {
      id: 'dtcp-hsvp',
      authority: 'DTCP Haryana & HSVP',
      title: 'Haryana Municipal Sanction & Residential Building Bye-Laws',
      badge: 'Statutory Authority',
      complianceCode: 'Haryana Building Code 2017 / 2024 Amendment',
      scope: 'Gurugram Municipal Corporation (MCG) & HSVP Sectors',
      description: 'Full architectural layout sanctioning, Floor Area Ratio (FAR) optimization, ground coverage compliance, and zero-deviation Occupancy Certificate (OC) delivery.',
      protocols: ['Zonal Plan Boundary Demarcation', 'Stilt Parking Clearance & Fire Escapes', 'Occupancy Certificate (OC) Delivery Guarantee']
    },
    {
      id: 'bis-structural',
      authority: 'Bureau of Indian Standards',
      title: 'BIS IS:456 & IS:1893 Seismic Zone IV Design',
      badge: 'Earthquake Resilient',
      complianceCode: 'IS:456 (Concrete) & IS:1893 (Seismic Criteria)',
      scope: 'Structural RCC Framing & Foundation',
      description: 'Gurugram falls under high-risk Seismic Zone IV. All Krishna Construction designs are vetted by chartered structural engineers using ETABS software for seismic load resistance.',
      protocols: ['Raft Footing & Subterranean Retaining Walls', 'Ductile Detailing with Fe-550D Rebars', 'Minimum M-30 Grade Mechanical Batching']
    },
    {
      id: 'iso-quality',
      authority: 'ISO Quality Management',
      title: 'ISO 9001:2015 Turnkey Construction Standards',
      badge: 'Certified Management',
      complianceCode: 'Quality Assurance Protocol QAP-2026',
      scope: 'Site Supervision & Material Procurement',
      description: 'Strict vendor evaluation and inspection protocols ensuring zero counterfeit cement or secondary steel enters your residential job site.',
      protocols: ['Primary Mill Test Certificates Handed Over', 'Weighbridge Weight Verification Slips', 'Daily Photographic Progress Register']
    },
    {
      id: 'nabl-testing',
      authority: 'NABL Accredited Testing',
      title: 'Mandatory 7-Day & 28-Day Concrete Cube Strength Tests',
      badge: 'Laboratory Vetted',
      complianceCode: 'IS:516 Compressive Strength Testing',
      scope: 'Each Column & Slab Casting Event',
      description: 'Physical concrete test cubes are molded during every casting, water-cured, and crushed at an independent NABL-accredited laboratory to verify compressive strength.',
      protocols: ['Workability Slump Cone Test on Batch Arrival', '7-Day Initial Strength Validation (>70%)', '28-Day Full Compressive Load Certification']
    },
    {
      id: 'cgwb-drainage',
      authority: 'Central Ground Water Board',
      title: 'Dual Rainwater Harvesting & Groundwater Recharge Loops',
      badge: 'Eco Compliance',
      complianceCode: 'Haryana Water Resources Authority (HWRA)',
      scope: 'Sub-surface Storm Water Management',
      description: 'Engineered desilting chambers, dual recharge borewells, and perforated subterranean recharge loops mandatory for Gurugram residential sanctions.',
      protocols: ['Desilting Chamber with Filtration Media', 'Hydro-geological Bore Depth Calibration', '100% Rooftop Runoff Diversion']
    },
    {
      id: 'life-safety',
      authority: 'Haryana Fire & Safety',
      title: 'Life Safety, Setbacks & Fire-Retardant Conduit Standards',
      badge: 'Safety Guaranteed',
      complianceCode: 'National Building Code (NBC) Part IV',
      scope: 'Electrical & Perimeter Envelope',
      description: 'Strict adherence to side and rear setbacks, emergency fire egress staircase clearance, and FRLS (Flame Retardant Low Smoke) copper conduits throughout.',
      protocols: ['Finolex / Polycab FRLS Grade Wiring', 'Dedicated Earthing Pits with Copper Plates', 'Unobstructed 3-Metre Perimeter Setback']
    }
  ];

  // Core Service Pillars: Pure Builder Operations
  readonly servicePillars: ServicePillar[] = [
    {
      id: 'turnkey-construction',
      title: 'Turnkey Home Construction',
      subtitle: 'From Bare Plot Excavation to Griha Pravesh Handover',
      hindiTitle: 'टर्नकी निर्माण — आपके प्लॉट पर मजबूत कोठी व फ्लोर',
      description: 'Complete end-to-end design-build on your freehold or authority plot across Gurugram. We handle deep foundation excavation, RCC superstructure, grey brickwork, MEP rough-ins, and elite turnkey finishes with single-point accountability.',
      features: [
        'Complete Municipal Sanctions & HSVP building approvals handled end-to-end',
        'Seismic Zone IV engineered structural frame with Tata Tiscon / JSW Fe-550D TMT',
        'UltraTech / ACC Grade M-30/M-35 concrete casting with mechanical batching',
        'Subterranean anti-termite soil treatment & 3-layer bitumen waterproofing',
        'Daily digital progress log & site video reports directly to your WhatsApp',
        '10-Year structural warranty on all columns, beams, foundation, and slabs'
      ],
      specifications: [
        { label: 'Plot Sizes Handled', detail: '60 sq. yd up to 1,000+ sq. yd' },
        { label: 'Structural Norm', detail: 'IS 456, IS 1893 (Earthquake Resistant)' },
        { label: 'Slab Height', detail: '10.5 ft to 12.0 ft clear ceiling height' },
        { label: 'Handover Commitment', detail: '9 to 13 months fixed turnkey timeline' }
      ],
      accentColor: '#D4AF37'
    },
    {
      id: 'architectural-sanctions',
      title: 'Architectural Design & Municipal Sanctions',
      subtitle: 'Vastu Floor Layouts, 3D Elevations & DTCP Haryana Approvals',
      hindiTitle: 'आर्किटेक्चर व नक्शा पास — 3D एलिवेशन और सरकारी मंजूरी',
      description: 'In-house chartered architects and structural engineers create optimized 2D working drawings, 3D photorealistic BIM models, Vastu cardinal alignment, and fast-track municipal sanctions under Haryana Building Code.',
      features: [
        'Vastu-compliant spatial planning (Ishan angle entry, Agni corner kitchen)',
        'Full structural stability vetting and ETABS earthquake analysis',
        'Complete municipal submission drawings & approval liaisoning',
        'Photorealistic 3D exterior facades with stone, louvers & glazing options',
        'Comprehensive MEP (Mechanical, Electrical, Plumbing) isometric schematics',
        'Boring soil test & bearing capacity assessment included before design'
      ],
      specifications: [
        { label: 'Design Turnaround', detail: '14 to 21 working days for complete set' },
        { label: '3D BIM Renders', detail: 'Day & Night photorealistic walk-throughs' },
        { label: 'Sanction Liaisoning', detail: 'HSVP, MCG & DTCP Haryana' },
        { label: 'Soil Testing', detail: 'SPT bore testing & bearing report' }
      ],
      accentColor: '#B5562C'
    },
    {
      id: 'renovation-interiors',
      title: 'Luxury Renovation & Retrofitting',
      subtitle: 'Transforming Aging Kothis into Modern Palaces',
      hindiTitle: 'रेनोवेशन व जीर्णोद्धार — पुरानी प्रॉपर्टी को दें लक्ज़री नया रूप',
      description: 'Specialized structural reinforcement and aesthetic revamp for older builder floors, kothis, and duplexes. From load-bearing beam modifications and space reconfiguration to Italian marble diamond polishing, German plumbing, and acoustic facades.',
      features: [
        'Structural steel beam retrofitting for open-concept grand living layouts',
        'Complete bathroom overhaul with Grohe/Kohler concealed cisterns',
        'Imported Italian Botticino / Statuario marble diamond-grit polishing',
        'Bespoke modular kitchen cabinetry with Blum soft-close hardware',
        'False ceiling architectural lighting and smart automated controls',
        'Exterior facade makeover with HPL, stone louvers and toughened glass railings'
      ],
      specifications: [
        { label: 'Renovation Scope', detail: 'Partial / Full Structural Turnkey' },
        { label: 'Plumbing Retrofit', detail: 'CPVC SDR-11 piping replacement' },
        { label: 'Acoustic Glazing', detail: 'DGU 24mm soundproof UPVC / Slim Aluminum' },
        { label: 'Execution Speed', detail: 'Rapid 45 to 90 days delivery' }
      ],
      accentColor: '#6B7A5C'
    }
  ];

  // Active Portfolio & Showcase (Pure Residential Builder Sites)
  readonly showcaseProjects: ProjectShowcase[] = [
    {
      id: 'palm-springs-villa',
      title: 'The Palm Springs Villa 42',
      category: 'Turnkey Villa',
      location: 'Sector-54, Golf Course Road Corridor',
      plotOrSize: '500 Sq. Yards · Multi-Storey Villa',
      status: 'Active Construction',
      description: 'Ultra-luxury monolithic villa featuring deep RCC raft foundation, double-height living room, private gearless Schindler elevator, and Italian Botticino marble throughout.',
      features: ['M-35 Concrete Batching', 'Tata Tiscon Fe-550D Steel', 'Private Plunge Pool Terrace'],
      imageUrl: 'assets/projects/villa1.jpg'
    },
    {
      id: 'sushant-lok-kothi',
      title: 'Sushant Lok Contemporary Kothi',
      category: 'Builder Floors',
      location: 'Sector-57, Sushant Lok 2',
      plotOrSize: '350 Sq. Yards · 4 Independent Floors',
      status: 'Finishing Stage',
      description: 'Custom turnkey builder floor built for joint families. High-end DGU 24mm acoustic soundproof windows, automated stilt parking, and rooftop pergola terrace.',
      features: ['DGU Acoustic Glazing', 'German Viega Plumbing', 'Solar Water Heating 500LPD'],
      imageUrl: 'assets/projects/kothi1.jpg'
    },
    {
      id: 'rosewood-residence',
      title: 'Rosewood City Modern Residence',
      category: 'Turnkey Villa',
      location: 'Sector-49, Rosewood City',
      plotOrSize: '250 Sq. Yards · Duplex Villa',
      status: 'Active Construction',
      description: 'Turnkey residential kothi with Vastu-aligned North-East entrance, cantilevered front balconies, Italian Statuario marble living room, and modular German kitchen.',
      features: ['Vastu Compliant Layout', 'Full Rainwater Harvesting', 'Schneider Smart Automation'],
      imageUrl: 'assets/projects/villa2.jpg'
    },
    {
      id: 'south-city-villa',
      title: 'South City 2 Luxury Villa',
      category: 'Turnkey Villa',
      location: 'Sector-50, South City 2',
      plotOrSize: '400 Sq. Yards · Luxury Residence',
      status: 'Delivered',
      description: 'Delivered in 11 months with complete HSVP Occupancy Certificate. Features 11.5-ft clear ceiling heights, private elevator, and Italian louvered exterior facade.',
      features: ['Full HSVP OC Handover', '10-Year Structural Warranty', 'Italian Stone Facade'],
      imageUrl: 'assets/projects/south-city.jpg'
    },
    {
      id: 'sec-57-renovation',
      title: 'The Heritage Revamp — Sushant Lok',
      category: 'Luxury Renovation',
      location: 'Sector 57, Gurugram',
      plotOrSize: '300 Sq. Yards · Full Kothi Overhaul',
      status: 'Delivered',
      description: 'Complete structural transformation of a 16-year-old kothi into a contemporary minimalist masterpiece with structural steel beams, zero seepage, and VRV cooling.',
      features: ['Steel Beam Retrofitting', 'Dr. Fixit 5-Yr Seepage Proofing', 'Spanish Porcelain Large Slabs'],
      imageUrl: 'assets/projects/renovation1.jpg'
    },
    {
      id: 'sector-67-designer-estate',
      title: 'Soho Corridor Designer Estate',
      category: 'Builder Floors',
      location: 'Sector-67, Golf Course Extension',
      plotOrSize: '500 Sq. Yards · Multi-Floor Residence',
      status: 'Delivered',
      description: 'Flagship builder floor estate executed under Naveen Sharma with double-height living room, 8-SUV stilt parking, Schindler elevator, and rooftop entertainment pergola.',
      features: ['8 SUV Stilt Parking', 'Schindler Capsule Lift', 'Zero Cost Escalation Delivery'],
      imageUrl: 'assets/projects/estate1.jpg'
    }
  ];

  // Helper to construct direct WhatsApp URL
  getWhatsAppUrl(customMessage?: string): string {
    const defaultMsg = `Hello Naveen Ji, I am visiting the Krishna Construction website. I would like to inquire regarding Turnkey House Construction on my plot in Gurugram / Delhi NCR.`;
    const message = customMessage || defaultMsg;
    return `https://wa.me/91${this.primaryPhone}?text=${encodeURIComponent(message)}`;
  }

  // Calculator pre-formatted WhatsApp enquiry
  getCalculatorWhatsAppUrl(): string {
    const res = this.calculationResult();
    const formattedCost = (res.totalCost / 10000000).toFixed(2);
    const msg = `Hello Naveen Ji (Krishna Construction),
I calculated the construction estimate for my Gurugram / Delhi NCR plot:
• Plot Size: ${res.plotAreaSqYards} Sq. Yards (${res.plotAreaSqFt} sq.ft)
• Floors Planned: ${res.floors} Floors
• Total Built-up: ~${res.totalBuiltUpSqFt.toLocaleString()} sq.ft
• Finish Tier: ${res.finishTier.toUpperCase()} (@ ₹${res.ratePerSqFt}/sq.ft)
• Estimated Budget: ₹${formattedCost} Crore (Approx)
• Timeline: ~${res.durationMonths} Months

Please arrange an on-site plot survey or consultation with your team in Delhi NCR.`;
    return `https://wa.me/91${this.primaryPhone}?text=${encodeURIComponent(msg)}`;
  }

  // Quick Modal Controls
  openConsultationModal(topic: string = 'Turnkey Construction Consultation') {
    this.activeModalTopic.set(topic);
    this.isModalOpen.set(true);
  }

  closeConsultationModal() {
    this.isModalOpen.set(false);
  }
}
