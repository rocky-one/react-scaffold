import { useState, useEffect } from 'react'
import { atom, selector } from 'recoil'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { BehaviorSubject, Subject, Observable } from 'rxjs'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/concat'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/filter'
import { of } from 'rxjs/observable/of'
import { forkJoin } from 'rxjs/observable/forkJoin';

function getUser(params) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(['rocky', 'xiaocici'])
    }, 1000)
  })
}


/**
 * @desc 基础类，负责初始化state
 * 提供一些基础方法
 */
class BaseStore {
  constructor() {
  }
  initState(state) {
    this.stateBS$ = new BehaviorSubject(state)
  }
  getState() {
    return this.stateBS$.getValue();
  }
  setState(newState) {
    this.stateBS$.next(newState)
  }
  subscribe(callback) {
    this.stateBS$.subscribe(callback)
  }
}

class UserStore extends BaseStore {
  constructor() {
    super()
    this.initState({
      users: []
    })
  }
  getUser(params) {
    fromPromise(getUser(params))
      .map(res => res)
      .subscribe(res => {
        this.stateBS$.next({
          users: res
        })
      })

    return this.stateBS$;
  }
  searchUser(name) {
    of(this.getState().users)
      .map(data => {
        return data.filter((cur) => name === cur)
      })
      .subscribe(res => {
        this.stateBS$.next({
          users: res
        })
      })
  }
}

export const userStore2 = new UserStore()


// 通用hooks
export function useStore(store) {
  const [state, setState] = useState(store.getState())
  useEffect(() => {
    store.subscribe(newStore => {
      setState(newStore)
    })
  }, [])

  return [state, store.setState, store]
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
