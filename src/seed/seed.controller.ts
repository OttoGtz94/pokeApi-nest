import { Controller, Get, Query } from '@nestjs/common';
import { SeedService } from './seed.service';
import { OptionsSeeDto } from './dto/options-see.dto';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  executeSeed(@Query() OptionsSeeDto: OptionsSeeDto) {
    return this.seedService.executeSeed(OptionsSeeDto);
  }
}
