# muder
An  object-mapper easy to use.

## install
`npm install muder`

**usage**

    var muder = require('muder')

    var result = muder(source, mapper[, addon]);


For a full example check the `test/example*.js` file.



## example

**source object**

    {
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
    }

**mapper**

    {
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
      }
    }

**map the object**

      var result = muder(source, mapper,{
          hello: function (name) {
            return 'hello '+name;
          }
      });

**result**

    {
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
      constant: 'this is a constant'
    }



**This project is inspired by**

https://github.com/imyelo/barrow
