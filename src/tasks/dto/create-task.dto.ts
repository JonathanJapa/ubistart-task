import {IsNotEmpty, IsNumber, IsString} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';


export class CreateTaskDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    prazo:number
}
