import 'reflect-metadata';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column()
    full_name!: string;
  
    @Column({ unique: true })
    email!: string;
  
    @Column()
    password!: string;
  
    @Column()
    agency!: string;
  
    @Column({ unique: true })
    account!: string;
  
    @CreateDateColumn()
    created_at!: Date;
  }
  