import { Component } from '@angular/core';
import { ContactInfoService } from '../../services/contactInfoService';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent {
  phone = '';
  email = '';
  address = '';

  constructor(private contactService: ContactInfoService) {
    this.phone = this.contactService.phone;
    this.email = this.contactService.email;
    this.address = this.contactService.address;
  }
}
