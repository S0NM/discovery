# Install Local Repo

Reference Link [HOW TO CONFIGURE YUM REPOSITORY PACKAGE MANAGER IN RHEL 7/CENTOS 7](http://www.elinuxbook.com/how-to-configure-yum-repository-package-manager-in-linux/)
### Some Additional Commands
Server:
```sh
#Check CentOS version
$rpm --query centos-release

#RepoServer: 
#using wget to get rpm
wget -r -N --no-parent http://....../updates
#create local repo
createrepo /var/ftp/pub/updates
```
Client:
```sh
#update repo after adding some rpm files server's repository
$createrep --update /var/ftp/pub

#RepoClient:
#declare repo in /etc/yum.repos.d/file.repo
#update repos
$yum -v clean expire-cache
```
