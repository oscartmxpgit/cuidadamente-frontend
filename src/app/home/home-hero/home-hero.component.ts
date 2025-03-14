import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { TRANSITION_TEXT, TRANSITION_TEXT_ENTER, ENTER_SCALE } from './transitions.constants';

@Component({
  selector: 'app-home-hero',
  animations: [
    trigger('cardHover', [
      state('hover', style({ transform: 'scale(1.05)' })),
      state('rest', style({ transform: 'scale(1)' })),
      transition('rest => hover', animate('300ms ease-in')),
      transition('hover => rest', animate('300ms ease-out')),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    TRANSITION_TEXT,
    TRANSITION_TEXT_ENTER,
    ENTER_SCALE
  ],
  templateUrl: './home-hero.component.html',
  styleUrl: './home-hero.component.scss'
})
export class HomeHeroComponent {
  scrollToContact() {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
