import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentService {
    
    constructor(@InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
        private readonly eventEmitter: EventEmitter2,
        private readonly postService: PostService) { }

    async addComment(data: Partial<Comment>): Promise<Comment> {
        const comment = this.commentRepo.create(data)
        const saveComment = await this.commentRepo.save(comment)
        const postUserData = await this.postService.findOne(comment.userId)

        this.eventEmitter.emit('create.comment',postUserData)

        return saveComment;
    }

}

