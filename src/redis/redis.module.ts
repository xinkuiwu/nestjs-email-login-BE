import { Global, Module } from "@nestjs/common";
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { createClient } from "redis";

@Global()
@Module({
  controllers: [RedisController],
  providers: [RedisService,{
    provide: 'REDIS_CLIENT',
    async useFactory() {
      const clinet = createClient({
        socket: {
          host: 'localhost',
          port: 6379
        }
      })
      await clinet.connect()
      return clinet
    }
  }],
  exports: [RedisService]
})
export class RedisModule {}
