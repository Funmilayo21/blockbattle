# Deployment Guide

This guide covers deploying Block Battle to various environments.

## Local Development

### Prerequisites

- Node.js v16+ 
- npm or yarn
- Git

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Funmilayo21/blockbattle.git
cd blockbattle
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

### Running Locally

1. Start a local Hardhat blockchain:
```bash
npx hardhat node
```
This will start a local blockchain at `http://127.0.0.1:8545` with 20 test accounts.

2. In a new terminal, deploy the smart contract:
```bash
npm run deploy
```
Note the deployed contract address.

3. Update the contract address in your `.env` file:
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=<deployed_address>
```

4. Start the Next.js development server:
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

### Testing

Run smart contract tests:
```bash
npm test
```

Run with coverage:
```bash
npx hardhat coverage
```

## Testnet Deployment

### Ethereum Testnets (Sepolia, Goerli)

1. Get testnet ETH from a faucet:
   - Sepolia: https://sepoliafaucet.com/
   - Goerli: https://goerlifaucet.com/

2. Update `hardhat.config.js` with testnet configuration:
```javascript
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
      accounts: [PRIVATE_KEY]
    }
  }
};
```

3. Deploy to testnet:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

4. Update frontend environment variables with testnet details

### Other Testnets

The contract can be deployed to:
- Polygon Mumbai
- Arbitrum Goerli
- Optimism Goerli
- Base Goerli

Add network configuration to `hardhat.config.js` and deploy similarly.

## Mainnet Deployment

### Smart Contract

1. Audit your smart contract thoroughly
2. Test extensively on testnets
3. Have the contract professionally audited
4. Deploy with proper gas settings

```bash
npx hardhat run scripts/deploy.js --network mainnet
```

5. Verify the contract on Etherscan:
```bash
npx hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS
```

### Frontend

#### Vercel (Recommended)

1. Push your code to GitHub

2. Import project in Vercel:
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your repository

3. Configure environment variables in Vercel:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`
   - `NEXT_PUBLIC_CHAIN_ID`
   - `NEXT_PUBLIC_RPC_URL`
   - `NEXT_PUBLIC_INFURA_ID` (if using Infura)

4. Deploy!

#### Other Platforms

The Next.js app can also be deployed to:
- Netlify
- AWS Amplify
- Heroku
- Custom server with PM2

## Production Checklist

### Smart Contract
- [ ] Code reviewed by multiple developers
- [ ] Comprehensive test coverage (>90%)
- [ ] Professional security audit completed
- [ ] Gas optimizations implemented
- [ ] Emergency pause mechanism (if needed)
- [ ] Upgrade path considered (if upgradeable)
- [ ] Contract verified on block explorer
- [ ] Initial funding deposited for rewards

### Frontend
- [ ] Environment variables configured
- [ ] Error handling implemented
- [ ] Loading states for all async operations
- [ ] Wallet connection tested with multiple wallets
- [ ] Mobile responsiveness verified
- [ ] Performance optimizations (images, code splitting)
- [ ] Analytics configured (if using)
- [ ] SEO meta tags added
- [ ] Social media preview images

### Operations
- [ ] Documentation complete
- [ ] Monitoring/alerting set up
- [ ] Backup strategy for frontend
- [ ] Incident response plan
- [ ] User support channels established
- [ ] Terms of service and privacy policy
- [ ] Domain configured with SSL

## Monitoring

### Smart Contract Events

Monitor important events:
- MemeSubmitted
- BattleCreated
- VoteCast
- BattleEnded
- RewardsClaimed

Use tools like:
- Etherscan API
- The Graph (for indexing)
- Tenderly (for monitoring)

### Frontend

Monitor:
- User analytics (Google Analytics, Plausible)
- Error tracking (Sentry)
- Performance (Vercel Analytics, Lighthouse)

## Upgrading

### Smart Contract

The current contract is not upgradeable. To upgrade:
1. Deploy new contract
2. Migrate data if needed
3. Update frontend to use new contract address
4. Provide migration path for users

Consider using upgradeable patterns (Proxy pattern) for future versions.

### Frontend

Next.js updates are straightforward:
```bash
npm update next react react-dom
npm run build
npm run start
```

## Troubleshooting

### Common Issues

1. **Transaction Fails**: Check gas limits and contract balance
2. **Wallet Won't Connect**: Verify chain ID matches
3. **Images Not Loading**: Check CORS and image URLs
4. **Tests Failing**: Ensure Hardhat node is running

### Getting Help

- Check GitHub Issues
- Read documentation
- Contact maintainers

## Security Considerations

1. **Private Keys**: NEVER commit private keys or seed phrases
2. **Environment Variables**: Use secrets management in production
3. **Rate Limiting**: Implement rate limiting on RPC endpoints
4. **Input Validation**: Always validate user inputs
5. **Contract Interaction**: Use secure libraries (ethers.js)

## Performance Tips

1. Use caching for frequently accessed data
2. Optimize images (use Next.js Image component)
3. Implement pagination for large lists
4. Use IndexedDB for local state
5. Consider Layer 2 solutions for lower gas fees

## Costs Estimation

### Gas Costs (Ethereum Mainnet)

Approximate gas costs (varies with network congestion):
- Submit Meme: ~100,000 gas
- Create Battle: ~120,000 gas
- Vote: ~80,000 gas
- End Battle: ~100,000 gas
- Claim Rewards: ~50,000 gas

At 50 gwei and $2000 ETH:
- Submit Meme: ~$10
- Vote: ~$8
- Claim Rewards: ~$5

Consider deploying to Layer 2 networks for 100x lower costs.

### Hosting Costs

- Vercel: Free tier available, ~$20/month for Pro
- Infura: Free tier available, ~$50/month for growth
- Domain: ~$10-15/year

## License

MIT - See LICENSE file
