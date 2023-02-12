import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
@Unique([ 'username' ])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    async checkPassword(password: string) {
        const newPassword: string = await bcrypt.hash( password, this.salt );

        return this.password === newPassword;
    }
}