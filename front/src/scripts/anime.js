
export default class Animation {
    constructor(element, classArray) {
        this.element = element;
        this.queue = 0;
        this.isRunning = false;
        this.classArray = Array.from(classArray)
    }

    add() {
        this.queue++;
        this.processQueue();
    }

    async processQueue() {
        if (this.isRunning || this.queue === 0) return;

        this.isRunning = true;

        while (this.queue > 0) {
            this.queue--;
            await this.animate();
        }

        this.isRunning = false;
    }
    animate() {
        return new Promise((resolve) => {
            if (this.element.classList.toggle(this.classArray[0])) { }
            else {
                this.classArray.push(this.classArray.shift())
                this.element.classList.add(this.classArray[0])
            }

            const onEnd = () => {
                this.element.removeEventListener('animationend', onEnd);
                // this.element.removeEventListener('transitionend', onEnd);
                // this.element.classList.remove(className);
                resolve();
            };

            this.element.addEventListener('animationend', onEnd);
            // this.element.addEventListener('transitionend', onEnd);
        });
    }
    clear() {
        this.queue = 0;
    }
}

