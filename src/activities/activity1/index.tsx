import React from 'react';
import ReactDom from 'react-dom';

import './css/index.scss';

function Activity1() {
  return <div className="activity1" />;
}

function ActivityHoc(Component) {
  Component.create = (container) => {
    ReactDom.render(
      <Component />,
      container,
    );
  };
  return Component;
}

export default ActivityHoc(Activity1);
