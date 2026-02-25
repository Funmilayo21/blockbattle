// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title BlockBattle
 * @dev A decentralized meme voting battle platform where users can submit memes,
 * vote on them, and earn rewards. Only the strongest memes survive!
 */
contract BlockBattle {
    struct Meme {
        uint256 id;
        address creator;
        string imageUrl;
        string title;
        uint256 votes;
        uint256 timestamp;
        bool isActive;
    }

    struct Battle {
        uint256 id;
        uint256 memeId1;
        uint256 memeId2;
        uint256 endTime;
        bool isActive;
        address winner;
    }

    // State variables
    uint256 public memeCounter;
    uint256 public battleCounter;
    uint256 public constant BATTLE_DURATION = 1 hours;
    uint256 public constant VOTE_REWARD = 0.001 ether;
    uint256 public constant WINNER_REWARD = 0.01 ether;

    mapping(uint256 => Meme) public memes;
    mapping(uint256 => Battle) public battles;
    mapping(address => uint256) public userRewards;
    mapping(uint256 => mapping(address => bool)) public hasVoted; // battleId => voter => hasVoted

    // Events
    event MemeSubmitted(uint256 indexed memeId, address indexed creator, string title);
    event BattleCreated(uint256 indexed battleId, uint256 memeId1, uint256 memeId2);
    event VoteCast(uint256 indexed battleId, uint256 indexed memeId, address indexed voter);
    event BattleEnded(uint256 indexed battleId, uint256 winnerMemeId, address winnerCreator);
    event RewardsClaimed(address indexed user, uint256 amount);

    /**
     * @dev Submit a new meme to the platform
     * @param _imageUrl URL of the meme image
     * @param _title Title of the meme
     */
    function submitMeme(string memory _imageUrl, string memory _title) external {
        require(bytes(_imageUrl).length > 0, "Image URL cannot be empty");
        require(bytes(_title).length > 0, "Title cannot be empty");

        memeCounter++;
        memes[memeCounter] = Meme({
            id: memeCounter,
            creator: msg.sender,
            imageUrl: _imageUrl,
            title: _title,
            votes: 0,
            timestamp: block.timestamp,
            isActive: true
        });

        emit MemeSubmitted(memeCounter, msg.sender, _title);
    }

    /**
     * @dev Create a new battle between two memes
     * @param _memeId1 ID of the first meme
     * @param _memeId2 ID of the second meme
     */
    function createBattle(uint256 _memeId1, uint256 _memeId2) external {
        require(_memeId1 > 0 && _memeId1 <= memeCounter, "Invalid meme ID 1");
        require(_memeId2 > 0 && _memeId2 <= memeCounter, "Invalid meme ID 2");
        require(_memeId1 != _memeId2, "Cannot battle the same meme");
        require(memes[_memeId1].isActive, "Meme 1 is not active");
        require(memes[_memeId2].isActive, "Meme 2 is not active");

        battleCounter++;
        battles[battleCounter] = Battle({
            id: battleCounter,
            memeId1: _memeId1,
            memeId2: _memeId2,
            endTime: block.timestamp + BATTLE_DURATION,
            isActive: true,
            winner: address(0)
        });

        emit BattleCreated(battleCounter, _memeId1, _memeId2);
    }

    /**
     * @dev Vote for a meme in a battle
     * @param _battleId ID of the battle
     * @param _memeId ID of the meme to vote for
     */
    function vote(uint256 _battleId, uint256 _memeId) external {
        Battle storage battle = battles[_battleId];
        require(battle.isActive, "Battle is not active");
        require(block.timestamp < battle.endTime, "Battle has ended");
        require(!hasVoted[_battleId][msg.sender], "Already voted in this battle");
        require(_memeId == battle.memeId1 || _memeId == battle.memeId2, "Invalid meme ID for this battle");

        hasVoted[_battleId][msg.sender] = true;
        memes[_memeId].votes++;
        userRewards[msg.sender] += VOTE_REWARD;

        emit VoteCast(_battleId, _memeId, msg.sender);
    }

    /**
     * @dev End a battle and determine the winner
     * @param _battleId ID of the battle to end
     */
    function endBattle(uint256 _battleId) external {
        Battle storage battle = battles[_battleId];
        require(battle.isActive, "Battle is not active");
        require(block.timestamp >= battle.endTime, "Battle has not ended yet");

        Meme storage meme1 = memes[battle.memeId1];
        Meme storage meme2 = memes[battle.memeId2];

        uint256 winnerMemeId;
        address winnerCreator;

        if (meme1.votes > meme2.votes) {
            winnerMemeId = battle.memeId1;
            winnerCreator = meme1.creator;
            meme2.isActive = false; // Losing meme is eliminated
        } else if (meme2.votes > meme1.votes) {
            winnerMemeId = battle.memeId2;
            winnerCreator = meme2.creator;
            meme1.isActive = false; // Losing meme is eliminated
        } else {
            // In case of a tie, both memes survive but no winner reward
            winnerMemeId = 0;
            winnerCreator = address(0);
        }

        if (winnerCreator != address(0)) {
            userRewards[winnerCreator] += WINNER_REWARD;
        }

        battle.isActive = false;
        battle.winner = winnerCreator;

        emit BattleEnded(_battleId, winnerMemeId, winnerCreator);
    }

    /**
     * @dev Claim accumulated rewards
     */
    function claimRewards() external {
        uint256 rewards = userRewards[msg.sender];
        require(rewards > 0, "No rewards to claim");
        require(address(this).balance >= rewards, "Insufficient contract balance");

        userRewards[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: rewards}("");
        require(success, "Transfer failed");

        emit RewardsClaimed(msg.sender, rewards);
    }

    /**
     * @dev Get meme details
     * @param _memeId ID of the meme
     */
    function getMeme(uint256 _memeId) external view returns (Meme memory) {
        require(_memeId > 0 && _memeId <= memeCounter, "Invalid meme ID");
        return memes[_memeId];
    }

    /**
     * @dev Get battle details
     * @param _battleId ID of the battle
     */
    function getBattle(uint256 _battleId) external view returns (Battle memory) {
        require(_battleId > 0 && _battleId <= battleCounter, "Invalid battle ID");
        return battles[_battleId];
    }

    /**
     * @dev Get all active memes
     */
    function getActiveMemes() external view returns (uint256[] memory) {
        uint256 activeCount = 0;
        for (uint256 i = 1; i <= memeCounter; i++) {
            if (memes[i].isActive) {
                activeCount++;
            }
        }

        uint256[] memory activeMemeIds = new uint256[](activeCount);
        uint256 index = 0;
        for (uint256 i = 1; i <= memeCounter; i++) {
            if (memes[i].isActive) {
                activeMemeIds[index] = i;
                index++;
            }
        }

        return activeMemeIds;
    }

    /**
     * @dev Fund the contract with ETH for rewards
     */
    receive() external payable {}

    /**
     * @dev Allow funding the contract
     */
    function fundContract() external payable {
        require(msg.value > 0, "Must send ETH");
    }
}
