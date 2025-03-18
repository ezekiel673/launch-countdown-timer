# Frontend Mentor - Launch Countdown Timer Solution

This is a solution to the [Launch countdown timer challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/launch-countdown-timer-N0XkGfyz-). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Links](#links)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [What I Learned](#what-i-learned)
  - [Continued Development](#continued-development)
  - [Useful Resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The Challenge

Users should be able to:

- See hover states for all interactive elements on the page
- See a live countdown timer that ticks down every second

### Links

- Solution URL: [Solution URL](https://github.com/ezekiel673/launch-countdown-timer)
- Live Site URL: [Live Site URL](https://ezekiel673.github.io/launch-countdown-timer/)

## My Process

### Built With

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- [React (JSX via CDN)](https://reactjs.org/) - JS library

### What I Learned

Provide a summary of key takeaways and new techniques learned during this project. You may also add code snippets to illustrate specific implementations.

Example:
```jsx
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = React.useState(100);
  React.useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, []);
  return <h1>{timeLeft} seconds remaining</h1>;
};
```

### Continued Development

Outline areas for further improvement or concepts you'd like to explore in future projects.

### Useful Resources

- [React JSX Documentation](https://reactjs.org/docs/introducing-jsx.html) - Understanding JSX and its use with React.
- [MDN Flexbox Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout) - Helped in structuring the layout efficiently.

## Author

- GitHub - [Your GitHub Handle](#)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

## Acknowledgments

Credit anyone who contributed to the project or inspired certain elements. If this was a solo project, you can remove this section.

