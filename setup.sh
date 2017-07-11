VERSION=6.11.0

. /etc/default/epages6
cd /home/
curl -o node.tar.xz https://nodejs.org/dist/v$VERSION/node-v$VERSION-linux-x64.tar.xz
tar -xvf node.tar.xz
mv /home/node*/ /home/node/
cd /home/searchServer/
/home/node/bin/npm install
git clone git@github.com:ePages-de/Cartridges.git
systemctl enable ./searchTranslations.service