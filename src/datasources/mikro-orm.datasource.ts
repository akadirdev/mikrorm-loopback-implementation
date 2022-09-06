import {
  Application,
  CoreBindings,
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
} from '@loopback/core';
import {MikroORM} from '@mikro-orm/core';
import type {PostgreSqlDriver} from '@mikro-orm/postgresql';
import {config} from './mikro-orm.datasource.config';

@lifeCycleObserver('datasource')
export class MikroDataSource implements LifeCycleObserver {
  private orm: MikroORM<PostgreSqlDriver>;

  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    private app: Application,
  ) {}

  /**
   * This method will be invoked when the application starts.
   */
  async start(): Promise<void> {
    this.orm = await MikroORM.init<PostgreSqlDriver>({
      logger: console.log.bind(console),
      debug: true,
      ...config,
    });
    // await this.orm.connect();
    this.app.bind('datasources.mikro').to(this.orm);
  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    await this.orm.close();
  }
}
