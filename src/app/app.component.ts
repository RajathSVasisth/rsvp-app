import { Component } from '@angular/core';
import { RsvpManagerComponent } from './components/rsvp-manager/rsvp-manager.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RsvpManagerComponent],
})
export class AppComponent {}
