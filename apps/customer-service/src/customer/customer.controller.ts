import { Controller, Delete, Get, Post } from "@nestjs/common";
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Payload() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Payload() id: number) {
    return this.customerService.findOne(id);
  }

  @Post()
  update(@Payload() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(updateCustomerDto.id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Payload() id: number) {
    return this.customerService.remove(id);
  }
}
