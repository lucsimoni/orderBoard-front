import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from 'src/app/app.config';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  receiver: string;
  titleAlert: string = 'CONTACT.INPUT.EMPTY';
  contactForm: FormGroup;
  post:any = '';

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    let emailRegex: RegExp = AppConfig.configs.emailRegex;
    this.contactForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'firstName': [null, Validators.required],
      'login': ['toto', Validators.required],
      'email': [null, Validators.required, Validators.pattern(emailRegex)],
      'phone': [null],
      'message': [null, Validators.required],
      'validate': ''
    })
  }

  get name() {
    return this.contactForm.get('name') as FormControl;
  }

  get firstName() {
    return this.contactForm.get('firstName') as FormControl;
  }

  get login() {
    return this.contactForm.get('login') as FormControl;
  }

  get email() {
    return this.contactForm.get('email') as FormControl;
  }

  get phone() {
    return this.contactForm.get('phone') as FormControl;
  }

  get message() {
    return this.contactForm.get('message') as FormControl;
  }

  getErrorEmail() {
    return this.contactForm.get('email').hasError('required') ? this.titleAlert : 
      this.contactForm.get('email').hasError('pattern') ? 'CONTACT.EMAIL_UNVALID' : '';
  }

  onSubmit(formData) {
    this.post = formData;
    //TODO Appel webService
  }

}
