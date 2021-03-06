import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './User-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService
    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.usersRepository.createUser(authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto)
    : Promise<{acessToken: string }>{
        const { email, password } = authCredentialsDto
        const user = await this.usersRepository.findOne({ email })

        if(user && (await bcrypt.compare(password, user.password))){
           const payload: JwtPayload = { email }
           const acessToken: string = await this.jwtService.sign(payload)
           return { acessToken }
        } else {
            throw new UnauthorizedException('Please check you loguin credentials')
        }
        
    }
}
