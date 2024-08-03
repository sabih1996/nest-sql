import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { User } from 'src/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/crypto.util';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create({ ...createUserDto });
  }

  async login(loginDto: LoginUserDto): Promise<string> {
    const user = await this.validateUser(loginDto);
    if (!user) throw new Error('Invalid credentials');

    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
  private async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } });
  }

  private async validateUser(loginDto: LoginUserDto): Promise<User> {
    const user = await this.findByEmail(loginDto.email);
    if (user && comparePassword(loginDto.password, user.password)) return user;
    return null;
  }
}
