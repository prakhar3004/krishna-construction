import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructionDataService } from '../../services/construction-data.service';

interface SitePhoto {
  id: number;
  src: string;
  title: string;
  category: 'living' | 'wardrobe' | 'civil' | 'exterior';
  categoryLabel: string;
  location: string;
  desc: string;
}

@Component({
  selector: 'app-projects-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="portfolio" class="pt-5 pb-5 sm:pt-7 sm:pb-7 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      <!-- Section Header: Clean, Uncluttered, Real -->
      <div class="mb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span class="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
            Real Site Work &middot; Gurugram
          </span>
          <h2 class="mt-2 text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-[#F8FAFC] tracking-tight m-0">
            Actual Project Photos <span class="text-[#D4AF37]">(29 Site Pictures)</span>
          </h2>
          <p class="mt-1.5 text-xs sm:text-sm text-[#F8FAFC]/75 max-w-2xl leading-relaxed m-0 font-light">
            Genuine site photography executed by Master Builder Naveen Sharma &mdash; from structural RCC footings and roof casting to bespoke teak woodwork and turnkey villa delivery.
          </p>
        </div>

        <!-- Filter Tabs -->
        <div class="flex flex-wrap gap-1.5 sm:gap-2 flex-shrink-0">
          @for (tab of tabs; track tab.key) {
            <button 
              type="button"
              (click)="activeTab.set(tab.key)"
              class="px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer"
              [class.bg-[#D4AF37]]="activeTab() === tab.key"
              [class.text-[#070A0F]]="activeTab() === tab.key"
              [class.font-bold]="activeTab() === tab.key"
              [class.shadow-md]="activeTab() === tab.key"
              [class.bg-[#0B1019]]="activeTab() !== tab.key"
              [class.text-[#F8FAFC]/70]="activeTab() !== tab.key"
              [class.border]="activeTab() !== tab.key"
              [class.border-[#F8FAFC]/15]="activeTab() !== tab.key"
              [class.hover:border-[#D4AF37]/40]="activeTab() !== tab.key"
            >
              {{ tab.label }}
            </button>
          }
        </div>
      </div>

      <!-- Real Photo Grid (Responsive: 1 col on mobile, 2 cols on tablet, 3-4 cols on desktop) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        @for (photo of filteredPhotos(); track photo.id; let idx = $index) {
          <div 
            class="group rounded-2xl overflow-hidden bg-[#0B1019] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between shadow-lg"
          >
            <!-- Image Container with Click-to-Zoom -->
            <div 
              (click)="openLightbox(photo.id)"
              class="relative aspect-[4/3] w-full overflow-hidden bg-[#070A0F] cursor-pointer"
            >
              <img 
                [src]="photo.src" 
                [alt]="photo.title"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              <!-- Subtle gradient overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity"></div>

              <!-- Top Category Pill -->
              <div class="absolute top-2.5 left-2.5 z-10">
                <span class="px-2.5 py-0.5 rounded-full text-[0.62rem] font-mono uppercase tracking-wider bg-[#070A0F]/90 text-[#D4AF37] border border-[#D4AF37]/40 backdrop-blur-md">
                  {{ photo.categoryLabel }}
                </span>
              </div>

              <!-- Zoom Icon Hint -->
              <div class="absolute bottom-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#070A0F]/90 text-[#D4AF37] p-1.5 rounded-lg border border-[#D4AF37]/40 backdrop-blur-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/>
                </svg>
              </div>
            </div>

            <!-- Card Meta & Actions -->
            <div class="p-3.5 sm:p-4 space-y-2">
              <div class="flex items-start justify-between gap-2">
                <h3 class="font-display text-sm sm:text-base font-semibold text-[#F8FAFC] leading-snug group-hover:text-[#D4AF37] transition-colors m-0">
                  {{ photo.title }}
                </h3>
              </div>

              <p class="text-[0.72rem] font-mono text-[#F8FAFC]/65 line-clamp-2 m-0 font-light">
                {{ photo.desc }}
              </p>

              <div class="pt-2 border-t border-[#F8FAFC]/10 flex items-center justify-between gap-2">
                <span class="text-[0.65rem] font-mono text-[#38BDF8]">
                  📍 {{ photo.location }}
                </span>

                <a 
                  [href]="dataService.getWhatsAppUrl('Hello Naveen Ji, I want to inquire about the execution finish shown in project photo: ' + photo.title)"
                  target="_blank"
                  (click)="$event.stopPropagation()"
                  class="text-[0.68rem] font-mono text-[#25D366] hover:text-[#25D366]/80 flex items-center gap-1 font-semibold"
                  title="Ask on WhatsApp"
                >
                  <span>Inquire</span>
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Lightbox Modal for Full Image View -->
      @if (lightboxPhoto(); as current) {
        <div 
          (click)="closeLightbox()"
          class="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
        >
          <div 
            (click)="$event.stopPropagation()"
            class="relative max-w-4xl w-full bg-[#0B1019] rounded-2xl border border-[#D4AF37]/40 shadow-2xl overflow-hidden flex flex-col"
          >
            <!-- Modal Header -->
            <div class="px-5 py-3.5 bg-[#070A0F] border-b border-[#F8FAFC]/10 flex items-center justify-between">
              <div>
                <span class="text-xs font-mono text-[#D4AF37] uppercase tracking-wider block">
                  {{ current.categoryLabel }} &middot; {{ current.location }}
                </span>
                <h3 class="text-base sm:text-lg font-display text-[#F8FAFC] font-semibold m-0">
                  {{ current.title }}
                </h3>
              </div>

              <button 
                (click)="closeLightbox()"
                class="w-8 h-8 rounded-full bg-[#0B1019] border border-[#F8FAFC]/20 text-[#F8FAFC] hover:text-[#D4AF37] hover:border-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                &times;
              </button>
            </div>

            <!-- Image View -->
            <div class="relative bg-black flex items-center justify-center max-h-[65vh] overflow-hidden">
              <img 
                [src]="current.src" 
                [alt]="current.title" 
                class="max-h-[65vh] w-auto max-w-full object-contain"
              />

              <!-- Prev / Next Controls -->
              <button 
                (click)="prevLightbox()" 
                class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#D4AF37] text-white hover:text-black border border-white/20 flex items-center justify-center transition-all cursor-pointer"
                title="Previous Photo"
              >
                &#8592;
              </button>
              <button 
                (click)="nextLightbox()" 
                class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#D4AF37] text-white hover:text-black border border-white/20 flex items-center justify-center transition-all cursor-pointer"
                title="Next Photo"
              >
                &#8594;
              </button>
            </div>

            <!-- Modal Footer -->
            <div class="px-5 py-3.5 bg-[#070A0F] border-t border-[#F8FAFC]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p class="text-xs font-mono text-[#F8FAFC]/70 m-0">
                {{ current.desc }}
              </p>

              <div class="flex items-center gap-3 flex-shrink-0">
                <span class="text-xs font-mono text-[#D4AF37]">
                  Photo {{ current.id }} of {{ photos.length }}
                </span>
                <a 
                  [href]="dataService.getWhatsAppUrl('Hello Naveen Ji, I am looking at photo #' + current.id + ' (' + current.title + ') and want to discuss specifications.')"
                  target="_blank"
                  class="luxury-btn bg-[#25D366] text-black font-mono text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      }

    </section>
  `
})
export class ProjectsShowcaseComponent {
  readonly dataService = inject(ConstructionDataService);
  
  readonly tabs = [
    { key: 'all', label: 'All Photos (29)' },
    { key: 'living', label: 'Living & Media Lounges' },
    { key: 'wardrobe', label: 'Wardrobes & Woodwork' },
    { key: 'civil', label: 'Civil & Foundation' },
    { key: 'exterior', label: 'Villas & Exteriors' }
  ];

  readonly activeTab = signal<string>('all');
  readonly selectedPhotoId = signal<number | null>(null);

  readonly photos: SitePhoto[] = [
    {
      id: 1,
      src: 'images/projects/site-1.jpg',
      title: 'Living Hall & Fluted Wood Credenza',
      category: 'living',
      categoryLabel: 'Living & Media',
      location: 'Sector 57, Gurugram',
      desc: 'Floating teak credenza, vertical wooden room partition, and designer ceiling cove lighting.'
    },
    {
      id: 2,
      src: 'images/projects/site-2.jpg',
      title: 'Designer Accent Wall & Display Shelves',
      category: 'living',
      categoryLabel: 'Living & Media',
      location: 'Sector 57, Gurugram',
      desc: 'Textured wallpaper feature wall with floating solid wood ledges and custom hanging pendant lighting.'
    },
    {
      id: 3,
      src: 'images/projects/site-3.jpg',
      title: 'Master Bedroom Media Console Unit',
      category: 'living',
      categoryLabel: 'Living & Media',
      location: 'Sector 67, Gurugram',
      desc: 'Charcoal backdrop accent with wall mounted LED, floating multi-drawer console and open vertical tower.'
    },
    {
      id: 4,
      src: 'images/projects/site-4.jpg',
      title: 'Custom Modular Teak Wardrobe',
      category: 'wardrobe',
      categoryLabel: 'Wardrobes & Joinery',
      location: 'Sushant Lok, Gurugram',
      desc: 'Floor-to-ceiling wardrobe with upper overhead lofts, soft-close hinges and internal security lock drawers.'
    },
    {
      id: 5,
      src: 'images/projects/site-5.jpg',
      title: 'Living Room Wall Moulding Panels',
      category: 'living',
      categoryLabel: 'Living & Media',
      location: 'Sector 57, Gurugram',
      desc: 'European wall moulding frames with Varanasi ghat art installation and brass accent wall sconces.'
    },
    {
      id: 6,
      src: 'images/projects/site-6.jpg',
      title: 'Interior Corridor & Bedroom Doors',
      category: 'wardrobe',
      categoryLabel: 'Wardrobes & Joinery',
      location: 'Sector 57, Gurugram',
      desc: 'Heavy flush doors with natural veneer finish, concealed door closers and architrave jambs.'
    },
    {
      id: 7,
      src: 'images/projects/site-7.jpg',
      title: 'Hallway Wood Finishing & Ceiling AC Vents',
      category: 'living',
      categoryLabel: 'Living & Media',
      location: 'Sector 57, Gurugram',
      desc: 'Concealed ductable VRV AC linear slot diffusers and warm peripheral cove LED lighting.'
    },
    {
      id: 8,
      src: 'images/projects/site-8.jpg',
      title: 'Living Room Overview & Handover Inspection',
      category: 'living',
      categoryLabel: 'Living & Media',
      location: 'Sector 57, Gurugram',
      desc: 'Pre-handover snagging and finishing inspection under Master Builder Naveen Sharma.'
    },
    {
      id: 9,
      src: 'images/projects/site-9.jpg',
      title: 'Accent Wall & Open Shelf Detailing',
      category: 'living',
      categoryLabel: 'Living & Media',
      location: 'Sector 57, Gurugram',
      desc: 'Natural teak wooden floating shelves with concealed steel supports and textured wallpaper.'
    },
    {
      id: 10,
      src: 'images/projects/site-10.jpg',
      title: 'Bedroom Wardrobe & Dressing Joinery',
      category: 'wardrobe',
      categoryLabel: 'Wardrobes & Joinery',
      location: 'Sector 67, Gurugram',
      desc: 'Custom dual-tone laminate and natural veneer wardrobe with satin champagne hardware.'
    },
    {
      id: 11,
      src: 'images/projects/site-11.jpg',
      title: 'Full Height Wardrobe Interior Layout',
      category: 'wardrobe',
      categoryLabel: 'Wardrobes & Joinery',
      location: 'Sector 67, Gurugram',
      desc: 'Organized internal wardrobe compartmentalization with trouser racks, hangers, and lockable vaults.'
    },
    {
      id: 12,
      src: 'images/projects/site-12.jpg',
      title: 'Living Dining Partition & Credenza',
      category: 'living',
      categoryLabel: 'Living & Media',
      location: 'Sector 57, Gurugram',
      desc: 'Dual-aspect room divider providing spatial privacy between formal living and family dining zones.'
    },
    {
      id: 13,
      src: 'images/projects/site-13.jpg',
      title: 'Living Room Ceiling & Lighting Detailing',
      category: 'living',
      categoryLabel: 'Living & Media',
      location: 'Sector 57, Gurugram',
      desc: 'False ceiling with drop coves, anti-glare COB spotlights, and central gold decorative fixture.'
    },
    {
      id: 14,
      src: 'images/projects/site-14.jpg',
      title: 'Wall Art Moulding & Lighting Sconces',
      category: 'living',
      categoryLabel: 'Living & Media',
      location: 'Sector 57, Gurugram',
      desc: 'Symmetric geometric wall trims in satin royal cream finish with warm ambient wall lights.'
    },
    {
      id: 15,
      src: 'images/projects/site-15.jpg',
      title: 'Completed Villa, Lawn & Paved Driveway',
      category: 'exterior',
      categoryLabel: 'Villas & Exteriors',
      location: 'Gurugram Villa Estate',
      desc: 'Turnkey handover of residential estate with paved interlock driveway and landscaped green grass lawn.'
    },
    {
      id: 16,
      src: 'images/projects/site-16.jpg',
      title: 'Villa Exterior & Terrace Railings',
      category: 'exterior',
      categoryLabel: 'Villas & Exteriors',
      location: 'Gurugram Villa Estate',
      desc: 'External masonry finishing with weather-shield elastomeric paint and steel terrace railings.'
    },
    {
      id: 17,
      src: 'images/projects/site-17.jpg',
      title: 'Foundation Excavation & Bhoomi Pujan',
      category: 'civil',
      categoryLabel: 'Civil & Foundation',
      location: 'Gurugram Plot Site',
      desc: 'Auspicious site commencement with deep soil trench excavation and Fe-550D rebar column cages.'
    },
    {
      id: 18,
      src: 'images/projects/site-18.jpg',
      title: 'RCC Roof Slab Shuttering & Rebar Mesh',
      category: 'civil',
      categoryLabel: 'Civil & Foundation',
      location: 'Gurugram Project Site',
      desc: 'Dual-layer steel rebar binding with electrical PVC piping conduits prior to RMC concrete pouring.'
    },
    {
      id: 19,
      src: 'images/projects/site-19.jpg',
      title: 'Slab Casting Preparation & Leveling',
      category: 'civil',
      categoryLabel: 'Civil & Foundation',
      location: 'Gurugram Project Site',
      desc: 'Mechanical vibrator checks and shuttering plate leveling for defect-free monolithic slab casting.'
    },
    {
      id: 20,
      src: 'images/projects/site-20.jpg',
      title: 'Column Steel Reinforcement Inspection',
      category: 'civil',
      categoryLabel: 'Civil & Foundation',
      location: 'Gurugram Plot Site',
      desc: 'On-site structural audit of column lap lengths and lateral tie stirrup spacing per BIS codes.'
    },
    {
      id: 21,
      src: 'images/projects/site-21.jpg',
      title: 'Foundation Trench & Brickwork Footing',
      category: 'civil',
      categoryLabel: 'Civil & Foundation',
      location: 'Gurugram Plot Site',
      desc: 'First-class red clay brick foundation courses laid over compacted PCC bed.'
    },
    {
      id: 22,
      src: 'images/projects/site-22.jpg',
      title: 'Superstructure Parapet & Balcony Railings',
      category: 'civil',
      categoryLabel: 'Civil & Foundation',
      location: 'Gurugram Project Site',
      desc: 'Terrace parapet wall plastering and modern steel louver guardrails.'
    },
    {
      id: 23,
      src: 'images/projects/site-23.jpg',
      title: 'Roof Terrace Slab & Horizon View',
      category: 'exterior',
      categoryLabel: 'Villas & Exteriors',
      location: 'Gurugram Project Site',
      desc: 'Finished rooftop terrace ready for waterproofing protective screed.'
    },
    {
      id: 24,
      src: 'images/projects/site-24.jpg',
      title: 'Terrace Parapet & Drainage Inlets',
      category: 'civil',
      categoryLabel: 'Civil & Foundation',
      location: 'Gurugram Project Site',
      desc: 'Rainwater drainage slope casting and pipe outlet provisions for monsoon protection.'
    },
    {
      id: 25,
      src: 'images/projects/site-25.jpg',
      title: 'Modern Front Gate & Boundary Wall',
      category: 'exterior',
      categoryLabel: 'Villas & Exteriors',
      location: 'Gurugram Villa Estate',
      desc: 'Contemporary vertical slat motorized sliding main entrance gate with granite stone pillars.'
    },
    {
      id: 26,
      src: 'images/projects/site-26.jpg',
      title: 'Paved Driveway & Perimeter Wall Detailing',
      category: 'exterior',
      categoryLabel: 'Villas & Exteriors',
      location: 'Gurugram Villa Estate',
      desc: 'Heavy vehicular interlock paving blocks and boundary wall niche recessed lighting.'
    },
    {
      id: 27,
      src: 'images/projects/site-27.jpg',
      title: 'Villa Courtyard & Boundary Finishes',
      category: 'exterior',
      categoryLabel: 'Villas & Exteriors',
      location: 'Gurugram Villa Estate',
      desc: 'Complete exterior boundary wall plastering, exterior silicone emulsion and security lighting.'
    },
    {
      id: 28,
      src: 'images/projects/site-28.jpg',
      title: 'Entrance Security Slat Gate View',
      category: 'exterior',
      categoryLabel: 'Villas & Exteriors',
      location: 'Gurugram Villa Estate',
      desc: 'Charcoal powder-coated modern security gate providing ventilated elegance and perimeter privacy.'
    },
    {
      id: 29,
      src: 'images/projects/site-29.jpg',
      title: 'Complete Villa Handover at Golden Hour',
      category: 'exterior',
      categoryLabel: 'Villas & Exteriors',
      location: 'Gurugram Villa Estate',
      desc: 'Delivered residential project ready for family Griha Pravesh with zero pending snags.'
    }
  ];

  filteredPhotos() {
    const tab = this.activeTab();
    if (tab === 'all') return this.photos;
    return this.photos.filter(p => p.category === tab);
  }

  lightboxPhoto() {
    const id = this.selectedPhotoId();
    if (id === null) return null;
    return this.photos.find(p => p.id === id) || null;
  }

  openLightbox(id: number) {
    this.selectedPhotoId.set(id);
  }

  closeLightbox() {
    this.selectedPhotoId.set(null);
  }

  nextLightbox() {
    const current = this.lightboxPhoto();
    if (!current) return;
    const nextId = current.id >= this.photos.length ? 1 : current.id + 1;
    this.selectedPhotoId.set(nextId);
  }

  prevLightbox() {
    const current = this.lightboxPhoto();
    if (!current) return;
    const prevId = current.id <= 1 ? this.photos.length : current.id - 1;
    this.selectedPhotoId.set(prevId);
  }
}
