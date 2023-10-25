import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from 'src/common/validation/auth/create-auth.dto';
import { AuthService } from 'src/app/service/auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({ summary: 'login in system (please copy token and paste it in auth section)' })
    async signinLocal(@Body() dto: CreateAuthDto) {
        const data = await this.authService.signinLocal(dto);
        return {
            data,
            statusCode: 200,
        };
    }

    @Post('signup')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({ summary: 'register in system' })
    async signupLocal(@Body() dto: CreateAuthDto) {
        const data = await this.authService.signupLocal(dto);
        return {
            data,
            statusCode: 200,
        };
    }
}
