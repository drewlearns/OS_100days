
# OS_100days
An opensource Project from CodingWithDrew.com

## About

Ever done the [100daysofcode.com](https://100daysofcode.com) challenge and found yourself skipping, forgetting which day you are on, etc?
This project aims to help you stay consistent by giving you friendly reminders, a simple way to keep track of what day you are on, and will allow you to tweet directly from it (hopefully!).

## Is it opensource?

Yes, though I'm still trying to figure out what all that entails. If you have opensource experience and want to join, great! We would love to have you join our community!

Join me, Drew Karriker and friends, at [https://discord.gg/AntJA73Qx2](https://discord.gg/AntJA73Qx2). Let's code!

## How to run the project locally

### Prerequisites:

To set up and run a local instance of OS_100days, the following are required:

- [nodejs/npm](https://www.npmjs.com/)
- [nodemon](https://www.npmjs.com/package/nodemon): This can be installed by running `npm i -g nodemon` after nodejs and npm have been installed

### Database (MariaDB):

The app stores its users in a MariaDB database, so sign up and sign in only work with a running database. `config/config.json` expects this
(for the `development`, `test` and `production` environments alike):

| Setting  | Value        |
|----------|--------------|
| host     | `localhost`  |
| port     | `3306` (the MariaDB default) |
| user     | `root`       |
| password | `password`   |
| database | `OS_100Days` |

The easiest way to get a matching server is Docker (any MariaDB 10.x/11.x install that you configure the same way also works):

```
docker run -d --name os100days-mariadb -p 3306:3306   -e MARIADB_ROOT_PASSWORD=password   -e MARIADB_DATABASE=OS_100Days   mariadb:11
```

* `MARIADB_ROOT_PASSWORD` sets the `root` password and `MARIADB_DATABASE` creates the `OS_100Days` database on first start.
* Check that it is running with `docker ps`. Stop and start it later with `docker stop os100days-mariadb` / `docker start os100days-mariadb`.
* If port 3306 is already taken, publish another host port (for example `-p 3307:3306`) and add `"port": 3307` to the settings in `config/config.json`.
  If you use your own server instead of Docker, create the database yourself (`CREATE DATABASE OS_100Days;`) and change the user and password in `config/config.json` to match.
* There are no migrations to run. When the app starts it creates the `users` table with Sequelize `sync`. Note that it currently runs with `force: true`, so **the tables are dropped and recreated every time the app starts** and any accounts you created are lost.

### Process:

* Clone the project's repository by running `git clone git@github.com:drewlearns/OS_100days.git"` or run `git pull` to update your local repository if you have it cloned already.
* `cd OS_100days`
* Install the necessary dependencies locally via node package manager(npm) by running `npm i`
* Make sure the MariaDB container above is running, then start the app with `npm run dev` (or `npm start` if you did not install nodemon). Set the `PORT` environment variable to use a port other than 3000.
* Visit `localhost:3000` on your browser and sign up for an account at `/signup`.
