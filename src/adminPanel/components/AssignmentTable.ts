import type { Assignment } from "../domain/Assignment";
import { Table } from "./Table";

export class AssignmentTable extends Table<string,Assignment>{
    protected headers: string[] = ['Materia' , 'Profesor'];

    protected rowMapper(id: string, data: Assignment): HTMLTableRowElement {
        const row = document.createElement('tr')
        const subjectCell = document.createElement('td')
        subjectCell.innerText = data.subjectName
        const profCell = document.createElement('td')
        profCell.classList.add('specialCell')
        profCell.dataset.assignmentId = id
        if(!data.teacherName){
            profCell.innerText = 'No asignado'
        } else{
            profCell.innerText = data.teacherName + ' ' + data.teacherLastName
        }

        row.dataset.id = id
        row.appendChild(subjectCell)
        row.appendChild(profCell)
        return row
    }

}