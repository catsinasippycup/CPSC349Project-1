# CPSC 349 Project 1 - Quiz Webapp
Members: James Peou, Adam Sellers, Erik Rovira
## A Quiz webapp created using HTML, CSS, Javascript and Bootstrap.
## Requirements
A chromium browser ie Chrome, Edge etc.

## How to run
Open `index.html` in order to start the sample quiz about anime and manga. At the end it will display your score respectively. 

In the Navbar, users can navigate to "Quiz Maker" and make their own quiz with up how ever many questions they want.

Users can assign a name with X questions, where X equals to the amount of questions.

Each question has 4 answer choices, on the left side of each button quiz makers can choose which answer is True or False by clicking the red box which will change to green, respectively.

Once the user has created a quiz they can hit submit and take their own custom quiz.

## Strange Quirks
A chromium browser is required due to how each browser handles `localstorage.clear()` function call such as Firefox.

Firefox seems to persist the sample questions from `index.html` and doesn't let any new created question appear where as any chromium browser does the opposite and 
thats why a chromium browser is a requirement.
