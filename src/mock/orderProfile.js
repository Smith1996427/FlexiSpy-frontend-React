
import moment from 'moment';
import mock from 'src/utils/mock';

mock.onGet('/api/account/orders/list').reply(200, {
  customers: [
    {
      id: '5e887a62195cc5aef7e8ca5d',
      name: 'Ekaterina Tankova',
      email: 'ekaterina.tankova@devias.io',
      avatar: '/static/third_party/avatars/avatar_2.png',
      licenceKey: '51648181052',
      status: 'activated',
      productName: "FlexiSPY iPhone EXTREME - annual",
      version: "9.2.1",
      expirationDate: moment()
        .subtract(1, 'days')
        .toDate()
        .getTime(),
      updatedAt : moment()
      .subtract(1, 'days')
      .toDate()
      .getTime(),
    },

    {
      id: '5e887ac47eed253091be10cb',
      name: 'Cao Yu',
      email: 'cao.yu@devias.io',
      avatar: '/static/third_party/avatars/avatar_3.png',
      licenceKey: '62548181052',
      status: 'available',
      productName: "FlexiSPY iPhone EXTREME - annual",
      version: "8.2.1",
      expirationDate:  moment()
      .subtract(1, 'days')
      .subtract(7, 'hours')
      .toDate()
      .getTime(),
      updatedAt: moment()
        .subtract(1, 'days')
        .subtract(7, 'hours')
        .toDate()
        .getTime(),
    },
    {
      id: '5e887b209c28ac3dd97f6db5',
      name: 'Alex Richardson',
      email: 'alex.richardson@devias.io',
      avatar: '/static/third_party/avatars/avatar_4.png',
      licenceKey: '41348181052',
      status: 'expired',
      productName: "FlexiSPY iPhone EXTREME - annual",
      version: "7.2.1",
      expirationDate: moment()
        .subtract(2, 'days')
        .subtract(1, 'hours')
        .toDate()
        .getTime(),
      updatedAt: moment()
        .subtract(2, 'days')
        .subtract(1, 'hours')
        .toDate()
        .getTime()
    },
    {
      id: '5e887b7602bdbc4dbb234b27',
      name: 'Anje Keizer',
      email: 'anje.keizer@devias.io',
      avatar: '/static/third_party/avatars/avatar_5.png',
      licenceKey: '41348181052',
      status: 'expired',
      productName: "FlexiSPY iPhone EXTREME - annual",
      version: "10.2.1",
      expirationDate: moment()
        .subtract(2, 'days')
        .subtract(4, 'hours')
        .toDate()
        .getTime(),
      updatedAt: moment()
        .subtract(2, 'days')
        .subtract(4, 'hours')
        .toDate()
        .getTime()
    }
  ]
});

