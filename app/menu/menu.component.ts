import { Component,
  OnInit,
  trigger, 
  animate, 
  transition, 
  style, 
  state,
  keyframes,
  HostListener } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MenuService } from './menu.service'
import { Observable } from 'rxjs/Rx'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MenuService],
  animations: [
    trigger('dropDown', [
      transition(':enter', [
        animate(400, keyframes([
          style({opactiy: 0, transform: 'translateY(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateY(0)', offset: 1})
        ]))
      ])
    ]),
    trigger('flyIn', [
      transition(':enter', [
        animate(400, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)', offset: 0.5}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1})
        ]))
      ])
    ])
  ]
})
export class MenuComponent implements OnInit {
  term = new FormControl()
  menu: MenuItem[] = []
  store: MenuItem[] = []
  show: boolean = true
  scrollTop: number = 0
  subheaderBit: boolean = false
  
  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.get()
      .subscribe(data => {
        this.menu = this.store = data
        setTimeout(() => {
          this.windowResize()
        }, 1)
      })
    
    this.term.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(term => {
        let store = JSON.parse(JSON.stringify(this.store))
        this.menu = term == '' ? store : this.menuService.search(store, term)
        setTimeout(() => {
          this.windowResize()
        }, 1)
      })
  }

  @HostListener('document:scroll')
  documentScroll(): void {
    console.log(this.subheaderBit)
    if(this.subheaderBit) {
      this.subheaderBit = false
      this.show = true
      this.scrollTop = document.body.scrollTop
      return
    }
    this.show = document.body.scrollTop <= this.scrollTop || document.body.scrollTop == document.body.offsetTop
    this.scrollTop = document.body.scrollTop
  }

  @HostListener('window:resize')
  windowResize(): void {
    let menu = document.getElementById('menu')
    let header = document.getElementById('header')

    menu.style['margin-top'] = header.offsetHeight + 'px'
  }

  subheaderClick(index: string): void {
    let menuItem = document.getElementById(index)
    let header = document.getElementById('header')
    this.subheaderBit = true

    // Todo: smooth scrolling
    document.body.scrollTop = menuItem.offsetTop - header.offsetHeight
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
