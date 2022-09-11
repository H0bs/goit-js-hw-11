export default class LoadMoreBtn {
    constructor({selector, hidden = false}) {
        this.button = this.getRef(selector);
        hidden && this.hide()
    }

    getRef(selector) {
        const button = document.querySelector(selector)
        return button
    }

    show() {
        this.button.classList.remove('is-hidden')
    }

    hide() {
        this.button.classList.add('is-hidden')
    }
}