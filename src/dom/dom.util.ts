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

  static checkIsAtTheBottom(options: {
    offsetHeight: number;
    scrollTop: number;
    margin: number;
    scrollHeight: number;
  }) {
    return (
      options.offsetHeight + options.scrollTop + options.margin >=
      options.scrollHeight
    );
  }

  static handleInfineteScroll(
    element: HTMLElement,
    callback: (scrollTop?: number) => void,
    margin: number = 20
  ) {
    let prevScrollTop = 0;
    element.addEventListener("scroll", (e) => {
      let scrollTop = element.scrollTop;
      let offsetHeight = element.offsetHeight;
      let scrollHeight = element.scrollHeight;

      const isNewScrollBigger = scrollTop > prevScrollTop;

      const isAtTheBottom = DomUtil.checkIsAtTheBottom({
        scrollHeight,
        scrollTop,
        offsetHeight,
        margin,
      });

      if (isAtTheBottom && isNewScrollBigger) {
        callback(scrollTop);
      }
      prevScrollTop = scrollTop;
    });
  }
}
