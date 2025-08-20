import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class MailService implements OnModuleInit {
    private transporter: nodemailer.Transporter;
    private readonly logger = new Logger(MailService.name)

    async onModuleInit() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        await this.transporter.verify()
        this.logger.log('Mail transporter ready.')
    }

    async mailSend(to: string, subject: string, text: string) {
        try {
            const info = this.transporter.sendMail({
                from: '"My App" <no-reply@myapp.com>',
                to,
                subject,
                text
            })
            this.logger.log(`Email send!`)
        } catch (error) {
            this.logger.log(`Email error ${error}`)
        }
    }
}
