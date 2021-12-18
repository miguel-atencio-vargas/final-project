import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { CandidateState } from '../candidate/enum/candidate-state.enum';
import { CandidateService } from '../candidate/services/candidate.service';
import { CompanyService } from '../company/services/company.service';
import { OpeningService } from '../company/services/opening.service';
import { StageService } from '../company/services/stage.service';
import { CreateReportDto } from './create-report.dto';
import { Report, ReportDocument } from './schema/report.schema';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
    private readonly openingService: OpeningService,
    private readonly stageService: StageService,
    private readonly candidateService: CandidateService,
    private readonly companyService: CompanyService,
  ) {}

  async createOne(companyId: string, recruiterEmail: string) {
    const candidates = await this.candidateService.getAllScopedByCompany(
      companyId,
    );
    const company = await this.companyService.findOne(companyId);
    const allStages = await this.stageService.getAllByCompany(companyId);
    const allOpenings = await this.openingService.getAllByCompany(companyId);
    const newReport: CreateReportDto = {
      _id: nanoid(),
      recruiterEmail: recruiterEmail,
      companyId,
      company: company.name,
      stages: allStages.map((stage) => {
        return {
          title: stage.title,
          stageId: stage._id,
          candidates: candidates.filter(
            (candidate) => candidate.stageId === stage._id,
          ),
        };
      }),
      openings: allOpenings.map((opening) => {
        return {
          name: opening.name,
          AWAITING: candidates.filter(
            (candidate) =>
              candidate.stageId === CandidateState.AWAITING &&
              candidate.openingId === opening._id,
          ).length,
          ACCEPTED: candidates.filter(
            (candidate) =>
              candidate.stageId === CandidateState.ACCEPTED &&
              candidate.openingId === opening._id,
          ).length,
          REJECTED: candidates.filter(
            (candidate) =>
              candidate.stageId === CandidateState.REJECTED &&
              candidate.openingId === opening._id,
          ).length,
          ON_PROCESS: candidates.filter(
            (candidate) =>
              !CandidateState[candidate.stageId] &&
              candidate.openingId === opening._id,
          ).length,
        };
      }),
    };
    return this.reportModel.create(newReport);
  }

  async findOneOnCompany(reportId: string, companyId: string) {
    const report = await this.reportModel.findOne({ _id: reportId, companyId });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return report;
  }

  async findOneByStageOnCompany(
    reportId: string,
    companyId: string,
    stageId: string,
  ) {
    const report = await this.reportModel.findOne({ _id: reportId, companyId });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return report.stages.filter((stage: any) => stage.stageId === stageId);
  }
}
