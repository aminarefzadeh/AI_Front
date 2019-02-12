// handle token storage and changing it;
//it store in local storage

export function postData(url = "", data = {} , token = null) {
  // Default options are marked with *
    if (token == null) {
      var headers = {
          "Content-Type": "application/json; charset=utf-8",
      };
    }
    else{
      var headers = {
          "Content-Type": "application/json; charset=utf-8",
          "AUTH":token
      };
    }
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: "same-origin", // include, *same-origin, omit
        headers: headers,
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
}

export function getReq(url = "", token = null) {
  // Default options are marked with *
    if (token == null) {
      var headers = {};
    }
    else{
      var headers = {
          "AUTH" : token,
      };
    }
    return fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: "same-origin", // include, *same-origin, omit
        headers: headers,
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
    });
}

export const urls = {
  verify_token:"/verify_token/",
  login : "/login/",
  logout : "/logout/",
  create_user : "/user/",
  weel_command : "/command/weel/",
  parrot_command: "/command/parrot/",
  perform_command: "/command/",
}

// resp ;
// t ;
// res = postData("api/verify_token/",{token:"hello"});
// res.then((val)=>{resp=val;});
// resp.text().then((val)=>{t=val;});



// res=postData("api/login/",{first_name:"amin",last_name:"aref",phone_number:"+989014207863"});
// res.then((val)=>{resp=val;});
// resp.json().then((val)=>{t=val;});
//
// res=postData("api/logout/",{token:token});
//
//
// res=postData("api/verify_token/",{token:"token"});
//
//
// res=postData("api/user/",{first_name:"amin3",last_name:"arefzadeh",phone_number:"+989014207863"});
//
//
// res = getReq("api/command/weel/",token="token");
//
// res = getReq("api/command/parrot/",token="token");
//
// res = getReq("api/command/3/perform/",token="token");
