const React = require('react') 
const Navbar = require('../components/Navbar')

class Signup extends React.Component {
    render() {
        return(
            <div>
                <Navbar/>
               <h1>Craete a New Account</h1>   
               
               <head>
                <link rel="stylesheet" href="/CSS/app.css" />
                </head>

               <form action='/users/signup' method='post'>
                    <fieldset>
                        <legend>Create an Account</legend>

                        <label htmlFor='username'>Username</label>
                        <br/>
                        <input type='text' name='username' required/>
                        <br/>
                        <label htmlFor='email'>Email</label>
                        <br/>
                        <input type='text' name='email' required/>
                        <br/>
                        <label htmlFor='password'>Password</label>
                        <br/>
                        <input type='password' name='password' required/>
                        <br/>
                        <input type='submit' value='Signup'/>
                        
                    </fieldset>
                </form>  

                <div>
                    <p>
                        Already have an Account? <a href='/users/signin'>Signin</a> {" "}
                        </p>
                </div>
            </div>
        )
    }
}
module.exports = Signup