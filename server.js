const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

// array of posts
var posts = [];
// number of post shown in a page
const pageSize = 15;

const app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');
// set up json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// index page
app.get('/', (req, res) => {
  let currentPage = 1;
  const totalPosts = posts.length;
  const pageCount = Math.ceil(totalPosts / pageSize);

  if(req.query.page) {
    currentPage = parseInt(req.query.page, 10);
  }

  const start = (currentPage - 1) * pageSize;
  const end = currentPage * pageSize;

  // render the `views/index.ejs` template with the list of posts (paginated)
  res.render('index',{
	  posts: posts.slice(start, end),
	  pageSize: pageSize,
	  pageCount: pageCount,
	  currentPage: currentPage,
  });
});


// endpoint to register a new post
app.get('/new', (req, res) => {
  // Create new object
  const post = {
	  id: posts.length + 1,
	  contentID: posts.length + 1,
	  timestamp: moment().unix(),
	  timestampStr: moment().format(),
  };
  console.log('\n........new........\n',posts.length,'\n...................\n');

  // Add the new element at the beginning of the array
  posts.unshift(post);
  res.status(200).json(posts);
});


// endpoint to delete posts
app.get('/delete', (req, res) => {

  let i = Math.floor(Math.random() * posts.length);
  posts[i].delete = true;

  res.status(200).json(posts);
});


// endpoint to update a original post
app.get('/update', (req, res) => {
    let i = Math.floor(Math.random() * posts.length);
    posts[i].contentID++;
    posts[i].updateTimestamp = moment().unix();
    console.log('\n........update........\n',posts[i],'\n...................\n');
    res.status(200).json(posts);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
