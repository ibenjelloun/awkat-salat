import { Component } from '@angular/core';
import { PrayerTimesService } from './prayer-times.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  response$;
  constructor(private prayerTimesService: PrayerTimesService) {
    this.response$ = this.prayerTimesService.get();
  }
  retry() {
    this.response$ = this.prayerTimesService.get();
  }
}
