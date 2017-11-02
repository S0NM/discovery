# Redis - Installation
Created by SonM

### Notice
File|Path
---|---
redis.conf| /etc/redis.conf
redis-sentinel| /etc/redis-sentinel.conf
redis log files| /var/log/redis/redis.log
sentinel log files| /var/log/redis/sentinel.log

### ========  Installing Redis (without cluster) ===================
#### Step 1: Install Redis
```sh
#1 Add the EPEL reposiotry
$sudo yum install epel-release
$sudo yum update

#2 Install Redis
$sudo yum install redis

#3 Start Redis
$sudo systemctl start redis

#4 (Optional) start Redis on boot automatically
$sudo systemctl enable redis
```
#### Step 2: Verify the Installation
```sh
$redis-cli ping
Output: PONG
```

### Step 3: Configure Redis
#### Persistence Options
Redis provides two options for disk persistence:
* Point-in-time snapshots of the dataset, made at specified intervals (RDB).
* Append-only logs of all the write operations performed by the server (AOF)

Make sure that the following values are set for the **appendonly** and **appendfsync** settings in **redis.conf**
```sh
appendonly yes
appendfsync everysec
```
After doing , restart Redis
```sh
sudo systemctl restart redis
```
### Basic System Tuning
Set the Linux kernel overcommit memory setting to 1
```sh
sudo sysctl vm.overcommit_memory=1
```
To make it permanent, add **vm.overcommit_memory = 1** to **/etc/sysctl.conf**
```sh
vm.overcommit_memory = 1
```

### ========  Installing Distributed Redis (Master/Slave)  ===================

### ========  Trouble Shooting  ===================
>**Error Msg:** Redis DB - Redis: NOREPLICAS Not enough good slaves to write
>**Solution:** Make sure that your number of Slaves is not less than the value of **min-slaves-to-write** in **/etc/redis.conf**. For example, If you have only 1 slave, so **min-slaves-to-write 1** should be ensured

