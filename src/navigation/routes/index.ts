import MainRoutes from './MainRoutes';

import PhoneAuth from './PhoneAuth';

import Dashboard from './Dashboard';

import LoginFailed from './LoginFailed';

export default {
  ...MainRoutes,

  ...PhoneAuth,

  ...Dashboard,

  ...LoginFailed,
};
