import { Dispatch, SetStateAction, useCallback, useState } from "react";

// hook: Signup/index.tsx 에서 setNickname과 setEmail이 겹침 -> 중복 제거를 위함
// react에서 제공하는 hook들로 새로운 custom hook을 만들어냄
//  +) 빨간줄에 커서 댔을 때 뜨는 에러코드가 ts로 시작하면 TypeScript 전용 에러
//  +) TypeScript는 JS에 변수, 매개변수, 리턴값에 타입 지정해준 것이라고 생각!
//  ++) 변수랑 리턴값에는 TS가 추론해서 붙여주지만, 매개변수는 추론 잘 못하므로 타입 붙여주기
//  ++) 타입 지정 에러 해결방법  
//      1) :any 붙여주기
//      2) generic 붙여주기 ex) <T>(initialData:T) => {...}
//          ->generic 장점: 매개변수 타입 지정하고 리턴값 타입 지정이 같이됨
//                 ex) 매개변수랑 리턴값 둘다 T이므로 만약 매개변수에 str들어오면 자동으로 리턴값도 str이됨
//          ->이처럼 같은 타입 지정하고 싶은 곳에 여러곳 지정 가능

// useInput에 대한 리턴값의 타입 지정 
//   =>> [value(T), handler(함수), setValue(Dispatch<...>)] 라는 리스트를 반환할것이라고 알려줌
type ReturnTypes<T> = [T, (e: any) => void, Dispatch<SetStateAction<T>>]

const useInput = <T>(initialData: T) : ReturnTypes<T> => {
    const [value, setValue] = useState(initialData);
    const handler = useCallback((e: any)=>{
        setValue(e.target.value);
    },[])
    return [value, handler, setValue]
}

export default useInput;