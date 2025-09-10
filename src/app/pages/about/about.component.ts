import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/fileService';
import { TarjetasService } from '../../services/tarjetas.service';
import { HtmlChunkService } from '../../services/html-chunk.service';
import { LanguageService } from '../../services/language.service';
import { Tarjeta } from '../../models/tarjeta';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  showFull: { [key: string]: boolean } = {};
  teamMembers: Tarjeta[] = [];
  selectedMember: Tarjeta | null = null;

  aboutTitle: string = '';
  currentLanguage: string = 'es';

  constructor(
    private fileService: FileService,
    private tarjetasService: TarjetasService,
    private htmlChunkService: HtmlChunkService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.currentLanguage = this.languageService.getCurrentLanguage();

    this.languageService.onLanguageChange().subscribe(lang => {
      this.currentLanguage = lang;
      this.loadHtmlChunks(lang);
      this.loadTeamMembers(lang);
    });

    this.loadHtmlChunks(this.currentLanguage);
    this.loadTeamMembers(this.currentLanguage);
  }

  loadHtmlChunks(lang: string) {
    this.htmlChunkService.getHtmlChunkByName(`about-title-${lang}`)
      .pipe(catchError(() => of(null)))
      .subscribe(chunk => {
        this.aboutTitle = chunk?.htmlContent || '¿Quiénes somos?';
      });
  }

  loadTeamMembers(lang: string) {
  this.tarjetasService.obtenerPorTipoYLanguage('TeamMember', lang).subscribe(members => {
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
}
