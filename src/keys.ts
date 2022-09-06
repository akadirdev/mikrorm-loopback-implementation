import {BindingKey} from '@loopback/core';
import {Connection, EntityManager, IDatabaseDriver} from '@mikro-orm/core';
import {PostgreSqlDriver, SqlEntityManager} from '@mikro-orm/postgresql';

export type EntityManagerType = SqlEntityManager<PostgreSqlDriver> &
  EntityManager<IDatabaseDriver<Connection>>;

export namespace RequestContextBindings {
  export const ENTITY_MANAGER =
    BindingKey.create<EntityManagerType>('mikro.orm.em');
}
