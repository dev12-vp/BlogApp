import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    userId: number

    @IsNotEmpty()
    postId: number
}