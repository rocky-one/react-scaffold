import React, { useEffect } from 'react';
import Count from '../../containers/view1';
import Activity1 from '../../npm/activity1';
import Activity2 from '../../npm/activity2';
import '../../npm/activity1/index.css';
import '../../npm/activity2/index.css';
import '../../npm/activity3/index.css';
import create from '../../npm/activity3';

export default function Page1() {
  useEffect(() => {
    setTimeout(() => {
      // Activity1.create(document.getElementById('act'));
      create('#vueAct');
    }, 2000);
  }, []);
  return (
    <div>
      Page12
      <Count />
      <div id="act" />
      <div id="vueAct" />
      <Activity1 />
      <Activity2 />
    </div>
  );
}
