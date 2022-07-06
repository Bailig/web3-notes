# Smart Contract

an account controlled by code.

Contract Account has

- balance - amount of ether
- storage - data storage
- code - raw machine code

Contract accounts are only specific to one individual network, meaning contract account on a test network cannot be accessed by the main network.

Process:

1. developer write code in their own machine (contract source).
1. developer build and deploy the code to a network.
1. the deployment creates an instants of the contract on the network (contract account).
1. one contract source can create multiple contract accounts across different networks.
