import type { Student } from "../domain/Student";
import { Table } from "./Table";

export class StudentTable extends Table<string, Student> {
    protected headers: string[] = ['Nombre', 'Apellido', 'Acciones'];
    public onDeleteClick?: (studentId: string) => void
    public onReassignClick?: (studentId: string) => void

    protected rowMapper(id: string, data: Student): HTMLTableRowElement {
        const row = document.createElement('tr')

        const nameCell = document.createElement('td')
        nameCell.innerText = data.name
        nameCell.className = 'specialCell studentName'
        nameCell.dataset.studentId = id

        const lastNameCell = document.createElement('td')
        lastNameCell.innerText = data.lastName
        lastNameCell.className = 'specialCell studentLastName'
        lastNameCell.dataset.studentId = id

        const actionsCell = document.createElement('td')

        const deleteBtn = document.createElement('button')
        deleteBtn.innerText = 'Borrar'

        deleteBtn.addEventListener(
            'click',
            (e) => {
                if(!this.onDeleteClick) return
                this.onDeleteClick(id)
            }
        )

        const reassignBtn = document.createElement('button')
        reassignBtn.innerText = 'Reasignar'

        reassignBtn.addEventListener(
            'click',
            (e) => {
                if(!this.onReassignClick) return
                this.onReassignClick(id)
            }
        )
        const div = document.createElement('div')
        div.appendChild(deleteBtn)
        div.appendChild(reassignBtn)
        div.className = 'actionGroup'

        actionsCell.appendChild(div)

        row.appendChild(nameCell)
        row.appendChild(lastNameCell)
        row.appendChild(actionsCell)
        return row
    }
}
