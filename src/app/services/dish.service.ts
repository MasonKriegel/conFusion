import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { ProcessHttpMsgService } from './process-httpmsg.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Dish } from '../shared/dish';
import { baseURL } from '../shared/baseurl';

@Injectable()
export class DishService {

  constructor(
    private restangular: Restangular,
    private processHttpMsgService: ProcessHttpMsgService,
  ) { }

  getDishes(): Observable<Dish[]> {
    return this.restangular.all('dishes').getList();
  }

  getDish(id: number): Observable<Dish> {
    return this.restangular.one('dishes', id).get();
  }

  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all('dishes').getList({featured: true})
      .map(dishes => dishes[0]);
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => { return dishes.map(dish => dish.id)})
      .catch(error => { return this.processHttpMsgService.handleError(error)});
  }
}
