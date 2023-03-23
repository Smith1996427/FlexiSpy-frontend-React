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


mock.onGet('/api/user/data/call/list/5e887a62195cc5aef7e8ca5d').reply(200, {


  customers: {
    id : "5e887b7602bdbc4dbb234b27",
    name: 'Anje Keizer',
    avatar: '/static/third_party/avatars/avatar_5.png',
    phoneNumber: '+1(800)4567532',
    history : [
          {
            id : uuidv4(),
            status: 'incoming',
            duration: "00:00:42",
            updatedAt : moment()
            .subtract(1, 'days')
            .format("YYYY-MM-DD  hh:mm:ss:A"),
            recorded : "/static/from_db/record_audio/111.mp3"
          },
          {
            id : uuidv4(),
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
            status: 'missed',
            duration: "00:00:00",
            updatedAt : moment()
            .subtract(2, 'days')
            .subtract(19, 'hours')
            .format("YYYY-MM-DD  hh:mm:ss:A"),
            recorded : "/static/from_db/record_audio/111.mp3"
          },
        ]
      }
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


mock.onGet('/api/user/data/messages').reply(200, {
  customers: [
    {
      id : uuidv4(),
      fromName: 'Susane',
      fromEmail : "<susane@de.co.us>",
      subject : "Science Homework",
      status: 'received',
      description: "Check this out JessyQ. The enzyme in the potato is peroxidase. So the quicker the peroxidase is going the more bubbles of oxygen is givenm off.",
      updatedAt : moment()
      .subtract(1, 'days')
      .format("YYYY-MM-DD  hh:mm:ss:A"),
      attachmentsURL : ["/static/third_party/image/photos_1.png"],
      attachments:["photo_1.png"]
    },
    {
      id : uuidv4(),
      fromName: 'Sarah',
      fromEmail : "<sarah@demo.com>",
      subject : "Tinny Stuff",
      status: 'sent',
      description: "Hi,Find attached",
      updatedAt : moment()
      .subtract(1, 'days')
      .subtract(5, 'hours')
      .format("YYYY-MM-DD  hh:mm:ss:A"),
      attachmentsURL : ["/static/third_party/image/photos_2.png"],
      attachments:["photo_2.png"]
    }
  ]
});


mock.onGet('/api/user/data/messages/list/5e887a62195cc5aef7e8ca5d').reply(200, {


  customers: {
    id : "5e887a62195cc5aef7e8ca5d",
    name: 'Ekaterina Tankova',
    avatar: '/static/third_party/avatars/avatar_2.png',
    phoneNumber: '+1(800)6523980',
    history : [
      {
      id : uuidv4(),
      subject : "Science Homework",
      status: 'received',
      description: "Check this out JessyQ. The enzyme in the potato is peroxidase. So the quicker the peroxidase is going the more bubbles of oxygen is givenm off.",
      updatedAt : moment()
      .subtract(1, 'days')
      .format("YYYY-MM-DD  hh:mm:ss:A"),
      attachmentsURL : ["/static/third_party/image/photos_1.png"],
      attachments:["photo_1.png"]
    },
    {
      id : uuidv4(),
      subject : "Tinny Stuff",
      status: 'sent',
      description: "Hi,Find attached",
      updatedAt : moment()
      .subtract(1, 'days')
      .subtract(5, 'hours')
      .format("YYYY-MM-DD  hh:mm:ss:A"),
      attachmentsURL : ["/static/third_party/image/photos_2.png"],
      attachments:["photo_2.png"]
    }  
   ]
  }
});