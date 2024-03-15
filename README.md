The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.

(__TODO__: your project name)

# Work it Out! 

## Overview

Work it Out is a web app that allows users to make workout templates that record the exercises they do, the number of reps they perform, and the weight with which they perform it. Users can rgister and login. Once they're logged in, they can start a workout by creating a new template or using an existing one. 

Once they've started a workout, they can input the number of reps/weight they perform for a specific exercise, while on the side, their reps/weight performed in their most recent attempt at that specific exercise in a previous workout is displayed. The user can also click into a specific exercise and it will expand into a window showing their all-time history with that exercise. This is inspired by an existing workout tracker app named Strong!


## Data Model

The application will store Users, Workouts and Exercises

* users can have multiple workouts (via references)
* each workout can have multiple exercises (via references)

(__TODO__: sample documents)

An Example User:

```javascript
{
  username: "workerouter",
  hash: // a password hash,
  workouts: // an array of references to Workout documents
}
```

An Example Workout:

```javascript
{
  user: // a reference to a User object
  name: "Pull Day",
  date: // date
  exercises: // an array of references to Exercise documents
}
```

An Example Exercise:

```javascript
{
  name: "Seated Row (Cable)",
  sets: [
    { weight: "110", reps: "12"},
    { weight: "110", reps: "10"},
  ],
  history: [
    {
      workoutName: "Pull Day"
      date: // date
      sets: [
        { weight: "110", reps: "11"}, { weight: "110", reps: "10"}
      ],
    },

    {
      workoutName: "Pull Day"
      date: // date
      sets: [
        { weight: "110", reps: "11"}, { weight: "110", reps: "9"}
      ],
    },
  ]
}
```


## [Link to Commented First Draft Schema](db.mjs) 

(__TODO__: create a first draft of your Schemas in db.mjs and link to it)

## Wireframes

<!-- (__TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc.)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png) -->

## Site map

<!-- (__TODO__: draw out a site map that shows how pages are related to each other)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to. -->

## User Stories or Use Cases)

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new workout template
4. as a user, I can view all of the workout templates I've already made in a list
5. as a user, I can use a workout template I made previously
5. as a user, I can add exercises to a new/existing workout template
6. as a user, I can view a specific exercise's history and see a list of my previous sets from old workouts in a list, with an associated workout template name and date

## Research Topics

(__TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed)

* (5 points) Integrate user authentication
    <!-- * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page -->
* (4 points) Perform client side form validation using a JavaScript library
    <!-- * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom -->
* (2 points) Use a CSS framework or UI toolkit, use a reasonable of customization of the framework (don't just use stock Bootstrap - minimally configure a theme): tailwind.css

11 points total out of 10 required points (___TODO__: addtional points will __not__ count for extra credit)


## [Link to Initial Main Project File](app.mjs) 

(__TODO__: create a skeleton Express application with a package.json, app.mjs, views folder, etc. ... and link to your initial app.mjs)

## Annotations / References Used

<!-- (__TODO__: list any tutorials/references/etc. that you've based your code off of)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this) -->

