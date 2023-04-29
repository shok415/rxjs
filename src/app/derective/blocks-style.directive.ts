import { style } from '@angular/animations';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { first } from 'rxjs';

@Directive({
  selector: '[appBlocksStyle]',
  host:{
    '(document:keyup)':'initKeyUp($event)'
  },
  exportAs: 'blockStyle'
})
export class BlocksStyleDirective implements OnInit, AfterViewInit, OnChanges {

  @Input() selector:string;
  @Input() initFirst:boolean = false;
  @Output() renderComplete = new EventEmitter();

  private items:HTMLElement[];
  private index:number = 0;
  public activeElementIndex: number;

  constructor(private el:ElementRef) { }

  ngOnInit():void{
  }

  ngAfterViewInit(): void {
    this.activeElementIndex = 0;
    if(this.selector){
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      if (this.initFirst){
        if (this.items[0]){
          (this.items[0] as HTMLElement).setAttribute('style', 'border:2px solid blue');
        }
      }
    }
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  updateItems(): void {
    (this.items[this.index] as HTMLElement).removeAttribute('style');
    this.items = this.el.nativeElement.querySelectorAll(this.selector);
    // this.index = 0;
  }

  initKeyUp(ev: KeyboardEvent):void{

    if(this.index < this.items.length-1 && ev.key === 'ArrowRight' || this.index > 0 &&  ev.key === 'ArrowLeft'){
    (this.items[this.index] as HTMLElement).removeAttribute('style');
    }

    if(ev.key === 'ArrowRight' && this.index != this.items.length-1){
      if (this.initFirst==false && this.index == 0){
        this.index = 0;
        this.initFirst=true;
      }else{
        this.index++;
      }
      if(this.items[this.index]){
        (this.items[this.index] as HTMLElement).setAttribute('style', 'border:2px solid blue');
      }
    }
    if(ev.key === 'ArrowLeft' && this.index != 0){
      this.index--;
        if(this.items[this.index]){
          (this.items[this.index] as HTMLElement).setAttribute('style', 'border:2px solid blue');
        }
      }
      this.activeElementIndex = this.index;
    }

    initStyle(index: number) {
      this.index = index;
      if (this.items[index]) {
      (this.items[index] as HTMLElement).setAttribute('style', 'border:2px solid blue');
      }
      }
}
