import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppConfig } from 'src/app/app.config';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { User } from 'src/app/models/user/user.model';
import { SessionStorageService } from 'src/app/services/storage/session-storage.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  user:User;
  receiver: string;
  titleAlert: string = 'CONTACT.INPUT_EMPTY';
  contactForm: FormGroup;
  post:any = '';

  constructor(
    private formBuilder: FormBuilder,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.user = this.sessionStorageService.getUser();
    this.createForm();
  }

  createForm() {
    let emailRegex: RegExp = AppConfig.configs.emailRegex;
    this.contactForm = this.formBuilder.group({
      'name': [this.user ? this.user.name : null, Validators.required],
      'firstName': [this.user ? this.user.firstname : null, Validators.required],
      'login': [this.user ? this.user.login : null, Validators.required],
      'shop': [this.user ? this.user.shop : null, Validators.required],
      'email': [this.user ? this.user.email : null, [Validators.required, Validators.pattern(emailRegex)]],
      'phone': [this.user ? this.user.phone : null],
      'message': [null, Validators.required]
    })

        // Conversion du montant d'origine à la volée
    /*this.expenseForm.get('originalAmount').valueChanges.subscribe(() => {
      this.convertedAmount.patchValue(
        this.convertOriginalAmount(this.originalAmount.value, this.originalAmountCurrency.value)
      );
    });*/
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

  get shop() {
    return this.contactForm.get('shop') as FormControl;
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

  getErrorEmail(): string {
    return this.contactForm.get('email').hasError('required') ? this.titleAlert : 
      this.contactForm.get('email').hasError('pattern') ? 'CONTACT.EMAIL_UNVALID' : '';
  }

  onSubmit(formData) {
    this.post = formData;
    //TODO Appel webService
  }

}
