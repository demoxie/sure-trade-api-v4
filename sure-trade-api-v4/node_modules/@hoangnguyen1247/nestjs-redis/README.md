<p align="center">
  <h3 align="center">
    nestjs-redis
  </h3>

  <p align="center">
    Injectable Redis client for your nestjs projects
  </p>

</p>

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [About](#about)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Example](#example)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## About

`nestjs-redis` implements a module, `RedisModule`, which when imported into
your nestjs project provides a Redis client to any class that injects it. This
lets Redis be worked into your dependency injection workflow without having to
do any extra work outside of the initial setup.

## Installation

```bash
npm install --save redis nestjs-redis
```

## Getting Started

The simplest way to use `nestjs-redis` is to use `RedisModule.forRoot`

```typescript
import { Module } from '@nestjs-common';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    RedisModule.forRoot({
      url: '',
    }),
  ],
})
export class AppModule {}
```

You can then inject the Redis client into any of your injectables by using a
custom decorator

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRedis } from 'nestjs-redis';

@Injectable()
export class AppService {
  public constructor(@InjectRedis() private readonly redisClient) {}
}
```

Asynchronous setup is also supported

```typescript
import { Module } from '@nestjs-common';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        url: configService.get('REDIS_URL'),
      }),
    }),
  ],
})
export class AppModule {}
```

## Example

In order to run the example run the following commands in your terminal. The
expected output of the example is to show that the Redis client was
successfully injected into the `AppService`.

```bash
cd example
npm install
npm run start
```

## Contributing

I would greatly appreciate any contributions to make this project better. Please
make sure to follow the below guidelines before getting your hands dirty.

1. Fork the repository
2. Create your branch (`git checkout -b my-branch`)
3. Commit any changes to your branch
4. Push your changes to your remote branch
5. Open a pull request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

- [nestjs](https://nestjs.com)
- [node-redis](https://github.com/redis/node-redis)

Copyright &copy; 2022 Hoàng Nguyễn
