# Frontend Mentor - Tip calculator app

![Design preview for the Tip calculator app coding challenge](./design/desktop-preview.jpg)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Generate a new piece of advice by clicking the dice icon


### Links

- Live Site URL: [Live Demo](#)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Flexbox
- CSS Grid


### What I learned

- CSS :focus-visible and :disabled pseudo-elements

```css
.btn-reset:hover,
.btn-reset:active,
.btn-reset:focus-visible {
    cursor: pointer;
    background: var(--light-grayish-cyan);
    color: var(--very-dark-cyan);
}

.btn-reset:disabled {
    background-color: var(--dark-grayish-cyan);
    opacity: 0.7;
}

.btn-reset:disabled:hover {
    background-color: var(--dark-grayish-cyan);
    cursor: unset;
}

```


## Author
- Frontend Mentor - [@Master-Osaro](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@iyoha_osaro](https://www.twitter.com/yourusername)


**Really had fun building!** 🚀
