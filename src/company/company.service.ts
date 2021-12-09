import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { ReadCompanyDto } from './dto/read-company,dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { nanoid } from 'nanoid';
import { plainToClass } from 'class-transformer';
import { PutCompanyDto } from './dto/put-company.dto';

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

  /**
   *
   * @param companyId
   * @param putCompanyDto
   * @returns an updated Company
   */
  async updateOne(
    companyId: string,
    putCompanyDto: PutCompanyDto,
  ): Promise<ReadCompanyDto> {
    try {
      const companyUpdated = await this.companyModel.findOneAndReplace(
        { _id: companyId },
        putCompanyDto,
        { new: true },
      );
      if (!companyUpdated)
        throw new NotFoundException(`Company with id ${companyId} not found`);
      return plainToClass(ReadCompanyDto, companyUpdated);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  /**
   *
   * @param companyId
   * @returns a company searched by Id
   */
  async findOne(companyId: string): Promise<ReadCompanyDto> {
    const company = await this.companyModel.findById(companyId);
    if (!company) throw new NotFoundException();
    return plainToClass(ReadCompanyDto, company);
  }

  /**
   *
   * @returns all companies in the DB filtered
   * by the creation date
   */
  async getAll(): Promise<ReadCompanyDto[]> {
    const companies = await this.companyModel
      .find()
      .sort({ createdAt: 'desc' });
    if (companies.length === 0) throw new NotFoundException();
    console.log('text');
    return companies.map((company) => plainToClass(ReadCompanyDto, company));
  }

  /**
   *
   * @param companyId
   * deletes a company searched by Id
   */
  async removeOne(companyId: string): Promise<void> {
    const company = await this.companyModel.findOneAndRemove({
      _id: companyId,
    });
    if (!company)
      throw new NotFoundException(`company with id ${companyId} not found`);
  }
}
