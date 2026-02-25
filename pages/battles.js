import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Battles.module.css';

export default function Battles() {
  const [battles, setBattles] = useState([
    {
      id: 1,
      meme1: {
        id: 1,
        title: "Doge Coin to the Moon",
        imageUrl: "https://via.placeholder.com/300x300?text=Doge+Meme",
        votes: 42
      },
      meme2: {
        id: 2,
        title: "Pepe The Frog",
        imageUrl: "https://via.placeholder.com/300x300?text=Pepe+Meme",
        votes: 35
      },
      endTime: Date.now() + 3600000,
      isActive: true
    }
  ]);

  const handleVote = (battleId, memeId) => {
    alert(`Voting for meme ${memeId} in battle ${battleId}. Web3 integration coming soon!`);
  };

  const formatTimeRemaining = (endTime) => {
    const remaining = endTime - Date.now();
    if (remaining <= 0) return "Ended";
    
    const hours = Math.floor(remaining / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    return `${hours}h ${minutes}m remaining`;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Active Battles - Block Battle</title>
        <meta name="description" content="Vote in active meme battles" />
      </Head>

      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>
        <h1>⚔️ Active Battles</h1>
      </header>

      <main className={styles.main}>
        {battles.length === 0 ? (
          <div className={styles.noBattles}>
            <p>No active battles at the moment</p>
            <Link href="/" className={styles.button}>Create a Battle</Link>
          </div>
        ) : (
          <div className={styles.battlesGrid}>
            {battles.map((battle) => (
              <div key={battle.id} className={styles.battle}>
                <div className={styles.battleHeader}>
                  <h2>Battle #{battle.id}</h2>
                  <span className={styles.timer}>
                    {formatTimeRemaining(battle.endTime)}
                  </span>
                </div>

                <div className={styles.battleArena}>
                  <div className={styles.memeCard}>
                    <img src={battle.meme1.imageUrl} alt={battle.meme1.title} />
                    <h3>{battle.meme1.title}</h3>
                    <div className={styles.votes}>
                      <span>🔥 {battle.meme1.votes} votes</span>
                    </div>
                    {battle.isActive && (
                      <button
                        onClick={() => handleVote(battle.id, battle.meme1.id)}
                        className={styles.voteButton}
                      >
                        Vote for This Meme
                      </button>
                    )}
                  </div>

                  <div className={styles.vs}>VS</div>

                  <div className={styles.memeCard}>
                    <img src={battle.meme2.imageUrl} alt={battle.meme2.title} />
                    <h3>{battle.meme2.title}</h3>
                    <div className={styles.votes}>
                      <span>🔥 {battle.meme2.votes} votes</span>
                    </div>
                    {battle.isActive && (
                      <button
                        onClick={() => handleVote(battle.id, battle.meme2.id)}
                        className={styles.voteButton}
                      >
                        Vote for This Meme
                      </button>
                    )}
                  </div>
                </div>

                {!battle.isActive && (
                  <div className={styles.winner}>
                    <p>
                      Winner: {battle.meme1.votes > battle.meme2.votes ? battle.meme1.title : battle.meme2.title}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
