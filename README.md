# sign-in-with-blockly-code
An Auth tool that lets you use the blockly code API to make a custom signin button!

## How it works?
You can create any HTML and CSS elment you choose, from there just link up the functions and Boom you are done!


## Setup




## Login Function
After getting the input data you will need to send the data using a function like this:
```js
let result = await sendRequest("/users/login", {
          username: username.value,
          password: password.value,
        })
```

On the otherside of the function you will need something that looks like this:
```js

async function sendRequest(path, body) {
    let token = 'YOUR-BLOCKLY-CODE-CREATOR-TOKEN-HERE'
    let res = await fetch(`api.blocklycode.org/${path}`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Allow': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(body)
    }).then(r => r.json());
    if (res.status == 200) {
      return res.data
    } else {
      return {
        status: res.status ?? 500,
        error: res.error,
      }
    }
  }

```

You will also need your Blockly Code Creator Token. This is how we will Auth the user with our database.
If you don't provide a token you will get a `NoToken` responce!

We do this so that we can make sure that the owner of the applcation accepts the Blockly Code 
Creator TOS, and Privicy Policy! 

**A VAILD TOKEN IS REQUIRED!**


## Getting Help
If you need help setting this up please read the docs on our page: https://blocklycode.org/docs/login-button
