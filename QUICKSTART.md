# Block Battle - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 16+ installed
- Git installed

### Installation

```bash
# Clone the repository
git clone https://github.com/Funmilayo21/blockbattle.git
cd blockbattle

# Run setup script (automated)
./setup.sh

# Or install manually
npm install
```

### Run the Application

**Terminal 1 - Start Local Blockchain:**
```bash
npx hardhat node
```
Keep this running. It will show you 20 test accounts with private keys.

**Terminal 2 - Deploy Smart Contract:**
```bash
npm run deploy
```
Note the deployed contract address.

**Terminal 3 - Start Frontend:**
```bash
npm run dev
```
Open http://localhost:3000

### Testing

```bash
# Run all tests
npm test

# Run with coverage
npx hardhat coverage

# Run linter
npm run lint
```

## 🎮 How to Use

### 1. Submit a Meme
- Go to homepage
- Enter meme image URL
- Enter meme title
- Click "Submit Meme"

### 2. Create a Battle
- Two memes are selected for battle
- Battle lasts 1 hour
- Community can vote

### 3. Vote
- Go to "Active Battles"
- Choose your favorite meme
- Click "Vote for This Meme"
- Earn 0.001 ETH reward

### 4. Claim Rewards
- Navigate to rewards section
- Click "Claim Rewards"
- Receive ETH to your wallet

## 📊 Smart Contract Details

**Contract Address:** Set after deployment

**Key Functions:**
- `submitMeme(imageUrl, title)` - Submit new meme
- `createBattle(memeId1, memeId2)` - Create battle
- `vote(battleId, memeId)` - Vote for meme
- `endBattle(battleId)` - End battle (after 1 hour)
- `claimRewards()` - Claim your earnings

**Rewards:**
- Vote: 0.001 ETH per vote
- Win: 0.01 ETH for creator

## 🔧 Common Commands

```bash
# Compile contracts
npm run compile

# Run tests
npm test

# Deploy to local network
npm run deploy

# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Clean build artifacts
rm -rf artifacts cache
```

## 📁 Project Structure

```
blockbattle/
├── contracts/          # Smart contracts
│   └── BlockBattle.sol
├── test/              # Contract tests
│   └── BlockBattle.test.js
├── scripts/           # Deployment scripts
│   └── deploy.js
├── pages/             # Next.js pages
│   ├── index.js       # Home page
│   ├── battles.js     # Battles page
│   └── _app.js
├── styles/            # CSS files
├── hardhat.config.js  # Hardhat config
└── package.json       # Dependencies
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 8545
lsof -ti:8545 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Contract Compilation Issues
```bash
# Clean and recompile
rm -rf artifacts cache
npm run compile
```

### Frontend Not Connecting
- Ensure Hardhat node is running
- Check contract is deployed
- Verify contract address in .env

### Tests Failing
```bash
# Make sure no Hardhat node is running
pkill -f hardhat

# Run tests (they start their own network)
npm test
```

## 📚 Learn More

- [README.md](README.md) - Full documentation
- [SMART_CONTRACT_API.md](SMART_CONTRACT_API.md) - API reference
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy to production
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribute to project

## 💡 Tips

1. **Use Test Accounts**: Hardhat provides 20 accounts with 10000 ETH each
2. **Reset Blockchain**: Restart Hardhat node to reset state
3. **Gas Estimation**: Local network has unlimited gas
4. **Console Logs**: Check browser console for detailed info
5. **Event Logs**: Check Hardhat node terminal for events

## 🎯 Next Steps

1. ✅ Get the app running locally
2. 📝 Read the documentation
3. 🧪 Run the tests
4. 🎨 Customize the UI
5. 🚀 Deploy to testnet
6. 🌟 Share with community

## 🤝 Need Help?

- Check [GitHub Issues](https://github.com/Funmilayo21/blockbattle/issues)
- Read the [Contributing Guide](CONTRIBUTING.md)
- Review the [Documentation](README.md)

## ⚡ Quick Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run compile` | Compile contracts |
| `npm test` | Run tests |
| `npx hardhat node` | Start blockchain |
| `npm run deploy` | Deploy contracts |
| `npm run dev` | Start frontend |
| `npm run build` | Build for production |

Happy battling! 🥊✨
