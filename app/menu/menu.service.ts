import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MenuService {
  private menuUrl: string = 'assets/menu.json'

  constructor(private http: Http) { }

  public get() {
    return this.http.get(this.menuUrl)
                    .map(this.extractData)
                    .catch(this.handleError)
  }

  private extractData(res: Response) {
    let body = res.json()
    return body.data || []
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  public search(menu: MenuItem[], term: string) {
    let filter: string = term ? term.toLocaleLowerCase() : '';
    let titleContains: boolean, textContains: boolean

    return menu.filter(x => {
      x.store = x.store.filter(y => {
        titleContains = y.title.toLocaleLowerCase().indexOf(filter) != -1
        textContains = y.text.toLocaleLowerCase().indexOf(filter) != -1
        return titleContains || textContains
      })
      return x.store.length >= 1
    })
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