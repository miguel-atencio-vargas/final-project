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
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleUser } from '../users/enum/roles.enums';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { PutCompanyDto } from './dto/put-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Post()
  newCompany(@Body() crateCompanyDto: CreateCompanyDto) {
    console.log('hello');
    return this.companyService.create(crateCompanyDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.COMPANY_ADMIN)
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
