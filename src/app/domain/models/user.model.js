const BaseModel = require('./base.mapper');
module.exports = class UserModel extends BaseModel {
  constructor() {
    super();
    this.id = Number;
    this.nickName = String;
    this.firstName = String;
    this.lastName = String;
    this.email = String;
  }

  toModel(json) {
    return {
      id: json['UserID'],
      nickName: json['NickName'],
      firstName: json['FirstName'],
      lastName: json['LastName'],
      email: json['Email'],
    };
  }
};
