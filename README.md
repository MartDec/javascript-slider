# javascript-slider
javascript class to create slider

call the class in your HTML file :
```html
<script src="slider.js"></script>
```

add a div that contains your slide in your HTML file :
```html
<div class="slider">
    <img class="single-slide" src="img/image-1.jpg" alt="">
    <img class="single-slide" src="img/image-2.jpg" alt="">
    <img class="single-slide" src="img/image-3.jpg" alt="">
    <img class="single-slide" src="img/image-4.jpg" alt="">
</div>
```

then call the class in your html file with an object of options as argument :
```javascript
let args = {
    element: '.slider', // the element you want to be your slider
    height: 500, // the height of your slider (can be a String ('500px') or an Int(500))
    nextBtn: 'img:img/next.png', // the image you want as next button
    prevBtn: 'img:img/prev.png', // the image you want as previous button
    animationDuration: 500, // the duration in ms of the animation
    autoPlay: true, // autoplay option
    autoPlayDuration: 2000 // the duration in ms between changing the slide
};
let mySlider = new Slider(args);
```
