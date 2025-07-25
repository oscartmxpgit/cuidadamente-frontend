import { Component } from '@angular/core';
import { HtmlChunkService } from '../../services/html-chunk.service';
import { HtmlChunk } from '../../models/HtmlChunk';

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
