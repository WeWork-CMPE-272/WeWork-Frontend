![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiT1FHK3hrdUtCMGlHMVI3QWpXQ2RhbzJkMENGS3dabEFQWXkwZUhlRVdKNmxuTzRhVHAyaTFVSCs2YnpUQmJYeDNJdWlaSCs0ZlppdWR4eDBraWI1dWd3PSIsIml2UGFyYW1ldGVyU3BlYyI6ImhTMWJiVmh6WGlMZDcrTTQiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)

## About Me
This is the frontend for an We-Work HR enterprise solution. This was built as the final project for SJSU CMPE-272. The codebase is written in React. 

## Features
Login & SSO integration using AWS Cognito & Google OAuth
Employees can veiw their information after logging in
* Payroll
* Employee details

Administrator can onboard employees to the platform by creating accounts for employees 
* Create Employee accounts
* Promote Employee 
## Running the application

1. Modify `src/config/index.js` to chose which environment variable to load. 
2. Run `npm install` to setup and install the dependencies.
3. Run `npm start` to start the application.
4. A browser session should automatically open, pointing at `http:localhost:3000`.
