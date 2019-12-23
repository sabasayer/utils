export enum InvalidPositionState {
    biggerThenScreen = 1,
    outOfScreen = 2,
    collidesWithBannedAre = 3
}

export interface OutPositions {
    left: number;
    right: number;
    bottom: number;
    top: number;
}

export interface ElementDimensions {
    left: number;
    top: number;
    width: number;
    height: number;
}

export abstract class PositionCalculaterUtil {
    static outPositionTolerance:number = 20;
    static offset(el: HTMLElement) {
        let rect = el.getBoundingClientRect(),
            scrollLeft =
                window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }

    static createDimensions(el: HTMLElement): ElementDimensions {
        let offset = this.offset(el);

        return {
            left: offset.left,
            top: offset.top,
            height: el.offsetHeight,
            width: el.offsetWidth
        };
    }

    static isDimensionOutOfScreen(dimension: ElementDimensions): OutPositions {
        let outPositions: OutPositions = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };

        let windowHeight = window.innerHeight + window.pageYOffset;
        let windowWidth = window.innerWidth + window.pageXOffset;

        if (dimension.left - this.outPositionTolerance < window.pageXOffset) {
            outPositions.left =
                window.pageXOffset - (dimension.left - this.outPositionTolerance);
        }

        if (dimension.left + dimension.width + this.outPositionTolerance > windowWidth) {
            outPositions.right =
                dimension.left + dimension.width + this.outPositionTolerance - windowWidth;
        }

        if (dimension.top - this.outPositionTolerance < window.pageYOffset) {
            outPositions.top =
                window.pageYOffset - (dimension.top - this.outPositionTolerance);
        }

        if (dimension.top + dimension.height + this.outPositionTolerance > windowHeight) {
            outPositions.bottom =
                dimension.top + dimension.height + this.outPositionTolerance - windowHeight;
        }

        return outPositions;
    }

    /**
     * calculates left value of align element relative to targer for centering
     * */
    static horizontalCenter(target:ElementDimensions,align:ElementDimensions):void
    {
        align.left = target.left - (align.width - target.width) / 2;
    }

    /**
     * calculates top value of align element relative to targer for centering
     * */
    static verticalCenter(target:ElementDimensions,align:ElementDimensions):void
    {
        align.top = target.top - (align.height - target.height) / 2;
    }

    static snapToBottom(
        snapTo: ElementDimensions,
        snap: ElementDimensions,
        enableMirror: boolean
    ) {
        snap.top = snapTo.top + snapTo.height;
        this.horizontalCenter(snapTo,snap);

        let outPos = this.isDimensionOutOfScreen(snap);
        if (outPos.left) snap.left += outPos.left+this.outPositionTolerance;
        if (outPos.right) snap.left -= outPos.right+this.outPositionTolerance;

        if (outPos.bottom && enableMirror) this.snapToTop(snapTo, snap, false);
    }

    static snapToTop( snapTo: ElementDimensions,
                      snap: ElementDimensions,
                      enableMirror: boolean) {
        snap.top = snapTo.top - snap.height;
        this.horizontalCenter(snapTo,snap);

        let outPos = this.isDimensionOutOfScreen(snap);
        if (outPos.left) snap.left += outPos.left+this.outPositionTolerance;
        if (outPos.right) snap.left -= outPos.right+this.outPositionTolerance;

        if (outPos.top && enableMirror) this.snapToBottom(snapTo, snap, false);
    }

    static snapToLeft( snapTo: ElementDimensions,
                       snap: ElementDimensions,
                       enableMirror: boolean) {
        this.verticalCenter(snapTo,snap);
        snap.left = snapTo.left - snap.width;

        let outPos = this.isDimensionOutOfScreen(snap);
        if(outPos.top) snap.top += outPos.top+this.outPositionTolerance;
        if(outPos.bottom) snap.top -= outPos.bottom+this.outPositionTolerance;

        if(outPos.left && enableMirror) this.snapToRight(snapTo,snap,false)
    }

    static snapToRight( snapTo: ElementDimensions,
                        snap: ElementDimensions,
                        enableMirror: boolean) {
        this.verticalCenter(snapTo,snap);
        snap.left = snapTo.left + snapTo.width;

        let outPos = this.isDimensionOutOfScreen(snap);
        if(outPos.top) snap.top += outPos.top+this.outPositionTolerance;
        if(outPos.bottom) snap.top -= outPos.bottom+this.outPositionTolerance;

        if(outPos.right && enableMirror) this.snapToLeft(snapTo,snap,false)
    }
}
