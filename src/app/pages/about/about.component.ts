import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { TarjetasService } from '../../services/tarjetas.service';
import { Tarjeta } from '../../models/tarjeta';
import { FileService } from '../../services/fileService';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HtmlChunkService } from '../../services/html-chunk.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LanguageService } from '../../services/language.service';

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
  aboutTitle: SafeHtml = '';
  currentLanguage: string = 'es'; // default language

  constructor(
    private fileService: FileService,
    private tarjetasService: TarjetasService,
    private sanitizer: DomSanitizer,
    private htmlChunkService: HtmlChunkService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    // Inicializa lenguaje actual
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.loadChunks(this.currentLanguage);

    // Suscribirse a cambios de idioma
    this.languageService.onLanguageChange().subscribe(lang => {
      this.currentLanguage = lang;
      this.loadChunks(lang);
    });

    // Cargar miembros del equipo
    this.loadTeamMembers();
  }


  loadTeamMembers() {
    this.tarjetasService.obtenerPorTipoYLanguage('TeamMember', this.currentLanguage).subscribe(members => {
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

  loadChunks(lang: string) {
    this.htmlChunkService.getHtmlChunkByName(`about-title-${lang}`)
      .pipe(catchError(() => of(null)))
      .subscribe(chunk => {
        this.aboutTitle = this.sanitize(chunk?.htmlContent || '¿Quiénes somos?');
      });
  }


  toggleDescription(title: string) {
    this.showFull[title] = !this.showFull[title];
  }

  onCardClick(event: MouseEvent, member: Tarjeta) {
    const target = event.target as HTMLElement;
    if (!target.closest('a') && !target.closest('button') && !target.classList.contains('show-more-btn')) {
      this.selectedMember = member;
    }
  }

  closeModal() {
    this.selectedMember = null;
  }

  getImageUrl(member: Tarjeta): string {
    return (member as any).imageUrl || '';
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    if (this.selectedMember) this.closeModal();
  }

  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
