const axios = require("axios").default

axios.get(`https://api.monkedev.com/fun/chat?msg=${encodeURIComponent("I am testing")}&uid=0o101`).then((response) => {
    console.log(response.data.response)
})
