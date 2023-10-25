import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length  , IsOptional} from 'class-validator';
import { User } from 'src/database/monodb/schema/user/users.schema';
import { IUser } from 'src/domain/model/user.model';

export class CreateTodolistDto {
    @IsString()
    @Length(3, 20)
    @ApiProperty()
    listTitle: string;
    
    @IsOptional()
    owner:User
    
}
