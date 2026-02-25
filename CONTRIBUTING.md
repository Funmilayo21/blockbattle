# Contributing to Block Battle

Thank you for your interest in contributing to Block Battle! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

Be respectful and inclusive. We're all here to build something cool together.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- A clear description of the bug
- Steps to reproduce
- Expected behavior vs actual behavior
- Your environment (OS, Node version, etc.)

### Suggesting Features

We welcome feature suggestions! Please open an issue with:
- A clear description of the feature
- Use cases and benefits
- Any implementation ideas you might have

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write or update tests as needed
5. Ensure all tests pass
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to your branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Development Setup

1. Clone the repository
```bash
git clone https://github.com/Funmilayo21/blockbattle.git
cd blockbattle
```

2. Install dependencies
```bash
npm install
```

3. Compile contracts
```bash
npm run compile
```

4. Run tests
```bash
npm test
```

5. Start local blockchain
```bash
npx hardhat node
```

6. Deploy contracts (in another terminal)
```bash
npm run deploy
```

7. Start frontend
```bash
npm run dev
```

## Project Structure

```
blockbattle/
├── contracts/          # Solidity smart contracts
│   └── BlockBattle.sol
├── scripts/           # Deployment and utility scripts
│   └── deploy.js
├── test/              # Smart contract tests
│   └── BlockBattle.test.js
├── pages/             # Next.js pages
│   ├── index.js       # Home page
│   ├── battles.js     # Battles page
│   └── _app.js        # App wrapper
├── components/        # React components (future)
├── styles/            # CSS styles
│   ├── globals.css
│   ├── Home.module.css
│   └── Battles.module.css
├── public/            # Static assets
├── hardhat.config.js  # Hardhat configuration
├── package.json       # Dependencies and scripts
└── README.md          # Project documentation
```

## Coding Standards

### Solidity

- Follow the [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- Use NatSpec comments for all public functions
- Write comprehensive tests for all contract functionality
- Use semantic versioning for contract updates

### JavaScript/React

- Use ES6+ features
- Follow React best practices and hooks patterns
- Use functional components
- Add PropTypes or TypeScript types for props
- Keep components small and focused

### Testing

- Write tests for all new features
- Maintain or improve code coverage
- Test both success and failure cases
- Use descriptive test names

### Git Commits

- Use clear, descriptive commit messages
- Reference issues in commits when applicable
- Keep commits focused and atomic

## Areas for Contribution

### High Priority

- [ ] Web3 wallet integration (MetaMask, WalletConnect)
- [ ] Real blockchain interaction in frontend
- [ ] IPFS integration for decentralized image storage
- [ ] Comprehensive error handling
- [ ] Loading states and user feedback

### Medium Priority

- [ ] Leaderboard implementation
- [ ] User profile pages
- [ ] Battle history and statistics
- [ ] Tournament mode
- [ ] Mobile responsive improvements

### Low Priority

- [ ] NFT integration for winning memes
- [ ] Social sharing features
- [ ] Advanced animations
- [ ] Theme customization
- [ ] Multi-language support

## Testing Guidelines

### Smart Contract Tests

Run all tests before submitting:
```bash
npm test
```

Tests should cover:
- Happy path scenarios
- Edge cases
- Error conditions
- Gas optimization

### Frontend Testing

(To be added as the project grows)
- Unit tests for components
- Integration tests for user flows
- E2E tests for critical paths

## Documentation

When adding new features:
- Update README.md
- Update SMART_CONTRACT_API.md for contract changes
- Add inline code comments for complex logic
- Update this CONTRIBUTING.md if process changes

## Questions?

If you have questions:
- Check existing issues
- Open a new issue with the "question" label
- Reach out to maintainers

## License

By contributing to Block Battle, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to Block Battle! 🚀
