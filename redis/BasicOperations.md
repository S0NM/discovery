# Redis Training Course
### A. Pre-works
Before going details in this tutorial, please make sure you have finished
* Tutorials on [this link](http://try.redis.io/) 
* Using **redis-cli**

### B. Basic Operations

### 1. Time to Live Operations
Use: TTL can be used with Redis data structures.
Operations:**EXPIRE, TTL**
Test TTL
```sh
> EXPIRE number 120
#Show TTL: -2: does not exist (anymore), -1: will never expire
> TTL number 
```

### 2. STRING
Operations: **SET, GET, INCR**
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
### 3. LIST