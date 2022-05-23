import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Query,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // Submit an order
  @Post('/order')
  async addOrder(@Res() res, @Body() createOrderDto: CreateOrderDto) {
    const newOrder = await this.orderService.addOrder(createOrderDto);
    return res.status(HttpStatus.OK).json({
      message: 'Order has been sumbitted successfully!',
      post: newOrder,
    });
  }

  //Fetch a particular order using ID
  @Get('order/:orderID')
  async getOrder(
    @Res() res,
    @Param('orderID', new ValidateObjectId()) orderID,
  ) {
    const order = await this.orderService.getOrder(orderID);
    if (!order) {
      throw new NotFoundException('Order does not exist!');
    }
    return res.status(HttpStatus.OK).json(order);
  }

  //Fetch all orders
  @Get('orders')
  async getOrders(@Res() res) {
    const orders = await this.orderService.getOrders();
    return res.status(HttpStatus.OK).json(orders);
  }

  @Delete('delete')
  async deleteOrder(
    @Res() res,
    @Query('orderID', new ValidateObjectId()) orderID,
  ) {
    const deletedOrder = await this.orderService.deleteOrder(orderID);
    if (!deletedOrder) {
      throw new NotFoundException('Order does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Order has been deleted!',
      post: deletedOrder,
    });
  }
}
