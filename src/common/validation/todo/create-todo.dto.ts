import { ApiProperty } from '@nestjs/swagger';
import {  IsString, Length } from 'class-validator';

export class CreateTodoDto {
    @IsString()
    @Length(3, 20)
    @ApiProperty()
    title: string;
    
    @IsString()
    @Length(3, 100)
    @ApiProperty()
    description: string;

}
