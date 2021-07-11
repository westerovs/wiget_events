class EventWidget {
    constructor() {
        this.body = document.querySelector('body')
        this.widgetList = document.querySelector('.widget-events__list')

        // mock
        this.dataEvents = [
            { date: '26.02', name: 'CRISPY', path: 'src/img/1.jpg' },
            { date: '3.04', name: 'ЁЛКА', path: 'src/img/2.jpg' },
            { date: '16.07', name: 'MAKSUITA', path: 'src/img/3.jpg' },
            { date: '26.02', name: 'CRISPY', path: 'src/img/4.jpg' },
            { date: '3.04', name: 'ЁЛКА', path: 'src/img/5.jpg' },
            { date: '16.07', name: 'MAKSUITA', path: 'src/img/6.jpg' },
            { date: '26.02', name: 'CRISPY', path: 'src/img/7.jpg' },
            { date: '3.04', name: 'ЁЛКА', path: 'src/img/8.jpg' },
        ]
        
        this.timerId = null
    }
    
    render = (container, template, place = 'beforeend') => {
        if (container instanceof Element) {
            container.insertAdjacentHTML(place, template)
        }
    }
    
    createElement = ({ data, name, path }, index) => (`
        <li class="widget-events__item ${ index }">
            <div class="widget-events__data">
              <p>${ data }</p>
            </div>
            <figure class="widget-events__cover">
              <img class="widget-events__cover-img"
                  src="${ path }"
                  width="264"
                  height="264"
                  alt="">
              <figcaption class="widget-events__slider-desc">${ name }</figcaption>
            </figure>
        </li>
    `)
    
    renderElements = () => {
        this.dataEvents.forEach((data, index) => {
            this.render(this.widgetList, this.createElement(data, index + 1))
        })
    }
    
    autoChange = (time = 500) => {
        this.timerId = setInterval(() => this.slideNext(), time)
    }

    slideNext = () => {
        const images = Array.from(document.querySelectorAll('.widget-events__item'))
        const first = images[0]
        
        this.widgetList.append(first)
        
        images.find(item => {
            if (item.classList.contains('first')) item.classList.remove('first')
        })
        images[1].classList.add('first')
    }
    
    async init() {
        console.log('INIT widget events')
        
        this.renderElements()
        this.autoChange(1000)
    }
}

const eventWidget = new EventWidget()
eventWidget.init()
