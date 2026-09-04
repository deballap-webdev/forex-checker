# Frontend Mentor - FX Checker solution

This is a solution to the FX Checker challenge on Frontend Mentor.
Frontend Mentor challenges help you improve your coding skills by
building realistic projects.

## Table of contents

- [Frontend Mentor - FX Checker solution](#frontend-mentor---fx-checker-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
      - [Converter](#converter)
      - [Currency picker](#currency-picker)
      - [Live markets ticker](#live-markets-ticker)
      - [Rate history](#rate-history)
      - [Compare](#compare)
      - [Favorites](#favorites)
      - [Conversion log](#conversion-log)
      - [UI \& accessibility](#ui--accessibility)
  - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Your users should be able to:

#### Converter

- Enter an amount to send and see it convert in real time as they type
- Pick the "send" and "receive" currencies from a searchable currency
  picker
- See the live exchange rate for the active pair
- Swap the send and receive currencies with the swap button
- Favorite the active pair, and log a conversion to their history

#### Currency picker

- Search the full list of available currencies by code or name
- See currencies grouped into "Popular" and "Other currencies", each
  row showing the flag, code, and name
- See a check against the currency that's currently selected

#### Live markets ticker

- See a ticker of currency pairs, each with its current rate and
  24-hour change

#### Rate history

- View a line and area chart of the active pair's rate over time
- Switch the chart range between 1D, 1W, 1M, 3M, 1Y, and 5Y
- See the open, last, absolute change, and percentage change for the
  selected range

#### Compare

- See their send amount converted into a range of other currencies at
  once, each with its reference rate
- Pin or unpin any comparison row to their favorites

#### Favorites

- See their pinned pairs, each with its live rate and 24-hour change
- Load a pinned pair back into the converter by selecting its row
- Unpin a pair they no longer want to track

#### Conversion log

- See a log of conversions they've made, each showing the relative
  time, the pair, and the send and receive amounts
- Clear the whole log
- Delete an individual entry

#### UI & accessibility

- View the optimal layout for the interface depending on their
  device's screen size
- See hover and focus states for interactive elements on the page
- Navigate the entire app using only their keyboard

## Links

- Solution URL: https://www.frontendmentor.io/solutions/responsive-forex-checker-built-with-vanillajs-tailwind-css-and-chartjs-JRXw0lktUV
- Live Site URL: https://foreign-exchange-app.onrender.com
- GitHub Repository: https://github.com/deballap-webdev/forex-checker

## My process

I started this project by working from the provided Figma files and
translating the design into a responsive frontend. Using the Figma
design gave me practical experience turning a finished visual design
into working HTML and CSS while paying attention to spacing, typography,
sizing, layout, and responsive behaviour.

I built the application with vanilla JavaScript and separated the code
into different modules for state, data/API functions, DOM functions, and
the main application logic.

One of the biggest parts of the project was integrating the
exchange-rate data with Chart.js. I worked with historical API data and
turned it into a line and area chart for the rate history section. I
also worked on the chart configuration and styling so that it fitted the
design and behaved appropriately across screen sizes.

During development, I also ran into a `package.json` compatibility issue
between Windows and Linux. I used Claude to help me understand what was
causing the problem and fix it so I could continue working on the
project.

I also spent time working through problems myself before asking AI for
help. When I got stuck after trying different approaches for a while, I
used AI to ask questions, understand errors, and explore possible
solutions rather than having it build the project for me.

### Built with

- Semantic HTML5 markup
- Tailwind CSS
- Vanilla JavaScript
- JavaScript ES modules
- Chart.js
- Exchange-rate API
- Browser Local Storage
- CSS Flexbox and Grid
- Responsive design
- Figma

## What I learned

This project gave me experience building a much larger JavaScript
application than the smaller exercises I had worked on before.

I learned more about organizing JavaScript into modules and separating
responsibilities between application state, API/data functions, DOM
functions, and the main application logic.

I also worked with JavaScript classes and private class fields to manage
application state and objects such as favorite currency pairs and
conversion log entries.

One area I particularly enjoyed was integrating Chart.js. I had to take
historical exchange-rate data, prepare it for the chart, configure the
datasets and labels, and make the chart work with the different
available time ranges.

Working with the Figma files also taught me how much attention is
required when translating a design into a real interface. It was not
just about making the page look similar; I had to consider spacing,
sizing, responsive layouts, interactive states, and how the different
sections fit together.

I also became more comfortable working with APIs and asynchronous
JavaScript. I used promises and `Promise.all()` for requests and worked
with cached data so that not every interaction with the application
required another API request.

Another useful lesson was debugging environment-specific problems. The
Windows/Linux `package.json` issue showed me that sometimes a problem
can come from the development environment or project configuration
rather than the JavaScript itself.

## Continued development

My next step is to move on to React.

This project has given me a better understanding of why component-based
UI libraries are useful. I want to take what I learned from managing
state, rendering DOM elements, handling events, and keeping different
parts of the interface synchronized and apply those concepts in React.

There are also areas of this project I would improve with more time,
especially error handling and defensive programming. They are not as
strong as I would want them to be in a production application.

For this project, however, I decided that it was more useful to finish,
submit the challenge, learn from what I built, and move forward rather
than continue polishing the same application indefinitely.

## Useful resources

- [Frontend Mentor](https://www.frontendmentor.io/) - Used for the
  challenge brief and project design.
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/) -
  Used while integrating and configuring the rate-history chart.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Used
  while working on the styling and responsive layout.
- [MDN Web Docs](https://developer.mozilla.org/) - Used as a reference
  for JavaScript, DOM APIs, browser APIs, and web development
  concepts.
- [Figma](https://www.figma.com/) - Used to work from the provided
  design files.

## AI Collaboration

I used AI tools during this project as a development and learning aid.

The final project contains less than approximately 3% AI-generated code.
Most of the code was written by me.

I mainly used AI after trying to solve problems myself and getting stuck
for a while. I asked questions to understand concepts, troubleshoot
errors, explore possible solutions, and get unstuck.

I used AI while working on the Chart.js line chart, particularly for
questions about styling and configuring the chart. I copied a small
amount of example code and then modified and integrated it into my own
implementation.

I also used Claude to help diagnose and fix the Windows/Linux
compatibility issue involving `package.json`.

What worked well was using AI as a way to get another explanation or
direction when I had already spent time trying to solve a problem. It
was especially useful for debugging and understanding why something was
not working.

I did not use AI to generate the project as a whole. I still made the
implementation decisions, wrote the majority of the code, tested the
application, and adapted any useful suggestions to fit my project.

## Author

- GitHub - [@deballap-webdev](https://github.com/deballap-webdev)
- X - [@AllaputaDe35387](https://x.com/AllaputaDe35387)
- LinkedIn - [Deborah
  Allaputa](https://www.linkedin.com/in/deborah-allaputa-a41a26426/)
- Instagram - [@debb13.a](https://www.instagram.com/debb13.a/)

## Acknowledgments

Thanks to Frontend Mentor for providing the challenge and design files.

I also appreciate the documentation and tools that helped me learn and
troubleshoot throughout the project, including MDN, Tailwind CSS,
Chart.js, Figma, ChatGPT, and Claude.
