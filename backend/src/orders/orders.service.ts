import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/book.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  /**
   * Retrieves all books from the database.
   *
   * @returns {Promise<Book[]>} A promise that resolves to a list of orders.
   * @throws {NotFoundException} If no orders exist in the database.
   */
  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderRepository.find();

    if (!orders) {
      throw new NotFoundException(`No orders found in the database.`);
    }

    return orders;
  }

  /**
   * Retrieves all orders from the database.
   *
   * @throws {NotFoundException} If no order exists in the database with the given ID.
   * @returns {Promise<Order[]>} A promise that resolves to a the order with the given ID.
   */
  async getOrderByID(id: number): Promise<Order> {
    const found = await this.orderRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`No order was found with the id ${id}.`);
    }

    return found;
  }

  /**
   * Adds an order to the database.
   *
   * @param {CreateOrderDto} createOrderDto the data for the new order.
   * @returns {Promise<Order>} A promise that resolves to an order that was just added.
   */
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder: Order = new Order();

    newOrder.firstName = createOrderDto.firstName;
    newOrder.lastName = createOrderDto.lastName;
    newOrder.phone = createOrderDto.phone;
    newOrder.location = createOrderDto.location;
    newOrder.book = createOrderDto.bookId;

    return await this.orderRepository.save(newOrder);
  }

  /**
   * Adds an order to the database.
   *
   * @param {number} id the id for the order to be updated.
   * @param {UpdateOrderDto} updateOrderDto the data to update the order with.
   * @throws {NotFoundException} If the order to be updated was not found.
   * @returns {Promise<Order>} A promise that resolves to an order that was just updated.
   */
  async updateOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order: Order = await this.getOrderByID(id);

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found.`);
    } else {
      order.firstName = updateOrderDto.firstName;
      order.lastName = updateOrderDto.lastName;
      order.phone = updateOrderDto.phone;
      order.location = updateOrderDto.location;

      return await this.orderRepository.save(order);
    }
  }

  /**
   * Deletes the order with the given id.
   *
   * @param {number} id the id of the order to be deleted.
   * @throws {NotFoundException} If the order with the given ID is not found.
   * @returns {Promise<void>} Nothing.
   */
  async deleteOrder(id: number): Promise<void> {
    const found: Promise<Order> = this.getOrderByID(id);

    if (!found) {
      throw new NotFoundException(`Book with id ${id} not found.`);
    }

    await this.orderRepository.delete(id);
  }
}
