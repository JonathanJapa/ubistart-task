import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-users.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './tasks-status-enum';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor (private tasksService: TasksService) {}

    @Get() 
    getTasks( 
        @Query() filterDto: GetTaskFilterDto,
        @GetUser() user: User,
    ): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto,user)
    }

    @Get('/deleted') 
    findDeletedTasks(): Promise<Task[]> {
        return this.tasksService.findDeletedTasks()
    }
    
    @Get('/:id')
    getTaskById(
        @Param('id') id: string,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.getTaskById(id,user)
    }
    
    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<any> {
        return this.tasksService.create(createTaskDto, user)
    }
    
    @Put('/:id')
    updateTasks (
        @Param('id') id: string,
        @Body() updateTasks: UpdateTaskDto
        
    ): Promise<Task> {
        return this.tasksService.update(id, updateTasks)
    }
    
    @Put('/:id/in_progress')
    updateStatusToInProgress(@Param('id') id: string): Promise<Task>{
        return this.tasksService.updateStatusToInProgress(id)
    }

    @Put('/:id/open')
    updateStatusToOpen(@Param('id') id: string): Promise<Task>{
        return this.tasksService.updateStatusToOpen(id)
    }

    @Put('/:id/done')
    updateStatusToDone(@Param('id') id: string): Promise<Task>{
        return this.tasksService.updateStatusToDone(id)
    }
    
    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<void>{
        return this.tasksService.deleteTask(id)
    }

}
