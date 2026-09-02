import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ThreeStageComponent } from './components/three-stage/three-stage.component';
import { PartnersComponent } from './components/partners/partners.component';
import { ServicesComponent } from './components/services/services.component';
import { PackagesAndModelsComponent } from './components/packages-and-models/packages-and-models.component';
import { CostCalculatorComponent } from './components/cost-calculator/cost-calculator.component';
import { RenovationVisualizerComponent } from './components/renovation-visualizer/renovation-visualizer.component';
import { ProjectsShowcaseComponent } from './components/projects-showcase/projects-showcase.component';
import { TrustMetricsComponent } from './components/trust-metrics/trust-metrics.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { FaqSectionComponent } from './components/faq-section/faq-section.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';
import { FloatingBarComponent } from './components/floating-bar/floating-bar.component';
import { ConsultationModalComponent } from './components/consultation-modal/consultation-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConstructionDataService } from './services/construction-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ThreeStageComponent,
    PartnersComponent,
    ServicesComponent,
    PackagesAndModelsComponent,
    CostCalculatorComponent,
    RenovationVisualizerComponent,
    ProjectsShowcaseComponent,
    TrustMetricsComponent,
    TestimonialsComponent,
    FaqSectionComponent,
    ContactSectionComponent,
    FloatingBarComponent,
    ConsultationModalComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly dataService = inject(ConstructionDataService);
}
