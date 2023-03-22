import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import mock from 'src/utils/mock';

mock.onGet('/api/user/data/call/list').reply(200, {
  customers: [
    {
      id : uuidv4(),
      name: 'Adam',
      phoneNumber: '+1(800)6523980',
      status: 'incoming',
      duration: "00:00:42",
      updatedAt : moment()
      .subtract(1, 'days')
      .format("YYYY-MM-DD  hh:mm:ss:A"),
      recorded : "/static/from_db/record_audio/111.mp3"
    },
    {
      id : uuidv4(),
      name: 'Dad',
      phoneNumber: '+1(800)5258585',
      status: 'outcoming',
      duration: "00:01:20",
      updatedAt : moment()
      .subtract(1, 'days')
      .subtract(5, 'hours')
      .format("YYYY-MM-DD  hh:mm:ss:A"),
      recorded : "/static/from_db/record_audio/111.mp3"
    },
    {
      id : uuidv4(),
      name: 'Bryan',
      phoneNumber: '+1(800)5236544',
      status: 'missed',
      duration: "00:00:00",
      updatedAt : moment()
      .subtract(2, 'days')
      .subtract(19, 'hours')
      .format("YYYY-MM-DD  hh:mm:ss:A"),
      recorded : "/static/from_db/record_audio/111.mp3"
    },

  ]
});


mock.onGet('/api/user/data/voip/list').reply(200, {
  customers: [
    {
      id : uuidv4(),
      name: 'Adam',
      voip: 'whatsapp',
      contact : "Matt",
      status: 'incoming',
      duration: "00:00:42",
      updatedAt : moment()
      .subtract(1, 'days')
      .format("YYYY-MM-DD  hh:mm:ss:A"),
      recorded : "/static/from_db/record_audio/111.mp3"
    },
    {
      id : uuidv4(),
      name: 'Dad',
      voip: 'telegram',
      contact : "Sara",
      status: 'outcoming',
      duration: "00:01:20",
      updatedAt : moment()
      .subtract(1, 'days')
      .subtract(5, 'hours')
      .format("YYYY-MM-DD  hh:mm:ss:A"),
      recorded : "/static/from_db/record_audio/111.mp3"
    },
    {
      id : uuidv4(),
      name: 'Bryan',
      voip: 'skype',
      contact : "Maya",
      status: 'missed',
      duration: "00:00:00",
      updatedAt : moment()
      .subtract(2, 'days')
      .subtract(19, 'hours')
      .format("YYYY-MM-DD  hh:mm:ss:A"),
      recorded : "/static/from_db/record_audio/111.mp3"
    },

  ]
});
