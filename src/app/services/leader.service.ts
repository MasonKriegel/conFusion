import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { ProcessHttpMsgService } from './process-httpmsg.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of'

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable()
export class LeaderService {
    
  constructor(
    private restangular: Restangular,
    private processHttpMsgService: ProcessHttpMsgService,
 ) { }

  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('leaders').getList();
  }
    
  getLeader(id: number): Observable<Leader> {
    return this.restangular.one('leaders', id).get();
  }
    
  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all('leaders').getList({featured: true})
      .map(leader => leader[0]);
  }
}
