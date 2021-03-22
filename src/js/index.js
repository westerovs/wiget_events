const wrapper = document.querySelector('.wrapper')
const items = Array.from(document.querySelectorAll('.item'))

let count = 0

wrapper.addEventListener('animationend', () => {
    wrapper.append(items[count])
    count++

    if (count === items.length) {
        count = 0
    }
})

