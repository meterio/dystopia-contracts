# Deploy
## Deploy Volt token
```
npx hardhat run scripts/deploy/base/01_DeployVolt.ts --network metermain
```
## Deploy Dex 
1. open file[./scripts/deploy/base/02_DeployDex.ts](./scripts/deploy/base/02_DeployDex.ts)
2. edit WMTR address
3. run
```
npx hardhat run ./scripts/deploy/base/02_DeployDex.ts --network metermain
```
## Deploy system
1. open file[./scripts/deploy/base/03_DeploySystem.ts](./scripts/deploy/base/03_DeploySystem.ts)
2. edit Token address & VeDistPerWeek/VoterPerWeek
3. run
```
npx hardhat run ./scripts/deploy/base/03_DeploySystem.ts --network metermain
```

# Setting
## Set VeDistPerWeek/VoterPerWeek
1. open file[./scripts/setting/SetMinter.ts](./scripts/setting/SetMinter.ts)
2. edit VeDistPerWeek/VoterPerWeek
3. run
```
npx hardhat run ./scripts/setting/SetMinter.ts --network metermain
```
## DistributeAll
```
npx hardhat run ./scripts/setting/DistributeAll.ts --network metermain
```
## Mint Volt token to minter contract
1. open file[./scripts/setting/MintTo.ts](./scripts/setting/MintTo.ts)
2. edit amount
3. run
```
npx hardhat run ./scripts/setting/MintTo.ts --network metermain
```

## UpdatePeriod per week
```
npx hardhat run ./scripts/setting/UpdatePeriod.ts --network metermain
```
## Register Reward Token
1. open file[./scripts/setting/RegisterRewardToken.ts](./scripts/setting/RegisterRewardToken.ts)
2. edit reward token address
3. run
```
npx hardhat run ./scripts/setting/RegisterRewardToken.ts --network metermain
```

# Upgrade
## Upgrade minter
```
npx hardhat run ./scripts/upgrade/UpdateMinter.ts --network metermain
```



