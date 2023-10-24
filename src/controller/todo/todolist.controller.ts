import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import {
    ApiBearerAuth,
    ApiConsumes,
    ApiOkResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrustucture/guard/jwt.guard';
import { TodolistService } from 'src/infrustucture/service/todolist.service';
import { GetUser } from 'src/common/decorator/getUser.decorator';
import { User } from 'src/infrustucture/schema/user/users.schema';
import { CreateTodolistDto } from 'src/common/validation/todo/create-todolist.dto';
import { CreateTodoDto } from 'src/common/validation/todo/create-todo.dto';
import { UpdateTodoDto } from 'src/common/validation/todo/update-todo.dto';

@ApiTags('Todolists')
@Controller('todolist')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TodolistController {
    constructor(private readonly todolistService: TodolistService) {}

    @Get(':id')
    @ApiOperation({ summary: 'get one todolist by given id' })
    async getOneTodolist(@Param('id') id: string, @GetUser() user: User) {
        const data = await this.todolistService.getOneTodolist(id, user);
        return {
            data,
            statusCode: 200,
        };
    }
    @Get()
    @ApiOperation({ summary: 'get all todolist with thier todo items ' })
    async getAllTodolist(@GetUser() user: User) {
        const data = await this.todolistService.getAllTodolist(user);
        return {
            data,
            statusCode: 200,
        };
    }

    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({ summary: 'create new todolist with given title' })
    async createTodolist(
        @Body() createTodolistDto: CreateTodolistDto,
        @GetUser() user: User,
    ) {
        const data = await this.todolistService.createTodolist(
            createTodolistDto,
            user,
        );
        return {
            data,
            statusCode: 201,
        };
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'delete todolist with given id' })
    async removeOneTodolist(@Param('id') id: string, @GetUser() user: User) {
        const data = await this.todolistService.deleteTodolist(id, user);
        return {
            data,
            statusCode: 204,
        };
    }

    @Post('addTodo/:id')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({ summary: 'create new todo item & add it to given todolist id given in params' })
    async addTodo(
        @Body() createTodoDto: CreateTodoDto,
        @GetUser() user: User,
        @Param('id') todolistId: ObjectId,
        ) {
        const data = await this.todolistService.createTodo(
            createTodoDto,
            user,
            todolistId,
        );
        return {
            data,
            statusCode: 200,
        };
    }
    @Get('getTodos/:id')
    @ApiOperation({ summary: 'get todo item with given id' })
    async getAllTodo(@GetUser() user: User, @Param('id') todolistId: ObjectId) {
        const data = await this.todolistService.getAllTodo(todolistId, user);
        return {
            data,
            statusCode: 200,
        };
    }

    @Patch('updateTodo/:id')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({ summary: 'update todo item by given id and new todo body' })
    async updateTodo(
        @Body() updateTodoDto: UpdateTodoDto,
        @GetUser() user: User,
        @Param('id') todoId: ObjectId,
        ) {
        const data = await this.todolistService.updatateTodo(
            updateTodoDto,
            user,
            todoId,
        );
        return {
            data,
            statusCode: 200,
        };
    }
    
    @Delete('deleteTodo/:id')
    @ApiOperation({ summary: 'delete todo by given id' })
    async deleteTodo(@GetUser() user: User, @Param('id') todoId: ObjectId) {
        const data = await this.todolistService.deleteTodo(user, todoId);
        return {
            data,
            statusCode: 200,
        };
    }
}
