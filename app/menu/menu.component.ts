import { Component, 
  OnInit, 
  Input, 
  trigger, 
  animate, 
  transition, 
  style, 
  state,
  Renderer} from '@angular/core';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MenuService]
})
export class MenuComponent implements OnInit {
  private show: boolean = true
  private scrollTop: number = 0
  constructor(private menuService: MenuService, private renderer: Renderer) {
    this.renderer.listenGlobal('document', 'scroll', (event) => {
      this.show = document.body.scrollTop <= this.scrollTop
      this.scrollTop = document.body.scrollTop
    })
  }

  private menu: MenuItem[] = []
  private errorMessage: Error
  ngOnInit(): void {
    this.menuService.getMenu()
      .subscribe(
        menu => this.menu = menu,
        error => this.errorMessage = error)
  }

  private term: string
  private bit: boolean = false
  private store: MenuItem[] = []
  termChange(): void {
    let filter: string = this.term ? this.term.toLocaleLowerCase() : '';
    let titleContains: boolean, textContains: boolean

    if(!this.bit && this.menu.length) {
      this.store = JSON.parse(JSON.stringify(this.menu))
      this.bit = true
    }
    else if(filter.length == 0) {
      this.menu = this.store;
    }
    this.menu = JSON.parse(JSON.stringify(this.store))

    this.menu = this.menu.filter(x => {
      x.store = x.store.filter(y => {
        titleContains = y.title ? y.title.toLocaleLowerCase().indexOf(filter) != -1 : false
        textContains = y.text ? y.text.toLocaleLowerCase().indexOf(filter) != -1 : false
        return titleContains || textContains
      })
      return x.store.length >= 1
    })
  }

  subheaderClick(index: string): void {
    let menuItem = document.getElementById(index)
    let menu = document.getElementById('menu')
    menu.scrollTo(0, menuItem.offsetTop)

    
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
