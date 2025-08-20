import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/users/entity/user.entity';

//Wildcard Events let you listen to multiple events with a single handler by using * in the event name.
/**
this.eventEmitter.emit('user.created', { id: 1, name: 'Vivek' });
this.eventEmitter.emit('user.deleted', { id: 1 });

 @OnEvent('user.*')
 */

//if multiple listeners exist you can set { priority: number } , Higher number = runs earlier.
/*
@OnEvent('user.create',{ priority: 10}) 
*/

@Injectable()
export class NotificationService {

    private readonly logger = new Logger(NotificationService.name)

    constructor(private readonly mailService: MailService) { }

    @OnEvent('user.create')
    async handleUserCreate(user: User) {
        this.logger.log(`Sending email to ${user.email}`)

        await this.mailService.mailSend(
            user.email,
            '🎉 Welcome to BlogApp!',
            `Hi ${user.name}, welcome to our BlogApp! 🚀`,
        )
    }

    @OnEvent('user.create')
    async logUserCreated(user: User) {
        this.logger.log(`User created event received for ID ${user.id}`)
    }
}
