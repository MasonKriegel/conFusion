import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { DishFeedback } from '../shared/feedback';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  date: string;
  comment: Comment;

  dishFeedbackForm: FormGroup;
  dishFeedback: DishFeedback;
  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Author is Required',
      'minlength': 'Author Name must be at least 2 characters long',
      'maxlength': 'Author Name cannot be more than 25 characters long'
    },
    'comment': {
      'required': 'Comment is Required',
    }
  };

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {

    this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);

    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id) });
  }

  createForm() {
    this.dishFeedbackForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: 5,
      comment: ['', [Validators.required]],
    });

    this.dishFeedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.dishFeedbackForm) { return; }
    const form = this.dishFeedbackForm;

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

  onSubmit() {
    this.dishFeedback = this.dishFeedbackForm.value;
    console.log(this.dishFeedback);

    this.date = Date().toString();

    this.comment = {
      rating: this.dishFeedbackForm.value.rating,
      comment: this.dishFeedbackForm.value.comment,
      author: this.dishFeedbackForm.value.author,
      date: this.date
    }

    this.dish.comments.push(this.comment);

    this.dishFeedbackForm.reset({
      firstname: '',
      lastname: '',
    });
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }
}
