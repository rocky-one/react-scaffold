/* eslint-disable no-console */
import React, { useState, useCallback } from 'react';

export default function Demo() {
  const [obj, setObj] = useState({
    name: 'rocky',
    age: 18,
  });
  const [arr, setArr] = useState([1, 2]);

  const onSetObj = useCallback(() => {
    // obj.name = 'tom';
    // obj.age = '19';
    // setObj({ ...obj });

    arr.push(3);
    setArr(arr);
    console.log(obj, 'objobj');
  }, []);
  return (
    <div>
      <button onClick={onSetObj}>点击</button>
      <div>{obj.name}</div>
      <div>{obj.age}</div>
      {arr.map((v) => <div key={v}>{v}</div>)}
    </div>
  );
}

// export default function Demo() {
//   const pageXRef = useRef(0);
//   useEffect(() => {
//     function onMousemove(e) {
//       pageXRef.current = e.pageX;
//     }
//     function onMouseup() {
//       console.log('mouseup-pageX: ', pageXRef.current);
//     }

//     document.addEventListener('mousemove', onMousemove);
//     document.addEventListener('mouseup', onMouseup);

//     return () => {
//       document.removeEventListener('mousemove', onMousemove);
//       document.removeEventListener('mouseup', onMouseup);
//     };
//   }, []);

//   return (
//     <div>demo</div>
//   );
// }

// export default function Demo() {
//   const [pageX, setPageX] = useState(0);
  
//   useEffect(() => {
//     function onMousemove(e) {
//       setPageX(e.pageX);
//     }
//     function onMouseup() {
//       console.log('mouseup-pageX: ', pageX);
//     }

//     document.addEventListener('mousemove', onMousemove);
//     document.addEventListener('mouseup', onMouseup);

//     return () => {
//       document.removeEventListener('mousemove', onMousemove);
//       document.removeEventListener('mouseup', onMouseup);
//     };
//   }, [pageX]);

//   return (
//     <div>demo</div>
//   );
// }
