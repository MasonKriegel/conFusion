import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { ProcessHttpMsgService } from './process-httpmsg.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Feedback } from '../shared/feedback';

@Injectable()
export class FeedbackService {

  constructor(
    private restanglular: Restangular,
    private processHttpMsgService: ProcessHttpMsgService,
  ) { }

  submitFeedback(feedback: object): Observable<Feedback> {
    return this.restanglular.all('feedback').post(feedback);
  } 

}
