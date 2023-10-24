import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateTodolistDto {
    @IsString()
    @Length(3, 20)
    @ApiProperty()
    listTitle: string;

    
}
