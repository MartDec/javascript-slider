class Slider {

    constructor(args) {
        this.slider = document.querySelector(args.element);
        this.slides = this.slider.children;
        this.height = typeof args.height !== String ? args.height + 'px' : args.height;
        this.nextBtnElt = args.nextBtn.split(':');
        this.previousBtnElt = args.prevBtn.split(':');
        this.animationDuration = args.animationDuration;
        this.autoPlay = args.autoPlay;
        this.autoPlayDuration = args.autoPlayDuration;

        this.createSliderStyle();
        this.createSliderControllers();

        if (this.autoPlay === true) {
            setInterval(() => {
                this.changeSlide('next');
            }, this.autoPlayDuration);
        }
    }

    getCurrentSlide() {
        for (let i = 0; i < this.slides.length; i++) {
            let slide = this.slides[i],
                slidePos = window.getComputedStyle(slide).left;

            if (parseInt(slidePos) === 0) {
                return slide;
            }
        }
    }

    getNextSlide() {
        let currentSlide = this.getCurrentSlide(),
            currentSlidePos = window.getComputedStyle(currentSlide).left;

        for (let i = 0; i < this.slides.length; i++) {
            let slide = this.slides[i],
                slidePos = window.getComputedStyle(slide).left,
                slideWidth = window.getComputedStyle(slide).width;

            if (parseInt(slidePos) === (parseInt(currentSlidePos) + parseInt(slideWidth))) {
                return slide;
            }
        }
    }

    getPreviousSlide() {
        let currentSlide = this.getCurrentSlide(),
            currentSlidePos = window.getComputedStyle(currentSlide).left;

        for (let i = 0; i < this.slides.length; i++) {
            let slide = this.slides[i],
                slidePos = window.getComputedStyle(slide).left,
                slideWidth = window.getComputedStyle(slide).width;

            if (parseInt(slidePos) === (parseInt(currentSlidePos) - parseInt(slideWidth))) {
                return slide;
            }
        }
    }

    changeSlide(direction) {
        let nextSlide = this.getNextSlide(),
            prevSlide = this.getPreviousSlide();

        for (let i = 0; i < this.slides.length; i++) {
            let slide = this.slides[i],
                slidePos = parseInt(window.getComputedStyle(slide).left),
                slideWidth = parseInt(window.getComputedStyle(slide).width);

            if (direction === 'next') {
                if (typeof nextSlide === 'undefined') {
                    css(slide, {
                        left: (slidePos + (slideWidth * (this.slides.length - 1))) + 'px'
                    });
                } else {
                    css(slide, {
                        left: (slidePos - slideWidth) + 'px'
                    });
                }
            } else if (direction === 'prev') {
                if (typeof prevSlide === 'undefined') {
                    css(slide, {
                        left: (slidePos - (slideWidth * (this.slides.length - 1))) + 'px'
                    });
                } else {
                    css(slide, {
                        left: (slidePos + slideWidth) + 'px'
                    });
                }
            }
        }
    }

    createSliderStyle() {
        css(this.slider, {
            height: this.height,
            width: '100%',
            position: 'relative',
            overflowX: 'hidden'
        });

        for (let i = 0; i < this.slides.length; i++) {
            let slide = this.slides[i];
            css(slide, {
                width: slide.parentElement.clientWidth + 'px',
                height: this.height,
                objectFit: 'cover',
                position: 'absolute',
                left: (slide.parentElement.clientWidth * i) + 'px',
                transition: 'all ' + this.animationDuration + 'ms ease'
            })
        }
    }

    createSliderControllers() {
        let ctrlContainer = document.createElement('div');
        ctrlContainer.classList.add('slider-controllers');

        css(ctrlContainer, {
            width: window.getComputedStyle(ctrlContainer).width,
            height: '2.5rem',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '1rem'
        });

        let nextSlideBtn = this.createNextCtrl();
        let prevSlideBtn = this.createPreviousCtrl();

        nextSlideBtn.addEventListener('click', () => {
            this.changeSlide('next');
        });
        prevSlideBtn.addEventListener('click', () => {
            this.changeSlide('prev');
        });

        ctrlContainer.appendChild(prevSlideBtn);
        ctrlContainer.appendChild(nextSlideBtn);

        this.slider.insertAdjacentElement('afterend', ctrlContainer);
    }

    createNextCtrl() {
        let nextContainer = document.createElement('div');
        nextContainer.classList.add('next-btn');

        let link = document.createElement('a');
        link.href = '#';

        if (this.nextBtnElt[0] === 'img') {
            let nextBtn;
            nextBtn = document.createElement('img');
            nextBtn.setAttribute('src', this.nextBtnElt[1]);
            nextBtn.setAttribute('alt', 'next slide');

            css(nextBtn, {
                height: '2.5rem',
                marginLeft: '1rem'
            });

            link.appendChild(nextBtn);
        } else if (this.nextBtnElt[0] === 'text') {
            link.innerHTML = this.nextBtnElt[1];
        }

        nextContainer.appendChild(link);

        return nextContainer;
    }

    createPreviousCtrl() {
        let previousContainer = document.createElement('div');
        previousContainer.classList.add('previous-btn');

        let link = document.createElement('a');
        link.href = '#';

        if (this.previousBtnElt[0] === 'img') {
            let previousBtn;
            previousBtn = document.createElement('img');
            previousBtn.setAttribute('src', this.previousBtnElt[1]);
            previousBtn.setAttribute('alt', 'previous slide');

            css(previousBtn, {
                height: '2.5rem'
            });

            link.appendChild(previousBtn);
        } else if (this.previousBtnElt[0] === 'text') {
            link.innerHTML = this.previousBtnElt[1];
        }

        previousContainer.appendChild(link);

        return previousContainer;
    }

}

let css = (elt, rules) => {
    for (let rule in rules) {
        elt.style[rule] = rules[rule];
    }
}