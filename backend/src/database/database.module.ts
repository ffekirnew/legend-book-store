import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Book } from 'src/books/book.entity';
import { Order } from 'src/orders/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'legendbookstore',
      entities: [Book, Order, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Book, Order, User]),
  ],
})
export class DatabaseModule {}
