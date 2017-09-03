# Setup GlusterFS on CentOS 7

Created by **SonM** 
Created Date: 03/09/2017


This document provides informaion about the following:
- Install latest GlusterFS on CentOS7
- Create Replicated GlusterFS Volumes
- Connect GlusterFS Servers from Clients

**Reference**: [Achirecture][gs-arch] , [Installation][gs-instal]
### Environment
GlusterFS will be installed on two nodes acting as a replicated volume

|Servers|IP|
|--|----|
|gluster.master1|192.168.9.66|
|gluster.master2|192.168.9.67|

|Clients|IP|
|--|----|
|woker_node1|192.168.9.63|
|woker_node1|192.168.9.64|

### Preparation
Using _vi_ to add lines into **/etc/hosts** for ll servers and clients
>127.0.0.1 localhost
>192.168.9.63 worker_node1
>192.168.9.64 worker_node2
>192.168.9.66 gluster.master1
>192.168.9.66 gluster.master2

# GlusterFS Servers
## Step 1: Install GlusterFS
```sh
$ yum search centos-release-gluster
$ yum install centos-release-gluster
$ yum install glusterfs gluster-cli glusterfs-libs glusterfs-server
```
## Step 2: Create XFS Bricks
Check physical Volume by using **fdisk**
```sh
$ fdisk -l
```
Let assume that we have /dev/sdb disk is available. Create a new _Physical Volume_ using the one
```sh
$ pvcreate /dev/sdb
Physical volume "/dev/sdb" successfully created
```
Create _Volume Group_ on /dev/sdb
```sh
vgcreate vg_gluster /dev/sdb
Volume group "vg_gluster" successfully created
```
Create **brick1** and **brick2** _Logical Volume_ for XFS bricks on both **cluster nodes (2 servers)** 
```sh
$ lvcreate -L 5G -n brick1 vg_gluster
  Logical volume "brick1" created.
$ lvcreate -L 5G -n brick2 vg_gluster
  Logical volume "brick2" created.
```
Setup XFS file systems:
```sh
$ mkfs.xfs /dev/vg_gluster/brick1
$ mkfs.xfs /dev/vg_gluster/brick2
```
Create mount points and mount XFS bricks
```sh
$ mkdir -p /bricks/brick{1,2}
$ mount /dev/vg_gluster/brick1 /bricks/brick1
$ mount /dev/vg_gluster/brick2 /bricks/brick2
```
Append lines to _/etc/fstab_ :
>/dev/vg_gluster/brick1  /bricks/brick1    xfs     defaults    0 0
>/dev/vg_gluster/brick2  /bricks/brick2    xfs     defaults    0 0

## Step 3: Start Service and Enable ports on the firewall
Start **glusterfsd.service** on **both nodes**
```sh
$ systemctl enable glusterd.service
$ systemctl start glusterd.service
```
Enable required ports on the firewall
```sh
$ firewall-cmd --zone=public --add-port=24007-24008/tcp --permanent
success
$ firewall-cmd --reload
success
```
## Step 4: Create Trusted Pool (Storage Cluster)
Connect node 1 (gluster.master1) to node 2 (gluster.master2) and create **Trusted Pool*
```sh
$ gluster peer probe gluster.master2
```
Verify cluster status
```sh
$ gluster peer status
```

## Step 5: Create Replicated Volume
The following table shows dependencies between Volume Types and Sizes
![table1](https://user-images.githubusercontent.com/31585927/30002912-18406700-90df-11e7-87bd-2fec452a3448.png)

Open ports for brick connection
```sh
$ firewall-cmd --zone=public --add-port=24009/tcp --permanent
success
$ firewall-cmd --reload
success
```
Create sub-directory in _/bricks/brick1_ mount point on both nodes
```sh
$ mkdir /bricks/brick1/brick
```
Run this command on **gluster.master1**:
```sh
$ gluster volume create glustervol1 replica 2 transport tcp gluster.master1:/bricks/brick1/brick gluster.master2:/bricks/brick1/brick
volume create: glustervol1: success: please start the volume to access data
$ gluster volume start glustervol1
volume start: glustervol1: success

$ gluster volume info all
```

# GlusterFS Clients
## Step 1: Open the Firewall
```sh
$ firewall-cmd --zone=public --add-port=111/tcp --add-port=139/tcp --add-port=445/tcp --add-port=965/tcp --add-port=2049/tcp \
--add-port=38465-38469/tcp --add-port=631/tcp --add-port=111/udp --add-port=963/udp --add-port=49152-49251/tcp  --permanent
success

$firewall-cmd --reload
success
```
## Step 2: Install GlusterFS Native Client
Do the following steps for both clients (worker_node1, worker_node2):
```sh
$ yum install glusterfs glusterfs-fuse -y
$ mkdir /mnt/test-replicated
$ mount -t glusterfs gluster.master1:/glustervol1 /mnt/test-replicated
```

Finally, add a new line to the _/etc/fstab_
>gluster.master1:/glustervol1 /mnt/test-replicated glusterfs defaults,_netdev 0 0

## Step 3: Make a Test :D...!
From one of clients:
```sh
$ cd /mnt/test-replicated
$ touch {1..10}
1 10 2 3 4 5 6 7 8 9
```
You will see the same files in **/bricks/brick1/brick** folder on 2 server nodes

**The Sun never knew how greate it was until it hit the side of a building**
**~Louis Kahn!**

   [gs-arch]: <https://gluster.readthedocs.io/en/latest/Quick-Start-Guide/Architecture>
   [gs-instal]: <https://wiki.centos.org/HowTos/GlusterFSonCentOS>
