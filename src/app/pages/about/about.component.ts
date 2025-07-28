import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileService } from '../../tarjetas/fileService';
import { HtmlChunkService } from '../../tarjetas/html-chunk.service';
import { HttpClient } from '@angular/common/http';

interface TeamMember {
  imageFileName: string;
  altText: string;
  chunkName: string;
  htmlContent?: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {
  imageUrls: { [key: string]: SafeUrl } = {};
  teamMembers: TeamMember[] = [];

  constructor(
    private fileService: FileService,
    private sanitizer: DomSanitizer,
    private htmlChunkService: HtmlChunkService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadTeamMembers();
  }

  private loadTeamMembers(): void {
    this.http.get<TeamMember[]>('assets/data/team-members.json').subscribe({
      next: (members) => {
        this.teamMembers = members;

        this.teamMembers.forEach(member => {
          this.loadImage(member.imageFileName);
          this.loadHtmlChunk(member);
        });
      },
      error: err => {
        console.error('Error loading team members JSON', err);
      }
    });
  }

  private loadHtmlChunk(member: TeamMember): void {
    this.htmlChunkService.getHtmlChunkByName(member.chunkName).subscribe({
      next: chunk => {
        member.htmlContent = chunk.htmlContent;
      },
      error: err => {
        console.error(`Error loading HTML chunk for ${member.chunkName}`, err);
        member.htmlContent = '<p>Información no disponible.</p>';
      }
    });
  }

  private loadImage(fileName: string): void {
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
