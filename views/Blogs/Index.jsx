const React = require('react')
const Navbar = require('../components/Navbar')

class Index extends React.Component {
    render() {
        const {blog, loggedInUser} = this.props
        console.log(loggedInUser);
        return (
            <div>
                <Navbar/>

                <head>
                <link rel="stylesheet" href="/css/app.css" />
                </head>

                <h1>Blogs!!!</h1>
                <section>
                    {
                       blog.map((blog) => 
                       (

                        <div className='card'>
                            <a href={`/blog/${blog._id}`}>
                                {" "}
                                <h2>{blog.title}</h2>
                                </a>
                                <div>
                                    <p>{blog.body}</p>
                                </div>
                                <h6>Written by: {blog.author}</h6>

                            <a href={`/blog/${blog._id}/edit`}>Edit this blog</a>
                        </div>
                        ))    
                    }
                </section>

            </div>
        )
    }
}

module.exports = Index