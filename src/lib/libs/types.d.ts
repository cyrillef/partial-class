export type Constructor<T = {}> = new (...args: any[]) => T;
export type Dictionary<T> = Record<string, T>;
export type StringDictionary = Dictionary<string>;
export type AnyDictionary = Dictionary<any>;
export default Dictionary;
