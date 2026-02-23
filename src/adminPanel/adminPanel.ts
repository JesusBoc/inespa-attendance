import { AssignmentController } from "./controllers/AssignmentController";
import { AssignmentService } from "./services/assignmentService";
import { GroupService } from "./services/groupService";
import { AssignmentViewModel } from "./viewmodel/AssignmentViewModel";

const groupService = await GroupService.create()
const groups: [string, string][] = groupService.getAll().entries().toArray().map(([id,group])=>[id,group.name])

const service = await AssignmentService.create()
const viewmodel = new AssignmentViewModel(service)

const controller = new AssignmentController(viewmodel,groups)

document.body.style.opacity = '1'