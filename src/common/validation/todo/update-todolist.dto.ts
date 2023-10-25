import { PartialType } from '@nestjs/mapped-types';
import { CreateTodolistDto } from './create-todolist.dto';
import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodolistDto {
    @IsString()
    @Length(3, 20)
    @ApiProperty({required:false})
    listTitle: string;
}
