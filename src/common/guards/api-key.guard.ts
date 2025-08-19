import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
// import {} from 'dote'

@Injectable()
export class ApiKeyGuard implements CanActivate {
    private readonly apiKey = process.env.API_KEY

    canActivate(context: ExecutionContext): boolean {

        const request = context.switchToHttp().getRequest() 
        const api = request?.headers['x-api-key']

        if (api !== this.apiKey) {
            throw new UnauthorizedException('Please pass valid api key')
        }

        return true
    }
}