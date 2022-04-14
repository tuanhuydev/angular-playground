import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, CdkDragMove, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, AfterViewInit {

  sections = [ 'left', 'splitter', 'right' ];
  width?: number;

  @ViewChild('resizeBox') resizeBox!: ElementRef;
  @ViewChild('dragHandleRight') dragHandleRight!: ElementRef;

  constructor() {}

  get resizeBoxElement() : HTMLElement {
    return this.resizeBox.nativeElement;
  }

  get dragHandleRightElement(): HTMLElement {
    return this.dragHandleRight.nativeElement;
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    const resizeBoxParent = this.resizeBoxElement.parentElement;
    
    if (resizeBoxParent) {
        resizeBoxParent.style.width = '50vw';
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    const dropElement = event.item.element.nativeElement;
    const isResize = dropElement.classList.contains('dragHandle');
    const resizeBoxParent = this.resizeBoxElement.parentElement;
    
    if (isResize && resizeBoxParent) {
        resizeBoxParent.style.width = (this.resizeBoxElement.getBoundingClientRect().width + event.distance.x) + 'px';
    }
    
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
    this.sections.forEach((section: string, index: number) => {
      if (section === 'splitter' && index !== 1) {
        // swap item if splitter at the end of array
        if (index === this.sections.length - 1 && !isResize) {
          moveItemInArray(this.sections, (index - 2) , ( index -1 ));
        }
        moveItemInArray(this.sections, index, 1);
      }
      
    });
  }
}
