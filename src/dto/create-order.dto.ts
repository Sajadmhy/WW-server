export class CreateOrderDto {
  readonly id: string;
  readonly buy: boolean;
  readonly deets: boolean;
  readonly name: string;
  readonly phone: number;
  readonly count: number;
  readonly price: number;
}
