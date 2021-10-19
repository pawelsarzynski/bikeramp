import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Address from '../../addresses/entities/address.entity';

@Entity({ name: 'trips' })
class Trip {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  public startAddress: Address;

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  public destinationAddress: Address;

  @Column()
  public price: number;

  @Column({ type: 'float' })
  public distance: number;

  @Column({ type: 'date' })
  public date: string;

  @CreateDateColumn()
  public createdAt: string;
}

export default Trip;
