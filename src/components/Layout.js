import React from "react";
import {postData,urls} from "../lib/request";

import Menu from "./Menu";
import Signin from "./Signin";

// store the token in localstorage and in constructor of each element get that and check for validation;


export default class Layout extends React.Component {
  init(){
    this.state.person.token = localStorage.getItem("token");
    this.state.person.first_name=localStorage.getItem("first_name");
    this.state.person.last_name=localStorage.getItem("last_name");
    this.state.person.phone_number=localStorage.getItem("phone_number");

    console.log(this.state);

    if(this.state.person.token){
      console.log("check token");
      postData(urls.verify_token,{token:this.state.person.token})
      .then((val)=>{
        console.log("check response");
        console.log(val);
        if (val.status == 200){
          this.setState({status : "true"});
        }
        else if(val.status == 400){
          this.expire_person();
        }
      });
    }
    else{
      console.log("there is no token");
      this.state.status = "false";
    }
  }
  login_person(first_name,last_name,phone_number,token){
    this.setState({person:{
        token : token,
        first_name : first_name,
        last_name : last_name,
        phone_number : phone_number,
      },
      status : "true",
      }
    );
    localStorage.setItem("token",token);
    localStorage.setItem("first_name",first_name);
    localStorage.setItem("last_name",last_name);
    localStorage.setItem("phone_number",phone_number);
  }
  logout_person(){
    console.log("trying to logout in here");
    console.log(this.state);
    postData(urls.logout,{token:this.state.person.token})
    .then((res)=>{
      console.log("logging out");
      localStorage.setItem("token",null);
      localStorage.setItem("first_name",null);
      localStorage.setItem("last_name",null);
      localStorage.setItem("phone_number",null);
      this.setState({person:{
          token : null,
          first_name : null,
          last_name : null,
          phone_number : null,
        },
        status : "false",
      });
    })
  }
  expire_person(){
    this.setState({person:{
        token : null,
        first_name : null,
        last_name : null,
        phone_number : null,
      },
      status : "false",
    });
    localStorage.setItem("token",null);
    localStorage.setItem("first_name",null);
    localStorage.setItem("last_name",null);
    localStorage.setItem("phone_number",null);
  }
  constructor(props){
    super(props);
    this.state = {
      person:{
        token:null,
        first_name:null,
        last_name:null,
        phone_number:null,
      },
      status:"waiting",
    } ;
    this.init();
  }

  render() {
    console.log("hello bitch");
    console.log(this.props);
    if (this.state.status == "false"){
      return (
        <div>
          <Signin loginHandler={this.login_person.bind(this)} theme={this.props.theme}/>
        </div>
      );
    }
    else if(this.state.status == "true"){
      var person = Object.assign( {} , this.state.person );
      return(
        <div>
          <Menu person={person} logoutHandler={this.logout_person.bind(this)} theme={this.props.theme}/>
        </div>
      );
    }
    else if(this.state.status == "waiting"){
      return(
        <div>
          <h1> Please Wait for check login </h1>
        </div>
      );
    }
  }

}
