import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post('createUser')
    create(@Body() data: Partial<User>) {
        return this.userService.create(data);
    }
}
