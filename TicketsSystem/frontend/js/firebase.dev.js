"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = exports.signInWithGoogle = exports.Google = exports.Auth = void 0;

var _app = require("firebase/app");

var _auth = require("firebase/auth");

var Firebase = (0, _app.initializeApp)({
  apiKey: "AIzaSyAGLroThRzWxcHi5UDAHY85GXnMeAmvyto",
  authDomain: "ticketsystem-d8cf0.firebaseapp.com",
  projectId: "ticketsystem-d8cf0",
  storageBucket: "ticketsystem-d8cf0.appspot.com",
  messagingSenderId: "368046017065",
  appId: "1:368046017065:web:4f2948e249fadbc44eaa38"
});
var Auth = (0, _auth.getAuth)(Firebase);
exports.Auth = Auth;
var Google = new _auth.GoogleAuthProvider();
exports.Google = Google;
var signInWithGoogle = _auth.signInWithPopup;
exports.signInWithGoogle = signInWithGoogle;
var createUser = _auth.createUserWithEmailAndPassword;
exports.createUser = createUser;