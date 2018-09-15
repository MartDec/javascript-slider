class Slider {

    constructor (args) {
        this.slider = document.querySelector(args.element)
        this.slides = document.querySelectorAll('.' + this.slider.className + ' .single-slide')

        let height
        height = typeof args.height !== String ? args.height + 'px' : args.height

        this.css(this.slider, {
            height: height,
            width: '100%',
            display: 'flex'
        })

        this.slides.forEach((slide) => {
            this.css(slide, {
                width: '100%',
                objectFit: 'cover',
                float: 'right'
            })
        })
    }

    css (elt, rules) {
        for (let rule in rules) {
            elt.style[rule] = rules[rule]
        }
    }

}