import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MenuService {
  constructor(private http: Http) { }
  
  private menuUrl: string = 'assets/menu.json'
  public getMenu() {
    return this.http.get(this.menuUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response): MenuItem[] {
    let body = res.json();
    return body.data || [];
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}

interface MenuItem {
    title: string
    store: Array<Item>
}

interface Item {
  title: string
  text: string
  store: Array<Price>
}

interface Price {
  text: string
  cost: string
}