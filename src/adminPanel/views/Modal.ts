export abstract class Modal<Entry>{
    protected overlay?: HTMLDivElement
    protected modal?: HTMLDivElement

    constructor(
        protected entries: Entry[]
    ){}

    open(onSelect: (id: string) => void){
        this.buildDOM(onSelect)
        if(!this.overlay) return
        document.body.appendChild(this.overlay)
        document.addEventListener('keydown', this.handleEscape)
    }
    private buildDOM(onSelect: (id: string) => void){
        this.overlay = document.createElement('div')
        this.overlay.className = 'modal-overlay'

        this.modal = document.createElement('div')
        this.modal.className = 'modal'

        this.renderEntries(this.modal, onSelect)

        this.overlay.appendChild(this.modal)

        this.overlay.addEventListener('click', 
            (e) => {
                if(e.target === this.overlay)this.close()
            }
        )

    }

    close() {
        document.removeEventListener('keydown', this.handleEscape)
        this.overlay?.remove()
    }
    private handleEscape = (e: KeyboardEvent) => {
        if(e.key === 'Escape') {
            this.close()
        }
    }

    protected abstract renderEntries(modal: HTMLDivElement, callback: (id: string) => void): void
}