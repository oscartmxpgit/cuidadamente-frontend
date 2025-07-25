import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileService } from '../services/fileService';
import { HtmlChunk } from '../../models/HtmlChunk';
import { HtmlChunkService } from '../../services/html-chunk.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class AboutComponent {
  imageUrls: { [key: string]: SafeUrl } = {};
  htmlChunk?: HtmlChunk;

  imageFileNames: string[] = [
    'crespillo.jpg',
    'pascual-berenguer.jpg',
    'manuela-berenguer.jpg',
    'laura.jpg',
    'judit-escuderos.jpg',
    'maria-brotons.jpg'
  ];

  constructor(
    private fileService: FileService,
    private sanitizer: DomSanitizer,
    private htmlChunkService: HtmlChunkService
  ) {}

  ngOnInit(): void {
    this.htmlChunkService.getHtmlChunkByName('team-member-1').subscribe(chunk => {
      this.htmlChunk = chunk;
      
    });

    this.imageFileNames.forEach(fileName => this.loadImage(fileName));
  }

  loadImage(fileName: string): void {
    this.fileService.loadImage(fileName).subscribe(
      url => {
        this.imageUrls[fileName] = this.sanitizer.bypassSecurityTrustUrl(url);
      },
      error => {
        console.error(`Error loading image ${fileName}:`, error);
      }
    );
  }

  getImageUrl(fileName: string): SafeUrl {
    console.log(`Getting URL for image: ${fileName}`);
    return this.imageUrls[fileName] || '';
  }
}
