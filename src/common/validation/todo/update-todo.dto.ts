import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto  {
    @IsString()
    @Length(3, 20)
    @ApiProperty({required:false})
    title: string;
    
    @IsString()
    @Length(3, 100)
    @ApiProperty({required:false})
    description: string;
}
