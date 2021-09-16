# userFormRestfulAPI
This was a challenge for a job interview process to prove my skills with node.js, expressJS, mongoDB, and postman.

Hello All! 

This repository is for a node.js challenge for a job interview process. I showed my skills with RESTful API development, mongoDB[mongoose], Postman, node.js, and ExpressJS.

Packages include:

- Express
- mongoose
- jwt (jsonwebtoken)
- dotenv (connect my mongoDB account securely)
- cors

All of these packages allowed me to create 5 pillars of core functionality to this API including
- Sign Up Registration (name, email, password, permission)
  - password hashed & salted
  - password and information parameters 
  - permission parameters (i.e. administrator, community moderator, content creator, or unprivileged)
- Login Verification
  - using jwt I was able to verify a user login information without access to the unencrypted password
 - Deletion of user
 - Editing user all information
 - Recieving information from userbase
  - retrieve all users
  - retrieve users filtered by their permission category 

Here is a link to my live explination of the design and testing on Postman:
