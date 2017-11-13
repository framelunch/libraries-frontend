// @flow
type WheelObserver = () => void;

type Props = {
  thresholdPx?: number,
  freezeMSec?: number,
  nextObservers?: WheelObserver[],
  prevObservers?: WheelObserver[],
};

export interface ScrollControllerManagerIO {
  setNextObserver(observer: WheelObserver): void;
  setPrevObserver(observer: WheelObserver): void;
  onMousewheel(event: WheelEvent): void;
  onTouchStart(event: TouchEvent): void;
  onTouchEnd(event: TouchEvent): void;
}

class ScrollControllerManager implements ScrollControllerManagerIO {
  thresholdPx: number;
  freezeMSec: number;
  nextObservers: WheelObserver[];
  prevObservers: WheelObserver[];
  isFreezeWheel: boolean;
  lastDeltaY: number | null;
  onMousewheel: (WheelEvent) => void;

  constructor(props: Props = {}) {
    this.onMousewheel = this.onMousewheel.bind(this);
    this.nextObservers = [];
    this.prevObservers = [];
    this.initialize(props);
  }

  initialize({ thresholdPx, freezeMSec, nextObservers, prevObservers }: Props) {
    this.thresholdPx = thresholdPx || 70;
    this.freezeMSec = freezeMSec || 800;
    this.isFreezeWheel = false;

    if (nextObservers) {
      nextObservers.forEach(observer => this.setNextObserver(observer));
    }

    if (prevObservers) {
      prevObservers.forEach(observer => this.setPrevObserver(observer));
    }
  }

  setNextObserver(observer: WheelObserver) {
    this.nextObservers.push(observer);
  }

  setPrevObserver(observer: WheelObserver) {
    this.prevObservers.push(observer);
  }

  onMousewheel(event: WheelEvent) {
    if (this.isFreezeWheel) {
      return;
    }

    if (!this.lastDeltaY) {
      this.lastDeltaY = event.deltaY;
      return;
    }

    const movePx = event.deltaY - this.lastDeltaY;
    this.moveAction(movePx);
  }

  onTouchStart(event: TouchEvent) {
    if (this.isFreezeWheel) {
      return;
    }

    this.lastDeltaY = event.changedTouches[0].pageY;
  }

  onTouchEnd(event: TouchEvent) {
    if (this.isFreezeWheel || !this.lastDeltaY) {
      return;
    }

    const deltaY = event.changedTouches[0].pageY;
    const movePx = this.lastDeltaY - deltaY;
    this.moveAction(movePx);
  }

  moveAction(movePx: number) {
    const absMovePx = Math.abs(movePx);
    const isShortRangeMove = absMovePx < this.thresholdPx;
    if (isShortRangeMove) {
      return;
    } else if (movePx >= 0) {
      this.goNext();
      return;
    }

    this.goPrev();
  }

  goNext() {
    this.nextObservers.forEach(observer => observer());
    this.lastDeltaY = null;
    this.freezeWheel();
  }

  goPrev() {
    this.prevObservers.forEach(observer => observer());
    this.lastDeltaY = null;
    this.freezeWheel();
  }

  freezeWheel() {
    this.isFreezeWheel = true;
    setTimeout(() => { this.isFreezeWheel = false; }, this.freezeMSec);
  }
}

export default {
  create(props: Props = {}): ScrollControllerManagerIO {
    return new ScrollControllerManager(props);
  },
};
