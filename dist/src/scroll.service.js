"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ScrollService = (function () {
    function ScrollService() {
        var _this = this;
        this.scrollSub = new rxjs_1.Subscription();
        this.resizeSub = new rxjs_1.Subscription();
        // set initial value
        this.manageScrollPos();
        // create observable that we can subscribe to from component or directive
        var eventType = 'scroll';
        if (this.inIframe()) {
            eventType = 'message';
        }
        this.scrollObs = typeof window !== 'undefined' ? rxjs_1.fromEvent(window, eventType) : rxjs_1.empty();
        // initiate subscription to update values
        this.scrollSub = this.scrollObs
            .subscribe(function () { return _this.manageScrollPos(); });
        // create observable for changes in screen size
        this.resizeObs = typeof window !== 'undefined' ? rxjs_1.fromEvent(window, 'resize') : rxjs_1.empty();
        // initiate subscription to update values
        this.resizeSub = this.resizeObs
            .subscribe(function () { return _this.manageScrollPos(); });
    }
    ScrollService.prototype.manageScrollPos = function () {
        // update service property
        if (this.inIframe()) {
            this.pos = typeof window !== 'undefined' ? window.DATA.scrollposition : 0; // tslint:disable-line
        }
        else {
            this.pos = typeof window !== 'undefined' ? window.pageYOffset : 0;
        }
    };
    ScrollService.prototype.inIframe = function () {
        try {
            return window.self !== window.top;
        }
        catch (e) {
            return true;
        }
    };
    ScrollService.prototype.ngOnDestroy = function () {
        this.scrollSub.unsubscribe();
        this.resizeSub.unsubscribe();
    };
    ScrollService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ScrollService.ctorParameters = function () { return []; };
    return ScrollService;
}());
exports.ScrollService = ScrollService;
//# sourceMappingURL=scroll.service.js.map