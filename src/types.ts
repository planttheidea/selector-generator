type PlainObject = {
  [key: string]: any;
};

declare module 'identitate' {
  function identity(value: any): any;
  function createIdentity(argIndex: number): Function;
}

declare module 'unchanged' {
  function get(
    path: string | number | (string | number)[],
    object: PlainObject | any[],
  ): any;
}

declare namespace selectorator {
  export interface PathObject {
    argIndex: number;
    path: string | number | (string | number)[];
  }

  export type Path =
    | Function
    | string
    | number
    | (string | number)[]
    | PathObject;

  export interface Options {
    deepEqual?: boolean;
    isEqual?: Function;
    memoizer?: Function;
    memoizerParams?: any[];
  }
}
