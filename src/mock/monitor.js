
import mock from 'src/utils/mock';

mock.onGet('/api/user/monitor/get').reply(200, {
  monitor : "123456789",
  result :  false
});

