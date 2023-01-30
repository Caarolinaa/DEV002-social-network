/* eslint-disable */
// test('example', () => {
//   const mock = jest.fn(); //mock es una función que ya tiene sus propiedades
//   console.log(mock);
// });

import {
  signUpWithPass,
  signInWithPass,
  signInWithPopup,
  logOut
} from '../src/Firebase/firebase.js';

import {
  auth,
  createUserWithEmailAndPassword
} from '../src/Firebase/firebaseConfig.js';

jest.mock('https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js', () => {
  return {
    getAuth: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    GoogleAuthProvider: jest.fn(),
    onAuthStateChanged: jest.fn(),
    updateProfile: jest.fn(),
    signInWithPopup: jest.fn(),
    signInWithEmailAndPassword: jest.fn()
  }
})
jest.mock('../src/Firebase/firebaseConfig.js', () => {
  return {
    auth: jest.fn(() => ({ auth: 'test' })),
    createUserWithEmailAndPassword: jest.fn((auth, email, password) => {
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
    // console.log(x);
    // console.log(createUserWithEmailAndPassword.mock);
    // Para ver si durante la ejecucion de signup se invocó el createUser..
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });
  it('Debería llamar a createUserWithEmailAndPassword con sus parametros', () => {
    signUpWithPass(email, passw);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, passw)
  });
  // it('Debería llamar al error si sus parametros están vacios', () => {
  //   // signup().then().catch((error) => {
  //   //   expect(error).toMatch('Error')
  //   // })
  //   signup();
  //   expect(new Error('Error')).toThrow('Error');
  // });
  it('signup debería ser una funcion', () => {
    expect(typeof signUpWithPass).toBe('function')
  });
  it('Debería recibir el email', () => {
    signup(email, passw);
    expect(createUserWithEmailAndPassword.mock.calls[0][1]).toBe('veganship@gmail.com')
  });
  it('Debería recibir el password', () => {
    signup(email, passw);
    expect(createUserWithEmailAndPassword.mock.calls[0][2]).toBe('1234567')
  })
});
/* eslint-enable */
