const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

//render css files
app.use(express.static('public'))

//placeholders for added task
var task = []
//placeholders for removed task
var complete = []
//placeholders for recyle bin
var recycle

//post route for adding new task
app.post('/addtask', function(req, res) {
  var newTask = req.body.newtask
  //add the new task from the post route
  task.push(newTask)
  res.redirect('/')
})

app.post('/complete', function(req, res) {
  var completeTask = req.body.check
  //check for the "typeof" the different completed task, then add into the complete task
  if (typeof completeTask === 'string') {
    complete.push(completeTask)
    //check if the completed task already exits in the task when checked, then remove it
    task.splice(task.indexOf(completeTask), 1)
  }
  res.redirect('/')
})

app.post('/removewhile', function(req, res) {
  var completeTask = req.body.check
  if (typeof completeTask === 'string') {
    recycle = task.splice(task.indexOf(completeTask), 1)
  }
  res.redirect('/')
})

app.post('/undo', function(req, res) {
  if (recycle != null) {
    task.push(recycle)
    recycle = null
  }

  res.redirect('/')
})

app.post('/reset', function(req, res) {
  complete = []
  res.redirect('/')
})
//render the ejs and display added task, completed task
app.get('/', function(req, res) {
  res.render('index', { task: task, complete: complete })
})

app.listen(2201, function() {
  console.log('server is running on port 2201')
})
