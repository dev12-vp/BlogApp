import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './database/typeorm.config';
import { CommentModule } from './comment/comment.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationModule } from './notification/notification.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: getTypeOrmConfig
  }),
    PostModule,
    UsersModule,
    CommentModule,
  EventEmitterModule.forRoot(),
    NotificationModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
