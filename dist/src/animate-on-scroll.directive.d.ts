import { Renderer, ElementRef, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ScrollService } from './scroll.service';
export declare class AnimateOnScrollDirective implements OnInit, OnDestroy, AfterViewInit {
    private elementRef;
    private renderer;
    private scroll;
    private offsetTop;
    private isVisible;
    private winHeight;
    private scrollSub;
    private resizeSub;
    private readonly id;
    animationName: string;
    offset: number;
    constructor(elementRef: ElementRef, renderer: Renderer, scroll: ScrollService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private inIframe();
    /**
     * check for visibility of element in viewport to add animation
     *
     * @returns void
     */
    private manageVisibility();
    /**
     * utility function to mark element visible and add css class
     *
     * @returns void
     */
    private addAnimationClass();
    /**
     * utility function to add one or more css classes to element in DOM
     *
     * @param  {string} classes
     * @returns void
     */
    private setClass(classes);
    /**
     * get window height utility function
     *
     * @returns void
     */
    private getWinHeight();
    /**
     * get offsetTop value for element
     *
     * @returns void
     */
    private getOffsetTop();
}
