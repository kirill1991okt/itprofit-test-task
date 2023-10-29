import './modules/submitForm';
import './modules/modal';
import IMask from 'imask';

import './index.scss';

IMask(document.getElementById('phone'), {
  mask: '+{375}(00)000-00-00',
  lazy: false,
});
