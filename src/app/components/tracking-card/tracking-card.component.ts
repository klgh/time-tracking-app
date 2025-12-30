import { Component, input, inject, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Activity, DashboardService } from '../../services/dashboard.service';

@Component({
    selector: 'app-tracking-card',
    standalone: true,
    imports: [CommonModule, NgOptimizedImage],
    template: `
    <div class="card" [class]="slug()">
      <div class="icon-bg">
           <!-- Ideally this image would be purely decorative, but NgOptimizedImage needs alt. Empty alt is fine. -->
           <!-- Using inline style for positioning the icon as it is specific to the card design -->
           <img [ngSrc]="'assets/images/icon-' + slug() + '.svg'" alt="" width="79" height="79" class="activity-icon">
      </div>
      <div class="content">
        <div class="header">
          <h2 class="title">{{ activity().title }}</h2>
          <button class="ellipsis" aria-label="More options">
            <img ngSrc="assets/images/icon-ellipsis.svg" alt="" width="21" height="5">
          </button>
        </div>
        <div class="stats-row">
          <div class="current">{{ currentStats().current }}hrs</div>
          <div class="previous">{{ previousText() }} - {{ currentStats().previous }}hrs</div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .card {
      border-radius: 15px;
      overflow: hidden;
      padding-top: 45px; /* Space for the color tab at top */
      position: relative;
      cursor: pointer;
      display: flex;
      flex-direction: column;
    }

    /* Theme colors */
    .card.work { background-color: var(--color-work); }
    .card.play { background-color: var(--color-play); }
    .card.study { background-color: var(--color-study); }
    .card.exercise { background-color: var(--color-exercise); }
    .card.social { background-color: var(--color-social); }
    .card.self-care { background-color: var(--color-self-care); }

    .icon-bg {
        position: absolute;
        top: -10px;
        right: 15px;
        z-index: 1;
        overflow: visible;
    }
    
    .content {
      background-color: var(--color-dark-blue);
      border-radius: 15px 15px; /* Rounded top on card content looks nice */
      padding: 30px;
      position: relative;
      z-index: 2;
      transition: background-color 0.3s;
      flex: 1;
      display: flex; /* Flex to allow spacing */
      flex-direction: column;
      justify-content: space-between;
      height: 100%; /* Ensure it fills parent height */
      margin-top: -5px; /* Overlap slightly so it looks connected */
    }

    .content:hover {
        background-color: var(--color-card-hover); /* Calculated hover color */
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .title {
        font-size: 18px;
        font-weight: 500;
    }

    .ellipsis {
        padding: 5px;
        cursor: pointer;
        opacity: 1;
        transition: opacity 0.3s;
    }
    .ellipsis:hover {
        filter: brightness(100); /* Make it white on hover? Design implies simple hover */
        opacity: 1; 
    }
    
    /* Just use text color white for ellipsis */
    .ellipsis img {
       /* Standard svg */
    }

    .stats-row {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .current {
        font-size: 56px;
        font-weight: 300;
    }

    .previous {
        font-size: 15px;
        color: var(--color-pale-blue);
    }

    @media (max-width: 1000px) { /* Tablet/Mobile */
         .stats-row {
             flex-direction: row;
             justify-content: space-between;
             align-items: center;
             margin-top: auto;
         }
         .current {
             font-size: 32px;
         }
         
         /* Ensure icon isn't clipped weirdly on small cards */
    }
  `]
})
export class TrackingCardComponent {
    activity = input.required<Activity>();
    dashboardService = inject(DashboardService);

    slug = computed(() => this.activity().title.toLowerCase().replace(' ', '-'));

    currentStats = computed(() => {
        const tf = this.dashboardService.activeTimeframe();
        return this.activity().timeframes[tf];
    });

    previousText = computed(() => {
        const tf = this.dashboardService.activeTimeframe();
        switch (tf) {
            case 'daily': return 'Yesterday';
            case 'weekly': return 'Last Week';
            case 'monthly': return 'Last Month';
        }
    });
}
