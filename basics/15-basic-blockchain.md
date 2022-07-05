# Basic Blockchain Demo

Resource: https://andersbrownworth.com/blockchain/

1. a hash is a fixed-length string (a hexadecimal number) generated based on some content.
1. the same content generates the same hash.
1. a block is a piece of data with a hash generated from the data.
1. when the hash starts with 0000, the block is valid - signed.
1. each block has a number called nonces.
1. try different nonces to make the hash start with 0000 - mining.
1. each block has the previous block's hash as part of its data.
1. changing any data on a block will change its hash, and the rest of the blocks come after it.
1. the set of blockchain data is copied and saved by all the peers in the network.
