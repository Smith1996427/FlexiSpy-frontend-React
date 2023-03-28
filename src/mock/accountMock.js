import _ from 'lodash';
import jwt from 'jsonwebtoken';
import mock from 'src/utils/mock';
import moment from 'moment';

const JWT_SECRET = 'devias-top-secret-key';
const JWT_EXPIRES_IN = '2 days';

const db = {
  user: {
    id: '5e86809283e28b96d2d38537',
    avatar: '/static/from_db/avatar/me.png',
    bio: 'Sales Manager',
    canHire: false,
    country: 'China',
    email: 'zheng@demo.com',
    username: 'admin',
    phonenumber : '12345678987',
    password: 'admin',
    firstName: 'Zheng',
    isPublic: true,
    lastName: 'Zheng',
    role: 'admin',
    state: 'Hong Kong'
  }
};

mock.onPost('/api/account/login').reply((config) => {
  const { email, password } = JSON.parse(config.data);

  if (email !== "zhen zhen" || password !== 'admin') {
    return [400, { message: 'Please check your email and password' }];
  }

  const { user } = db;

  const accessToken = jwt.sign(
    { id: user.id },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return [200, { user, accessToken }];
});

mock.onGet('/api/account/me').reply((config) => {
  const { Authorization } = config.headers;

  if (!Authorization) {
    return [401, { message: 'Authorization token missing' }];
  }

  try {
    const accessToken = Authorization.split(' ')[1];

    const { id } = jwt.verify(accessToken, JWT_SECRET);

    if (id !== db.user.id) {
      return [401, { message: 'Invalid authorization token' }];
    }

    return [200, { user: db.user }];
  } catch (error) {
    return [401, { message: 'Invalid authorization token' }];
  }
});

mock.onPost('/api/account/profile').reply((request) => {
  const { update } = JSON.parse(request.data);

  _.assign(db.user, update);

  return [200, { user: db.user }];
});

mock.onGet('/api/account/settings').reply(200, {
  settings: {}
});

mock.onGet('/api/account/subscription').reply(200, {
  subscription: {
    name: 'Freelancer',
    price: '5',
    currency: '$',
    proposalsLeft: 12,
    templatesLeft: 5,
    invitesLeft: 24,
    adsLeft: 10,
    hasAnalytics: true,
    hasEmailAlerts: true
  }
});


mock.onGet('/api/account/users/list').reply(200, {
  customers: [
    {
      id: '5e887a62195cc5aef7e8ca5d',
      name: 'Jone Smith',
      phone: '18544123698',
      avatar: '/static/third_party/avatars/avatar_2.png',
      role: 'agent',
      number : 1,
      updatedAt : moment()
      .subtract(1, 'days')
      .format("YYYY-MM-DD")
    },
    {
      id: '5e887ac47eed253091be10cb',
      name: 'Adam',
      phone: '17596843521',
      avatar: '/static/third_party/avatars/avatar_5.png',
      role: 'user',
      number : 2,
      updatedAt: moment()
        .subtract(2, 'days')
        .format("YYYY-MM-DD")
    },
    {
      id: '5e887b209c28ac3dd97f6db5',
      name: 'Dad',
      phone: '15458582365',
      avatar: '/static/third_party/avatars/avatar_4.png',
      role: 'user',
      number : 1,
      updatedAt: moment()
        .subtract(3, 'days')
        .format("YYYY-MM-DD")
    }
  ]
});


mock.onPost('/api/accounts/update').reply((request) => {
  const { update } = JSON.parse(request.data);
  if(update === "Me")
  {
     return [200, { users:     {
      id: '5e86809283e28b96d2d38537',
      avatar: '/static/from_db/avatar/me.png',
      phonenumber : '+1 234 567 8987',
      name : "zhen zhen",
      role: 'agent',
    }
   }];
  }
 if(update === "Jone Smith")
 {
    return [200, { users:  {
      id: '5e887a62195cc5aef7e8ca5d',
      name: 'Jone Smith',
      phone: '+1 854 412 3698',
      avatar: '/static/third_party/avatars/avatar_2.png',
      role: 'agent',
      number : 1,
      updatedAt : moment()
      .subtract(1, 'days')
      .format("YYYY-MM-DD")
    }
  }];
 }
 if(update === "Adam")
 {
    return [200, { users:     {
      id: '5e887ac47eed253091be10cb',
      name: 'Adam',
      phone: '+1 759 684 3521',
      avatar: '/static/third_party/avatars/avatar_5.png',
      role: 'user',
      number : 2,
      updatedAt: moment()
        .subtract(2, 'days')
        .format("YYYY-MM-DD")
    }
  }];
 }

 if(update === "Dad")
 {
    return [200, { users: {
      id: '5e887b209c28ac3dd97f6db5',
      name: 'Dad',
      phone: '+1 545 858 2365',
      avatar: '/static/third_party/avatars/avatar_4.png',
      role: 'user',
      number : 1,
      updatedAt: moment()
        .subtract(3, 'days')
        .format("YYYY-MM-DD")
    }
  }];
 }

});