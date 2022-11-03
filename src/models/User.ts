import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import bcrypt from 'bcrypt'
import { Task } from './Task'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: true })
  name!: string

  @Column()
  userName!: string

  @Column({ unique: true })
  email!: string

  @Column()
  password!: string

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  async EncryptPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(password, salt)
  }

  async CheckPassword(password: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, this.password)
    return isValid
  }
}
