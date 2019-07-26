import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription, empty, fromEvent } from 'rxjs';

@Injectable()
export class ScrollService implements OnDestroy {

  scrollObs: Observable<any>;
  resizeObs: Observable<any>;
  pos: number;
  private scrollSub: Subscription = new Subscription();
  private resizeSub: Subscription = new Subscription();

  constructor() {

    // set initial value
    this.manageScrollPos();

    // create observable that we can subscribe to from component or directive
    let eventType = 'scroll';

    if(this.inIframe()){
      eventType = 'message';
    }

    this.scrollObs = typeof <any>window !== 'undefined' ? fromEvent(window, eventType) : empty();

    // initiate subscription to update values
    this.scrollSub = this.scrollObs
      .subscribe(() => this.manageScrollPos());

    // create observable for changes in screen size
    this.resizeObs = typeof <any>window !== 'undefined' ? fromEvent(window, 'resize') : empty();

    // initiate subscription to update values
    this.resizeSub = this.resizeObs
      .subscribe(() => this.manageScrollPos());

  }


  private manageScrollPos(): void {

    // update service property
    if(this.inIframe()){
      this.pos = typeof <any>window !== 'undefined' ? (<any>window).DATA.scrollposition : 0; // tslint:disable-line
    } else{
      this.pos = typeof window !== 'undefined' ? window.pageYOffset : 0;
    }
  }

  private inIframe () {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  ngOnDestroy(): void {
    this.scrollSub.unsubscribe();
    this.resizeSub.unsubscribe();
  }

}
