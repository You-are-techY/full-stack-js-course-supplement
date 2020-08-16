# You Are TechY
### Full Stack JS Course Supplement

This repository contains the source code for the You Are TechY Full Stack JS Course.  It is organized into several branches by module and lesson. Syntax is `moduel-x/lesson-y/chapter-z`  

https://github.com/You-are-techY/full-stack-js-course-supplement/branches/all

If you want to start following a lesson from a certain point in the video, checkout the relevant branch. 

The source code for the finished application can be found in the "production" branch. 

-- 

## Notes for Module 5

This is a production level application built with the full stack javascript framework, [Yote](https://fugitivelabs.github.io/yote/)

To run, open two terminal windows.  In the first:
```bash 
$ cd server 
$ npm install
$ nodemon 
```
And in the second:
```bash
$ cd web 
$ npm install 
$ npm run debug
```
The app will be listening on `localhost:3030` as normal.  

There are two default users created, an admin user named Jane Doe (jane.doe@youaretechy.com) and a standard user named Erika Smith (erika.smith@youaretechy.com).  Passwords for each user are **techy**. 

Some of the routes and actions are login protected and/or admin protected. So you'll have to log into one or another user to complete the code challenge.  