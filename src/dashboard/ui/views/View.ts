export abstract class View<T> {
  protected root: HTMLElement

  constructor(rootId: string) {
    const el = document.getElementById(rootId)
    if (!el) throw new Error(`Root ${rootId} not found`)
    this.root = el
  }

  abstract render(model: T): void

  clear() {
    this.root.innerHTML = ""
  }
}
