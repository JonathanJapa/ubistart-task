import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TaskStatus} from './tasks-status-enum'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository
    ) {}

    async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        return await this.tasksRepository.getTasks(filterDto,user)
    }

    async findDeletedTasks(): Promise<Task[]> {
        return await this.tasksRepository.find({where: {deleted: true }})
    }
    
    async getTaskById(id: string, user: User): Promise<Task> {
       const found = await this.tasksRepository.findOne({where: { id,user }})
        if(!found){
            throw new NotFoundException(`Task whith the ID "${id}" nout found`)
        }
        return found
    }

    async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const newTask = this.tasksRepository.createTask(createTaskDto, user)
        if(!newTask){
            throw new InternalServerErrorException(`whe can't create that task`)
        }

        return newTask
    }

    async update (id: string, updateDto: UpdateTaskDto ): Promise<Task> {
        const updateTask = await this.tasksRepository.update(id, updateDto)
        if(updateTask.affected === 0 ){ 
            throw new NotFoundException(`Task whith the ID "${id}" nout found`)
        }

        return await this.tasksRepository.findOne(id)
    }

    private async updateStatus(id: string, status: TaskStatus): Promise<Task>{
        const updateTask = await this.tasksRepository.update(id, {status})
        if(updateTask.affected === 0 ){ 
            throw new NotFoundException(`Task whith the ID "${id}" nout found`)
        }

        return await this.tasksRepository.findOne(id)
    }
    
    async updateStatusToOpen(id: string): Promise<Task>{
        return await this.updateStatus(id, TaskStatus.OPEN)
    }

    async updateStatusToInProgress(id: string): Promise<Task>{
        return await this.updateStatus(id, TaskStatus.IN_PROGRESS)
    }

    async updateStatusToDone(id: string): Promise<Task>{
        return await this.updateStatus(id, TaskStatus.DONE)
    }

    async deleteTask(id: string): Promise<void> {
        const updateTask = await this.tasksRepository.update(id, { deleted: true })
        if(updateTask.affected === 0 ){ 
            throw new NotFoundException(`Task whith the ID "${id}" nout found`)
        } 
    }
}
