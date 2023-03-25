# Placement Cell
A placement cell app backend using nodeJS

## how to setup
npm install <code>libraries found in package.json</code>

## run the app
npm start 
or
<code>node index.js</code>

## Find the demo on site - please give a bit time to load
<a href="https://placement-cell-52w7.onrender.com" target="_blank"> Link here - placment </a>

## Features to the site
- Batch
- Student Details ( name, status: [placed, not_placed])
- Course Scores (including DSA Final Score, WebD Final Score, React Final Score)
- Interviews (including company name and Date)
- Results (this is a mapping between company, and student, contains result: [PASS, FAIL, On
Hold, Didn’t Attempt])

- Pages
- Sign Up and Sign In only for employees
- List of students + add new student
- List of Interviews + form to create an interview (with date)
- Allocate a student to an interview (edit student page)
- Select an interview to view the list of all students and mark a result status from the list
page itself

 Download a complete CSV of all the data:
- Student id, student name, student college, student status, DSA Final Score, WebD Final
Score, React Final Score, interview date, interview company, interview student result
- A student can have multiple entries based on the interviews she/he has given.
