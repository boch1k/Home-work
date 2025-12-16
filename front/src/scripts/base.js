
export default class Base {
  // url --> "/api/users", "/api/photo"
  async get(url) {
    let body = []
    try {
      let resp = await fetch(url)
      body = await resp.json()
    } catch (err) {
      console.log(err.message);
    }
    return body
  }
  // url --> "/api/photo/" + id, "/api/users/" + id
  async del(url) {
    try {
      return await fetch(url, {
        method: "DELETE",
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  async post(url, obj) {
    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(obj),
      });
      if (response.ok) {
        let json = await response.json()
        return json
      }
    } catch (err) {
      console.log(err.message);
    }
  }
}

