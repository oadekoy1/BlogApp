const express = require('express')
const blogModel = require('../models/BlogSchema')

const router = express.Router()

// Add Privacy to this router or routes
router.use((req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('/users/signin')
    }
})

// GET All Blogs 
router.get('/', async (req, res) => {
    try {
        const blog = await blogModel.find({})
        res.render('Blogs/Index', {blog: blog, loggedInUser: req.session.username})
        
    } catch (error) {
        console.log(error);
        res.status(403).send('Can not GET')
    }
})

// GET Blog by ID
router.get('/:id', async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id)
        res.render('Blogs/Show', {blog: blog})
    } catch (error) {
        console.log(error);
        res.status(403).send('Can not GET Blog by ID')
    }
})

// GET: Create a new blog
// router.get('/new', (req, res) => {
//     try {
//         if (req.body.sponsored === "on") {
//           req.body.sponsored = true;
//         } else {
//           req.body.sponsored = false;
//         }
//         const newBlog = await blogModel.create(req.body);
//         res.redirect("/blogs");
//       } catch (error) {
//         console.log(error);
//         res.status(403).send("Cannot create");
//       }
// })

// POST: Create a new blog
router.post("/", async (req, res) => {
    try {
      if (req.body.sponsored === "on") {
        req.body.sponsored = true;
      } else {
        req.body.sponsored = false;
      }
      // set the author to the loggedIn user
      req.body.author = req.session.username
      const newBlog = await blogModel.create(req.body);
      res.redirect("/blog");
    } catch (error) {
      console.log(error);
      res.status(403).send("Cannot create");
    }
  });

// PUT: Update by ID
router.put('/:id', async (req, res) => {
    try {
        if (req.body.sponsored === 'on') {
            req.body,sponsored = true
        } else {
            req.body.sponsored = false
        }
        const updatedBlog = await blogModel.findByIdAndUpdate(req.params.id, req.body, {'returnDocument': 'after'})
        res.send(updatedBlog)
    } catch (error) {
        console.log(error);
        res.status(403).send('Can not PUT')

    }
})


// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const deletedBlog = await blogModel.findByIdAndRemove(req.params.id)
        console.log(deletedBlog);
        res.send('Blog DELETED')
    } catch (error) {
        console.log(error);
        res.status(403).send('Can not DELETE')
    }
})

module.exports = router