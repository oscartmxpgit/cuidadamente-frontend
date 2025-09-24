import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';
import { HtmlChunkService } from '../../services/html-chunk.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LanguageService } from '../../services/language.service';
import { MensajeContact } from '../../models/MensajeContact';

@Component({
  selector: 'app-home-contacto',
  templateUrl: './home-contacto.component.html',
  styleUrls: ['./home-contacto.component.scss']
})
export class HomeContactoComponent implements OnInit {

  recaptchaSiteKey: string = environment.recaptchaSiteKey;
  captchaResolved: boolean = false;

  private apiUrl = `${environment.apiUrl}mensajescontacts`;


  currentLanguage: string = 'es';

  // Dynamic labels
  labelNombre: string = 'Nombre';
  labelCorreo: string = 'Correo electrónico';
  labelAsunto: string = 'Asunto';
  labelMensaje: string = 'Tu mensaje';
  labelEnviar: string = 'Enviar mensaje';

  contact = {
    nombre: '',
    correoElectronico: '',
    asunto: '',
    mensaje: ''
  };

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private htmlChunkService: HtmlChunkService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.loadHtmlChunks(this.currentLanguage);

    this.languageService.onLanguageChange().subscribe(lang => {
      this.currentLanguage = lang;
      this.loadHtmlChunks(lang);
    });
  }

  private loadHtmlChunks(lang: string) {
    forkJoin({
      nombre: this.htmlChunkService.getHtmlChunkByName(`contact-label-nombre-${lang}`).pipe(catchError(() => of(null))),
      correo: this.htmlChunkService.getHtmlChunkByName(`contact-label-correo-${lang}`).pipe(catchError(() => of(null))),
      asunto: this.htmlChunkService.getHtmlChunkByName(`contact-label-asunto-${lang}`).pipe(catchError(() => of(null))),
      mensaje: this.htmlChunkService.getHtmlChunkByName(`contact-label-mensaje-${lang}`).pipe(catchError(() => of(null))),
      enviar: this.htmlChunkService.getHtmlChunkByName(`contact-label-enviar-${lang}`).pipe(catchError(() => of(null))),
    }).subscribe(({ nombre, correo, asunto, mensaje, enviar }) => {
      this.labelNombre = nombre?.htmlContent || 'Nombre';
      this.labelCorreo = correo?.htmlContent || 'Correo electrónico';
      this.labelAsunto = asunto?.htmlContent || 'Asunto';
      this.labelMensaje = mensaje?.htmlContent || 'Tu mensaje';
      this.labelEnviar = enviar?.htmlContent || 'Enviar mensaje';
    });
  }

  resolvedCaptcha(captchaResponse: string | null) {
    this.captchaResolved = !!captchaResponse;
    console.log('Captcha resolved', captchaResponse);
  }

  submitForm() {
    if (!this.captchaResolved) {
      this.snackBar.open('Por favor, complete el reCAPTCHA', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    }

    // Prepare the payload to match MensajeContact
    const payload = {
      nombre: this.contact.nombre,
      email: this.contact.correoElectronico, // map frontend field to backend Email
      asunto: this.contact.asunto,
      mensaje: this.contact.mensaje,
      fechaContacto: new Date() // set current date
    };

    this.http.post<MensajeContact>(this.apiUrl, payload).subscribe({
      next: (response) => {
        this.snackBar.open('Mensaje enviado con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.contact = { nombre: '', correoElectronico: '', asunto: '', mensaje: '' };
        this.captchaResolved = false;
      },
      error: (err) => {
        this.snackBar.open('Hubo un error al enviar el mensaje', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        console.error('Error sending message', err);
      }
    });
  }


}
