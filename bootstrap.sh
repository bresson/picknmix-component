apt-get update
apt-get install -y build-essential
NODE_VERSION=v0.10.7
wget http://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION.tar.gz
tar -xzf node-$NODE_VERSION.tar.gz
cd node-$NODE_VERSION
./configure && make && make install
cd ..
