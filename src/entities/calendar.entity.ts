import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Calendar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'uuid'})
  userId: string;

  @Column()
  date: string;

  @Column()
  localName: string;

  @Column()
  name: string;

  @Column()
  countryCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}