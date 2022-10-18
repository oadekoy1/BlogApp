const React = require('react')
const Navbar = require('../components/Navbar')

class Show extends React.Component {
    render() {
        const {blog} = this.props
        console.log(blog);
        return (
            <div>
                <h1>My Blog!!</h1>

                <Navbar/>

                <head>
                <link rel="stylesheet" href="/css/app.css" />
                </head>

                <h1>{blog.title}</h1>
                <p>{blog.body}</p>

                <h6>Liked by {blog.likes}</h6>
                <h5>Written by: {blog.author}</h5>

            </div>
        )
    }
}

module.exports = Show