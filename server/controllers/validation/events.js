const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateEventInput = function (data) {
  const errors = {};
  const givenDate = new Date(data.start);
  data.title = !isEmpty(data.title) ? data.title : '';
  data.location = !isEmpty(data.location) ? data.location : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  if (new Date() > givenDate.setHours(givenDate.getHours() + 3)) {
    errors.start = 'Event can\'t start in the past';
  }

  if (data.start >= data.end) {
    errors.end = 'Event must end later than start';
  }

  if (!Validator.isLength(data.title, { min: 2, max: 35 })) {
    errors.title = 'Title must be between 2 and 35 characters';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = 'Location field is required';
  }

  if (!Validator.isLength(data.description, { min: 2, max: 300 })) {
    errors.description = 'Description must be between 2 and 300 characters';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
module.exports = validateEventInput;
