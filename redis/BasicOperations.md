# Redis Training Course
### 0. Pre-works
Before going details in this tutorial, please make sure you have finished
* Tutorials on [this link](http://try.redis.io/) 
### 1. Basic Operations
### Store
```sh
SET name Jorge
LPUSH names Jorge Paul Bla
```

### Retrieve
```sh
GET name 
#Output: Jorge

LINDEX names 1 
#Output Paul
```

### More useful operations
```sh
INCR number
EXPIRE number 120
```
