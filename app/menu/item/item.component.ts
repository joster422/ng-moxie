import { Component, Input } from '@angular/core';

@Component({
  selector: 'menu-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() item: MenuItem;
}

interface MenuItem {
  title: string
  store: Item[]
}

interface Item {
  title: string
  text: string
  cost: string
}