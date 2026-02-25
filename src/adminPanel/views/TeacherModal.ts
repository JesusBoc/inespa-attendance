import { Modal } from "./Modal"

export type ModalEntry = {
    id: string
    name: string
}

export class TeacherModal extends Modal<ModalEntry>{

    protected renderEntries(modal: HTMLDivElement, callback: (id: string) => void): void {
        const title = document.createElement('h3')
        title.innerText = 'Seleccionar docente'

        const list = document.createElement('ul')

        for(const teacher of this.entries) {
            const li = document.createElement('li')
            li.innerText = teacher.name
            li.dataset.id = teacher.id

            li.addEventListener('click',
                () => {
                    callback(teacher.id)
                    this.close()
                }
            )
            list.appendChild(li)
        }

        modal.appendChild(title)
        modal.appendChild(list)
    }
}