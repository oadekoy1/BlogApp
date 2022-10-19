const React = require('react')

class Navbar extends React.Component {
    render() {
        const {loggedInUser} = this.props
        return (
            <nav style={styles.container}>
                <a href="/">Home</a>
                <a href="/blog">Blogs</a>
                <a href="/blog/new">Create New Blog</a>
                <a href="/users/signup">Sign in/ Sign up</a>
                {loggedInUser && <h6>{loggedInUser}</h6>}
                {loggedInUser && <a href='/users/signout'>Signout</a>}
            </nav>
        )
    }
}

const styles = {
    container : {
        display:"flex",
        justifyContent:"space-between",
    }

}

module.exports = Navbar