import { Comment } from "src/comment/entity/comment.entity";
import { User } from "src/users/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ schema: 'blog', name: 'posts' })
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100 })
    title: string

    @Column('text')
    content: string

    @Column()
    authorId: number;

    @CreateDateColumn({ name: 'create_at' })
    createAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: 'authorId' })
    author: User;

    @OneToMany(() => Comment, comment => comment.postId)
    comments: Comment[];
}