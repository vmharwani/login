import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import * as Icon from "react-bootstrap-icons";
import axios from "axios";
import Welcome from "../src/components/Welcome";

function App() {

  const [email, setEmail] = React.useState("");
  const [password,setPassword] = React.useState("");
  const [correctPassword,setCorrectPassword] = React.useState("");
  const [loginStatus,setLoginStatus] = React.useState(0);
  const [loginError, setLoginError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const [isMouseOver,setMouseOver] = React.useState(false);

  function handleMouseOver(){
      setMouseOver(true);
      console.log(isMouseOver);
  }

  function handleMouseOut(){
      setMouseOver(false);
      console.log(isMouseOver);
  }

  function handleEmailChange(event){
    setEmail(event.target.value);
    console.log(email);
  }

  function handlePasswordChange(event){
    setPassword(event.target.value);
    console.log(password);
  }

  function handleEmailSubmit(){
    let ok=0;
    axios.get('https://run.mocky.io/v3/a704e123-2ac0-4976-b769-6e9adb8549c2')
    .then(response=>{
      if(response.data.user.email===email){
          ok=1;
          setLoginStatus(1);
          setEmail(email);
        }
    })
    .catch(error=>{
      console.log("error")
    })
    if(ok===0)
      setLoginError(true);
  }

  function handlePasswordSubmit(){
    const body=[
      {
        email:email,
        password:password,
      }
    ]
    let ok=0;
    axios.post('https://run.mocky.io/v3/2ef706ec-6347-4ae5-9f9c-ed2c0d77edd9',body)
    .then(response=>{
      console.log(response)
      if(response.data.loginResult==="SUCCESS"){
        setLoginStatus(2);ok=1;
      }
    })
    .catch(error=>{
      console.log(error)
    })
    if(ok===0)
      setLoginError(true);
  }


  return (
    <Container className="p-5">
      <Row>
        <Col />
        <Col style={{backgroundColor:"#f5f6fa"}}>
          {loginStatus===0?
            (<div style={{textAlign : "center", color:"black"}}>
                <br />
                <br />
                <Icon.Lock color="black" size={32}/>
                <br />
                <h5>Login</h5>
                <p>Enter Your Email</p>
                <p>
                    <br />
                    <input onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onChange={handleEmailChange} style={{borderWidth:"2px", borderRadius:"10px", padding:"5px 5px 5px 5px", borderColor:(isMouseOver?"black":"white")}} type="text"></input>
                    <div style={{color:"#e84118"}}>
                      <p>{loginError?"Email not registered":null}</p>
                    </div>
                    <Button onClick={handleEmailSubmit}>Next</Button>
                </p>
                <br />
                <p>Don't have an account yet? SignUp</p>
                <br />
            </div>)
            :
            (loginStatus===1?(<div style={{textAlign : "center", color:"black"}}>
                <br />
                <br />
                <Icon.Lock color="black" size={32}/>
                <br />
                <h5>Welcome Back</h5>
                <p>Enter Your Password</p>
                <p>
                    <br />
                    <input onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onChange={handlePasswordChange} style={{borderWidth:"2px", borderRadius:"10px", padding:"5px 5px 5px 5px", borderColor:(isMouseOver?"black":"white")}} type="password" id="password"></input>
                    <div style={{color:"#e84118"}}>
                      <p>{passwordError?"Wrong password":null}</p>
                    </div>
                    <Button onClick={handlePasswordSubmit}>Next</Button>
                </p>
                <br /><br />
            </div>):<Welcome />)
          }
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default App;
