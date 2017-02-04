import { Directive, ElementRef, Input } from '@angular/core'

@Directive({
  selector: '[stick]',
  host: {
    '(scroll)': 'onScroll($event)'
  }
})
export class StickDirective {
  private scrollTop: number = 0

  constructor(private _el: ElementRef) { }

  onScroll($event: any) {
    this._el.nativeElement.style.marginTop = this.scrollTop < this._el.nativeElement.scrollTop ? '0' : '200px'
  }
}

// window.addEventListener('scroll', (e) => {
//   if (this._el.nativeElement.offsetTop > this.scrollTop) {
//     console.log('up')
//   } else {
//     console.log('down')
//   }
//   console.log(this.scrollTop)
//   debugger
//   console.log(this._el.nativeElement.offsetTop)
//   this.scrollTop = this._el.nativeElement.offsetTop
//   console.log(this.scrollTop)
  
// })