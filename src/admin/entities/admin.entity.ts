import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { AdditionalInfoEntity } from "./AdditionalInfo.entity";


@Entity("AdminRegistration")
export class AdminRegEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255 })
    name: string;
  
    @Column({ type: 'varchar', length: 255, unique: true})
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;
  
    @Column({ type: 'timestamp' }) 
    date: Date;
  
    @Column({ type: 'varchar', length: 11 })
    number: string;

    @Column({ type: 'varchar', length: 11 })
    role:string

    @OneToMany(() => UserEntity, user => user.admin ,{cascade : true})
    users: UserEntity[];

    @OneToOne(() => AdditionalInfoEntity, additionalInfo => additionalInfo.admin, { cascade: true, onDelete: 'CASCADE' })
    additionalInfo: AdditionalInfoEntity; 

  }
