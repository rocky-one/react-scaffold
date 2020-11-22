import { atom, selector } from "recoil"
import { fromPromise } from 'rxjs/observable/fromPromise'
import { BehaviorSubject, Subject } from 'rxjs'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/concat'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/mergeMap'
// import { mergeMap, catchError } from 'rxjs/operators'
import { forkJoin } from 'rxjs/observable/forkJoin';
import { map } from "core-js/fn/array"

function getUser(params) {
  console.log(params, 11)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(['rocky', 'xiaocici'])
    }, 2000)
  })
}
function getUser2(params) {
  console.log(params, 22)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(['rocky2'])
    }, 1000)
  })
}

// // concat 首尾相连按顺序依次输出
// fromPromise(getUser()).concat(fromPromise(getUser2())).subscribe(res => {
//   console.log(res, 'concat')
// })

// // merge 合并 哪个快哪个结果先回来
// fromPromise(getUser()).merge(fromPromise(getUser2())).subscribe(res => {
//   console.log(res, 'merge')
// })

// // 有依赖关系 按顺序串行
// fromPromise(getUser()).pipe(
//   mergeMap(res => getUser2(res)),
//   catchError(err => {
//     console.log(err, 'err')
//   })
// ).subscribe(res => {
//   console.log(res, '有依赖关系')
// })

// // forkJoin 和promise.all类似
// forkJoin([getUser(), getUser2()]).subscribe(res => {
//   console.log(res, 'forkJoin')
// })

const userMolecule$ = new Subject()
//  处理请求
.switchMap((res) => fromPromise(getUser(res)))
// 数据格式处理
.map(data => data.map(item => item.toUpperCase()))

// 缓存数据
const userStore$ = new BehaviorSubject({})

userMolecule$.subscribe(userStore$)

userStore$.subscribe(res => {
  console.log(res, 8)
})

userMolecule$.next([123])
userMolecule$.next([123])

// 导出userStore$，由组件去使用和订阅
// 导出userMolecule$， 由组件发出action





const curUserQuery = selector({
  key: 'curUserQuery',
  get: async () => {
    return ['tom']
  }
})

const inputValueState = atom({
  key: "inputValueState",
  default: ""
});

const filterdInputValue = selector({
  key: "filterdInputValue",
  get: ({ get }) => {
    const inputValue = get(inputValueState);
    return inputValue.replace(/[0-9]/gi, "");
  }
});

export { curUserQuery, inputValueState, filterdInputValue };
