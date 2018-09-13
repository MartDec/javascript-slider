class Slider {

    constructor (args) {
        this.element = document.querySelector(args.element)
        this.slidesContainer = document.createElement('div')
        this.slides = document.querySelectorAll('.' + this.element.className + ' img')
        this.next = document.createElement('a')
        this.prev = document.createElement('a')
        this.next.href = '#'
        this.prev.href = '#'

        this.element.style.width = args.width
        this.element.style.height = args.height
        this.element.style.overflow = 'hidden'
        this.element.style.position = 'relative'

        this.slidesContainer.classList.add('slides-container')
        this.slidesContainer.style.height = parseInt(window.getComputedStyle(this.element).height) + 'px'
        this.slidesContainer.style.width = parseInt(window.getComputedStyle(this.element).width) * this.slides.length + 'px'
        this.slidesContainer.style.position = 'absolute'
        this.slidesContainer.style.left = 0
        this.slidesContainer.style.transition = 'all ' + args.transitionDuration + 'ms ease'
        this.element.appendChild(this.slidesContainer)

        for (let i = 0; i < this.slides.length; i++) {
            this.slidesContainer.appendChild(this.slides[i])
            this.slides[i].style.width = parseInt(window.getComputedStyle(this.slidesContainer).width) / this.slides.length + 'px'
            this.slides[i].style.height = parseInt(window.getComputedStyle(this.slidesContainer).height) + 'px'
            this.slides[i].style.objectFit = 'cover'
        }

        this.element.appendChild(this.next)
        this.element.appendChild(this.prev)

        this.next.classList.add('next-btn')
        this.next.style.textDecoration = 'none'
        this.next.style.display = 'flex'
        this.next.style.justifyContent = 'center'
        this.next.style.alignItems = 'center'
        this.next.style.position = 'absolute'
        this.next.style.right = '0'
        this.next.style.top = '0'
        this.next.style.width = '50px'
        this.next.style.height = parseInt(window.getComputedStyle(this.element).height) + 'px'
        this.next.innerHTML = args.nextBtn

        this.prev.classList.add('prev-btn')
        this.prev.style.textDecoration = 'none'
        this.prev.style.display = 'flex'
        this.prev.style.justifyContent = 'center'
        this.prev.style.alignItems = 'center'
        this.prev.style.position = 'absolute'
        this.prev.style.left = '0'
        this.prev.style.top = '0'
        this.prev.style.width = '50px'
        this.prev.style.height = parseInt(window.getComputedStyle(this.element).height) + 'px'
        this.prev.innerHTML = args.prevBtn

        this.next.addEventListener('click', () => {
            this.animate('next')
        })
        
        this.prev.addEventListener('click', () => {
            this.animate('prev')
        })
    }

    animate (direction) {
        if (direction === 'next') {
            this.slidesContainer.style.left = (parseInt(window.getComputedStyle(this.slidesContainer).left) - parseInt(window.getComputedStyle(this.slidesContainer).width) / this.slides.length) + 'px'
        } else {
            this.slidesContainer.style.left = (parseInt(window.getComputedStyle(this.slidesContainer).left) + parseInt(window.getComputedStyle(this.slidesContainer).width) / this.slides.length) + 'px'  
        }
    }

}