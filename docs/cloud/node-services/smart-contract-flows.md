---
description: Detail of Chain Cloud Smart Contract
---

# Smart Contract Flows

Architecture for Chain Cloud via Smart Contracts.

<!-- ![Smart contract technical flow](<../../.gitbook/assets/cp-smartcontract (2).png>) -->

Contract: NodeStaking Factory: Admin will use this contract to create new staking pool

* Fully Upgradeable through proxy architecture
* CreateNewChainStakingPool: create new staking pool

Contract: ChainStaking Pool: user will staking to this contract, for each config of chain in BE, we will have exactly 1 address of ChainStaking Pool

* Have been created by Factory contract
* Parameters:
* Name: (ex: Solana)
* Symbol: (ex: SOL)
* StakeToken (ex: XCN token address)
* StakeAmountRequired (ex: 100,000 so 100,000 XCN is required)
* StartStake - Deposit (deposit is the StakeAmountRequired to the Chain: Node Staking Contract and creates a record)
* StopStake - Withdraw (withdraws stake amount if within the WithdrawPeriod and not in the LockUpPeriod and calls DisableAddress)
* LockUpPeriod (ex: 30 days — means the user staked XCN can't withdraw for 30 days)
* WithdrawPeriod (ex: 7 days — means the use can withdraw from 31-37th day from stake. Then lock again for LockUpPeriod days.
* RewardAmount (ex: How much XCN per block user gets rewarded per address — only 1 address per node stake)
* Set Guardian (guardian is allowed to: freeze, unfreeze, and enable/disable address)
* EnableAddress (is required to be called to make an address begin earning RewardAmount)
* DisableAddress is required to be called to make an address stop earning RewardAmount)

Contract Payment: use for monthly payment (ENTERPRISE, PREMIUM and PROTOCOL)

* Treasury: address to receive money when user payment
* ChangeTreasury: admin call to change treasury
* Pay: user pays for 1 month with a type (ENTERPRISE, PREMIUM and PROTOCOL)
* SetOracle: change oracle
* Oracle: address for getting the price of XCN and ETH vs USD
* SetDiscount: set discount when user pay with XCN
* SetPaymentAmount: set amount when user pays, with inputs are type, token and amount
* Pause contract
* Unpause contract