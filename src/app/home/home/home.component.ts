import { Component } from '@angular/core';
import { HtmlChunk } from '../../models/HtmlChunk';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  htmlChunk?: HtmlChunk;

  constructor() {}

  ngOnInit() {
  }
}
