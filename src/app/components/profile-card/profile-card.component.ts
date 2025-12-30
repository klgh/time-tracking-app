import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DashboardService, TimeframeType } from '../../services/dashboard.service';

@Component({
    selector: 'app-profile-card',
    standalone: true,
    imports: [CommonModule, NgOptimizedImage],
    template: `
    <div class="profile-card">
      <div class="report-for">
        <img ngSrc="assets/images/image-jeremy.png" alt="Jeremy Robson" width="64" height="64" class="profile-img">
        <div class="text">
            <span class="label">Report for</span>
            <h1 class="name">Jeremy Robson</h1>
        </div>
      </div>
      <div class="timeframes">
        <button 
          (click)="setTimeframe('daily')" 
          [class.active]="dashboardService.activeTimeframe() === 'daily'">
          Daily
        </button>
        <button 
          (click)="setTimeframe('weekly')" 
          [class.active]="dashboardService.activeTimeframe() === 'weekly'">
          Weekly
        </button>
        <button 
          (click)="setTimeframe('monthly')" 
          [class.active]="dashboardService.activeTimeframe() === 'monthly'">
          Monthly
        </button>
      </div>
    </div>
  `,
    styles: [`
    .profile-card {
      background-color: var(--color-dark-blue);
      border-radius: 15px;
      overflow: hidden;
      height: 100%; /* Fill the grid area */
      display: flex;
      flex-direction: column;
    }
    .report-for {
      background-color: var(--color-blue);
      padding: 30px;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 40px;
      flex: 1; /* Push timeframes down */
    }
    .profile-img {
      border: 3px solid white;
      border-radius: 50%;
    }
    .label {
      font-size: 15px;
      color: var(--color-pale-blue);
      margin-bottom: 5px;
      display: block;
    }
    .name {
      font-size: 40px;
      font-weight: 300;
      line-height: 1.2;
    }
    .timeframes {
        padding: 24px 30px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
        background-color: var(--color-dark-blue);
    }
    button {
        color: var(--color-desaturated-blue);
        font-size: 18px;
        transition: color 0.3s;
        padding: 0;
        background: transparent;
        border: none;
        cursor: pointer;
    }
    button:hover {
        color: white;
    }
    button.active {
        color: white;
    }

    @media (max-width: 1000px) { /* Mobile/Tablet adjustments */
        .profile-card {
            height: auto;
        }
        .report-for {
            flex-direction: row;
            align-items: center;
            padding: 30px;
            gap: 20px;
            flex: 0;
        }
        .name {
            font-size: 24px;
        }
        .timeframes {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 24px 30px;
        }
    }
  `]
})
export class ProfileCardComponent {
    dashboardService = inject(DashboardService);

    setTimeframe(type: TimeframeType) {
        this.dashboardService.setTimeframe(type);
    }
}
