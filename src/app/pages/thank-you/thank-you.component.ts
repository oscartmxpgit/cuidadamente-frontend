import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent {
  @Input() name!: string;
  @Input() phone!: string;
  @Input() email!: string;
}
