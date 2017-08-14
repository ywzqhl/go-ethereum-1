#!/bin/sh

## rinkeby testnet
--unlock="0x98a03d4db807298cb9d79e1cb7a5960e191ce3de" \

./build/bin/geth --networkid=4 \
  --datadir=$HOME/.rinkeby \
  --cache=512 \
  --ethstats='yournode:Respect my authoritah!@stats.rinkeby.io' \
  --rpc \
  --rpcaddr="192.168.1.245" \
  --rpcapi="personal,eth,network,net" \   --bootnodes=enode://a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf@52.169.42.101:30303


## whisper
./build/bin/geth --networkid=4 \
  --datadir=$HOME/.rinkeby \
  --cache=512 \
  --ethstats='yournode:Respect my authoritah!@stats.rinkeby.io' \
  --rpc \
  --rpcapi="personal,eth,network,net" \   --bootnodes=enode://a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf@52.169.42.101:30303 \
  --
