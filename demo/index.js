function validateInput(input) {
    input.classList.remove("invalid");
    document.getElementById(`${input.id.split("In")[0]}Check`).innerHTML = ""
    if (input.id == "userInput") {
      input.value = input.value.toLowerCase().replace(/ /g, "-").replace(/[^a-z0-9-_]/g, "");
    }
  }
  async function submit(btn) {
    if (btn.classList.contains("loading")) return;
    btn.classList.add("loading");
    try {
      let username = document.getElementById("userInput");
      let password = document.getElementById("passInput");
      if (!username.value) {
        document.getElementById("userInput").classList.add("invalid");
        document.getElementById("userCheck").innerHTML = "Required Field";
      }
      if (!password.value) {
        document.getElementById("passInput").classList.add("invalid");
        document.getElementById("passCheck").innerHTML = "Required Field";
      }
  
      if (!username.classList.contains("invalid") && !password.classList.contains("invalid")) {
        let result = await sendRequest("/users/login", {
          username: username.value,
          password: password.value,
        })
        if (result?.status == 404) {
          document.getElementById("userInput").classList.add("invalid");
          document.getElementById("userCheck").innerHTML = "Invalid Username";
        } else if (result?.status == 403) {
          document.getElementById("passInput").classList.add("invalid");
          document.getElementById("passCheck").innerHTML = "Incorrect Password";
        } else if (result?.token) {
          if (result.ban) {
            return "User is banned form Blockly Code!"
          } else {
            let d = new Date()
            d.setDate(d.getDate() + 7)
            document.cookie = `token=${result.token}; domain=blocklycode.org; expires=${new Date(d)}; path=/; sameSite=Lax;`;
            document.cookie = `type=blockly; domain=blocklycode.org; expires=${new Date(d)}; path=/; sameSite=Lax;`;
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
    btn.classList.remove("loading");
  }


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