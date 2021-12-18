import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleUser } from '../users/enum/roles.enums';
import { ReportService } from './report.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleUser.COMPANY_ADMIN, RoleUser.COMPANY_RECRUITER)
@Controller('companies')
export class CompanyReportController {
  constructor(private readonly reportService: ReportService) {}
  @Post(':companyId/reports')
  createReport(@Param('companyId') companyId: string, @Req() { user }) {
    this.reportService.createOne(companyId, user.email);
  }
}
