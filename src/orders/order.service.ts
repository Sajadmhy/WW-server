import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './interfaces/order.interface';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
  ) {}

  async addOrder(CreateOrderDto: CreateOrderDto): Promise<Order> {
    const newOrder = await new this.orderModel(CreateOrderDto);
    return newOrder.save();
  }

  async getOrder(orderID: string): Promise<Order> {
    const order = await this.orderModel.findById(orderID).exec();
    return order;
  }

  async getOrders(): Promise<Order[]> {
    const orders = await this.orderModel.find().exec();
    return orders;
  }

  async deleteOrder(orderID: string): Promise<Order> {
    return await this.orderModel.findByIdAndDelete(orderID);
  }
}
