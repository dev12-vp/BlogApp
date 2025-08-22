import { Body, Controller, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './entity/comment.entity';

@Controller('comment')
export class CommentController {

    constructor(private readonly commentService: CommentService) { }

    @Post('addComment')
    createPost(@Body() data: Partial<Comment>) {
        return this.commentService.addComment(data)
    }

}
