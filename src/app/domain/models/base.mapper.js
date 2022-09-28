module.exports = class BaseMapper {
  constructor() {
    if (this.constructor == BaseMapper) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }
  toModel() {
    throw new Error('Not implement');
  }
};
