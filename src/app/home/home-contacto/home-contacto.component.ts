import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-contacto',
  templateUrl: './home-contacto.component.html',
  styleUrls: ['./home-contacto.component.scss']
})
export class HomeContactoComponent {

  recaptchaSiteKey: string = 'YOUR_SITE_KEY_HERE';
  captchaResolved: boolean = false;

  private baseApiUrl: string = environment.apiUrl;

  private endpoint: string = `${this.baseApiUrl}api/Contacts`;

  constructor(public dialog: MatDialog,
    private http: HttpClient,
    private snackBar: MatSnackBar,

    ) { }
    
  resolvedCaptcha(captchaResponse: string | null) {
    this.captchaResolved = !!captchaResponse;
    console.log('Captcha resolved', captchaResponse);
  }

  contact = {
    nombre: '',
    correoElectronico: '',
    asunto: '',
    mensaje: ''
  };
  
  submitForm() {
    if (!this.captchaResolved) {
      this.snackBar.open('Por favor, complete el reCAPTCHA', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }

    this.http.post(this.endpoint, this.contact).subscribe(response => {
      // Mostrar mensaje de éxito con SnackBar
      this.snackBar.open('Mensaje enviado con éxito', 'Cerrar', {
        duration: 3000, // Mostrar el SnackBar por 3 segundos
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      

      this.contact = {
        nombre: '',
        correoElectronico: '',
        asunto: '',
        mensaje: ''
      };
      this.captchaResolved = false;

    }, error => {
      // Mostrar mensaje de error con SnackBar
      this.snackBar.open('Hubo un error al enviar el mensaje', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

      console.error('Error sending message', error);
    });
  }

}
