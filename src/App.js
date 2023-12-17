import React, { Component } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, gooleAuth } from './firebase.utils.js';

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
      <form style={styles.form}>
        <h2>Authentication</h2>
        {loading && <div style={styles.loading}>Loading...</div>}
        {currentUser ? (
          <div>
            {currentUser.photoURL && (
              <img
                src={currentUser.photoURL}
                alt="User Profile"
                style={styles.profileImage}
              />
            )}
            <p>Welcome, {currentUser.email}!</p>
            <button style={styles.button} onClick={this.handleSignOut}>
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
                style={styles.input}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
                style={styles.input}
              />
            </label>
            <button
              type="button"
              style={styles.button}
              onClick={this.handleSignIn}
            >
              Sign In
            </button>
            <button
              type="button"
              style={styles.button}
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

const styles = {
  form: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    margin: '5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  loading: {
    margin: '10px 0',
  },
  profileImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginBottom: '10px',
  },
};

export default Auth;
