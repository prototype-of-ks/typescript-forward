// 以下实现 ts 内部的一些基本复合类型
interface Test {
  a: A;
  b: number;
  c?: boolean;
  _a: string;
}

interface _Test {
  a: A;
}

interface A {
  _: string;
  __: number;
}

/**
 * Partial实现很简单,遍历所有key并将其设置为可空
 */
type _Partial<T> = {
  [P in keyof T]?: T[P];
};

/**
 * Pick也很简单
*/
type _Pick<T, K extends keyof T> = {
  [P in K]: T[K];
};

/**
 * readonly 类似
*/
type _Readonly<T> = {
  readonly [P in keyof T]: T[P];
}

/**
 * 遍历T中的所有子类型，如果该子类型约束于U(存在于U、兼容于U),
 * 则返回never类型，否则返回该子类型
 */
type _Exclude<T, U> = T extends U ? never : T;

/**
 * @example
 * type Eg = _Exclude<Test, _Test>;
*/

/**
 * Extract<T, U>提取联合类型T和联合类型U的所有交集
*/
type _Extract<T, U> = T extends U ? T : never;

/**
 * 从类型 T 中剔除所有 K 的所有属性
*/

// Exclude 实现
type _Omit<T, K> = {
  [P in _Exclude<keyof T, K>]: T[P]; 
};

// _Pick实现
type __Omit<T, K> = _Pick<T, _Exclude<keyof T, K>>;

/**
 * 提取函数返回类型
*/
type _ReturnType<T extends (...args: any) => any> = 
  T extends (...args: any) => infer P ? P : never;

/**
 * 提取函数参数类型
*/
type _ParameterType<T extends (...args: any) => any> = 
  T extends (args: infer P) => any ? P : never;
