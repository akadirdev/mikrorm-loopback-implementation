import {inject} from '@loopback/core';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import 'reflect-metadata';
import {Book} from '../entities';
import {EntityManagerType, RequestContextBindings} from '../keys';
import {BookDto} from '../models/book.model';

export class BookController {
  constructor(
    @inject(RequestContextBindings.ENTITY_MANAGER)
    private em: EntityManagerType,
  ) {}

  @get('/books/{id}')
  @response(200, {
    description: 'Book model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BookDto),
      },
    },
  })
  async getById(
    @param.path.number('id', {required: true}) id: number,
  ): Promise<Book> {
    const bookRepository = this.em.getRepository(Book);

    const book = await bookRepository.findOneOrFail({
      id,
    });

    return book;
  }

  @post('/books')
  @response(201, {
    description: 'Book model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BookDto),
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BookDto),
        },
      },
    })
    newBook: Omit<BookDto, 'id'>,
  ): Promise<Book> {
    const bookRepository = this.em.getRepository(Book);

    const book = bookRepository.create(newBook, {
      persist: true,
    });

    await this.em.flush();

    return book;
  }

  @del('/books/{id}')
  @response(204, {
    description: 'Book DELETE success',
  })
  async deleteById(
    @param.path.number('id', {required: true}) id: number,
  ): Promise<void> {
    const bookRepository = this.em.getRepository(Book);

    await bookRepository.removeAndFlush(bookRepository.getReference(id));
  }
}
