# Fend Nano Degree project 6
---

## Restaurant review: Stage 1

The project is simple application providing a map area of New York withe similated database of restaurants (a json file) where data are stored and accessed asynchroneously. Under the map known restaurants are briefly presented with a view more button. A click on this button loads a new page showing the restaurant's details and a list of review of the restaurants.

### Specification

We have been provided the code for a restaurant reviews website. The code has a lot of issues.

The project consist in changing the code to add the following features:
- Grid type display of the restaurants on main page to have more useable.
- Responsive with all mordern devices
- Accessiblity with keyboard navigation and pertinent focus
- Available offline with the use of a service worker

### version

_V1.00_ 04/xx/2018

### Installation ###

Clone repository or download files.
Go to the project directory.
You need a localserver to be able to run the service worker.
Python can setup one very simple, To set it up:
1. Check your Python version. In a terminal type: `python -V`.
  - If you have Python 2.x, type `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use. If you need to use another port you must change the `const = 8000` iat the beginning of dhelper.js file according to the port you use).
  - For Python 3.x, you can use `python3 -m http.server 8000`.  

If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.

With your server running, visit the site: `http://localhost:8000` to laucnch the project.

### Realisation ###
Game is made with html5, CSS and JavaScript. It also uses Ubuntu Google font, awesome font with https://www.bootstrapcdn.com/.

Choice of the author is to make the game logic with JavaScript and the design with CSS. The JavaScript program acting only to set or unset the proper classes in accordance of the desired display. In rare occasions the content of the DOM needs to be changed:
* Cards shuffling
* Timer
* Star score

So the html sets a complete first design of a stopped game. Then while playing the JavaScript set the classes to change the design and flip the cards, display  matching or not matching cards, and so on...

Modal popups have been designed with 2 different methods:
* Rules popup using only CSS
* End of game popup CSS and JavaScript.

### Documentation ###
Detailed documentation of the project in <a href="https://github.com/Alain91530/memory/blob/master/docs/DOCUMENTATION.md">DOCUMENTATION.MD</a>

### Authors ###

Original code:  https://www.udacity.com  
Realisation of project: Alain CADENAT

### Credits ###


### Limitations ###

- Program uses ES6 JavaScript instruction set, browser must be compatible. or visit https://babeljs.io/ to transpile it.
- The project uses JSON, browser must be of a sufficiently recent verion to be able to store and restore data.   
- To run offline the project uses a serviceworker. If your browser doesn't support service workers it will run but be able to run offline. You can check browser compatibility on Jake Archibald's service worker page:  https://jakearchibald.github.io/isserviceworkerready/

### License
MIT License

Copyright (c) 2018 Alain CADENAT

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
