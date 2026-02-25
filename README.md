# blockbattle
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Block Battle — Meme Arena</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
:root {
  --bg:       #0d0e17;
  --bg2:      #13141f;
  --bg3:      #1a1b2e;
  --bg4:      #1e2035;
  --border:   rgba(255,255,255,0.06);
  --purple:   #7c3aed;
  --purple2:  #9d5ff3;
  --pink:     #ec4899;
  --cyan:     #22d3ee;
  --gold:     #f59e0b;
  --green:    #10b981;
  --red:      #ef4444;
  --text:     #e2e8f0;
  --muted:    #64748b;
}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;min-height:100vh;overflow-x:hidden;}
body::before{content:'';position:fixed;top:-200px;left:50%;transform:translateX(-50%);width:800px;height:600px;background:radial-gradient(ellipse,rgba(124,58,237,0.12) 0%,transparent 70%);pointer-events:none;z-index:0;}

/* NAV */
nav{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 32px;height:64px;background:rgba(13,14,23,0.9);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);}
.nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;color:#fff;}
.logo-icon{width:36px;height:36px;background:linear-gradient(135deg,var(--purple),var(--pink));border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;box-shadow:0 0 20px rgba(124,58,237,0.4);}
.nav-links{display:flex;align-items:center;gap:4px;}
.nav-link{font-size:0.9rem;font-weight:500;color:var(--muted);padding:8px 16px;border-radius:8px;cursor:pointer;transition:all .2s;border:none;background:none;font-family:'DM Sans',sans-serif;position:relative;}
.nav-link:hover{color:var(--text);background:rgba(255,255,255,0.04);}
.nav-link.active{color:#fff;}
.nav-link.active::after{content:'';position:absolute;bottom:-1px;left:50%;transform:translateX(-50%);width:20px;height:2px;background:var(--purple2);border-radius:2px;}
.connect-btn{font-family:'DM Sans',sans-serif;font-weight:600;font-size:0.9rem;padding:10px 22px;border-radius:10px;border:none;background:linear-gradient(135deg,var(--purple),var(--purple2));color:#fff;cursor:pointer;transition:all .2s;box-shadow:0 4px 20px rgba(124,58,237,0.35);white-space:nowrap;}
.connect-btn:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(124,58,237,0.5);}
.connect-btn.connected{background:var(--bg3);border:1px solid var(--border);color:var(--text);box-shadow:none;display:flex;align-items:center;gap:8px;}
.connect-btn.connected:hover{background:var(--bg4);transform:none;}
.wallet-dot-nav{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 6px var(--green);animation:dpulse 2s infinite;}
@keyframes dpulse{50%{opacity:.5;}}

/* PAGES */
.page{display:none;}.page.active{display:block;}

/* HERO */
.hero{display:flex;flex-direction:column;align-items:center;padding:60px 20px 40px;position:relative;z-index:1;}
.hero-coin{position:relative;width:160px;height:160px;margin-bottom:32px;}
.coin-ring{width:160px;height:160px;border-radius:50%;background:linear-gradient(135deg,#1e1b4b,#2d1b69);border:3px solid var(--gold);display:flex;align-items:center;justify-content:center;box-shadow:0 0 40px rgba(245,158,11,0.25),inset 0 0 40px rgba(124,58,237,0.2);animation:cfloat 4s ease-in-out infinite;position:relative;z-index:1;}
@keyframes cfloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
.coin-inner{width:110px;height:110px;border-radius:50%;background:linear-gradient(135deg,var(--purple),var(--pink));display:flex;align-items:center;justify-content:center;font-size:2.8rem;}
.coin-dot{position:absolute;border-radius:50%;background:var(--cyan);box-shadow:0 0 8px var(--cyan);top:50%;left:50%;}
.coin-dot:nth-child(2){animation:orbit1 6s linear infinite;width:6px;height:6px;margin-top:-3px;margin-left:-3px;}
.coin-dot:nth-child(3){animation:orbit2 9s linear infinite;width:5px;height:5px;background:var(--pink);box-shadow:0 0 6px var(--pink);margin-top:-2.5px;margin-left:-2.5px;}
.coin-dot:nth-child(4){animation:orbit3 12s linear infinite;width:4px;height:4px;background:var(--gold);box-shadow:0 0 6px var(--gold);margin-top:-2px;margin-left:-2px;}
@keyframes orbit1{from{transform:rotate(0deg) translateX(88px) rotate(0deg);}to{transform:rotate(360deg) translateX(88px) rotate(-360deg);}}
@keyframes orbit2{from{transform:rotate(120deg) translateX(88px) rotate(-120deg);}to{transform:rotate(480deg) translateX(88px) rotate(-480deg);}}
@keyframes orbit3{from{transform:rotate(240deg) translateX(88px) rotate(-240deg);}to{transform:rotate(600deg) translateX(88px) rotate(-600deg);}}
.hero h1{font-family:'Syne',sans-serif;font-size:2.8rem;font-weight:800;background:linear-gradient(135deg,var(--cyan),var(--purple2),var(--pink));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:12px;text-align:center;}
.hero-sub{font-size:1rem;color:var(--muted);margin-bottom:8px;text-align:center;}
.hero-badge{font-size:.75rem;color:var(--muted);display:flex;align-items:center;gap:6px;margin-bottom:40px;}
.hero-badge::before,.hero-badge::after{content:'';display:block;width:20px;height:1px;background:var(--border);}

/* CARD */
.card{background:var(--bg2);border:1px solid var(--border);border-radius:20px;padding:28px;width:100%;max-width:720px;margin:0 auto 16px;position:relative;z-index:1;}
.card-label{font-size:.7rem;font-weight:600;letter-spacing:2px;color:var(--muted);text-transform:uppercase;margin-bottom:20px;}
.card-divider{height:1px;background:var(--border);margin:20px 0;}

/* TIERS */
.bet-tiers{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:4px;}
.tier{display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;transition:all .2s;padding:10px;border-radius:12px;border:2px solid transparent;min-width:68px;}
.tier:hover{background:rgba(124,58,237,.08);transform:translateY(-2px);}
.tier.selected{border-color:var(--purple2);background:rgba(124,58,237,.12);}
.coin-stack{position:relative;width:52px;}
.cl{position:absolute;width:44px;height:18px;border-radius:50%;left:4px;}
.cl1{background:linear-gradient(180deg,#6d28d9,#4c1d95);border:1.5px solid rgba(167,139,250,.5);}
.cl2{background:linear-gradient(180deg,#7c3aed,#5b21b6);border:1.5px solid rgba(167,139,250,.5);}
.cl3{background:linear-gradient(180deg,#8b5cf6,#6d28d9);border:1.5px solid rgba(167,139,250,.6);}
.cl4{background:linear-gradient(180deg,#a78bfa,#7c3aed);border:1.5px solid rgba(196,181,253,.6);display:flex;align-items:center;justify-content:center;}
.cl4 span{font-size:.5rem;color:rgba(255,255,255,.7);font-weight:700;font-family:'Syne',sans-serif;}
.tier-amt{font-family:'Syne',sans-serif;font-weight:700;font-size:.85rem;color:var(--text);}

/* FIGHTERS */
.fighters-row{display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:center;margin-bottom:20px;}
.fighter-btn{display:flex;flex-direction:column;align-items:center;gap:10px;padding:20px 16px;border-radius:14px;border:2px solid var(--border);background:var(--bg3);cursor:pointer;transition:all .25s;font-family:'DM Sans',sans-serif;width:100%;}
.fighter-btn:hover{border-color:rgba(124,58,237,.4);background:var(--bg4);transform:translateY(-2px);}
.fighter-btn.picked-a{border-color:var(--green);background:rgba(16,185,129,.08);box-shadow:0 0 20px rgba(16,185,129,.15);}
.fighter-btn.picked-b{border-color:var(--red);background:rgba(239,68,68,.08);box-shadow:0 0 20px rgba(239,68,68,.15);}
.fighter-emoji{font-size:2.8rem;line-height:1;}
.fighter-name{font-family:'Syne',sans-serif;font-weight:700;font-size:.82rem;color:#fff;text-align:center;}
.fighter-votes{font-size:.7rem;color:var(--muted);}
.fighter-pct{font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;}
.fighter-pct.up{color:var(--green);}.fighter-pct.dn{color:var(--red);}
.vs-pill{width:40px;height:40px;border-radius:50%;background:var(--bg4);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:.8rem;color:var(--muted);flex-shrink:0;}

/* VOTE BAR */
.vote-bar-track{height:6px;background:rgba(239,68,68,.25);border-radius:6px;overflow:hidden;margin-bottom:6px;}
.vote-bar-fill{height:100%;background:linear-gradient(90deg,var(--green),#34d399);border-radius:6px;transition:width .8s ease;box-shadow:0 0 8px rgba(16,185,129,.4);}
.vote-bar-labels{display:flex;justify-content:space-between;font-size:.72rem;color:var(--muted);}

/* ACTION BTN */
.action-btn{width:100%;font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;padding:16px;border-radius:12px;border:none;cursor:pointer;transition:all .2s;background:linear-gradient(135deg,var(--purple),var(--purple2));color:#fff;box-shadow:0 4px 24px rgba(124,58,237,.35);letter-spacing:.5px;}
.action-btn:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(124,58,237,.5);}
.action-btn:disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none;}

/* ROUND ROW */
.round-row{display:flex;align-items:center;justify-content:space-between;max-width:720px;margin:0 auto 14px;padding:0 4px;position:relative;z-index:1;}
.round-pill{display:flex;align-items:center;gap:8px;background:var(--bg2);border:1px solid var(--border);border-radius:20px;padding:6px 14px;font-size:.78rem;color:var(--muted);}
.round-pill strong{color:var(--text);font-family:'Syne',sans-serif;}
.live-dot{width:6px;height:6px;border-radius:50%;background:var(--red);box-shadow:0 0 6px var(--red);animation:dpulse 1s infinite;}
.timer-pill{background:var(--bg2);border:1px solid var(--border);border-radius:20px;padding:6px 14px;font-family:'Syne',sans-serif;font-weight:700;font-size:.85rem;color:var(--gold);}

/* STATS */
.stats-row{display:flex;gap:12px;max-width:720px;margin:0 auto 32px;position:relative;z-index:1;flex-wrap:wrap;}
.stat-card{flex:1;min-width:140px;background:var(--bg2);border:1px solid var(--border);border-radius:14px;padding:16px 18px;}
.stat-val{font-family:'Syne',sans-serif;font-weight:800;font-size:1.3rem;color:#fff;margin-bottom:2px;}
.stat-key{font-size:.7rem;color:var(--muted);letter-spacing:1px;text-transform:uppercase;}

/* SECTION */
.section{max-width:720px;margin:0 auto 32px;position:relative;z-index:1;}
.section-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
.section-title{font-family:'Syne',sans-serif;font-weight:700;font-size:1.05rem;color:#fff;}
.section-sub{font-size:.78rem;color:var(--muted);}

/* BRACKET */
.bracket-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
.bracket-item{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:14px 12px;text-align:center;position:relative;overflow:hidden;}
.bracket-item::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;border-radius:2px 2px 0 0;}
.bracket-item.won::before{background:var(--gold);}
.bracket-item.fighting::before{background:var(--purple2);animation:dpulse 1s infinite;}
.bracket-item.lost::before{background:var(--muted);}
.bi-emoji{font-size:1.5rem;margin-bottom:5px;}
.bi-name{font-family:'Syne',sans-serif;font-weight:700;font-size:.72rem;color:var(--text);}
.bi-status{font-size:.6rem;letter-spacing:1px;margin-top:3px;text-transform:uppercase;}
.bi-status.won{color:var(--gold);}.bi-status.fighting{color:var(--purple2);}.bi-status.lost{color:var(--muted);}

/* LEADERBOARD */
.lb-list{display:flex;flex-direction:column;gap:8px;}
.lb-item{display:flex;align-items:center;gap:14px;background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:14px 18px;transition:all .2s;}
.lb-item:hover{background:var(--bg3);transform:translateX(2px);}
.lb-rank{font-family:'Syne',sans-serif;font-weight:800;font-size:1rem;width:24px;text-align:center;flex-shrink:0;}
.lb-rank.r1{color:var(--gold);}.lb-rank.r2{color:#94a3b8;}.lb-rank.r3{color:#cd7f32;}.lb-rank.rn{color:var(--muted);}
.lb-emoji{font-size:1.5rem;flex-shrink:0;}
.lb-info{flex:1;}
.lb-name{font-family:'Syne',sans-serif;font-weight:700;font-size:.9rem;color:#fff;}
.lb-creator{font-size:.7rem;color:var(--muted);margin-top:1px;}
.lb-right{text-align:right;}
.lb-wins{font-family:'Syne',sans-serif;font-weight:700;font-size:.9rem;color:var(--green);}
.lb-votes{font-size:.68rem;color:var(--muted);margin-top:1px;}

/* HISTORY */
.history-list{display:flex;flex-direction:column;gap:8px;}
.history-item{display:flex;align-items:center;gap:14px;background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:14px 18px;}
.hi-icon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;}
.hi-icon.win{background:rgba(16,185,129,.15);}.hi-icon.lose{background:rgba(239,68,68,.15);}
.hi-info{flex:1;}
.hi-title{font-family:'Syne',sans-serif;font-weight:600;font-size:.88rem;color:#fff;}
.hi-meta{font-size:.7rem;color:var(--muted);margin-top:2px;}
.hi-result{font-family:'Syne',sans-serif;font-weight:700;font-size:.9rem;}
.hi-result.win{color:var(--green);}.hi-result.lose{color:var(--red);}

/* STAKING */
.stake-stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px;}
.stake-stat{background:var(--bg3);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center;}
.ssv{font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;color:#fff;}
.ssk{font-size:.68rem;color:var(--muted);letter-spacing:1px;text-transform:uppercase;margin-top:3px;}
.stake-input-row{display:flex;gap:10px;margin-bottom:12px;}
.stake-input{flex:1;background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:12px 16px;font-family:'Syne',sans-serif;font-size:.95rem;color:#fff;outline:none;transition:border-color .2s;}
.stake-input:focus{border-color:var(--purple2);}
.stake-btn{font-family:'Syne',sans-serif;font-weight:700;padding:12px 22px;border-radius:10px;border:none;cursor:pointer;transition:all .2s;font-size:.9rem;}
.stake-btn.primary{background:linear-gradient(135deg,var(--purple),var(--purple2));color:#fff;}
.stake-btn.secondary{background:var(--bg4);border:1px solid var(--border);color:var(--text);}
.stake-btn:hover{transform:translateY(-1px);opacity:.9;}

/* SUBMIT */
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;}
.form-group label{display:block;font-size:.72rem;font-weight:500;color:var(--muted);letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;}
.form-input,.form-textarea{width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:11px 14px;font-family:'DM Sans',sans-serif;font-size:.9rem;color:var(--text);outline:none;transition:border-color .2s;resize:none;}
.form-input:focus,.form-textarea:focus{border-color:var(--purple2);}
.emoji-row{display:flex;gap:8px;flex-wrap:wrap;}
.emoji-pick{font-size:1.6rem;padding:8px;border-radius:10px;cursor:pointer;border:2px solid transparent;background:var(--bg3);transition:all .15s;}
.emoji-pick:hover{border-color:rgba(124,58,237,.4);transform:scale(1.1);}
.emoji-pick.chosen{border-color:var(--purple2);background:rgba(124,58,237,.12);}

/* FEED */
.feed-card{background:var(--bg2);border:1px solid var(--border);border-radius:20px;overflow:hidden;max-width:720px;margin:0 auto 40px;position:relative;z-index:1;}
.feed-head{padding:16px 22px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.feed-title{font-family:'Syne',sans-serif;font-weight:700;font-size:.95rem;}
.feed-scroll{max-height:260px;overflow-y:auto;}
.feed-scroll::-webkit-scrollbar{width:4px;}
.feed-scroll::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px;}
.feed-item{display:flex;align-items:flex-start;gap:12px;padding:12px 22px;border-bottom:1px solid rgba(255,255,255,.03);font-size:.78rem;animation:fslide .3s ease;}
@keyframes fslide{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
.feed-icon{font-size:1rem;flex-shrink:0;margin-top:1px;}
.feed-body{flex:1;line-height:1.5;color:var(--muted);}
.feed-body b{color:#fff;}
.feed-time{font-size:.65rem;color:var(--muted);flex-shrink:0;margin-top:2px;}

/* TOAST */
.toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(20px);background:var(--bg3);border:1px solid var(--border);color:var(--text);font-size:.85rem;padding:12px 22px;border-radius:12px;z-index:999;opacity:0;transition:all .3s;box-shadow:0 8px 32px rgba(0,0,0,.4);font-family:'DM Sans',sans-serif;pointer-events:none;white-space:nowrap;}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0);}

/* WALLET MODAL */
.modal-bg{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.6);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .25s;}
.modal-bg.open{opacity:1;pointer-events:all;}
.modal{background:var(--bg2);border:1px solid var(--border);border-radius:20px;padding:32px;width:100%;max-width:400px;margin:20px;transform:translateY(10px);transition:transform .25s;box-shadow:0 24px 80px rgba(0,0,0,.5);position:relative;}
.modal-bg.open .modal{transform:translateY(0);}
.modal-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;color:#fff;margin-bottom:6px;}
.modal-sub{font-size:.85rem;color:var(--muted);margin-bottom:24px;}
.wallet-option{display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:12px;border:1px solid var(--border);background:var(--bg3);cursor:pointer;transition:all .2s;margin-bottom:10px;}
.wallet-option:hover{border-color:var(--purple2);background:var(--bg4);}
.wo-icon{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(--purple),var(--pink));display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;}
.wo-name{font-weight:600;font-size:.9rem;color:#fff;}
.wo-sub{font-size:.72rem;color:var(--muted);}
.modal-close{position:absolute;top:18px;right:18px;background:none;border:none;color:var(--muted);cursor:pointer;font-size:1.3rem;padding:4px;line-height:1;}
.modal-close:hover{color:var(--text);}

@media(max-width:640px){
  nav{padding:0 16px;}
  .nav-links{display:none;}
  .bracket-grid{grid-template-columns:repeat(2,1fr);}
  .form-row{grid-template-columns:1fr;}
  .stake-stat-row{grid-template-columns:1fr 1fr;}
  .hero h1{font-size:2rem;}
  .card{padding:18px;}
}
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <a class="nav-logo" href="#">
    <div class="logo-icon">⚔</div>
    Block Battle
  </a>
  <div class="nav-links">
    <button class="nav-link active" onclick="showPage('game',this)">Game</button>
    <button class="nav-link" onclick="showPage('history',this)">History</button>
    <button class="nav-link" onclick="showPage('staking',this)">Staking</button>
    <button class="nav-link" onclick="showPage('dashboard',this)">Dashboard</button>
  </div>
  <button class="connect-btn" id="connectBtn" onclick="openModal()">Connect Wallet</button>
</nav>

<!-- ══ GAME PAGE ══ -->
<div class="page active" id="page-game">
  <div class="hero">
    <div class="hero-coin">
      <div class="coin-ring">
        <div class="coin-inner">⚔</div>
      </div>
      <div class="coin-dot"></div>
      <div class="coin-dot"></div>
      <div class="coin-dot"></div>
    </div>
    <h1>Block Battle</h1>
    <p class="hero-sub">On-chain meme arena. Vote, battle, earn.</p>
    <div class="hero-badge">Provably Fair</div>
  </div>

  <div class="round-row">
    <div class="round-pill"><div class="live-dot"></div><span>Round</span><strong>Quarterfinals — #3</strong></div>
    <div class="timer-pill" id="timerEl">23:47</div>
  </div>

  <!-- BATTLE CARD -->
  <div class="card">
    <div class="card-label">Pick your bet (BTC sats)</div>
    <div class="bet-tiers" id="betTiers"></div>
    <div class="card-divider"></div>
    <div class="card-label">Choose your fighter</div>
    <div class="fighters-row">
      <button class="fighter-btn" id="fA" onclick="pickFighter('A')">
        <div class="fighter-emoji" id="eA">🐸</div>
        <div class="fighter-name" id="nA">PEPE TO THE MOON</div>
        <div class="fighter-votes" id="vA">412 votes</div>
        <div class="fighter-pct up" id="pA">52%</div>
      </button>
      <div class="vs-pill">VS</div>
      <button class="fighter-btn" id="fB" onclick="pickFighter('B')">
        <div class="fighter-emoji" id="eB">🦍</div>
        <div class="fighter-name" id="nB">APE STRONG TOGETHER</div>
        <div class="fighter-votes" id="vB">387 votes</div>
        <div class="fighter-pct dn" id="pB">48%</div>
      </button>
    </div>
    <div style="margin-bottom:20px">
      <div class="vote-bar-track"><div class="vote-bar-fill" id="vBar" style="width:52%"></div></div>
      <div class="vote-bar-labels"><span id="bLA" style="color:var(--green)">🐸 52%</span><span id="bLB" style="color:var(--red)">48% 🦍</span></div>
    </div>
    <button class="action-btn" id="voteBtn" onclick="castVote()">Connect wallet to vote</button>
  </div>

  <div class="stats-row">
    <div class="stat-card"><div class="stat-val" id="sBattles">247</div><div class="stat-key">Battles Fought</div></div>
    <div class="stat-card"><div class="stat-val" id="sVotes">18,402</div><div class="stat-key">Votes Cast</div></div>
    <div class="stat-card"><div class="stat-val">4.2 BTC</div><div class="stat-key">Prize Pool</div></div>
    <div class="stat-card"><div class="stat-val">89</div><div class="stat-key">Legends Minted</div></div>
  </div>

  <div class="section">
    <div class="section-head"><div class="section-title">Tournament Bracket</div><div class="section-sub">Quarterfinals</div></div>
    <div class="bracket-grid" id="bracketGrid"></div>
  </div>

  <div class="section">
    <div class="section-head"><div class="section-title">Hall of Legends</div><div class="section-sub">All-time champions</div></div>
    <div class="lb-list" id="leaderboard"></div>
  </div>

  <div class="feed-card">
    <div class="feed-head">
      <div class="feed-title">Live Activity</div>
      <div style="display:flex;align-items:center;gap:6px;font-size:.75rem;color:var(--green)"><div class="live-dot"></div> On-chain</div>
    </div>
    <div class="feed-scroll" id="feedEl"></div>
  </div>

  <!-- SUBMIT -->
  <div class="card">
    <div class="section-head" style="margin-bottom:20px">
      <div><div class="section-title">Enter the Arena</div><div style="font-size:.8rem;color:var(--muted);margin-top:3px">Submit your meme. Win eternal glory.</div></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Meme Title</label><input class="form-input" id="memeTitle" placeholder="DOGE CONQUERS ALL" maxlength="40"/></div>
      <div class="form-group"><label>Wallet</label><input class="form-input" id="memeWallet" placeholder="Auto-filled on connect" readonly/></div>
    </div>
    <div class="form-group" style="margin-bottom:14px"><label>Choose Fighter Emoji</label><div class="emoji-row" id="emojiPicker">🐸 🦍 🐶 🐱 🚀 💎 🔥 🌙 🐻 🦊 🐉 ⚡ 🎭 💀 🤖 🦄</div></div>
    <div class="form-group" style="margin-bottom:20px"><label>Battle Cry</label><textarea class="form-textarea" rows="2" id="memeCry" placeholder="Why should your meme WIN?"></textarea></div>
    <button class="action-btn" onclick="submitMeme()">⚔ Enter the Arena — 0.001 BTC</button>
  </div>
</div>

<!-- ══ HISTORY PAGE ══ -->
<div class="page" id="page-history">
  <div style="max-width:720px;margin:32px auto 40px;padding:0 20px;position:relative;z-index:1">
    <div class="section-head" style="margin-bottom:20px"><div class="section-title">Battle History</div><div class="section-sub">Your past fights</div></div>
    <div class="history-list" id="historyList"></div>
  </div>
</div>

<!-- ══ STAKING PAGE ══ -->
<div class="page" id="page-staking">
  <div style="max-width:720px;margin:32px auto 0;padding:0 20px;position:relative;z-index:1">
    <div class="section-head" style="margin-bottom:20px"><div class="section-title">Staking</div><div class="section-sub">Earn rewards by staking BTC</div></div>
  </div>
  <div class="card">
    <div class="stake-stat-row">
      <div class="stake-stat"><div class="ssv">2.45%</div><div class="ssk">APY</div></div>
      <div class="stake-stat"><div class="ssv">0.000</div><div class="ssk">Staked BTC</div></div>
      <div class="stake-stat"><div class="ssv">0.000</div><div class="ssk">Rewards</div></div>
    </div>
    <div class="card-divider"></div>
    <div class="card-label" style="margin-bottom:14px">Stake BTC</div>
    <div class="stake-input-row">
      <input class="stake-input" placeholder="Amount in BTC" type="number" step="0.001"/>
      <button class="stake-btn primary" onclick="showToast('Connect wallet to stake')">Stake</button>
      <button class="stake-btn secondary" onclick="showToast('Connect wallet to unstake')">Unstake</button>
    </div>
    <div style="font-size:.75rem;color:var(--muted)">Minimum: 0.001 BTC · Rewards paid every block</div>
  </div>
</div>

<!-- ══ DASHBOARD PAGE ══ -->
<div class="page" id="page-dashboard">
  <div style="max-width:720px;margin:32px auto 40px;padding:0 20px;position:relative;z-index:1">
    <div class="section-head" style="margin-bottom:20px"><div class="section-title">Dashboard</div><div class="section-sub">Your on-chain stats</div></div>
    <div class="stats-row" style="margin-bottom:20px">
      <div class="stat-card"><div class="stat-val" id="dWins">0</div><div class="stat-key">Wins</div></div>
      <div class="stat-card"><div class="stat-val" id="dVotes">0</div><div class="stat-key">Votes Cast</div></div>
      <div class="stat-card"><div class="stat-val" id="dEarned">0 BTC</div><div class="stat-key">Earned</div></div>
    </div>
    <div class="card" style="text-align:center;color:var(--muted);font-size:.9rem">Connect your OP_WALLET to see your stats</div>
  </div>
</div>

<!-- WALLET MODAL -->
<div class="modal-bg" id="walletModal">
  <div class="modal">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <div class="modal-title">Connect Wallet</div>
    <div class="modal-sub">Choose your Bitcoin wallet to enter the arena</div>
    <div class="wallet-option" id="opWalletOpt" onclick="connectOpWallet()">
      <div class="wo-icon">⚡</div>
      <div><div class="wo-name">OP_WALLET</div><div class="wo-sub">OPNet — Bitcoin Layer 1</div></div>
    </div>
    <div class="wallet-option" onclick="showToast('UniSat coming soon')">
      <div class="wo-icon" style="background:linear-gradient(135deg,#f59e0b,#d97706)">🟡</div>
      <div><div class="wo-name">UniSat Wallet</div><div class="wo-sub">Bitcoin & Ordinals — coming soon</div></div>
    </div>
    <div id="noWalletMsg" style="display:none;margin-top:14px;padding:12px 14px;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:10px;font-size:.8rem;color:#f87171;">
      OP_WALLET not detected. <a href="https://chromewebstore.google.com/detail/opwallet/pmbjpcmaaladnfpacpmhmnfmpklgbdjb" target="_blank" style="color:var(--purple2)">Install here →</a>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
// ── DATA ──
const TIERS   = [10,25,50,100,250,500,1000];
const BATTLES = [
  {a:{e:'🐸',n:'PEPE TO THE MOON'},  b:{e:'🦍',n:'APE STRONG TOGETHER'}},
  {a:{e:'🚀',n:'ROCKET WOJAK'},      b:{e:'💎',n:'DIAMOND HANDS'}},
  {a:{e:'🐶',n:'DOGE SUPREMACY'},    b:{e:'🔥',n:'THIS IS FINE'}},
  {a:{e:'💀',n:'DEATH BY BEARS'},    b:{e:'🌙',n:'LAMBO OR RAMEN'}},
];
const BRACKET = [
  {e:'🏆',n:'CHAMPION TBD',s:'fighting'},{e:'🚀',n:'MOON MISSION',s:'won'},
  {e:'💎',n:'DIAMOND HANDS',s:'won'},{e:'🐸',n:'PEPE RISES',s:'fighting'},
  {e:'🦍',n:'APE TOGETHER',s:'won'},{e:'🐶',n:'DOGE SUPREME',s:'lost'},
  {e:'🔥',n:'THIS IS FINE',s:'lost'},{e:'💀',n:'DEATH MEME',s:'lost'},
];
const LEGENDS = [
  {e:'🚀',n:'MOON MISSION',c:'op1...7b1e',w:12,v:'4,201'},
  {e:'💎',n:'DIAMOND HANDS',c:'op1...4c9f',w:9,v:'3,847'},
  {e:'🐸',n:'PEPE RISES',c:'op1...3f8a',w:7,v:'2,993'},
  {e:'🦍',n:'APE TOGETHER',c:'op1...9d2c',w:6,v:'2,410'},
  {e:'🐶',n:'DOGE SUPREME',c:'op1...2a8d',w:5,v:'1,887'},
];
const HISTORY = [
  {t:'win', e:'🚀',title:'MOON MISSION vs 💎 DIAMOND HANDS',meta:'Battle #241 · 2h ago',r:'+250 sats'},
  {t:'lose',e:'🐸',title:'PEPE RISES vs 🦍 APE TOGETHER',meta:'Battle #238 · 5h ago',r:'-100 sats'},
  {t:'win', e:'💎',title:'DIAMOND HANDS vs 🔥 THIS IS FINE',meta:'Battle #234 · 1d ago',r:'+500 sats'},
  {t:'lose',e:'🐶',title:'DOGE SUPREME vs 🌙 LAMBO OR RAMEN',meta:'Battle #229 · 2d ago',r:'-50 sats'},
];
const FEED = [
  {i:'🗳️',m:'<b>op1...3f8a</b> voted for 🐸 PEPE TO THE MOON — Battle #247'},
  {i:'🏆',m:'<b>🚀 MOON MISSION</b> advances to Semi-Finals! 847 votes vs 421'},
  {i:'🖼️',m:'<b>DIAMOND HANDS</b> NFT minted — Legend #089 on OPNet'},
  {i:'⚔️',m:'<b>op1...cc4d</b> entered 🦄 UNICORN DESTROYER — 0.001 BTC'},
  {i:'🗳️',m:'<b>op1...9d2c</b> voted for 🦍 APE STRONG TOGETHER'},
  {i:'🏆',m:'<b>🐸 PEPE</b> wins Round 2 by 214 votes'},
  {i:'⚔️',m:'<b>op1...7f1a</b> entered 🎭 CLOWN MARKET — "When bears cry I buy"'},
  {i:'🖼️',m:'<b>MOON MISSION</b> Champion NFT sold for 0.42 BTC'},
];

// ── STATE ──
let walletConnected=false, walletAddress=null;
let selectedTier=100, selectedFighter=null, hasVoted=false;
let cntA=412, cntB=387, battleIdx=0, timerSecs=23*60+47, feedIdx=0;
let selEmoji='🐸';

// ── NAV ──
function showPage(name,el){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
  if(el) el.classList.add('active');
}

// ── TIERS ──
function renderTiers(){
  document.getElementById('betTiers').innerHTML = TIERS.map((t,i)=>{
    const layers = Math.min(i+1,4);
    const h = 18+layers*8;
    let html = `<div class="tier${t===selectedTier?' selected':''}" onclick="selTier(${t},this)" style="padding-top:4px">
      <div class="coin-stack" style="height:${h}px">`;
    if(layers>=1) html+=`<div class="cl cl1" style="bottom:0"></div>`;
    if(layers>=2) html+=`<div class="cl cl2" style="bottom:7px"></div>`;
    if(layers>=3) html+=`<div class="cl cl3" style="bottom:14px"></div>`;
    html+=`<div class="cl cl4" style="bottom:${(layers-1)*7}px"><span>BB</span></div>`;
    html+=`</div><div class="tier-amt">${t>=1000?'1K':t}</div></div>`;
    return html;
  }).join('');
}
function selTier(t,el){
  selectedTier=t;
  document.querySelectorAll('.tier').forEach(x=>x.classList.remove('selected'));
  el.classList.add('selected');
}

// ── FIGHTERS ──
function pickFighter(s){
  if(!walletConnected){openModal();return;}
  if(hasVoted){showToast('Already voted this round!');return;}
  selectedFighter=s;
  document.getElementById('fA').className='fighter-btn'+(s==='A'?' picked-a':'');
  document.getElementById('fB').className='fighter-btn'+(s==='B'?' picked-b':'');
  const nm = s==='A'?document.getElementById('nA').textContent:document.getElementById('nB').textContent;
  document.getElementById('voteBtn').textContent=`Vote ${nm} — ${selectedTier} sats`;
}

function castVote(){
  if(!walletConnected){openModal();return;}
  if(!selectedFighter){showToast('Pick a fighter first!');return;}
  if(hasVoted){showToast('Already voted!');return;}
  hasVoted=true;
  if(selectedFighter==='A') cntA+=Math.floor(Math.random()*60)+40;
  else                       cntB+=Math.floor(Math.random()*60)+40;
  updateBars();
  const btn=document.getElementById('voteBtn');
  btn.textContent='✓ Vote recorded on-chain'; btn.disabled=true;
  addFeed('🗳️',`<b>You</b> voted for ${selectedFighter==='A'?document.getElementById('eA').textContent+' '+document.getElementById('nA').textContent:document.getElementById('eB').textContent+' '+document.getElementById('nB').textContent}`);
  showToast('⚡ Vote recorded on-chain!');
  document.getElementById('dVotes').textContent=parseInt(document.getElementById('dVotes').textContent)+1;
}

function updateBars(){
  const tot=cntA+cntB||1, pA=Math.round(cntA/tot*100), pB=100-pA;
  document.getElementById('vBar').style.width=pA+'%';
  document.getElementById('pA').textContent=pA+'%';
  document.getElementById('pB').textContent=pB+'%';
  document.getElementById('vA').textContent=cntA+' votes';
  document.getElementById('vB').textContent=cntB+' votes';
  document.getElementById('bLA').textContent=document.getElementById('eA').textContent+' '+pA+'%';
  document.getElementById('bLB').textContent=pB+'% '+document.getElementById('eB').textContent;
}

// ── SUBMIT ──
function submitMeme(){
  if(!walletConnected){openModal();return;}
  const t=document.getElementById('memeTitle').value.trim();
  if(!t){showToast('Give your meme a title!');return;}
  addFeed('⚔️',`<b>${walletAddress?.slice(0,8)||'You'}</b> entered ${selEmoji} ${t.toUpperCase()}`);
  showToast('⚔ '+t.toUpperCase()+' entered the arena!');
  document.getElementById('memeTitle').value='';
  document.getElementById('memeCry').value='';
}

// ── BRACKET ──
function renderBracket(){
  document.getElementById('bracketGrid').innerHTML=BRACKET.map(b=>`
    <div class="bracket-item ${b.s}">
      <div class="bi-emoji">${b.e}</div>
      <div class="bi-name">${b.n}</div>
      <div class="bi-status ${b.s}">${b.s}</div>
    </div>`).join('');
}

// ── LEADERBOARD ──
function renderLeaderboard(){
  const rc=['r1','r2','r3','rn','rn'];
  document.getElementById('leaderboard').innerHTML=LEGENDS.map((l,i)=>`
    <div class="lb-item">
      <div class="lb-rank ${rc[i]}">${i+1}</div>
      <div class="lb-emoji">${l.e}</div>
      <div class="lb-info"><div class="lb-name">${l.n}</div><div class="lb-creator">${l.c}</div></div>
      <div class="lb-right"><div class="lb-wins">${l.w}W</div><div class="lb-votes">${l.v} votes</div></div>
    </div>`).join('');
}

// ── HISTORY ──
function renderHistory(){
  document.getElementById('historyList').innerHTML=HISTORY.map(h=>`
    <div class="history-item">
      <div class="hi-icon ${h.t}">${h.e}</div>
      <div class="hi-info"><div class="hi-title">${h.title}</div><div class="hi-meta">${h.meta}</div></div>
      <div class="hi-result ${h.t}">${h.r}</div>
    </div>`).join('');
}

// ── EMOJI PICKER ──
function renderEmoji(){
  const p=document.getElementById('emojiPicker');
  const es=p.textContent.trim().split(/\s+/);
  p.innerHTML=es.map(e=>`<span class="emoji-pick${e===selEmoji?' chosen':''}" onclick="pickEmoji(this,'${e}')">${e}</span>`).join('');
}
function pickEmoji(el,e){
  selEmoji=e;
  document.querySelectorAll('.emoji-pick').forEach(x=>x.classList.remove('chosen'));
  el.classList.add('chosen');
}

// ── FEED ──
function addFeed(icon,msg){
  const f=document.getElementById('feedEl');
  const now=new Date().toLocaleTimeString('en-US',{hour12:false,hour:'2-digit',minute:'2-digit'});
  const el=document.createElement('div');
  el.className='feed-item';
  el.innerHTML=`<div class="feed-icon">${icon}</div><div class="feed-body">${msg}</div><div class="feed-time">${now}</div>`;
  f.insertBefore(el,f.firstChild);
  if(f.children.length>30) f.removeChild(f.lastChild);
}
function autoFeed(){
  const e=FEED[feedIdx%FEED.length]; addFeed(e.i,e.m); feedIdx++;
  cntA+=Math.floor(Math.random()*6); cntB+=Math.floor(Math.random()*5); updateBars();
  const v=parseInt(document.getElementById('sVotes').textContent.replace(',',''));
  document.getElementById('sVotes').textContent=(v+Math.floor(Math.random()*4+1)).toLocaleString();
}

// ── TIMER ──
function tickTimer(){
  if(timerSecs<=0){
    timerSecs=30*60; battleIdx=(battleIdx+1)%BATTLES.length;
    const b=BATTLES[battleIdx];
    document.getElementById('eA').textContent=b.a.e; document.getElementById('nA').textContent=b.a.n;
    document.getElementById('eB').textContent=b.b.e; document.getElementById('nB').textContent=b.b.n;
    hasVoted=false; selectedFighter=null;
    cntA=Math.floor(Math.random()*300)+100; cntB=Math.floor(Math.random()*300)+100; updateBars();
    document.getElementById('fA').className='fighter-btn'; document.getElementById('fB').className='fighter-btn';
    const btn=document.getElementById('voteBtn'); btn.disabled=false;
    btn.textContent=walletConnected?'Pick a fighter to vote':'Connect wallet to vote';
  }
  timerSecs--;
  const m=Math.floor(timerSecs/60).toString().padStart(2,'0'), s=(timerSecs%60).toString().padStart(2,'0');
  document.getElementById('timerEl').textContent=m+':'+s;
}

// ── WALLET ──
function openModal(){document.getElementById('walletModal').classList.add('open');}
function closeModal(){document.getElementById('walletModal').classList.remove('open');}
document.getElementById('walletModal').addEventListener('click',e=>{if(e.target===document.getElementById('walletModal'))closeModal();});

function waitForProvider(ms=3000){
  return new Promise(resolve=>{
    if(window.unisat){resolve(window.unisat);return;}
    if(window.opnet) {resolve(window.opnet);return;}
    const start=Date.now();
    const t=setInterval(()=>{
      if(window.unisat){clearInterval(t);resolve(window.unisat);return;}
      if(window.opnet) {clearInterval(t);resolve(window.opnet);return;}
      if(Date.now()-start>ms){clearInterval(t);resolve(null);}
    },100);
  });
}

async function connectOpWallet(){
  const opt=document.getElementById('opWalletOpt');
  opt.style.opacity='0.5'; opt.style.pointerEvents='none';
  opt.querySelector('.wo-sub').textContent='Looking for wallet...';

  const provider=await waitForProvider(3000);
  if(!provider){
    opt.style.opacity=''; opt.style.pointerEvents='';
    opt.querySelector('.wo-sub').textContent='OPNet — Bitcoin Layer 1';
    document.getElementById('noWalletMsg').style.display='block';
    showToast('OP_WALLET not found — install the extension');
    return;
  }

  opt.querySelector('.wo-sub').textContent='Awaiting approval...';
  try{
    const accounts=await provider.requestAccounts();
    if(!accounts?.length) throw new Error('No accounts');
    await onConnected(accounts[0],provider);
    closeModal();
  }catch(err){
    opt.style.opacity=''; opt.style.pointerEvents='';
    opt.querySelector('.wo-sub').textContent='OPNet — Bitcoin Layer 1';
    const msg=(err?.message||'').toLowerCase();
    if(msg.includes('cancel')||msg.includes('reject')||msg.includes('denied')) showToast('Connection rejected');
    else{ showToast('Error: '+(err?.message||'unknown').slice(0,40)); console.error('[Block Battle]',err); }
  }
}

async function onConnected(address,provider){
  walletConnected=true; walletAddress=address;
  const short=address.slice(0,6)+'...'+address.slice(-4);

  let bal='';
  try{ const b=await provider.getBalance(); if(b?.total!==undefined) bal=(b.total/1e8).toFixed(4)+' BTC'; }catch(_){}

  const btn=document.getElementById('connectBtn');
  btn.className='connect-btn connected';
  btn.innerHTML=`<div class="wallet-dot-nav"></div>${short}${bal?' · '+bal:''}`;
  btn.onclick=()=>showToast('Wallet: '+address);

  document.getElementById('memeWallet').value=address;
  const vbtn=document.getElementById('voteBtn');
  if(!hasVoted) vbtn.textContent='Pick a fighter to vote';

  addFeed('⚡',`<b>${short}</b> connected OP_WALLET`);
  showToast('⚡ Wallet connected!');

  try{
    provider.on('accountsChanged',accs=>accs?.length?onConnected(accs[0],provider):disconnect());
    provider.on('networkChanged',()=>onConnected(walletAddress,provider));
  }catch(_){}
}

function disconnect(){
  walletConnected=false; walletAddress=null;
  const btn=document.getElementById('connectBtn');
  btn.className='connect-btn'; btn.innerHTML='Connect Wallet'; btn.onclick=openModal;
  document.getElementById('memeWallet').value='';
  document.getElementById('voteBtn').textContent='Connect wallet to vote';
}

// HTTPS + auto-reconnect
window.addEventListener('load',async()=>{
  const proto=window.location.protocol, local=['localhost','127.0.0.1'].includes(window.location.hostname);
  if(proto==='http:'&&!local){window.location.replace('https://'+window.location.host+window.location.pathname);return;}
  const p=await waitForProvider(1500);
  if(!p) return;
  try{const a=await p.getAccounts();if(a?.length) await onConnected(a[0],p);}catch(_){}
});

// ── TOAST ──
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  clearTimeout(t._t); t._t=setTimeout(()=>t.classList.remove('show'),3000);
}

// ── INIT ──
renderTiers(); renderBracket(); renderLeaderboard(); renderHistory(); renderEmoji(); updateBars();
FEED.slice(0,5).forEach((e,i)=>setTimeout(()=>addFeed(e.i,e.m),i*200));
setInterval(tickTimer,1000);
setInterval(autoFeed,7000);
</script>
</body>
</html>
