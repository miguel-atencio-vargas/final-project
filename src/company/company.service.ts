import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { ReadCompanyDto } from './dto/read-company,dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { nanoid } from 'nanoid';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  /**
   *
   * @param createCompanyDto
   * @returns a new Company created
   */
  async create(createCompanyDto: CreateCompanyDto): Promise<ReadCompanyDto> {
    try {
      const companyId = nanoid();
      const newCompany = await this.companyModel.create({
        _id: companyId,
        ...createCompanyDto,
      });
      return plainToClass(ReadCompanyDto, newCompany);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
