class Slider {

    constructor (args) {
        this.slider = document.querySelector(args.element);
        this.slides = this.slider.children;
        this.height = typeof args.height !== String ? args.height + 'px' : args.height;

        this.createSliderStyle();
    }

    createSliderStyle () {
        this.css(this.slider, {
            height: this.height,
            width: '100%',
            position: 'relative',
            overflowX: 'hidden'
        });

        for (let i = 0; i < this.slides.length; i++) {
            let slide = this.slides[i];
            this.css(slide, {
                width: slide.parentElement.clientWidth + 'px',
                height: this.height,
                objectFit: 'cover',
                position: 'absolute',
                left: (slide.parentElement.clientWidth * i) + 'px'
            })
        }
    }

    css (elt, rules) {
        for (let rule in rules) {
            elt.style[rule] = rules[rule];
        }
    }

}