import firebase from 'firebase'

export const appName = 'advanced-react-app'

export const firebaseConfig = {
  apiKey: "AIzaSyCfFx5iN74DVOgf6YQ6WQkMKSlsc3p0nsY",
  authDomain: `${appName}-71608.firebaseapp.com`,
  databaseURL: `https://${appName}-71608.firebaseio.com`,
  projectId: `${appName}-71608`,
  storageBucket: `${appName}-71608.appspot.com`,
  messagingSenderId: "699624838727"
}

firebase.initializeApp(firebaseConfig);