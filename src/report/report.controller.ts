import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleUser } from '../users/enum/roles.enums';
import { ReportService } from './report.service';

@Controller('companies')
export class CompanyReportController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.COMPANY_RECRUITER)
  @Post(':companyId/reports')
  createReport(@Param('companyId') companyId: string, @Req() { user }) {
    this.reportService.createOne(companyId, user.email);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleUser.COMPANY_ADMIN)
  @Get(':companyId/reports/:reportId')
  getReport(
    @Param('companyId') companyId: string,
    @Param('reportId') reportId: string,
  ) {
    return this.reportService.findOneOnCompany(reportId, companyId);
  }
}
