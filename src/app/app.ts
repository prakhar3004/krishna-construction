import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FloatingBarComponent } from './components/floating-bar/floating-bar.component';
import { ConsultationModalComponent } from './components/consultation-modal/consultation-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConstructionDataService } from './services/construction-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
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
