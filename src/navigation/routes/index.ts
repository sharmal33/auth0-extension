import MainRoutes from './MainRoutes';

import Method from './Method';

import PhoneNativeLogin from './PhoneNativeLogin';

import PhoneNativeRegister from './PhoneNativeRegister';

import Phone from './Phone';

import Dashboard from './Dashboard';

export default {
  ...MainRoutes,

  ...Method,

  ...PhoneNativeLogin,

  ...PhoneNativeRegister,

  ...Phone,

  ...Dashboard,
};
