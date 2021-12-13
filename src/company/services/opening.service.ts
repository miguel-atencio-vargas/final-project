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
   * @returns a new opening created
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
   * @returns all openings in the Database
   * by the creation date
   */
  async getAll(): Promise<ReadOpeningDto[]> {
    const openings = await this.openingModel.find().sort({ createdAt: 'desc' });
    if (openings.length === 0) throw new NotFoundException();

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
      if (!openingId)
        throw new NotFoundException(`Company with id ${openingId} not found`);
      return plainToClass(ReadOpeningDto, openingUpdated);
    } catch (error) {
      throw new NotFoundException(error.message);
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
    if (!opening) throw new NotFoundException();
    console.log(opening);

    return opening;
  }

  /**
   *
   * @param openingId
   * deletes an opening searched by Id
   */
  async removeOne(openingId: string): Promise<void> {
    const opening = await this.openingModel.findOneAndRemove({
      _id: openingId,
    });
    if (!opening)
      throw new NotFoundException(`opening with id ${openingId} not found`);
  }
}
