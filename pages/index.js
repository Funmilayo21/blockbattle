import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [memes, setMemes] = useState([]);

  const handleSubmitMeme = async (e) => {
    e.preventDefault();
    // This would connect to Web3 in a real implementation
    alert('Connect wallet and submit meme functionality will be implemented with Web3 integration');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Block Battle - Meme Voting Platform</title>
        <meta name="description" content="Smash memes, vote on-chain, earn rewards" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          🥊 Block Battle
        </h1>

        <p className={styles.description}>
          Smash memes, vote on-chain, earn rewards. Only the strongest meme survives!
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>📤 Submit Meme</h2>
            <form onSubmit={handleSubmitMeme} className={styles.form}>
              <input
                type="text"
                placeholder="Meme Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className={styles.input}
                required
              />
              <input
                type="text"
                placeholder="Meme Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
                required
              />
              <button type="submit" className={styles.button}>
                Submit Meme
              </button>
            </form>
          </div>

          <Link href="/battles" className={styles.card}>
            <h2>⚔️ Active Battles</h2>
            <p>View and vote in ongoing meme battles</p>
          </Link>

          <div className={styles.card}>
            <h2>🏆 Leaderboard</h2>
            <p>See the strongest memes and top earners</p>
          </div>

          <div className={styles.card}>
            <h2>💰 Your Rewards</h2>
            <p>Track and claim your earnings</p>
          </div>
        </div>

        <div className={styles.features}>
          <h2>How It Works</h2>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <h3>1. Submit</h3>
              <p>Upload your best memes to the platform</p>
            </div>
            <div className={styles.feature}>
              <h3>2. Battle</h3>
              <p>Memes face off in head-to-head battles</p>
            </div>
            <div className={styles.feature}>
              <h3>3. Vote</h3>
              <p>Community votes decide the winner</p>
            </div>
            <div className={styles.feature}>
              <h3>4. Earn</h3>
              <p>Winners and voters earn on-chain rewards</p>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Block Battle - Decentralized Meme Warfare 🚀</p>
      </footer>
    </div>
  );
}
