const React = require('react')
const Navbar = require('../components/Navbar')

class Signin extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <h1>Sign in Page</h1>
                
                <head>
                <link rel="stylesheet" href="/css/app.css" />
                </head>

                <form action='/users/signin' method='post'>

                    <fieldset>

                        <legend>Sign into your account</legend>

                        <label htmlFor='email'>Email</label>
                        <br/>
                        <input type='text' name='email'/>
                        <br/>

                        <label htmlFor='password'>Password</label>
                        <br/>
                        <input type='password' name='password' required/>
                        <br/>

                        <input type='submit' value='Signin'/>

                    </fieldset>

                </form>
            </div>
        )
    }
}

module.exports = Signin