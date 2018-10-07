import { Component } from '@angular/core';
import { PrayerTimesService } from './prayer-times.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  response$;
  screen = 'main';
  options = { method: null };

  constructor(private prayerTimesService: PrayerTimesService) {
    this.retry();
  }

  async retry() {
    this.response$ = this.prayerTimesService.get();
    this.options.method = await this.prayerTimesService.getMethod();
  }

  changeMethod(method) {
    this.options.method = method;
    this.prayerTimesService.setMethod(method);
  }
}
