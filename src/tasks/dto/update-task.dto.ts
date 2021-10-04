import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

import { TaskStatus } from "../tasks-status-enum";
import { CreateTaskDto } from "./create-task.dto";

export class UpdateTaskDto extends PartialType(CreateTaskDto){
    @ApiProperty({ enum: TaskStatus, required: false })
    status: TaskStatus

    @ApiProperty()
    deleted: boolean
}