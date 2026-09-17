import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeStageComponent } from '../../components/three-stage/three-stage.component';
import { PackagesAndModelsComponent } from '../../components/packages-and-models/packages-and-models.component';
import { RenovationVisualizerComponent } from '../../components/renovation-visualizer/renovation-visualizer.component';
import { CostCalculatorComponent } from '../../components/cost-calculator/cost-calculator.component';
import { ProjectsShowcaseComponent } from '../../components/projects-showcase/projects-showcase.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';
import { FaqSectionComponent } from '../../components/faq-section/faq-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ThreeStageComponent,
    PackagesAndModelsComponent,
    RenovationVisualizerComponent,
    CostCalculatorComponent,
    ProjectsShowcaseComponent,
    ContactSectionComponent,
    FaqSectionComponent
  ],
  template: `
    <!-- 1. Hero & Fast Quote Form -->
    <app-three-stage></app-three-stage>

    <!-- 2. Trusted Brands, Services, Contract Models & Packages -->
    <app-packages-and-models></app-packages-and-models>

    <!-- 3. Before & After Transformations (Real Projects) -->
    <app-renovation-visualizer></app-renovation-visualizer>

    <!-- 4. Interactive Plot Construction Cost Estimator -->
    <app-cost-calculator></app-cost-calculator>

    <!-- 5. Real Projects Showcase (29 Verified Site Photos with Lightbox) -->
    <app-projects-showcase></app-projects-showcase>

    <!-- 6. Direct Contact & Site Consultation -->
    <app-contact-section></app-contact-section>

    <!-- 7. Frequently Asked Questions -->
    <app-faq-section></app-faq-section>
  `
})
export class HomeComponent {}
