import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { FileService } from '../../tarjetas/fileService';
import { TarjetasService } from '../../tarjetas/tarjetas.service';
import { Tarjeta } from '../../models/tarjeta';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {
  showFull: { [key: string]: boolean } = {};
  teamMembers: Tarjeta[] = [];
  selectedMember: Tarjeta | null = null;

  constructor(
    private fileService: FileService,
    private tarjetasService: TarjetasService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.tarjetasService.obtenerPorTipo('TeamMember').subscribe(members => {
      this.teamMembers = members;

      this.teamMembers.forEach(member => {
        if (member.imageFileName) {
          this.fileService.loadImage(member.imageFileName).subscribe(url => {
            (member as any).imageUrl = url;
          });
        }
      });
    });
  }

  getImageUrl(member: Tarjeta): string {
    return (member as any).imageUrl || '';
  }

  toggleDescription(title: string) {
    this.showFull[title] = !this.showFull[title];
  }

  openModal(member: Tarjeta) {
    this.selectedMember = member;
  }

  closeModal() {
    this.selectedMember = null;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    if (this.selectedMember) this.closeModal();
  }

  onCardClick(event: MouseEvent, member: Tarjeta) {
    const target = event.target as HTMLElement;
    if (!target.closest('a') && !target.closest('button') && !target.classList.contains('show-more')) {
      this.openModal(member);
    }
  }

  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
