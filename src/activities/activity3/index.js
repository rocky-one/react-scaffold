import Vue from 'vue';
import Activity3 from './activity3.vue';

function create(container) {
  return new Vue({
    render: (h) => h(Activity3),
  }).$mount(container);
}

export default create;
