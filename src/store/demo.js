import { atom, selector } from "recoil";

function getUser() {
    return new Promise(resolve =>{
        setTimeout(() =>{
            resolve(['rocky'])
        }, 3000)
    })
}
const curUserQuery = selector({
    key: 'curUserQuery',
    get: async () => {
        const res = await getUser()
        return res
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
