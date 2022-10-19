const React = require('react')
const Navbar = require('../components/Navbar')

class Index extends React.Component {
    render() {
        return (
            <div>

                <h1>New Blog</h1>

                <Navbar/>

                <head>
                <link rel="stylesheet" href="/CSS/app.css" />
                </head>
                
                <form action='/blog' method='POST'>

                    Name: <input type='text' name='name'/> 
                    <br/>
                    Color: <input type='text' name='color'/> 
                    <br/>
                    Ready to Eat: <input type='checkbox' name='readyToEat'/>
                    <br/>
                    <input type='submit' value='Create New Fruit'/>

                </form>

            </div>
        )
    }
}