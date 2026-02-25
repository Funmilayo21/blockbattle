# Block Battle - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│                      (Next.js + React)                       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Home Page   │  │ Battle Page  │  │ Leaderboard  │     │
│  │              │  │              │  │              │     │
│  │ - Submit     │  │ - View       │  │ - Rankings   │     │
│  │   Memes      │  │   Battles    │  │ - Stats      │     │
│  │ - Features   │  │ - Vote       │  │ - Rewards    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         │ ethers.js / Web3 SDK
                         │
┌────────────────────────▼─────────────────────────────────────┐
│                    Wallet Layer                               │
│              (MetaMask, WalletConnect)                        │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         │ JSON-RPC
                         │
┌────────────────────────▼─────────────────────────────────────┐
│                  Blockchain Network                           │
│            (Ethereum / Polygon / L2)                          │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         BlockBattle Smart Contract                    │  │
│  │                                                       │  │
│  │  State:                    Functions:                │  │
│  │  • Memes                   • submitMeme()            │  │
│  │  • Battles                 • createBattle()          │  │
│  │  • Votes                   • vote()                  │  │
│  │  • Rewards                 • endBattle()             │  │
│  │                            • claimRewards()          │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Meme Submission Flow
```
User → Frontend → Wallet → Smart Contract
                              ↓
                    MemeSubmitted Event
                              ↓
                    Meme stored on-chain
```

### 2. Battle Creation Flow
```
User/System → Frontend → Wallet → Smart Contract
                                      ↓
                        Select two active memes
                                      ↓
                            BattleCreated Event
                                      ↓
                        Battle timer starts (1 hour)
```

### 3. Voting Flow
```
User → Frontend → Wallet → Smart Contract
                              ↓
                    Check: Has user voted?
                              ↓
                    Record vote + increment counter
                              ↓
                    Award VOTE_REWARD to user
                              ↓
                    VoteCast Event
```

### 4. Battle Resolution Flow
```
Time Expires → Anyone can trigger endBattle()
                              ↓
                    Compare vote counts
                              ↓
                ┌───────────────┴───────────────┐
                ▼                               ▼
          Meme 1 Wins                    Meme 2 Wins
                ↓                               ↓
        Meme 2 deactivated             Meme 1 deactivated
                ↓                               ↓
   Winner gets WINNER_REWARD          Winner gets WINNER_REWARD
                ↓                               ↓
                └───────────────┬───────────────┘
                                ↓
                        BattleEnded Event
```

### 5. Reward Claiming Flow
```
User → Frontend → Wallet → Smart Contract
                              ↓
                    Check user's balance
                              ↓
                    Transfer ETH to user
                              ↓
                    Reset balance to 0
                              ↓
                    RewardsClaimed Event
```

## Component Breakdown

### Smart Contract Layer

**BlockBattle.sol**
- **Purpose**: Core logic for meme battles and rewards
- **Storage**: Memes, battles, votes, rewards
- **Events**: Emit on all state changes
- **Security**: Reentrancy guards, access controls

### Frontend Layer

**Pages**
- `index.js`: Landing page with meme submission
- `battles.js`: Active battles display and voting
- `_app.js`: App wrapper with global state

**Styles**
- Modular CSS for component isolation
- Responsive design for mobile/desktop
- Gradient theme with purple/gold colors

### Infrastructure

**Development**
- Hardhat: Smart contract development framework
- Local blockchain: Testing environment
- Automated tests: Comprehensive coverage

**Deployment**
- Vercel: Frontend hosting
- Ethereum/L2: Smart contract deployment
- IPFS: Future integration for images

## Key Design Decisions

### 1. On-Chain vs Off-Chain
- **On-Chain**: Vote counts, battle results, rewards
- **Off-Chain**: Meme images (URLs), metadata
- **Rationale**: Balance between decentralization and cost

### 2. Battle Duration
- **Duration**: 1 hour (configurable)
- **Rationale**: Fast-paced battles for engagement

### 3. Reward Structure
- **Vote Reward**: 0.001 ETH
- **Winner Reward**: 0.01 ETH
- **Rationale**: Incentivize both participation and quality

### 4. Elimination System
- **Rule**: Loser meme is deactivated
- **Rationale**: "Only the strongest survive" theme

### 5. Battle Triggering
- **Method**: Anyone can create/end battles
- **Rationale**: Decentralized, permissionless system

## Security Considerations

1. **Reentrancy**: Protected in reward claims
2. **Integer Overflow**: Solidity 0.8+ built-in checks
3. **Access Control**: Public functions validated
4. **Vote Manipulation**: One vote per user per battle
5. **Front-Running**: Minimal impact due to design

## Scalability Considerations

1. **Gas Optimization**: Efficient storage patterns
2. **Layer 2**: Deploy to L2 for lower costs
3. **Pagination**: Frontend handles large datasets
4. **Indexing**: Use The Graph for historical data
5. **Caching**: Frontend caching for performance

## Future Enhancements

### Phase 2
- Tournament brackets
- NFT integration
- Governance token

### Phase 3
- Cross-chain support
- Advanced analytics
- Social features

### Phase 4
- DAO governance
- Automated market maker for meme tokens
- Mobile app

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Smart Contract | Solidity 0.8.20 | Core logic |
| Development | Hardhat | Contract framework |
| Testing | Chai + Mocha | Contract tests |
| Frontend | Next.js 14 | React framework |
| Styling | CSS Modules | Component styles |
| Blockchain Interaction | ethers.js 6 | Web3 library |
| Wallet | RainbowKit/WalletConnect | Wallet connection |
| Hosting | Vercel | Frontend deployment |
| Network | Ethereum/L2 | Blockchain platform |

## Performance Metrics

### Smart Contract
- **Gas per vote**: ~80,000
- **Gas per battle**: ~120,000
- **Storage per meme**: ~1,000 bytes

### Frontend
- **Load time**: <2s (target)
- **Lighthouse score**: 90+ (target)
- **Bundle size**: <500KB (target)

## Monitoring & Observability

### On-Chain
- Event monitoring via Etherscan
- Transaction tracking
- Contract balance monitoring

### Off-Chain
- Frontend analytics
- Error tracking
- Performance monitoring

---

For more details, see:
- [README.md](README.md) - Getting started
- [SMART_CONTRACT_API.md](SMART_CONTRACT_API.md) - API reference
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contributing guidelines
