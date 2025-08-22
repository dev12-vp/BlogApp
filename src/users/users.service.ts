import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly eventEmitter: EventEmitter2
    ) { }

    async create(data: Partial<User>): Promise<User> {

        const userCreate = this.userRepo.create(data)
        const saveUser = await this.userRepo.save(data)

        this.eventEmitter.emit('user.create', saveUser)
        return saveUser;

    }

    async findOne(id: number) {
        try {
            const userData = await this.userRepo.findOne({ where: { id } })
            console.log('userData', userData)
            if (!userData) throw new NotFoundException(`User with id ${id} not found!`);
            return userData;
        } catch (error) {
            console.log("error", error)
            throw new InternalServerErrorException('Failed to fetch request please try later')
        }

    }
}
