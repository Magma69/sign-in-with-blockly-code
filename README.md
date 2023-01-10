# sign-in-with-blockly-code
An Auth tool that lets you use the blockly code API to make a custom signin button!

## How it works?
You can create any HTML and CSS elment you choose, from there just link up the functions and Boom you are done!


## Setup
There are not really any required functions but we do strong suggest that you have something like:
```
let result = await sendRequest("/users/login", {
          username: username.value,
          password: password.value,
        })
```
