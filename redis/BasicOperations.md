# Redis Training Course
### 0. Pre-works
Before going details in this tutorial, please make sure you have finished
* Tutorials on [this link](http://try.redis.io/) 
* Using **redis-cli**
### 1. Basic Operations
### STRING
Test with String
```sh
> SET name Jorge
> GET name 
#Output: Jorge
```

Test with number
```sh
> SET number 1000
> INCR number
#Output: 1001
```

Test TTL
```sh
> EXPIRE number 120
#Show TTL: -2: does not exist (anymore), -1: will never expire
> TTL number 
```
