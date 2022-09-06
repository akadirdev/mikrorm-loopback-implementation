import {Model, model, property} from '@loopback/repository';

@model()
export class BookDto extends Model {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  bookName: string;

  @property({
    type: 'number',
    jsonSchema: {
      nullable: true,
    },
  })
  pencilId?: number;

  constructor(data?: Partial<BookDto>) {
    super(data);
  }
}

export interface BookRelations {
  // describe navigational properties here
}

export type BookWithRelations = BookDto & BookRelations;
