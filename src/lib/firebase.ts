import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA_Vilo7iTyFjQ8A_FRvPnIZ9IeW8RRdko",
  authDomain: "gitdox.firebaseapp.com",
  projectId: "gitdox",
  storageBucket: "gitdox.firebasestorage.app",
  messagingSenderId: "56852566681",
  appId: "1:56852566681:web:e9ae8e8dc3916e2b48de08",
  measurementId: "G-5BTZ4055S3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
githubProvider.addScope('repo');
githubProvider.addScope('user:email');