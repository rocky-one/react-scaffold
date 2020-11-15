
import React from 'react'
import Count from '../../containers/count'
import { useRecoilValue, useRecoilState} from 'recoil'
import { curUserQuery, inputValueState, filterdInputValue } from '../../store/demo'


const InputA = () => {
  const [value, setValue]: any = useRecoilState(inputValueState);
  const [value2, setValue2] = useRecoilValue(curUserQuery)
  return <div>
      <div>{value2[0]}</div>
      <input value={value} onChange={e => setValue(e.target.value)} />
  </div>;
};
const InputFilter = () => {
    const [value] = useRecoilState(filterdInputValue);
  
    return <div>filteredValue: {value}</div>;
  };
  

class Test extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>test</div>
    }
}

export default function Page1(props: any) {
    console.log('Page1 render')
    return <React.Suspense fallback={<div>Loading1111......</div>}>
        page1
        <Count test={Test}/>
        <React.Suspense fallback={<div>Loading222.2.....</div>}>
            <InputA />
        </React.Suspense>
        <br />
        <InputFilter />
      </React.Suspense>
}