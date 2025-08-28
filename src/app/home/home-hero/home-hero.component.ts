import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TRANSITION_TEXT, TRANSITION_TEXT_ENTER, ENTER_SCALE } from './transitions.constants';
import { FileService } from '../../tarjetas/fileService';

@Component({
  selector: 'app-home-hero',
  templateUrl: './home-hero.component.html',
  styleUrl: './home-hero.component.scss',
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
  ]
})
export class HomeHeroComponent implements OnInit {
  imageUrl: string = '';

  constructor(private fileService: FileService) {}

  ngOnInit() {
    // Load your background image from service
    this.fileService.loadImage('FotoPrincipal.jpg').subscribe(url => {
      this.imageUrl = url;
    });
  }

  scrollToContact() {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
