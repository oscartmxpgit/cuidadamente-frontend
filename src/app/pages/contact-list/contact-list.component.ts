import { Component, OnInit } from '@angular/core';
import { Contacto, ContactService } from '../services/contactService';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contactos: Contacto[] = [];
  loading = true;

  displayedColumns: string[] = [
    'nombre', 'email', 'mensaje', 'fechaEnvio'
  ];

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getAll().subscribe({
      next: (data) => {
        this.contactos = data;
        this.loading = false;
      },
      error: () => {
        this.contactos = [];
        this.loading = false;
      }
    });
  }
}
