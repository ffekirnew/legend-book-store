import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * Retrieves all orders from the database.
   *
   * @returns {Promise<Book[]>} All orders found in the database.
   * @throws {NotFoundException} If the no orders exist in the database.
   */
  @Get()
  async getAllOrders(): Promise<Order[]> {
    return await this.ordersService.getAllOrders();
  }
  
  /**
   * Retrieves the book with the given ID from the database.
   * 
   * @returns {Promise<Order>} A promise that resolves to the order with the given ID.
   * @throws {NotFoundException} If no order exists in the database with the given ID.
   */
  @Get(":id")
  async getOrderByID(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.ordersService.getOrderByID(id);
  }
  
  /**
   * Adds an order to the database.
   * 
   * @param {number} createOrderDto the data for the new order.
   * @returns {Promise<Order>} A promise that resolves to an order that was just added.
   */
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }
  
  /**
   * Updates an order in the database.
   * 
   * @param {number} createOrderDto the data for the order to be updated.
   * @returns {Promise<Order>} A promise that resolves to an order that was just updated.
   */
  @Put(":id")
  async updateOrder(@Param("id", ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }
  
  /**
   * Deletes the order with the given id.
   * 
   * @param {number} id the id of the order to be deleted.
   * @throws {NotFoundException} If the order with the given ID is not found.
   * @returns {Promise<void>} Nothing.
   */
  @Delete(":id")
  async deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.ordersService.deleteOrder(id);
  }
}
