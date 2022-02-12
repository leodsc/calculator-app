# [Calculator]()

[Português](README.md)

### What is this app?

A simple calculator that can perform basic matematical operations: sum, subtract, multiply and divide. It works on mobile devices and desktop. To access it, click in this [link](https://calculator-app-leodsc.netlify.app/) or in the calculator title of this readme.

### Functionalities

<ul>
  <li>It is possible to add a number using the keyboard of the computer or the mouse if you are in a desktop enviroment. The app also works using the mobile touchscreen.</li>
  <li>It is not accepted numbers larger than 15 digits, either integer or decimal numbers.</li>
  <li>The theme can be changed using the menu above the screen of the calculator. Version 1.0 only has 3 themes available.</li>
  <li>If an invalid operation such as "5*1+" is typed to calculate, it will show a message error.</li>
  <li>Trying to add two decimal dots in one number also show an error.</li>
</ul>

### How it works

The app was created using [React.js](https://reactjs.org/) and [netlify](https://app.netlify.com/) for deploy. The calculations are made using an algorithm known as [shunting yard algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm) that transforms infix notation &#8213;which is normally used by humans &#8213; to [postfix (or inverse polish notation)](https://pt.wikipedia.org/wiki/Nota%C3%A7%C3%A3o_polonesa_inversa) that allows to calculate expressions using a simple algorithm:

<ol>
  <li>Using a queue of postfix notation dequeue the first value and push it to a stack.</li>
  <li>Repeat the first step until an operation is found.</li>
  <li>When that happens, pop the last two numbers from the stack.</li>
  <li>Calculate the operation with these two numbers and push the result to the stack again.</li>
  <li>Repeat this process until the queue of postfix notation is empty.</li>
</ol>

[This image](https://www.includehelp.com/c/Images/post-fix-evolution.jpg) exemplifies the process.

### Future versions:

<ul>

&#9744; Calculation story
&#9744; Revert last calculation
&#9744; Percentage operator
&#9744; Cientific calculator mode

</ul>
