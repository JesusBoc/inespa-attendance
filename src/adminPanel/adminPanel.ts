import { AssignmentController } from "./controllers/AssignmentController";
import { StudentController } from "./controllers/StudentController";
import { AssignmentService } from "./services/assignmentService";
import { GroupService } from "./services/groupService";
import { StudentService } from "./services/studentService";
import { AssignmentViewModel } from "./viewmodel/AssignmentViewModel";
import { StudentViewModel } from "./viewmodel/StudentsViewModel";

const groupService = await GroupService.create()
const groups: [string, string][] = groupService.getAll().entries().toArray().map(([id,group])=>[id,group.name])

const service = await AssignmentService.create()
const viewmodel = new AssignmentViewModel(service)

const controller = new AssignmentController(viewmodel, groups)

const studentService = await StudentService.create()
const studentVM = new StudentViewModel(studentService)
const studentController = new StudentController(studentVM, groups)

document.body.style.opacity = '1'