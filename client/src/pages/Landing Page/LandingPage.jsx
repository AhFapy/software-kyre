import React, { useState } from 'react';

function LandingPage() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [data, setData] = useState("")

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
      };
    
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };

      const handleSubmit = function(e) {
        e.preventDefault();
      }
        
      const sendRequestToBackend = async(e) => {
        e.preventDefault();

        const url = 'http://localhost:3000/passport/login';
    
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Specify the content type
            },
            body: JSON.stringify({ username: userName, password: password }),
          });
    
          if (response.ok) {
            const responseData = await response.json();
            setData(responseData);
          } else {
            // Handle error responses here
            console.error('Request failed:', response.status, response.statusText);
          }
        } catch (error) {
          // Handle network errors or other issues here
          console.error('Request failed:', error);
        }
    };
    
    return (
        <div className='landing-container'>
            <form onClick={sendRequestToBackend}>
            <input type='text' placeholder='email' id='email-input' value={userName} onChange={handleUserNameChange}/>
            <input type='password' placeholder='Key' id='password-input' value={password} onChange={handlePasswordChange}/>
            <button type='submit' onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default LandingPage;