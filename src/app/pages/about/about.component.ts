import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileService } from '../../tarjetas/fileService';
import { HtmlChunkService } from '../../tarjetas/html-chunk.service';

interface TeamMember {
  imageFileName: string;
  altText: string;
  chunkName: string;    // nombre para cargar htmlChunk desde BD
  htmlContent?: string; // html cargado desde BD (chunk)
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {
  imageUrls: { [key: string]: SafeUrl } = {};
  teamMembers: TeamMember[] = [
    { imageFileName: 'crespillo.jpg', altText: 'Antonio Crespillo', chunkName: 'team-member-1' },
    { imageFileName: 'pascual-berenguer.jpg', altText: 'Pascual Berenguer', chunkName: 'team-member-2' },
    { imageFileName: 'manuela-berenguer.jpg', altText: 'Manuela Berenguer', chunkName: 'team-member-3' },
    { imageFileName: 'laura.jpg', altText: 'Laura', chunkName: 'team-member-4' },
    { imageFileName: 'judit-escuderos.jpg', altText: 'Judit Escuderos', chunkName: 'team-member-5' },
    { imageFileName: 'maria-brotons.jpg', altText: 'María Brotons', chunkName: 'team-member-6' }
  ];

  constructor(
    private fileService: FileService,
    private sanitizer: DomSanitizer,
    private htmlChunkService: HtmlChunkService
  ) {}

  ngOnInit(): void {
    // Carga imágenes
    this.teamMembers.forEach(member => this.loadImage(member.imageFileName));

    // Carga chunks html para cada miembro
    this.teamMembers.forEach(member => {
      this.htmlChunkService.getHtmlChunkByName(member.chunkName).subscribe({
        next: chunk => {
          member.htmlContent = chunk.htmlContent;
        },
        error: err => {
          console.error(`Error loading HTML chunk for ${member.chunkName}`, err);
          member.htmlContent = '<p>Información no disponible.</p>';
        }
      });
    });
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
    return this.imageUrls[fileName] || '';
  }
}
