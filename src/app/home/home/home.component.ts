import { Component } from '@angular/core';
import { HtmlChunk, HtmlChunkService } from '../../services/html-chunk.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  htmlChunk?: HtmlChunk;

  constructor(private htmlChunkService: HtmlChunkService) {}

  ngOnInit() {
    this.htmlChunkService.getHtmlChunkByName('Example1').subscribe(chunk => {
      this.htmlChunk = chunk;
    });
  }
}
