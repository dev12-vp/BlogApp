import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    authorId: number
}