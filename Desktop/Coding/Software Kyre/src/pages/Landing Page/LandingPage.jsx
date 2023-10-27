import React from 'react';

function LandingPage() {
    const handleSubmit = function(e) {
        e.preventDefault();
    }

    return (
        <div className='landing-container'>
            <form>
                <input placeholder='email' id='email-input'/>
                <input type='password' placeholder='password' id='email-input'/>
                <button type='submit' onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default LandingPage;