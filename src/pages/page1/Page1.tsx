
import React,  { useState, useEffect  } from 'react'
import { useStore, userStore2 } from '../../store/demo'

const InputA = () => {
  const [userValue, , userStore] = useStore(userStore2)
  const [value, setValue] = useState('');
  useEffect(() => {
    userStore.getUser()
  }, [])
  return <div>
      <input onChange={(e) => setValue(e.target.value)} /><button onClick={() => userStore.searchUser(value)}>搜索</button>
      <h4>用户名：</h4>
      {
        userValue.users.map(name => <div key={name}>{name}</div>)
      }
  </div>
};

export default function Page1(props: any) {
    return <React.Suspense fallback={<div>Loading...</div>}>
            <InputA />
        </React.Suspense>
}