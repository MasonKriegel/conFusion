import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';
import { flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ],
})

export class ContactComponent implements OnInit {
    
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };
  showForm: boolean = true;
  showFeedback: boolean = false;

  validationMessages = {
    'firstname': {
      'required': 'First Name is Required',
      'minlength': 'First Name must be at least 2 characters long',
      'maxlength': 'First Name cannot be more than 25 characters long'
    },
    'lastname': {
      'required': 'Last Name is Required',
      'minlength': 'Last Name must be at least 2 characters long',
      'maxlength': 'Last Name cannot be more than 25 characters long'
    },
    'telnum': {
      'required': 'Telephone Number is Required',
      'pattern': 'Telephone Number must contain only numbers'
    },
    'email': {
      'required': 'Email is Required',
      'email': 'Email not in valid format'
    }
  };
    
  constructor(
    private fb: FormBuilder,
    private feedbackservice: FeedbackService,
  ) {
    this.createForm();
  }
    
  ngOnInit() {
  }
    
  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: '',
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set from validation messages
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  showFeedbackInfo(feedback) {
    this.feedback = feedback;
    this.showFeedback = true;
    setTimeout(function() {
      this.showFeedback = false;
      this.showForm = true;
      debugger;
    }, 5000);
  }
    
  onSubmit() {
    this.showForm = false;
    this.feedbackservice.submitFeedback(this.feedbackForm.value)
      .subscribe(feedback => this.showFeedbackInfo(feedback));
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: '',
    });
  }
}
