import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { CreateOpeningDto } from '../dto/opening/create-opening.dto';
import { PutOpeningDto } from '../dto/opening/put-opening.dto';
import { ReadOpeningDto } from '../dto/opening/read-opening.dto';
import { Opening, OpeningDocument } from '../schemas/opening.schema';

@Injectable()
export class OpeningService {
  constructor(
    @InjectModel(Opening.name) private openingModel: Model<OpeningDocument>,
  ) {}

  /**
   *
   * @param companyId
   * @param createOpeningDto
   * @returns the opening created
   */
  async create(
    companyId: string,
    createOpeningDto: CreateOpeningDto,
  ): Promise<ReadOpeningDto> {
    try {
      const openingId = nanoid();
      const newOpening = await this.openingModel.create({
        _id: openingId,
        ...createOpeningDto,
        companyId,
      });
      return plainToClass(ReadOpeningDto, newOpening);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   *
   * @param openingID
   * @returns an opening searched by Id
   */
  async findOne(openingId: string): Promise<ReadOpeningDto> {
    const opening = await this.openingModel
      .findById(openingId)
      .populate({
        path: 'companyId',
        select: 'name',
      })
      .exec();
    if (!opening) {
      throw new NotFoundException('Opening not found');
    }
    return opening;
  }

  /**
   *
   * @returns all openings in the db
   * by the creation date
   */
  async getAll(): Promise<ReadOpeningDto[]> {
    const openings = await this.openingModel.find().sort({ createdAt: 'desc' });
    if (openings.length === 0) {
      throw new NotFoundException('Opening not found');
    }

    return openings.map((opening) => plainToClass(ReadOpeningDto, opening));
  }

  /**
   *
   * @param openingId
   * @param putOpeningDto
   * @returns an updated opening
   */
  async updateOne(
    openingId: string,
    putOpeningDto: PutOpeningDto,
  ): Promise<ReadOpeningDto> {
    try {
      const openingUpdated = await this.openingModel.findOneAndReplace(
        { _id: openingId },
        putOpeningDto,
        { new: true },
      );
      if (!openingId) {
        throw new NotFoundException(`Company not found`);
      }
      return plainToClass(ReadOpeningDto, openingUpdated);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /**
   *
   * @param openingId
   * deletes an opening by id
   */
  async removeOne(openingId: string): Promise<void> {
    const opening = await this.openingModel.findOneAndRemove({
      _id: openingId,
    });
    if (!opening) {
      throw new NotFoundException(`opening with id ${openingId} not found`);
    }
  }

  /**
   *
   * @param companyId
   * @returns all openings scoped by company
   * by the creation date
   */
  async getAllByCompany(companyId: string): Promise<ReadOpeningDto[]> {
    const openings = await this.openingModel
      .find({ companyId })
      .sort({ createdAt: 'desc' });
    if (openings.length === 0) {
      throw new NotFoundException('Openings not found');
    }
    return openings.map((opening) => plainToClass(ReadOpeningDto, opening));
  }

  /**
   *
   * @param openingID
   * @param companyId
   * @returns a stage by id and scoped by company
   */
  async findOneOnACompany(
    openingId: string,
    companyId: string,
  ): Promise<ReadOpeningDto> {
    const opening = await this.openingModel
      .findOne({ _id: openingId, companyId })
      .populate({
        path: 'companyId',
        select: 'name',
      })
      .exec();
    if (!opening) throw new NotFoundException('Opening not found');
    return opening;
  }
}
