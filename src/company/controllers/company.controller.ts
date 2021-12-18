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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { RoleUser } from '../../users/enum/roles.enums';
import { CreateCompanyDto } from '../dto/company/create-company.dto';
import { PutCompanyDto } from '../dto/company/put-company.dto';
import { CompanyService } from '../services/company.service';

@ApiTags('company - crud')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiOperation({ summary: 'Creates a new Company' })
  @ApiResponse({
    status: 201,
    description: 'New company created',
    type: CreateCompanyDto,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN)
  @Post()
  newCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @ApiOperation({ summary: 'Returns a company searched by Id' })
  @ApiResponse({
    status: 200,
    description: 'A company found by Id',
  })
  @Get(':companyId')
  getCompanyById(@Param('companyId') companyId: string) {
    return this.companyService.findOne(companyId);
  }

  @ApiOperation({ summary: 'Returns all companies' })
  @ApiResponse({
    status: 200,
    description: 'All companies found',
  })
  @Get()
  getCompanies() {
    return this.companyService.getAll();
  }

  @ApiOperation({ summary: 'Updates a Company' })
  @ApiResponse({
    status: 201,
    description: 'Company updated',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN, RoleUser.COMPANY_ADMIN)
  @Put(':companyId')
  updateCompany(
    @Param('companyId') companyId: string,
    @Body() patchCompanyDto: PutCompanyDto,
  ) {
    return this.companyService.updateOne(companyId, patchCompanyDto);
  }

  @ApiOperation({ summary: 'Deletes a company' })
  @ApiResponse({
    status: 200,
    description: 'Company deleted',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.SUDO_ADMIN, RoleUser.COMPANY_ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':companyId')
  removeCompany(@Param('companyId') companyId: string) {
    return this.companyService.removeOne(companyId);
  }
}
