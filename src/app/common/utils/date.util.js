'use strict';
const { format } = require('date-fns');
const _ = require('lodash');
/**
 * Utilitário de datas
 * @author Filipe Campos
 */
module.exports = {
  toDate: (dateStr) => {
    try {
      if (_.isNil(dateStr) || _.isEmpty(dateStr)) {
        return null;
      }
      const date = new Date(dateStr);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      return date;
    } catch (err) {
      return null;
    }
  },
  getDate: (timestamp) => {
    try {
      if (_.isNil(timestamp)) {
        return null;
      }
      return new Date(timestamp);
    } catch (err) {
      return null;
    }
  },

  getDay: (timestamp) => {
    try {
      if (_.isNil(timestamp)) {
        return null;
      }
      let date = new Date(timestamp);
      if (date.getDate() + 1 < 10) {
        return `0${date.getDate()}`;
      } else {
        return date.getDate();
      }
    } catch (err) {
      return null;
    }
  },
  getMonth: (timestamp) => {
    try {
      if (_.isNil(timestamp)) {
        return null;
      }
      let date = new Date(timestamp);
      if (date.getMonth() + 1 < 10) {
        return `0${date.getMonth() + 1}`;
      } else {
        return date.getMonth() + 1;
      }
    } catch (err) {
      return null;
    }
  },

  getYear: (timestamp) => {
    try {
      if (_.isNil(timestamp)) {
        return null;
      }
      let date = new Date(timestamp);
      return date.getFullYear();
    } catch (err) {
      return null;
    }
  },

  getHour: (timestamp) => {
    try {
      if (_.isNil(timestamp)) {
        return null;
      }
      let date = new Date(timestamp);
      let minutes = date.getMinutes().toString();
      if (minutes.length === 1) {
        minutes += '0';
      }
      return `${date.getHours()}:${minutes}`;
    } catch (err) {
      return null;
    }
  },

  /**
   * Possiveis mascaras
   * dd/MM/yyyy
   * dd-MM-yyyy
   * yyyy-MM-dd
   * yyyy-MM-dd HH:mm:ss
   *
   * @param {Date|number} date
   * @param {string} mask
   */
  dateFormat: (date, mask) => {
    try {
      if (_.isNil(date)) {
        return null;
      }
      if (_.isString(mask)) {
        return format(date, mask);
      }
      return format(date, 'yyyy-MM-dd HH:mm:ss');
    } catch (err) {
      return null;
    }
  },

  /**
   * F
   * yyyy-MM-dd
   *
   * @param {Date|number} date
   */
  toFormatSql: (date) => {
    try {
      if (_.isNil(date)) {
        date = new Date();
      }
      return format(date, 'yyyy-MM-dd');
    } catch (err) {
      return null;
    }
  },

  getMonthNamePtBr: (month) => {
    try {
      if (_.isNil(month)) {
        return null;
      }
      let result = null;
      switch (month) {
        case 1:
          result = 'Janeiro';
          break;
        case 2:
          result = 'Fevereiro';
          break;
        case 3:
          result = 'Março';
          break;
        case 4:
          result = 'Abril';
          break;
        case 5:
          result = 'Maio';
          break;
        case 6:
          result = 'Junho';
          break;
        case 7:
          result = 'Julho';
          break;
        case 8:
          result = 'Agosto';
          break;
        case 9:
          result = 'Setembro';
          break;
        case 10:
          result = 'Outubro';
          break;
        case 11:
          result = 'Novembro';
          break;
        case 12:
          result = 'Dezembro';
          break;
      }
      return result;
    } catch (err) {
      return null;
    }
  },

  getTimestamp: (date) => {
    try {
      if (_.isNil(date)) {
        return null;
      }
      return new Date(
        date.valueOf() + date.getTimezoneOffset() * 60000
      ).getTime();
    } catch (err) {
      return null;
    }
  },
  getDateSeconds: (seconds) => {
    try {
      if (_.isNil(data)) {
        return null;
      }
      let data = new Date();
      data = data.setSeconds(seconds);
      const secondsResut = Math.floor(seconds / 1000);
      return secondsResut;
    } catch (err) {
      return null;
    }
  },
};
