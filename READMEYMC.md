Original tutorial info:  https://www.digitalocean.com/community/tutorials/building-a-web-app-with-adonisjs
Building a Web App with AdonisJS
By Chimezie Enyinnaya

Published onSeptember 15, 2020 670views
This tutorial is out of date and no longer maintained.
Introduction
AdonisJS is a Node.js MVC framework. It offers a stable ecosystem to write web servers so that you can focus on business needs over finalizing which package to choose or not. In this tutorial, I’ll be showing you how to build a web app with AdonisJS.

In order to see how to build applications with AdonisJS, we’ll build a simple task list (todo) application. We’ll be using AdonisJS 4.0 in this tutorial. Below is a demo of what the final application will look like:



Prerequisites
This tutorial assumes you have the following installed on your computer:

Node.js 8.0 or greater
npm 3.0 or greater
Installing Adonis CLI
We need to first install the Adonis CLI which will help us in creating new AdonisJS applications and also comes with some useful commands:

npm i -g @adonisjs/cli
 
Create new project
We’ll start by creating a new AdonisJS application. We’ll make use of the adonis CLI.

adonis new adonis-tasks
 
The command above will create a new AdonisJS application with the name adonis-tasks using the fullstack app boilerplate. To make sure everything is working as expected, let’s run the newly created app. First, we cd into adonis-tasks and run the command below:

adonis serve --dev
 
Then visit http://127.0.0.1:3333 in your browser, and you should get something similar to the image below:



Good! Let’s now start fleshing out the application.

Database and Migration
We’ll start by structuring the application database. We’ll be using the AdonisJS migration schema to define our application’s database schema. Before we dive into the migration, let’s quickly take time to set up our database. For the purpose of this tutorial, we’ll be using MySQL. So, we need to install the Node.js driver for MySQL.

npm install mysql --save
 
Next, we need to make AdonisJS know we are using MySQL. Taking a look at config/database.js, you see config settings for different databases including MySQL. Though we can easily enter our MySQL settings directly in the config file, that will mean we’ll have to change these settings every time we change our application environment (development, staging, production, etc.) which is actually a bad practice. Instead, we’ll make use of environment variables, and depending on the environment our application is running on, it will pull the settings for that environment. AdonisJS got us covered here. All we have to do is enter our config settings in the .env file.

So, open .env and add the snippet below to it:

.env
DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=adonis-tasks
DB_USER=root
DB_PASSWORD=
 
Remember to update the database name, username, and password accordingly with your own database settings.

For simplicity, our application will have only one database table which we’ll call tasks. The tasks table will contain 3 fields id, title, created_at and updated_at. We’ll make use of the adonis make:migration command to create the migration file:

adonis make:migration tasks
 
On prompt choose Create table option and press Enter. This will create a new file within the database/migrations directory. The file name will be a timestamp with the name of the schema (in my case 1504289855390_tasks_schema.js). Open this file and update the up() as below:

database/migrations/1504289855390_tasks_schema.js
up () {
  this.create('tasks', (table) => {
    table.increments()
    table.string('title')
    table.timestamps()
  })
}
 
The increments() will create an id field with Auto Increment and set it as Primary key. The timestamps() will create the created_at and updated_at fields respectively. With that done, we can run the migration:

adonis migration:run
 
With our database and table set up, let’s now create a model. We’ll call it Task. Though we won’t be making extensive use of the model in this tutorial, we’ll use models over writing plain database queries because they bring ease of use and provide an expressive API to drive the data flow, and also allows us to use Lucid (AdonisJS ORM). To make a model, we use the adonis CLI make:model command:

adonis make:model Task
 
This will create a Task.js within the app/Models directory.

Creating Application Routes
Open start/routes.js and update with the snippet below:

start/routes.js
Route.get('/', 'TaskController.index')
Route.post('tasks', 'TaskController.store')
Route.delete('tasks/:id', 'TaskController.destroy')
 
We define three routes for our task list application. The first route will serve as our application landing page. It is bound to the index() of the TaskController (which we’ll create shortly). The second route is a POST request which will handle adding a new task to the task list. It is bound to the store() of the TaskController. Lastly, we have a route with a DELETE request which will handle deleting a task. It takes the ID of a task to be deleted as of a parameter. It is bound to the destroy() of the TaskController.

Creating The Task Controller
Having defined our application’s routes and bind to methods on the TaskController, it’s time to create the TaskController itself. Again, we’ll use the adonis CLI command:

adonis make:controller Task
 
On prompt choose For HTTP requests option and press Enter. Now we have a TaskController.js file within the app/Controllers/Http directory.

Note: Before we ran the make:controller command, the app/Controllers/Http wasn’t present. It was created after running the command.

As we have seen from the routes above, the TaskController will have 3 methods (index(), store(), and destroy()). Open TaskController.js and add the following code into it:

app/Controllers/Http/TaskController.js
// remember to reference the Task model at the top
const Task = use('App/Models/Task')

async index ({ view }) {
  const tasks = await Task.all()

  return view.render('tasks.index', { tasks: tasks.toJSON() })
}
 
The index() simply fetches all the tasks that have been created from the database and renders a view. AdonisJS uses ES7 async/await and ES6 Object Destructuring. The tasks fetched are then passed to a view file tasks.index (which we’ll create shortly).

Creating Master Layout
AdonisJS makes use of Edge as its templating engine which has support for layouts. We are going to create a master layout for our application. All view files must be within the resources/views directory. So within the directory, let’s create a new view file and name it master.edge. Edge files have the .edge extension. Open the newly created file and paste the following code in it:

resources/views/master.edge
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Task List</title>
    {{ css('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css') }}
    {{ css('https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.1/css/bulma.min.css') }}
</head>
<body>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-8 is-offset-2">
                    @!section('content')
                </div>
            </div>
        </div>
  </section>
</body>
</html>
 
We are using Bulma CSS framework. We use AdonisJS view’s css() global to reference our CSS files on CDN. The layout is simple, it contains only one section which is content.

Note: The ! within @!section() indicate that it is a self closing section.

Creating The Task View
For simplicity, our task list application will have just one view file. Every view-specific stuff will be done within this view file. We are going to place this view within a tasks directory. Create a new directory named tasks within the resources/views directory, then within the task directory, create a new view file and name it index.edge. Now, open the index.edge file and paste the following code into it:

resources/views/tasks/index.edge
@layout('master')

@section('content')
  <div class="box">
    <h1 class="title">Task List</h1>

      <table class="table is-bordered is-striped is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>SN</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          @each(task in tasks)
            <tr>
              <td>
                {{ ($loop.index + 1) }}
              </td>
              <td>
                {{ task.title }}
              </td>
              <td>
                <button class="button is-danger is-outlined">
                  <span>DELETE</span>
                  <span class="icon is-small">
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </span>
                </button>
              </td>
            </tr>
          @else
            <tr>
              <td colspan="3" class="has-text-centered">No task created yet!</td>
            </tr>
          @endeach
        </tbody>
      </table>
  </div>
@endsection
 
First, we indicate we are using the master layout we created above. We simply display the tasks in a table. If there are no tasks, we display an appropriate message. For the SN of the tasks, we are using the index property of Edge’s $loop variable. The index property holds the iteration index, which starts from 0, hence the addition of 1. Lastly, we have a delete button which does nothing for now.

If we visit the application in the browser since we haven’t added any tasks yet, we should get something similar to the image below:



Adding New Task
Let’s update the index.edge file to include a form for adding a new task. Add the following code immediately after @section('content'):

resources/views/tasks/index.edge
<div class="box">
  <h2 class="title">New Task</h2>

  <form action="/tasks" method="POST">
    {{ csrfField() }}

    <div class="field has-addons">
      <div class="control is-expanded">
        <input class="input" type="text" name="title" value="{{ old('title', '') }}" placeholder="Task title">
      </div>
      <div class="control">
        <button type="submit" class="button is-primary">
            Add Task
        </button>
      </div>
    </div>

    {{ elIf('<p class="help is-danger">$self</p>', getErrorFor('title'), hasErrorFor('title')) }}
  </form>
</div>
 
It’s a simple form with one field for the title of the task. We also add a CSRF field since AdonisJS by default prevent us from CSRF attacks. Lastly, we display a validation error message if the form fails validation.

Next, we need to create the store() that will handle adding a new task to the database. Before we create this method, let’s quickly set up an Adonis validator which will be used for validating our form. The validator is not installed by default, so we need to install it first:

adonis install @adonisjs/validator
 
Next, we need to register the provider inside start/app.js:

const providers = [
  ...
  '@adonisjs/validator/providers/ValidatorProvider'
]
 
Now, let’s create the store() in TaskController.js. Paste the snippet below just after the index():

app/Controllers/Http/TaskController.js
//  remember to reference the Validator at the top
const { validate } = use('Validator')

async store ({ request, response, session }) {
  // validate form input
  const validation = await validate(request.all(), {
    title: 'required|min:3|max:255'
  })

  // show error messages upon validation fail
  if (validation.fails()) {
    session.withErrors(validation.messages())
            .flashAll()

    return response.redirect('back')
  }

  // persist to database
  const task = new Task()
  task.title = request.input('title')
  await task.save()

  // Fash success message to session
  session.flash({ notification: 'Task added!' })

  return response.redirect('back')
}
 
First, we validate the requests coming from the form against some rules. If the validation fails, we simply save the validation messages to the session and return back to the form with the error messages. If everything went well, we persist the new task to the database and flash a notification message indicating that the task was added successfully then redirect to the form.

Displaying Notification
Next, we need a way to display the notifications. Open resources/views/tasks/index.edge, between the first (add task) and second (task list) .box elements, add the snippet below:

resources/views/tasks/index.edge
@if(old('notification'))
    <div class="notification is-success">
        {{ old('notification') }}
    </div>
@endif
 
With that done, we can now add tasks to the task list. You should get something similar to the image below:



Deleting a Task
The last functionality our task list application will have is “deleting tasks”. To achieve this, we need to update the dummy delete button created earlier to include the actual form for deleting a specific task. Replace the delete button entirely with the code below:

resources/views/tasks/index.edge
<form action="{{ 'tasks/' + task.id + '?_method=DELETE' }}" method="POST">
  {{ csrfField() }}

  <button type="submit" class="button is-danger is-outlined">
    <span>DELETE</span>
    <span class="icon is-small">
      <i class="fa fa-times" aria-hidden="true"></i>
    </span>
  </button>
</form>
 
Remember the route handling deleting of task accepts the ID of the task as a parameter, so we are attaching the task ID to the form action. Also, we are passing the request method (DELETE in this case) as a query string. This is the AdonisJS way of doing method spoofing since HTML forms aren’t capable of making requests other than GET and POST.

Next, we add the destroy() to TaskController.js. Paste the code below into it just after the store():

app/Controllers/Http/TaskController.js
async destroy ({ params, session, response }) {
  const task = await Task.find(params.id)
  await task.delete()

  // Fash success message to session
  session.flash({ notification: 'Task deleted!' })

  return response.redirect('back')
}
 
We first get the ID of the task from the params object and then use it to retrieve the task from the database. We then delete the task thereafter. Lastly, we flash an appropriate message and redirect back to the page.

Below is what we get when we delete the task added above:



Conclusion
That’s it. We have been able to build a simple application with AdonisJS. Though this tutorial only covered the basics of AdonisJS, it should get you started in building your application with AdonisJS. I hope you find this tutorial helpful. If you have any questions, suggestions, comments, kindly leave them below.