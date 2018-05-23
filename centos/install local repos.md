# Install Local Repos

Reference Link [HOW TO CONFIGURE YUM REPOSITORY PACKAGE MANAGER IN RHEL 7/CENTOS 7](http://www.elinuxbook.com/how-to-configure-yum-repository-package-manager-in-linux/)
### Some Additional Commands
Server:
```sh
#Check CentOS version
$rpm --query centos-release

#using wget to get rpm
wget -r -N --no-parent http://....../updates
#create local repo
createrepo /var/ftp/pub/updates

#update repo after adding some rpm files server's repository
$createrepo --update /var/ftp/pub/base
```

Client:
* declare repo in /etc/yum.repos.d/file.repo

```sh
[base]
name=base
baseurl=ftp://<IP>/...
enabled=1
gpgcheck=0
```

```sh
#update repos
$yum -v clean expire-cache
```

[Adding DNS for local repository](https://adminvietnam.org/cau-hinh-dns-tren-centos-7/2218/)
```sh
#Add nameserver
$cat /etc/resolv.conf
nameserver 192.168.x.x
```
