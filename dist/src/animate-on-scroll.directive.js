"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var scroll_service_1 = require("./scroll.service");
var rxjs_1 = require("rxjs");
var AnimateOnScrollDirective = (function () {
    function AnimateOnScrollDirective(elementRef, renderer, scroll) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.scroll = scroll;
        this.scrollSub = new rxjs_1.Subscription();
        this.resizeSub = new rxjs_1.Subscription();
        // Pixel offset from screen bottom to the animated element to determine the start of the animation
        this.offset = 80;
    }
    Object.defineProperty(AnimateOnScrollDirective.prototype, "id", {
        get: function () {
            return this.elementRef.nativeElement.id;
        },
        enumerable: true,
        configurable: true
    });
    AnimateOnScrollDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.animationName) {
            throw new Error('animationName required');
        }
        // default visibility to false
        this.isVisible = false;
        // subscribe to scroll event using service
        this.scrollSub = this.scroll.scrollObs
            .subscribe(function () { return _this.manageVisibility(); });
        // subscribe to resize event using service so scrolling position is always accurate
        this.resizeSub = this.scroll.resizeObs
            .subscribe(function () { return _this.manageVisibility(); });
    };
    AnimateOnScrollDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        // run visibility check initially in case the element is already visible in viewport
        setTimeout(function () { return _this.manageVisibility(); }, 1);
    };
    AnimateOnScrollDirective.prototype.ngOnDestroy = function () {
        this.scrollSub.unsubscribe();
        this.resizeSub.unsubscribe();
    };
    AnimateOnScrollDirective.prototype.inIframe = function () {
        try {
            return window.self !== window.top;
        }
        catch (e) {
            return true;
        }
    };
    /**
     * check for visibility of element in viewport to add animation
     *
     * @returns void
     */
    /**
       * check for visibility of element in viewport to add animation
       *
       * @returns void
       */
    AnimateOnScrollDirective.prototype.manageVisibility = /**
       * check for visibility of element in viewport to add animation
       *
       * @returns void
       */
    function () {
        if (this.isVisible) {
            // Optimisation; nothing to do if class has already been applied
            return;
        }
        // check for window height, may change with a window resize
        this.getWinHeight();
        // get vertical position for selected element
        this.getOffsetTop();
        // we should trigger the addition of the animation class a little after getting to the element
        var scrollTrigger = this.offsetTop + this.offset - this.winHeight;
        // using values updated in service
        if (this.scroll.pos >= scrollTrigger) {
            this.addAnimationClass();
        }
    };
    /**
     * utility function to mark element visible and add css class
     *
     * @returns void
     */
    /**
       * utility function to mark element visible and add css class
       *
       * @returns void
       */
    AnimateOnScrollDirective.prototype.addAnimationClass = /**
       * utility function to mark element visible and add css class
       *
       * @returns void
       */
    function () {
        // mark this element visible, we won't remove the class after this
        this.isVisible = true;
        // use default for animate.css if no value provided
        this.setClass(this.animationName);
    };
    /**
     * utility function to add one or more css classes to element in DOM
     *
     * @param  {string} classes
     * @returns void
     */
    /**
       * utility function to add one or more css classes to element in DOM
       *
       * @param  {string} classes
       * @returns void
       */
    AnimateOnScrollDirective.prototype.setClass = /**
       * utility function to add one or more css classes to element in DOM
       *
       * @param  {string} classes
       * @returns void
       */
    function (classes) {
        for (var _i = 0, _a = classes.split(' '); _i < _a.length; _i++) {
            var c = _a[_i];
            this.renderer.setElementClass(this.elementRef.nativeElement, c, true);
        }
    };
    /**
     * get window height utility function
     *
     * @returns void
     */
    /**
       * get window height utility function
       *
       * @returns void
       */
    AnimateOnScrollDirective.prototype.getWinHeight = /**
       * get window height utility function
       *
       * @returns void
       */
    function () {
        if (this.inIframe()) {
            this.winHeight = typeof window !== 'undefined' ? window.DATA.windowinnerheight : 0; // tslint:disable-line
        }
        else {
            this.winHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
        }
    };
    /**
     * get offsetTop value for element
     *
     * @returns void
     */
    /**
       * get offsetTop value for element
       *
       * @returns void
       */
    AnimateOnScrollDirective.prototype.getOffsetTop = /**
       * get offsetTop value for element
       *
       * @returns void
       */
    function () {
        if (typeof this.elementRef.nativeElement.getBoundingClientRect === 'function') {
            var viewp = 0;
            if (this.inIframe()) {
                viewp = this.elementRef.nativeElement.getBoundingClientRect().top - window.DATA.scrollposition;
            }
            else {
                viewp = this.elementRef.nativeElement.getBoundingClientRect().top;
            }
            var viewportTop = viewp;
            var clientTop = this.elementRef.nativeElement.clientTop;
            // get vertical position for selected element
            this.offsetTop = viewportTop + this.scroll.pos - clientTop;
        }
        else {
            this.offsetTop = 0;
        }
    };
    AnimateOnScrollDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[animateOnScroll]'
                },] },
    ];
    /** @nocollapse */
    AnimateOnScrollDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
        { type: scroll_service_1.ScrollService, },
    ]; };
    AnimateOnScrollDirective.propDecorators = {
        "animationName": [{ type: core_1.Input },],
        "offset": [{ type: core_1.Input },],
    };
    return AnimateOnScrollDirective;
}());
exports.AnimateOnScrollDirective = AnimateOnScrollDirective;
//# sourceMappingURL=animate-on-scroll.directive.js.map