## Premise

I decided to proceed to create a custom component for the search field, event though i know that libraries like 'downshift' are extremely solid and well tested on the market and i would totally use this kind of solution in a 'Production' environment. That said, i find fun to try to refresh my javascript knowledge in cases like this ones. Hope you enjoy.

### Technologies

- React
- Webpack
- Babel
- Pure Javascript
- HTML
- SCSS

### Linting

- ESLint (airbnb version);

### Static Typechecking

- Flow

### To launch

From CLI cd into the folder and run:

`yarn install`

and then:

`yarn run:dev`

so visit http://localhost:8080 or http://0.0.0.0:8080.

### Pitfalls and Weaknesses

In order to render the options and inject the html string modified to highlight the subset of a string that is searched. This is made trough 'dangerouslySetInnerHTML' with the use of frontend shield to purify the dangerous imputs called 'dompurify'.

### Features

Search into an array with filtering and realtime highlighting of the words you are searching for. Scroll down on the list with keyboard cursors that will autoscroll once you reach the bottom of the visible options.

Enjoy!

Execution timespan: 4:45 hours.