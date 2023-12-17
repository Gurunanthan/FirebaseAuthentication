import React, { Component } from 'react';

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, gooleAuth } from './firebase.utils.js';
import './Auth.Styles.css';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      currentUser: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = onAuthStateChanged(auth, (user) => {
      this.setState({ currentUser: user, loading: false });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleSignIn = async () => {
    this.setState({ loading: true });
    const { email, password } = this.state;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  handleGoogleSignIn = async () => {
    this.setState({ loading: true });
    try {
      await signInWithPopup(auth, gooleAuth);
    } catch (err) {
      console.error(err);
    }
  };

  handleSignOut = async () => {
    this.setState({ loading: true });
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { email, password, currentUser, loading } = this.state;

    return (
      <form className="form">
        <h2>Authentication</h2>
        {loading && <div className="loading">Loading...</div>}
        {currentUser ? (
          <div>
            {currentUser.photoURL && (
              <img
                src={currentUser.photoURL}
                alt="User Profile"
                className="profileImage"
              />
            )}
            <p>Welcome, {currentUser.email}!</p>
            <button className="button" onClick={this.handleSignOut}>
              Log Out
            </button>
          </div>
        ) : (
          <fieldset>
            <legend>Sign In</legend>
            <label>
              Email:
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })}
                className="input"
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
                className="input"
              />
            </label>
            <button
              type="button"
              className="button"
              onClick={this.handleSignIn}
            >
              Sign In
            </button>
            <button
              type="button"
              className="button"
              onClick={this.handleGoogleSignIn}
            >
              Sign In With Google
            </button>
          </fieldset>
        )}
      </form>
    );
  }
}

export default Auth;
