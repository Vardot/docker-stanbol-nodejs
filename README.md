# Docker Stanbol Socket.io Server

---

This is a Docker image that installs [Apache Stanbol](https://stanbol.apache.org/) with [Socket.IO](https://socket.io/) to provide an HTTP listener for you application with real-time content enhancements.

See it in action here: https://www.youtube.com/watch?v=ry0accNDhnc


---

### Install: 
1. Make sure you have Docker and Docker Compose installed.
On Ubuntu, run `apt-get install docker-compose`

2. Clone the Apache Stanbol with Node.js Socket.IO Docker image files:
```
git clone https://github.com/Vardot/docker-stanbol-nodejs.git
```

3. Run this command to run the container in the background:
```
docker-compose up -d
```

4. Your Apache Stanbol Socket URL will be: `http://MYHOSTNAME:8071`. Put that in the module configuration.

---

### Credit:
- Developed by: Waleed Qadi | https://github.com/waleedq
- Sponsored by: Vardot | https://www.vardot.com
