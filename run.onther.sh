#!/usr/bin/env bash

export DATADIR1=$HOME/.onther
export DATADIR2=$HOME/.onther2

export DATADIR3=$HOME/.pjh-private
export DATADIR4=$HOME/.pjh-private2



# init for 2 geth
build/bin/geth --datadir=$DATADIR1 init onther.json
build/bin/geth --datadir=$DATADIR2 init onther.json


# run 1st geth
build/bin/geth --networkid=135976 \
  --datadir=$DATADIR1 \
  --cache=512 \
  --shh \
  --rpc \
  --targetgaslimit 100000000


# run 2nd geth
build/bin/geth --networkid=135976 \
  --datadir=$DATADIR2 \
  --cache=512 \
  --port=8546 \
  --shh


# attach
## getn 1
build/bin/geth attach $DATADIR1/geth.ipc
build/bin/geth attach $DATADIR2/geth.ipc

build/bin/geth attach $DATADIR3/geth.ipc
build/bin/geth attach $DATADIR4/geth.ipc



# connect two geth
## geth 2
enode = admin.nodeInfo.enode

## geth 1
admin.addPeer("enode url from geth 2")
