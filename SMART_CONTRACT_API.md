# Block Battle - Smart Contract API

## Contract Address

The `BlockBattle` contract is deployed on the local Hardhat network. After deployment, the address will be displayed in the console.

## Contract Interface

### Structs

#### Meme
```solidity
struct Meme {
    uint256 id;
    address creator;
    string imageUrl;
    string title;
    uint256 votes;
    uint256 timestamp;
    bool isActive;
}
```

#### Battle
```solidity
struct Battle {
    uint256 id;
    uint256 memeId1;
    uint256 memeId2;
    uint256 endTime;
    bool isActive;
    address winner;
}
```

## Public Functions

### submitMeme
```solidity
function submitMeme(string memory _imageUrl, string memory _title) external
```

Submit a new meme to the platform.

**Parameters:**
- `_imageUrl`: URL of the meme image
- `_title`: Title of the meme

**Events Emitted:**
- `MemeSubmitted(uint256 indexed memeId, address indexed creator, string title)`

**Requirements:**
- Image URL cannot be empty
- Title cannot be empty

---

### createBattle
```solidity
function createBattle(uint256 _memeId1, uint256 _memeId2) external
```

Create a new battle between two memes.

**Parameters:**
- `_memeId1`: ID of the first meme
- `_memeId2`: ID of the second meme

**Events Emitted:**
- `BattleCreated(uint256 indexed battleId, uint256 memeId1, uint256 memeId2)`

**Requirements:**
- Both meme IDs must be valid
- Meme IDs must be different
- Both memes must be active

---

### vote
```solidity
function vote(uint256 _battleId, uint256 _memeId) external
```

Vote for a meme in an active battle.

**Parameters:**
- `_battleId`: ID of the battle
- `_memeId`: ID of the meme to vote for

**Events Emitted:**
- `VoteCast(uint256 indexed battleId, uint256 indexed memeId, address indexed voter)`

**Requirements:**
- Battle must be active
- Battle must not have ended
- Voter must not have already voted in this battle
- Meme must be part of the specified battle

**Rewards:**
- Voter receives `VOTE_REWARD` (0.001 ETH) for voting

---

### endBattle
```solidity
function endBattle(uint256 _battleId) external
```

End a battle and determine the winner.

**Parameters:**
- `_battleId`: ID of the battle to end

**Events Emitted:**
- `BattleEnded(uint256 indexed battleId, uint256 winnerMemeId, address winnerCreator)`

**Requirements:**
- Battle must be active
- Battle end time must have been reached

**Logic:**
- Meme with more votes wins
- Losing meme is deactivated (eliminated)
- In case of a tie, both memes survive but no winner reward is given
- Winner creator receives `WINNER_REWARD` (0.01 ETH)

---

### claimRewards
```solidity
function claimRewards() external
```

Claim accumulated rewards.

**Events Emitted:**
- `RewardsClaimed(address indexed user, uint256 amount)`

**Requirements:**
- User must have rewards to claim
- Contract must have sufficient balance

---

### getMeme
```solidity
function getMeme(uint256 _memeId) external view returns (Meme memory)
```

Get details of a specific meme.

**Parameters:**
- `_memeId`: ID of the meme

**Returns:**
- `Meme`: Meme struct containing all meme details

**Requirements:**
- Meme ID must be valid

---

### getBattle
```solidity
function getBattle(uint256 _battleId) external view returns (Battle memory)
```

Get details of a specific battle.

**Parameters:**
- `_battleId`: ID of the battle

**Returns:**
- `Battle`: Battle struct containing all battle details

**Requirements:**
- Battle ID must be valid

---

### getActiveMemes
```solidity
function getActiveMemes() external view returns (uint256[] memory)
```

Get IDs of all active memes.

**Returns:**
- `uint256[]`: Array of active meme IDs

---

### fundContract
```solidity
function fundContract() external payable
```

Fund the contract with ETH for reward distribution.

**Requirements:**
- Must send ETH with the transaction

---

## Public Variables

### Constants

- `BATTLE_DURATION`: 1 hour (3600 seconds)
- `VOTE_REWARD`: 0.001 ETH
- `WINNER_REWARD`: 0.01 ETH

### State Variables

- `memeCounter`: Total number of memes submitted
- `battleCounter`: Total number of battles created
- `memes`: Mapping of meme ID to Meme struct
- `battles`: Mapping of battle ID to Battle struct
- `userRewards`: Mapping of user address to accumulated rewards
- `hasVoted`: Nested mapping tracking if a user has voted in a battle

## Events

```solidity
event MemeSubmitted(uint256 indexed memeId, address indexed creator, string title);
event BattleCreated(uint256 indexed battleId, uint256 memeId1, uint256 memeId2);
event VoteCast(uint256 indexed battleId, uint256 indexed memeId, address indexed voter);
event BattleEnded(uint256 indexed battleId, uint256 winnerMemeId, address winnerCreator);
event RewardsClaimed(address indexed user, uint256 amount);
```

## Usage Example

### JavaScript/ethers.js

```javascript
const { ethers } = require("ethers");

// Connect to the contract
const provider = new ethers.JsonRpcProvider("http://localhost:8545");
const signer = await provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, signer);

// Submit a meme
const tx1 = await contract.submitMeme(
  "https://example.com/meme.jpg",
  "Epic Meme"
);
await tx1.wait();

// Create a battle
const tx2 = await contract.createBattle(1, 2);
await tx2.wait();

// Vote in a battle
const tx3 = await contract.vote(1, 1);
await tx3.wait();

// Get active memes
const activeMemes = await contract.getActiveMemes();

// Claim rewards
const tx4 = await contract.claimRewards();
await tx4.wait();
```

## Security Considerations

1. **Reentrancy Protection**: The contract uses checks-effects-interactions pattern for reward claims
2. **Vote Tracking**: Users can only vote once per battle
3. **Battle Timing**: Battles can only be ended after the duration has elapsed
4. **Meme Validation**: All meme and battle operations validate inputs
5. **Balance Checks**: Reward claims verify contract has sufficient balance

## Gas Optimization

- Uses mappings for O(1) lookups
- Efficient storage patterns
- Minimal on-chain data storage (images stored off-chain)
- Batch operations where possible

## Future Improvements

- Add battle pause functionality
- Implement battle entry fees
- Add multi-round tournaments
- Create governance mechanism for platform parameters
- Add NFT minting for winning memes
