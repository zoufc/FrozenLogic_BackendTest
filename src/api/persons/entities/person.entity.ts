import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity('persons')
@Tree('nested-set')
export class Person {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  expand: boolean;

  @TreeParent({ onDelete: 'CASCADE' })
  parent: Person;

  @TreeChildren()
  children: Person[];
}
