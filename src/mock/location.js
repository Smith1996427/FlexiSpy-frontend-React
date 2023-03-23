import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import mock from 'src/utils/mock';

mock.onGet('/api/user/data/location').reply(200, {
  customers: [
    {
      id : uuidv4(),
      latitude:"51.53",
      longitude : "-0.2",
      accuracy : 10,
      updatedAt : moment()
      .subtract(1, 'days')
      .format("YYYY-MM-DD")
    }
  ]
});

mock.onGet('/api/user/data/app/history').reply(200, {
  customers: [
    {
      id : uuidv4(),
      name:"imo",
      state : "Launched",
      updatedAt : moment()
      .subtract(1, 'days')
      .subtract(2,'hours')
      .format("YYYY-MM-DD HH:MM:SS")
    },
    {
      id : uuidv4(),
      name:"chrome",
      state : "Installed",
      updatedAt : moment()
      .subtract(10, 'days')
      .subtract(2,'hours')
      .format("YYYY-MM-DD HH:MM:SS")
    },
    {
      id : uuidv4(),
      name:"camera",
      state : "Stopped",
      updatedAt : moment()
      .subtract(2, 'days')
      .subtract(15,'hours')
      .format("YYYY-MM-DD HH:MM:SS")
    }
  ]
});

mock.onGet('/api/user/data/web/history').reply(200, {
  customers: [
    {
      id : uuidv4(),
      title:"Netflix - Watch TV Shows Online, Watch Movies Online",
      website : "https://www.netflix.com",
      updatedAt : moment()
      .subtract(1, 'days')
      .subtract(2,'hours')
      .format("YYYY-MM-DD HH:MM:SS")
    },
    {
      id : uuidv4(),
      title:"PlayStore",
      website : "https://play.google.com/store",
      updatedAt : moment()
      .subtract(10, 'days')
      .subtract(2,'hours')
      .format("YYYY-MM-DD HH:MM:SS")
    },
    {
      id : uuidv4(),
      title:"	Vacation Rentals, Homes, Experiences & Places - Airbnb",
      website : "https://www.airbnb.com",
      updatedAt : moment()
      .subtract(2, 'days')
      .subtract(15,'hours')
      .format("YYYY-MM-DD HH:MM:SS")
    }
  ]
});


mock.onGet('/api/data/contacts').reply(200, {
  customers: [
    {
      id: '5e887a62195cc5aef7e8ca5d',
      name: 'Ekaterina Tankova',
      email: 'ekaterina.tankova@devias.io',
      avatar: '/static/third_party/avatars/avatar_2.png',
      mobile: '+1(800)6523980',
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
      mobile: '+1(800)7894561',
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
      mobile: '+1(800)9878521',
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
      mobile: '+1(800)4567532',
      updatedAt: moment()
        .subtract(2, 'days')
        .subtract(4, 'hours')
        .toDate()
        .getTime()
    }
  ]
});

