# You Are TechY
### Full Stack JS Course Supplement

This repository contains the source code for the You Are TechY Full Stack JS Course.  It is organized into several branches by module and lesson. Syntax is `moduel-x/lesson-y/chapter-z`  

https://github.com/You-are-techY/full-stack-js-course-supplement/branches/all

If you want to start following a lesson from a certain point in the video, checkout the relevant branch. 

The source code for the finished application can be found in the "production" branch. 

-- 

## Notes for Module 4

We're using some Senior Developer magic setup here with webpack and babel. 

To run, open two terminal windows.  In the first:
```bash 
$ cd server 
$ npm install
$ nodemon server.js
```
And in the second:
```bash
$ cd web 
$ npm install 
$ npm run watch 
```
The app will be listening on `localhost:3030` as normal.  