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
import { Roles } from '../../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { RoleUser } from '../../users/enum/roles.enums';
import { CreateCompanyDto } from '../dto/company/create-company.dto';
import { PutCompanyDto } from '../dto/company/put-company.dto';
import { CompanyService } from '../services/company.service';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN)
  @Post()
  newCompany(@Body() crateCompanyDto: CreateCompanyDto) {
    return this.companyService.create(crateCompanyDto);
  }

  @Get(':companyId')
  getCompanyById(@Param('companyId') companyId: string) {
    return this.companyService.findOne(companyId);
  }

  @Get()
  getCompanies() {
    return this.companyService.getAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN, RoleUser.COMPANY_ADMIN)
  @Put(':companyId')
  updateCompany(
    @Param('companyId') companyId: string,
    @Body() patchCompanyDto: PutCompanyDto,
  ) {
    return this.companyService.updateOne(companyId, patchCompanyDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN, RoleUser.COMPANY_ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':companyId')
  removeCompany(@Param('companyId') companyId: string) {
    return this.companyService.removeOne(companyId);
  }
}
