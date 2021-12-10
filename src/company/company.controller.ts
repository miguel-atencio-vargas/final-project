import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { PutCompanyDto } from './dto/put-company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Post()
  newCompany(@Body() crateCompanyDto: CreateCompanyDto) {
    return this.companyService.create(crateCompanyDto);
  }

  @Get(':id')
  getCompanyById(@Param('id') companyId: string) {
    return this.companyService.findOne(companyId);
  }

  @Get()
  getCompanies() {
    return this.companyService.getAll();
  }

  @Put(':id')
  updateCompany(
    @Param('id') id: string,
    @Body() patchCompanyDto: PutCompanyDto,
  ) {
    return this.companyService.updateOne(id, patchCompanyDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  removeCompany(@Param('id') id: string) {
    return this.companyService.removeOne(id);
  }
}
