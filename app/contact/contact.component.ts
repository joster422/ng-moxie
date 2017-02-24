import { Component, 
  OnInit,
  trigger,
  transition,
  animate,
  keyframes,
  style } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
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
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
