// imports
import moment from 'moment';

/**
 * @param {string} dateA - a date, represented in string format
 * @param {string} dateB - a date, represented in string format
 */
const dateSort = (dateA, dateB) => moment(dateA).diff(moment(dateB));

/**
 *
 * @param {number|string} A
 * @param {number|string} B
 */
const defaultSort = (varA, varB) => {
  if (varA < varB) return -1;
  if (varB < varA) return 1;
  return 0;
};

const Sorter = {
    DEFAULT: defaultSort,
    DATE: dateSort,
  };

export default Sorter;