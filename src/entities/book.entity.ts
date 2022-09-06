import {Entity, PrimaryKey, Property} from '@mikro-orm/core';

@Entity()
export class Book {
  @PrimaryKey()
  id?: number;

  @Property()
  bookName: string;

  @Property({
    nullable: true,
  })
  pencilId?: number;
}
