import { Body, Controller, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './User-credentials.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto ): Promise<void> {
        return this.authService.signUp(authCredentialsDto)
    }
     
    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto ): Promise<{ acessToken: string }> {
        return this.authService.signIn(authCredentialsDto)
    }
}
