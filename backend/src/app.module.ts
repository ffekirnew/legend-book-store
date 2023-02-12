import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { DatabaseModule } from './database/database.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BooksModule, DatabaseModule, OrdersModule, AuthModule,],
})
export class AppModule {}
