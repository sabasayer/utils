import { PositionCalculaterUtil } from "../..";

export abstract class DomUtil {

    static findParentElement(
        el: HTMLElement,
        classValue?: string,
        id?: string
    ): HTMLElement | null {
        if (!classValue && !id) return null;

        let parentEl = el.parentElement;
        while (parentEl) {
            if (
                (id && parentEl.getAttribute("id") == id) ||
                (classValue &&
                    parentEl.classList &&
                    parentEl.classList.contains(classValue))
            ) {
                break;
            } else {
                parentEl = parentEl.parentElement;
            }
        }

        return parentEl;
    }

    static randomColor() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);

        return `rgb(${r},${g},${b})`;
    }

    static touchPositionInelement(event: TouchEvent, parent: HTMLElement) {
        let canvasOffset = PositionCalculaterUtil.offset(parent);
        let firstTouch = event.touches[0];
        let x = firstTouch.clientX - canvasOffset.left;
        let y = firstTouch.clientY - canvasOffset.top;
        return { x, y };
    }

    static handleInfineteScroll(element: HTMLElement, callback: Function) {
        element.addEventListener("scroll", e => {
            let scrollTop = element.scrollTop;
            let offsetHeight = element.offsetHeight;
            let scrollHeight = element.scrollHeight;
            if (offsetHeight + scrollTop == scrollHeight) {
                callback();
            }
        });
    }
}
