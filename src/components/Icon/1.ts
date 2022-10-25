
// type Person = {
//   id: number;
//   name: string;
//   age: number;
// };

// type P1 =  Person['id']; //'id' | 'name' | 'age'


// type ReturnType<T extends (...args: unknown[]) => unknown> = T extends (...args: unknown[]) => infer R ? R : any;

// const add = (x: number, y: number) => x + y

// type Type1 = typeof add // (x: number, y: number) => number
// type T1 = ReturnType<Type1> // number


// type selectFirdt< T extends unknown[]> = T extends [infer R,...infer _ ] ? R :never
// type selectLast< T extends unknown[]> = T extends [...infer R,infer _ ] ? _ :never
// type I3 = selectFirdt<[3, 2, 1]>; // 3
// type I4 = selectLast<[3, 2, 1]>; // 1

// type returnType<T extends (...args:any[]) => unknown> = T extends  (...args:any[]) => infer R ? R : never
// type returnTypeArgs<T extends (...args:any[]) => any> = T extends  (...args:infer R) => any ? R : never
// const add1 = (n1:string,n2:number) => n1+ n2
// type addType = typeof add1
// type s = returnType<addType>
// type s1 = returnTypeArgs<addType>

// type InferArray<T> = T extends (infer U)[] ? U : never;
// type I0 = InferArray<[number, string]>; // string | number
// type I1 = InferArray<string[]>; // string
// type I2 = InferArray<number[]>; // number
// type InferArray1<T> = T extends infer U ? U : never;
// type I6 = InferArray1<number[]>; // number[]
// export{I0,I1,I2,I6}

// type Direction = 'left' | 'right' | 'top' | 'bottom'

// type CssPadding = `padding-${Direction}`
// type MarginPadding = `margin-${Direction}`


// type Trim<S extends string> = S extends `${' ' | '\t' | '\n'}${infer R}`
//   ? Trim<R>
//   : S extends `${infer L}${' ' | '\t' | '\n'}`
//   ? Trim<L>
//   : S;


//   type TrimAll<S extends string> = S extends `${' ' | '\t' | '\n'}${infer R}${'' | '\t' | '\n'}${infer U}${'' | '\t' | '\n'}`
//   ? `${R}---${U}`
//   : never

//   type tt = TrimAll<' a b '>

//   type TrimAll1<S extends string> = S extends `${' ' | '\t' | '\n'}${infer R}${' ' | '\t' | '\n'}${infer U}`
//   ? U
//   : never
// type t = TrimAll1<' a b '>

//   type TrimLeft<S extends string> = S extends `${infer L}${infer R}`
//   ? L extends ' ' | '\n' | '\t'
//     ? TrimLeft<R>
//     : S
//   : '';
// type s33=   Trim<'  a  c   '  >
// type s333=   TrimLeft<' uuu arr'>

// type Reverse<T extends unknown[], U extends unknown[] = []> = [] extends T
//   ? U
//   : T extends [infer L, ...infer R]
//   ? Reverse<R, [L, ...U]>
//   : U;

//   type fff = Reverse<[1,2,3]>

//   type TrimLeft1<S extends string> = S extends `${infer L}${infer R}` ? L : R
// type ggg = TrimLeft1<' a   '>

// type StringToUnion<T extends string, U = never> = T extends ''
//   ? U
//   : T extends `${infer L}${infer R}`
//   ? StringToUnion<R, U | L>
//   : U;
// type ppp =  StringToUnion<'aab'>

// type StringToUnion1<T extends string, U = never> =  T extends `${infer L}${infer R}` ? R : L
// type oo = StringToUnion1<'aaa'>

// type StringToUnion2<T extends string, U = never> = T extends ''
//   ? U
//   : 3
//   type lll = StringToUnion2<'aa'>

//   interface A<T extends Record<string,any>>  {
//     a:number
//   }

//   const s331:A<{'b':number}> = {a:2}
//   console.log(s331)

type ParseParam<Param extends string> =
    Param extends `${infer Key}=${infer Value}`
        ? {
            [K in Key]: Value
        } : {};

type MergeValues<One, Other> =
    One extends Other
        ? One
        : Other extends unknown[]
            ? [One, ...Other]
            : [One, Other];

type MergeParams<
    OneParam extends Record<string, any>,
    OtherParam extends Record<string, any>
> = {
  [Key in keyof OneParam | keyof OtherParam]:
    Key extends keyof OneParam
        ? Key extends keyof OtherParam
            ? MergeValues<OneParam[Key], OtherParam[Key]>
            : OneParam[Key]
        : Key extends keyof OtherParam
            ? OtherParam[Key]
            : never
}
type ParseQueryString<Str extends string> =
    Str extends `${infer Param}&${infer Rest}`
        ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
        : ParseParam<Str>;







        
 type a = ParseQueryString<'a=1&b=v'>