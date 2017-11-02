# Redis Training Course
### A. Pre-works
Before going details in this tutorial, please make sure you have finished
* Tutorials on [this link](http://try.redis.io/) 
* Using **redis-cli**
* Explain Redis Type and Commands Performance ([link](https://www.slideshare.net/ncaneco/tuga-it-2017-redis?qid=b42986f6-5177-4899-a29e-30d0a46a5bd2&v=&b=&from_search=1))
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
Operations: **RPUSH, LPUSH, LLEN, LRANGE, LPOP, and RPOP**
RPUSH: puts the new value at the end of the list
LPUSH: puts the new value at the start of the list
LRANGE: gives a subset of the list
LLEN: returns the current length of the list
_**Note: Index starts from 0**_
```sh
# 1) Sam, 2) Alice, 3) Bob
> RPUSH friends "Alice"
> RPUSH friends "Bob"
> LPUSH friends "Sam"
# Get from 1 to the end of the list (Index starts from 0)
> LRANGE friends 0 -1
```

### 4. SET
Operations: **SADD, SREM, SISMEMBER, SMEMBERS, SUNION**
SADD: adds the given value to the set
SREM: removes the given value from the set
SISMEMBER: 1 if true, 0 if false
SMEMBER: returns a list of all the members of this set
SUNION: combines two or more sets and returns the list of all elements
```sh
> SADD birdpowers "pecking"
> ADD birdpowers "flight"
> SUNION superpowers birdpowers => 1) "pecking", 2) "x-ray vision", 3) "flight"
```

### 5. SORTED SETS
Operations: **ZADD, ZRANGE**
```sh
#The scores are years of birth andthe values are the names of famous hackers
ZADD hackers 1940 "Alan Kay"
```

### 6. HASHES
Oprations: **HSET, HGETALL, HMSET, HGET**
```sh
> HSET user:1000 name "John Smith"
> HSET user:1000 email "john.smith@example.com"
> HSET user:1000 password "s3cret"
```
Set multiple fields
```sh
> HMSET user:1001 name "Mary Jones" password "hidden" email "mjones@example.com"
```

C. Performance
How fast is Redis?
* [Using benchmarks](https://redis.io/topics/benchmarks)
* 




















