
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
- [mariadb server](https://mariadb.org/) : You can reach out to their official website and get it installed in your system. Configure it and Note down the credentials.

### Process:

* Clone the project's repository by running `git clone git@github.com:drewlearns/OS_100days.git"` or run `git pull` to update your local repository if you have it cloned already.
* `cd OS_100days`
* Install the necessary dependencies locally via node package manager(npm) by running `npm i`
* To connect your database server to the Node server, you need to modify the 'config.json' file with your own credentials so that you can interact with your local database server.
* `npm run dev`
* Visit `localhost:3000` on your browser
