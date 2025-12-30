import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../services/dashboard.service';
import { ProfileCardComponent } from '../components/profile-card/profile-card.component';
import { TrackingCardComponent } from '../components/tracking-card/tracking-card.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, ProfileCardComponent, TrackingCardComponent],
    template: `
    <div class="dashboard-grid">
      <app-profile-card class="profile-section"></app-profile-card>
      
      @for (activity of dashboardService.activities(); track activity.title) {
        <app-tracking-card [activity]="activity"></app-tracking-card>
      }
    </div>
  `,
    styles: [`
    :host {
      display: block;
      width: 100%;
      max-width: 1110px;
      margin: 0 auto;
      padding: 24px; /* Padding for mobile edges */
    }
    
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 1fr; /* Make rows equal height */
      gap: 30px;
    }
    
    .profile-section {
      grid-column: 1;
      grid-row: 1 / span 2;
    }

    @media (max-width: 1000px) {
        .dashboard-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            /* Rows in tablet mode don't necessarily need to be equal height with profile, but cards should be consistant */
        }
        .profile-section {
            grid-column: 1 / span 2;
            grid-row: auto;
            min-height: 200px; 
        }
    }

    @media (max-width: 600px) {
        .dashboard-grid {
            grid-template-columns: 1fr;
            gap: 24px;
        }
        .profile-section {
            grid-column: 1;
        }
    }
  `]
})
export class DashboardComponent {
    dashboardService = inject(DashboardService);
}
