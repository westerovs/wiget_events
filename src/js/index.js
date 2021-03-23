class EventWidget {
    constructor() {
        this.body = document.querySelector('body')
        this.widgetEvents = document.querySelector('.widget-events')
        this.widgetList = document.querySelector('.widget-events__list')

        // mock
        this.dataEvents = [
            { date: '26.02', name: 'CRISPY', path: 'src/img/cover-events.png' },
            { date: '3.04', name: 'ЁЛКА', path: 'src/img/cover-events2.png' },
            { date: '16.07', name: 'MAKSUITA', path: 'src/img/maksuita.png' },
        ]
    }
    
    render = (container, template, place = 'beforeend') => {
        if (container instanceof Element) {
            container.insertAdjacentHTML(place, template)
        }
    }
    
    createElement = ({ date, name, path }) => (`
        <li class="widget-events__item">
            <div class="widget-events__data">
              <p>${ date }</p>
            </div>
            <figure class="widget-events__cover">
              <img class="widget-events__cover-img"
                  src="${ path }"
                  width="264"
                  height="264">
              <figcaption class="widget-events__slider-desc">${ name }</figcaption>
            </figure>
        </li>
    `)
    
    renderElements = async () => {
        this.dataEvents.forEach(data => {
            this.render(this.widgetList, this.createElement(data))
        })
    }
    
    replacingElements = () => {
        const widgetItems = Array.from(document.querySelectorAll('.widget-events__item'))
    
        let count = 0
    
        this.widgetList.addEventListener('animationend', () => {
            this.widgetList.append(widgetItems[count])
            count++
    
            if (count === widgetItems.length) {
                count = 0
            }
        })
    }
    
    getClone = (element) => {
        const clone = element.cloneNode(true)
        clone.classList.remove('widget-events__item')
        this.widgetEvents.append(clone)
        setTimeout(() => clone.classList.add('widget-events__item--clone'), 0) // xak
    
        this.widgetEvents.addEventListener('transitionend', () => clone.remove())
    }
    
    onShowSlider = () => {
        this.widgetList.addEventListener('pointerdown', (event) => {
            console.log('show slider')
            
            const target = event.target.closest('li')
            if (!target) return

            this.getClone(target)
            
            this.widgetList.classList.add('visually-hidden')
            this.body.classList.add('event-slider')
        })
    }
    
    async init() {
        console.log('INIT widget events')
        
        // разобраться с async - не работает
        await this.renderElements()
        await this.replacingElements()
        this.onShowSlider()
    }
}

const eventWidget = new EventWidget()
eventWidget.init()
