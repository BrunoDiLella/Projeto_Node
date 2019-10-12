exports.source = {
  studentID: '123',
  firstName: 'liao',
  lastName: 'ethan',
  sex: 'male',
  age: '23',
  detailInfo: {
    classMates: [
      {
        studentID: '44',
        name: 'Lisa',
        sex: 'female'
      },
      {
        studentID: '55',
        name: 'Joe',
        sex: 'male'
      }
    ],
    tags: ['grade-two','good']
  }
};

exports.mapper = {
  id: 'studentID|num',
  name: {
    firstName: 'firstName',
    lastName: 'lastName'
  },
  sex: 'sex',
  age: 'age|num',
  extra: {
    classMates: [
      {
        id: 'detailInfo.classMates[].studentID|num',
        name: 'detailInfo.classMates[].name',
        sex: 'detailInfo.classMates[].sex'
      }
    ],
    tags: [
      'detailInfo.tags[]'
    ]
  },
  sayHello: 'lastName|hello',
  sayMorning: function (source) {
    return 'Morning ' + source.lastName + ' ' +source.firstName;
  },
  constant: function() {
    return 'this is a constant';
  },
  emptyarr: [],
  emptyObj: {}
};

exports.result = {
  id: 123,
  name: {
    firstName: 'liao',
    lastName: 'ethan'
  },
  sex: 'male',
  age: 23,
  extra: {
    classMates: [
      {
        id: 44,
        name: 'Lisa',
        sex: 'female'
      },{
        id: 55,
        name: 'Joe',
        sex: 'male'
      }
    ],
    tags: [
      'grade-two','good'
    ]
  },
  sayHello: 'hello ethan',
  sayMorning: 'Morning ethan liao',
  constant: 'this is a constant',
  emptyarr: [],
  emptyObj: {}
};
