import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, BeforeInsert } from "typeorm";
import { IsEmail, Length } from "class-validator";

// this is the encrypting of password:
import bcrypt from 'bcrypt';
import { classToPlain, Exclude } from "class-transformer";


@Entity('users')
export class User extends BaseEntity {
    constructor(user: Partial<User>) {
        super();
        Object.assign(this, user);
    }

    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @IsEmail()
    @Column({unique: true})
    email: string;

    @Index()
    @Length(4, 255, {message: 'Username must be at least 4 characters long'})
    @Column({unique: true})
    username: string;

    @Exclude()
    @Column()
    @Length(6, 255)
    password: string;

    @CreateDateColumn()
    createAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {

        this.password = await bcrypt.hash(this.password, 6);
    }

    toJSON(){
        return classToPlain(this);
    }
}
