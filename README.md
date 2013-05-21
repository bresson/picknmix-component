# picknmix-component


## Dev environment
Get vagrant <http://www.vagrantup.com/>, then from the project root run

    vagrant up

After complete ssh and install and run the app

    vagrant ssh
    cd /vagrant/
    npm install
    node server.js

You'll have a running app!


## Live environment

    cd picknmix-component/
    npm install
    PORT=3001 node server.js

*Note: in order for this to work (we're behind varnish cache on a virtual machine shared with the picknmix-api app) the live app needs to run on port 3001*
