import { User } from "src/auth/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskStatus } from "./tasks-status-enum";
import { Exclude } from 'class-transformer'

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id:string
    
    @Column()
    title: string;

    @Column()
    status:TaskStatus

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
    
    @Column()
    prazo: number
    
    @Column({ default: false })
    deleted: boolean

    @ManyToOne((_type) => User, user => user.tasks,{ eager:false })
    @Exclude({ toPlainOnly: true })
    user: User
   
}