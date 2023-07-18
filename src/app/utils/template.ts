/**
 * Calculate the normalised width of the column as string with calc function
 *
 * @param colWidth
 * @param total
 * @param padding
 * @returns
 */
export const calcWidth = (colWidth: number, total: number, padding = 64) => {
  const fraction = colWidth / total;
  return `calc(${100 * fraction}% - ${padding * fraction}px)`;
};

export interface ObjectComparison {
  added: {};
  updated: {
    [propName: string]: Change;
  };
  removed: {};
  unchanged: {};
}

export interface Change {
  oldValue: any;
  newValue: any;
}

export class ObjectUtils {
  static diff(o1: any, o2: any, deep = false): ObjectComparison {
    const added = {}  as any;
    const updated = {}  as any;
    const removed = {}  as any;
    const unchanged = {} as any;
    for (const prop in o1) {
      if (o1.hasOwnProperty(prop)) {
        const o2PropValue = o2[prop];
        const o1PropValue = o1[prop];
        if (o2.hasOwnProperty(prop)) {
          if (o2PropValue === o1PropValue) {
            unchanged[prop] = o1PropValue;
          } else {
            updated[prop] =
              deep && this.isObject(o1PropValue) && this.isObject(o2PropValue)
                ? this.diff(o1PropValue, o2PropValue, deep)
                : { newValue: o2PropValue };
          }
        } else {
          removed[prop] = o1PropValue;
        }
      }
    }
    for (const prop in o2) {
      if (o2.hasOwnProperty(prop)) {
        const o1PropValue = o1[prop];
        const o2PropValue = o2[prop];
        if (o1.hasOwnProperty(prop)) {
          if (o1PropValue !== o2PropValue) {
            if (!deep || !this.isObject(o1PropValue)) {
              updated[prop].oldValue = o1PropValue;
            }
          }
        } else {
          added[prop] = o2PropValue;
        }
      }
    }
    return { added, updated, removed, unchanged };
  }

  /**
   * @return if obj is an Object, including an Array.
   */
  static isObject(obj: any) {
    return obj !== null && typeof obj === "object";
  }
}
