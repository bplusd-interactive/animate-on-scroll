import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
export declare class ScrollService implements OnDestroy {
    scrollObs: Observable<any>;
    resizeObs: Observable<any>;
    pos: number;
    private scrollSub;
    private resizeSub;
    constructor();
    private manageScrollPos();
    private inIframe();
    ngOnDestroy(): void;
}
