import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import mock from 'src/utils/mock';

mock.onGet('/api/user/data/photos').reply(200, {
  customers: [
    {
      id : uuidv4(),
      photoName:["photo_1.png"],
      photoURL : ["/static/third_party/image/photos_1.png"],
      updatedAt : moment()
      .subtract(1, 'days')
      .format("YYYY-MM-DD")
    },
    {
      id : uuidv4(),
      photoName:["photo_2.png"],
      photoURL : ["/static/third_party/image/photos_2.png"],
      updatedAt : moment()
      .subtract(2, 'days')
      .format("YYYY-MM-DD"),
    },
    {
      id : uuidv4(),
      photoName:["photo_3.png", "photo_4.png"],
      photoURL : ["/static/third_party/image/photos_3.png", "/static/third_party/image/photos_4.png"],
      updatedAt : moment()
      .subtract(3, 'days')
      .format("YYYY-MM-DD"),
    }
  ]
});


mock.onGet('/api/user/data/videos').reply(200, {
  customers: [
    {
      id : uuidv4(),
      videoName:"1.mp4",
      videoURL : "/static/third_party/videos/1.mp4",
      duration : "00:00:41",
      updatedAt : moment()
      .subtract(1, 'days')
      .format("YYYY-MM-DD HH:MM:SS")
    },
    {
      id : uuidv4(),
      videoName:"2.mp4",
      videoURL : "/static/third_party/videos/2.mp4",
      duration : "00:00:38",
      updatedAt : moment()
      .subtract(2, 'days')
      .format("YYYY-MM-DD  HH:MM:SS"),
    }
  ]
});

mock.onGet('/api/user/data/audios').reply(200, {
  customers: [
    {
      id : uuidv4(),
      audioName:"1.mp3",
      audioURL : "/static/third_party/audios/1.mp3",
      duration : "00:00:41",
      updatedAt : moment()
      .subtract(1, 'days')
      .format("YYYY-MM-DD HH:MM:SS")
    },
    {
      id : uuidv4(),
      audioName:"2.mp3",
      audioURL : "/static/third_party/audios/2.mp3",
      duration : "00:00:38",
      updatedAt : moment()
      .subtract(2, 'days')
      .format("YYYY-MM-DD  HH:MM:SS"),
    },
    {
      id : uuidv4(),
      audioName:"3.mp3",
      audioURL : "/static/third_party/audios/3.mp3",
      duration : "00:00:15",
      updatedAt : moment()
      .subtract(3, 'days')
      .format("YYYY-MM-DD  HH:MM:SS"),
    }
  ]
});

mock.onGet('/api/user/data/documents').reply(200, {
  customers: [
    {
      id : uuidv4(),
      docName:"1.txt",
      docURL : "/static/third_party/documents/1.txt",
      updatedAt : moment()
      .subtract(1, 'days')
      .format("YYYY-MM-DD HH:MM:SS")
    },
    {
      id : uuidv4(),
      docName:"2.txt",
      docURL : "/static/third_party/documents/2.txt",
      updatedAt : moment()
      .subtract(2, 'days')
      .format("YYYY-MM-DD  HH:MM:SS"),
    },
    {
      id : uuidv4(),
      docName:"3.txt",
      docURL : "/static/third_party/documents/3.txt",
      updatedAt : moment()
      .subtract(3, 'days')
      .format("YYYY-MM-DD  HH:MM:SS"),
    }
  ]
});

