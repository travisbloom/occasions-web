import {formatReduxFormErrors, formatGeneralAPIErrors} from './errors';

const API_RESPONSE = {
  graphQLErrors: [
    {
      message: 'error that shouldnt be included',
      data: {
        password: ['first password error'],
        username: ['first username error', 'second username error'],
        nestedObject: {
          nestedObjectProperty: ['first nestedObjectProperty error'],
        },
      },
    },
    {
      message: 'error that shouldnt be included',
      data: {
        password: ['second password error'],
        username: ['third username error'],
      },
    },
    {
      message: 'a general form error',
    },
  ],
};

it('formatGeneralAPIErrors will accurately transform returned error responses', () => {
  expect(formatGeneralAPIErrors(API_RESPONSE)).toEqual([
    'Error on field password: first password error',
    'Error on field username: first username error',
    'Error on field username: second username error',
    'Error on field nestedObjectProperty: first nestedObjectProperty error',
    'Error on field password: second password error',
    'Error on field username: third username error',
    'a general form error',
  ]);
});

it('formatReduxFormErrors will accurately transform returned error responses', () => {
  try {
    formatReduxFormErrors(API_RESPONSE);
  } catch (SubmissionError) {
    expect(SubmissionError.errors).toEqual({
      _error: ['a general form error'],
      password: ['first password error', 'second password error'],
      username: [
        'first username error',
        'second username error',
        'third username error',
      ],
      nestedObject: {
        nestedObjectProperty: ['first nestedObjectProperty error'],
      },
    });
  }
});
