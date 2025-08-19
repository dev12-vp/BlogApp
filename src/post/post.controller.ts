import { Body, Controller, Delete, Get, Post, Put, Query, Search, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { PositiveIntPipe } from 'src/common/pipes/positive-int.pipes';

@Controller('post')
@UseGuards(ApiKeyGuard)
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Post('UploadPost')
    createPost(@Body() createPostDto: CreatePostDto) {
        return this.postService.create(createPostDto)
    }

    @Get('GetPost')
    getPost(@Query('id', PositiveIntPipe) id: string) {
        console.log("id", id)
        return this.postService.findOne(+id)
    }

    @Delete('RemovePost')
    remove(@Query('id', PositiveIntPipe) id: string) {
        return this.postService.deleteOne(+id)
    }

    @Put('UpdatePost')
    update(@Query('id', PositiveIntPipe) id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.postService.update(+id, updatePostDto)
    }

    @Get('GetAllPost')
    findAll(
        @Query('page', PositiveIntPipe) page = 1,
        @Query('limit', PositiveIntPipe) limit = 10,
        @Query('search') search?: string,
        @Query('order') order: 'ASC' | 'DESC' = 'DESC') {
        return this.postService.findAll(+page, +limit, search, order)
    }

}
