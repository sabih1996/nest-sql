import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto): Promise<User> {
    return await this.userService.register(userDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto): Promise<string> {
    return await this.userService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
