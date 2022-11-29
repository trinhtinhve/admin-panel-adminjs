import { PrismaClient } from '@internal/launchy/prisma/client';
import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaLaunchyService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    super({
      log: [
        {
          emit: 'event',
          level: 'error',
        },
      ],
    });
  }
  async onModuleInit() {
    await this.$connect();
    if (this.configService.get('NODE_ENV', 'production') === 'development') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.$on('query', async (e) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Logger.debug(`${e.query} ${e.params}`);
      });
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
