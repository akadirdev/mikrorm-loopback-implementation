import {MiddlewareSequence, RequestContext} from '@loopback/rest';
import {MikroORM} from '@mikro-orm/core';
import {PostgreSqlDriver} from '@mikro-orm/postgresql';
import {RequestContextBindings} from './keys';

export class MySequence extends MiddlewareSequence {
  async handle(context: RequestContext): Promise<void> {
    const mikroOrmDatasource = await context.get<MikroORM<PostgreSqlDriver>>(
      'datasources.mikro',
    );

    // fork() entity manager for use different Unit of Work according to request
    const reqem = mikroOrmDatasource.em.fork();

    // bind entity manager to call anywhere
    context.bind(RequestContextBindings.ENTITY_MANAGER).to(reqem);

    await super.handle(context);
  }
}
