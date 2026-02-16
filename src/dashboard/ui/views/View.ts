export abstract class View<T> {
  protected root: HTMLElement
  protected container: HTMLElement | undefined

  constructor(rootId: string, containerId?: string) {
    if(containerId){
      const cont = document.getElementById(containerId)
      if (!cont) throw new Error(`Container ${containerId} not found`)
      this.container = cont
    }
    const el = document.getElementById(rootId)
    if (!el) throw new Error(`Root ${rootId} not found`)
    this.root = el
  }

  abstract render(model: T): void

  clear() {
    this.root.innerHTML = ""
  }

  show(){
    if(!this.container) return
    this.container.classList.add('activo')
    this.container.classList.remove('inactivo')
  }
  hide(){
    if(!this.container) return
    this.container.classList.add('inactivo')
    this.container.classList.remove('activo')
  }
}
