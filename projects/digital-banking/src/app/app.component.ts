import { Component } from '@angular/core';
import { SessionService } from 'bofa-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Online Banking';

  constructor(public readonly session: SessionService) {}
}
