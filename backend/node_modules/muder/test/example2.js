exports.source = {
  brokerId: '123',
  brokerName: 'liao',
  brokerDetail: {
    from: 'china',
    sex: 'male',
    name: {
      first: 'liao',
      last: 'ethan'
    },
    componey:{
      name: 'honhe',
      address:{
        code: '518052',
        locate: 'shenzhen'
      }
    },
    tags: [
      'developer','front-end','onepiece-fan'
    ],
    WorkMates: [
      {
        Name: 'xiaoyue',
        Age: 25
      },
      {
        Name: 'xiaoshan',
        Age: 21
      },
      {
        Name: 'xiaolong',
        Age: 28
      }
    ]
  },
  scoreNum: 0
};

exports.mapper = {
  test: 'test',
  id: 'brokerId|num',
  name: 'brokerName',
  detail: {
    first: 'brokerDetail.name.last',
    sex: 'brokerDetail.sex',
    name: 'brokerName',
    location: {
      code: 'brokerDetail.componey.address.code',
      city: 'brokerDetail.componey.address.locate'
    }
  },
  tags: [
    'brokerDetail.tags'
  ],
  workmatesName: [
    'brokerDetail.WorkMates[].Name'
  ],
  workmates:[
    {
      name: 'brokerDetail.WorkMates[].Name',
      age: 'brokerDetail.WorkMates[].Age',
      id: 'brokerId|num'
    }
  ],
  isMale: function (source) {
    return source.brokerDetail.sex === 'male';
  },
  tags2: function (source) {
    return source.brokerDetail.tags;
  },
  year: 2015,
  extra: function () {
    return {
      extra: ''
    };
  },
  score: 'scoreNum'

};

exports.result = {
  id: 123,
  test: '',
  name: 'liao',
  detail: {
    first: 'ethan',
    sex: 'male',
    name: 'liao',
    location: {
      code: '518052',
      city: 'shenzhen'
    }
  },
  tags: ['developer','front-end','onepiece-fan'],
  workmatesName: ['xiaoyue','xiaoshan','xiaolong'],
  workmates: [
    {
      name: 'xiaoyue',
      age: 25,
      id: 123
    },
    {
      name: 'xiaoshan',
      age: 21,
      id: 123
    },
    {
      name: 'xiaolong',
      age: 28,
      id: 123
    }
  ],
  isMale: true,
  tags2: ['developer','front-end','onepiece-fan'],
  year: 2015,
  extra: {
    extra: ''
  },
  score: 0
};
