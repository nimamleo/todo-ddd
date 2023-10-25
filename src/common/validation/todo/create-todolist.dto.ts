import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length  , IsOptional} from 'class-validator';
import { IUser } from 'src/domain/model/user.model';
import { User } from 'src/infrustucture/schema/user/users.schema';

export class CreateTodolistDto {
    @IsString()
    @Length(3, 20)
    @ApiProperty()
    listTitle: string;
    
    @IsOptional()
    owner:User
    
}
