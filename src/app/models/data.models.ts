export interface EngineeringStandard {
  id: string;
  authority: string;
  title: string;
  badge: string;
  complianceCode: string;
  scope: string;
  description: string;
  protocols: string[];
}

export interface ServicePillar {
  id: string;
  title: string;
  subtitle: string;
  hindiTitle: string;
  description: string;
  features: string[];
  specifications: { label: string; detail: string }[];
  accentColor: string;
}

export interface CalculationResult {
  plotAreaSqYards: number;
  plotAreaSqFt: number;
  floors: number;
  totalBuiltUpSqFt: number;
  finishTier: 'standard' | 'luxury' | 'ultra-luxury';
  ratePerSqFt: number;
  totalCost: number;
  breakdown: {
    civilAndStructure: number;
    finishingAndFlooring: number;
    mepAndElectrical: number;
    doorsWindowsWoodwork: number;
    architecturalAndApprovals: number;
  };
  durationMonths: number;
}

export interface ProjectShowcase {
  id: string;
  title: string;
  category: 'Turnkey Villa' | 'Stilt+4 Floors' | 'Luxury Renovation' | 'Architectural Sanction';
  location: string;
  plotOrSize: string;
  status: 'Delivered' | 'Active Construction' | 'Handover in Progress' | 'Finishing Stage';
  description: string;
  features: string[];
  imageUrl: string;
}

export interface ContactInquiry {
  name: string;
  phone: string;
  serviceType: string;
  plotLocation: string;
  plotSize: string;
  message: string;
}
