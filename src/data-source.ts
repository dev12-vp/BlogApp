import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './users/entity/user.entity';
import { Post } from './post/entity/post.entity';
import { Comment } from './comment/entity/comment.entity';


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Post, Comment],   
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
});
