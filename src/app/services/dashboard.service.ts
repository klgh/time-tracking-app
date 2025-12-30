import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export type TimeframeType = 'daily' | 'weekly' | 'monthly';

export interface TimeframeData {
    current: number;
    previous: number;
}

export interface Activity {
    title: string;
    timeframes: {
        daily: TimeframeData;
        weekly: TimeframeData;
        monthly: TimeframeData;
    };
}

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private http = inject(HttpClient);

    activities = signal<Activity[]>([]);
    activeTimeframe = signal<TimeframeType>('weekly');

    constructor() {
        this.fetchData();
    }

    fetchData() {
        this.http.get<Activity[]>('assets/data.json').subscribe(data => {
            this.activities.set(data);
        });
    }

    setTimeframe(timeframe: TimeframeType) {
        this.activeTimeframe.set(timeframe);
    }
}
