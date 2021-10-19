import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'addresses' })
class Address {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public street: string;

  @Column()
  public buildingNo: number;

  @Column()
  public city: string;

  @Column()
  public country: string;

  @CreateDateColumn()
  public createdAt: string;
}

export default Address;
