/* eslint-disable */
import {
  auth,
  signUpWithPass,
} from '../src/Firebase/auth-functions.js';

import {
  // auth,
  createUserWithEmailAndPassword,
} from '../src/Firebase/firebase.js';

jest.mock('../src/Firebase/firebase.js', () => {
  return {
    getAuth: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
  }
})
jest.mock('../src/Firebase/firebase.js', () => {
  return {
    auth: jest.fn(() => ({ auth: 'auth' })),
    createUserWithEmailAndPassword: jest.fn((email, password) => {
      if (!email || !password) {
        throw new Error('Error');
      }
      Promise.resolve({
        email1: 'sus',
      });
      //  Promise.reject({
      //   if (!email || !password) {throw new Error ('Error')},
      //  });
    }),
  }
});

describe('Tests para signup', () => {
  const email = 'veganship@gmail.com';
  const passw = '1234567';
  it('Debería poder llamar a createUserWithEmailAndPassword', () => {
    signUpWithPass(email, passw);
    // Para ver si durante la ejecucion de signUpWithPass se invocó el createUserWithEmailAndPassword..
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });
  it('Debería llamar a createUserWithEmailAndPassword con sus parametros', () => {
    signUpWithPass(email, passw);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, passw)
  });

  it('signup debería ser una funcion', () => {
    expect(typeof signUpWithPass).toBe('function')
  });
  it('Debería recibir el email', () => {
    signUpWithPass(email, passw);
    expect(createUserWithEmailAndPassword.mock.calls[0][1]).toBe('veganship@gmail.com')
  });
  it('Debería recibir el password', () => {
    signUpWithPass(email, passw);
    expect(createUserWithEmailAndPassword.mock.calls[0][2]).toBe('1234567')
  })
});
/* eslint-enable */
