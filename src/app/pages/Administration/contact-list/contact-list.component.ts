import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../services/contactService';
import { MensajeContact } from '../../../models/MensajeContact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contactos: MensajeContact[] = [];
  loading = true;

  displayedColumns: string[] = [
    'nombre', 'email', 'mensaje', 'fechaContacto'
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
