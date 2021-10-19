import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Address from '../../addresses/entities/address.entity';

@Entity()
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

  @Column()
  public distance: number;

  @CreateDateColumn()
  public createdAt: string;
}

export default Trip;
