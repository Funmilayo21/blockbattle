# 🥊 Block Battle

**Smash memes, vote on-chain, earn rewards. Only the strongest meme survives!**

Block Battle is a decentralized meme voting platform built on blockchain technology. Users can submit memes, participate in head-to-head battles, vote for their favorites, and earn rewards for participation. The platform combines the viral nature of memes with the transparency and security of blockchain.

## Features

- **🎨 Meme Submission**: Upload and submit your best memes to the platform
- **⚔️ Battle System**: Memes compete in head-to-head battles
- **🗳️ On-Chain Voting**: Transparent, immutable voting recorded on the blockchain
- **💰 Rewards**: Earn cryptocurrency rewards for voting and creating winning memes
- **🏆 Survival of the Fittest**: Only the strongest memes survive battles
- **📊 Leaderboard**: Track the most popular memes and top earners

## Tech Stack

- **Smart Contracts**: Solidity 0.8.20
- **Development Framework**: Hardhat
- **Frontend**: Next.js + React
- **Blockchain Interaction**: ethers.js
- **Testing**: Hardhat + Chai

## Smart Contract

The `BlockBattle.sol` smart contract includes:

- Meme submission and storage
- Battle creation between two memes
- Voting mechanism with vote tracking
- Automatic winner determination
- Reward distribution system
- Active meme tracking

### Key Functions

- `submitMeme(imageUrl, title)` - Submit a new meme
- `createBattle(memeId1, memeId2)` - Create a battle between two memes
- `vote(battleId, memeId)` - Vote for a meme in a battle
- `endBattle(battleId)` - End a battle and determine winner
- `claimRewards()` - Claim accumulated rewards
- `getActiveMemes()` - Get all active memes

### Rewards

- **Vote Reward**: 0.001 ETH per vote
- **Winner Reward**: 0.01 ETH for winning meme creator
- **Battle Duration**: 1 hour per battle

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Funmilayo21/blockbattle.git
cd blockbattle
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Compile Smart Contracts

```bash
npm run compile
```

### Run Tests

```bash
npm test
```

### Deploy Contracts

Start a local Hardhat node:
```bash
npx hardhat node
```

Deploy the contract (in another terminal):
```bash
npm run deploy
```

### Run Frontend

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## How It Works

1. **Submit**: Users upload their memes with an image URL and title
2. **Battle**: Two memes are matched in a battle that lasts 1 hour
3. **Vote**: Community members vote for their favorite meme
4. **Earn**: Voters earn 0.001 ETH per vote, winners earn 0.01 ETH
5. **Survive**: Winning meme survives, losing meme is eliminated

## Project Structure

```
blockbattle/
├── contracts/          # Solidity smart contracts
├── scripts/           # Deployment scripts
├── test/              # Smart contract tests
├── pages/             # Next.js pages
├── components/        # React components
├── styles/            # CSS styles
└── public/            # Static assets
```

## Development

### Running Tests

The project includes comprehensive tests for:
- Meme submission
- Battle creation
- Voting mechanism
- Battle ending and winner determination
- Reward claiming
- Active meme tracking

Run tests with:
```bash
npm test
```

### Local Development

1. Start local blockchain: `npx hardhat node`
2. Deploy contracts: `npm run deploy`
3. Start frontend: `npm run dev`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Future Enhancements

- [ ] NFT integration for winning memes
- [ ] Multi-chain support
- [ ] Advanced leaderboard with statistics
- [ ] Tournament mode with brackets
- [ ] Social sharing features
- [ ] IPFS integration for decentralized image storage
- [ ] Governance token for platform decisions