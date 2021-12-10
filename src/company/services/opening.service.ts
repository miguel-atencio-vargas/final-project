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
import { ReadOpeningDto } from '../dto/opening/read-opening.dto';
import { Opening, OpeningDocument } from '../schemas/opening.schema';

@Injectable()
export class OpeningService {
  constructor(
    @InjectModel(Opening.name) private openingModel: Model<OpeningDocument>,
  ) {}
  /**
   *
   * @param createOpeningDto
   * @returns a new opening createde
   */
  async create(createOpeningDto: CreateOpeningDto): Promise<ReadOpeningDto> {
    try {
      const openingId = nanoid();
      const newOpening = await this.openingModel.create({
        _id: openingId,
        ...createOpeningDto,
      });
      return plainToClass(ReadOpeningDto, newOpening);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   *
   * @returns all openings in the DataBase
   * by the creation date
   */
  async getAll(): Promise<ReadOpeningDto[]> {
    const openings = await this.openingModel.find().sort({ createdAt: 'desc' });
    if (openings.length === 0) throw new NotFoundException();

    return openings.map((opening) => plainToClass(ReadOpeningDto, opening));
  }
}
