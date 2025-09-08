import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
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
  selectedMember: TeamMember | null = null;

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
        const validMembers: TeamMember[] = [];
        members.forEach(member => {
          this.fileService.loadImage(member.imageFileName).subscribe({
            next: url => {
              this.imageUrls[member.imageFileName] = this.sanitizer.bypassSecurityTrustUrl(url);
              validMembers.push(member);
              this.loadHtmlChunk(member);
              this.teamMembers = [...validMembers];
            },
            error: () => console.warn(`Image not found: ${member.imageFileName}. Skipping member.`)
          });
        });
      },
      error: err => console.error('Error loading team members JSON', err)
    });
  }

  private loadHtmlChunk(member: TeamMember): void {
    this.htmlChunkService.getHtmlChunkByName(member.chunkName).subscribe({
      next: chunk => member.htmlContent = chunk.htmlContent,
      error: err => {
        console.error(`Error loading HTML chunk for ${member.chunkName}`, err);
        member.htmlContent = '<p>Información no disponible.</p>';
      }
    });
  }

  getImageUrl(fileName: string): SafeUrl {
    return this.imageUrls[fileName] || '';
  }

  openModal(member: TeamMember) {
    this.selectedMember = member;
  }

  closeModal() {
    this.selectedMember = null;
  }

  // Close modal on ESC
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    if (this.selectedMember) this.closeModal();
  }

  // Handle card click
  onCardClick(event: MouseEvent, member: TeamMember) {
    const target = event.target as HTMLElement;
    if (!target.closest('a') && !target.closest('button') && !target.classList.contains('show-more')) {
      this.openModal(member);
    }
  }

  truncateHtml(html: string, maxLength: number): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    let text = div.textContent || div.innerText || '';
    if (text.length > maxLength) {
      text = text.substr(0, maxLength);
      text = text.substr(0, Math.min(text.length, text.lastIndexOf(' '))) + '...';
    }
    return text;
  }
}
