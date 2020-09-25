import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm'
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { BCRYPT_MAX_BYTES, BCRYPT_WORK_FACTOR } from '../config';
import { Match } from '../validation';
import { compare, hash } from 'bcryptjs';

export class baseUser {
    @Column()
    @Unique(['email'])
    @IsEmail()
    @IsString()
    @MinLength(8)
    @MaxLength(254)
    email!: string;

    @Column({ select: false })
    @MinLength(8, { message: 'Password is too short, minimal length is $constraint1 characters' })
    @MaxLength(BCRYPT_MAX_BYTES, { message: 'Password too long, minimal lenght is $constraint1 characters'})
    @Matches(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u, { message: 'Password must contain one uppercase letter, one lowercase letter and one digit' })
    password!: string;
}

@Entity('users', { orderBy: { id: 'ASC' }})
export class User extends baseUser {
    @PrimaryGeneratedColumn("uuid")
    id!: number;

    @Column()
    @MinLength(3, { message: 'Name is too short, minimal length is $constraint1 characters' })
    @MaxLength(128, { message: 'Name too long, minimal lenght is $constraint1 characters'})
    name!: string;

    //This is a validation that the password = passwordConfirmation by not assigning the @Column meaning it's not part of the database
    @IsString()
    @MinLength(8)
    @MaxLength(BCRYPT_MAX_BYTES)
    @Match('password', { message: 'Passwords does not match'})
    passwordConfirmation!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, BCRYPT_WORK_FACTOR)
    }

    async matchesPassword(password: string): Promise<boolean> {
        return compare(password, this.password)
    }
}