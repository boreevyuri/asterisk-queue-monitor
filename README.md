## Asterisk Queue Monitor
Queue monitor for portrait or landscape-oriented display.

### Dependencies
- redis (localhost:6379 by default)
- node

### Setup it
* install and run redis on your localhost (depends on your OS package system)
* create directory or just git clone repo to destination

```
cd /opt && \
git clone https://github.com/boreevyuri/asterisk-queue-monitor
cd asterisk-queue-monitor
```

* install dependencies

```
npm install
```

* than you have to create config files for daemon, server and client (or you can just copy examples)

```
cp server/config.example.js server/config.js
cp client/config.example.js client/config.js
cp queueDaemon/config.example.js queueDaemon/config.js
```

* edit `queueDaemon/config.js` by your Asterisk AMI credentials: `host`, `port`, `login`, `secret`, and (if you wish) `actionID` (just sequence of random letters and numbers)

* build project

```
npm run build
```

### Launch it

* and now we got app

```
- asterisk-queue-monitor
| - dist
  | - public (index.html & js scripts)
  | - queue.daemon.js (daemon who pulls queue from asterisk)
...
| - index.js (web server)
```

#### By own hands
* it is possible to run all by own hands

```
#web server
node index.js

#Daemon who fetch queue from AMI
node dist/queue.daemon.js
```

or we can use pm2, nodemon, etc...

#### Systemd
* you can use service-files to run it via systemctl if your OS supports systemd (change paths inside if needed and change `User=node` and `Group=node` to your unprivileged user)

```
cp contrib/*.service /etc/systemd/system/
```

do not forget `systemctl daemon-reload` if files were changed and...

```
#Run queue.daemon
systemctl enable amiget
systemctl start amiget

#Run web server
systemctl enable asterisk-monitor
systemctl start asterisk-monitor
```

* web server will start at localhost on TCP:8000. You can install nginx as reverse-proxy, that will handle TLS-connections for example, and will work as cache if you'll need it (I recommend to cache queries for 1 or 2 seconds). You can use simple nginx config to do that (comments included).

```
cp contrib/vhost.conf.nginx /etc/nginx/conf.d/10-asteriskmon.conf
nginx -t && systemctl reload nginx
```

