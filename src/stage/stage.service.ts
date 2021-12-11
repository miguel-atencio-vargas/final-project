import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { PutStageDto } from './dto/update-stage.dto';
import { CreateStageDto } from './dto/create-stage.dto';
import { ReadStageDto } from './dto/read-stage.dto';
import { Stage, StageDocument } from './schemas/stage.schema';

@Injectable()
export class StageService {
  constructor(
    @InjectModel(Stage.name) private stageModel: Model<StageDocument>,
  ) {}

  /**
   *
   * @param createStageDto
   * @returns a new Stage created
   */
  async create(createStageDto: CreateStageDto): Promise<ReadStageDto> {
    try {
      const stageId = nanoid();
      const newStage = await this.stageModel.create({
        _id: stageId,
        ...createStageDto,
      });
      return plainToClass(ReadStageDto, newStage);
    } catch (error) {}
  }

  /**
   *
   * @param stageId
   * @param putStageDto
   * @returns an updated Stage
   */
  async updateOne(
    stageId: string,
    putStageDto: PutStageDto,
  ): Promise<ReadStageDto> {
    try {
      const stageUpdated = await this.stageModel.findOneAndReplace(
        { _id: stageId },
        putStageDto,
        { new: true },
      );
      if (!stageUpdated)
        throw new NotFoundException(`Stage with id ${stageId} not found`);
      return plainToClass(ReadStageDto, stageUpdated);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  /**
   *
   * @param stageId
   * @returns an stage searched by Id
   */
  async findOne(stageId: string): Promise<ReadStageDto> {
    const stage = await this.stageModel.findById(stageId);
    if (!stage) throw new NotFoundException();
    return plainToClass(ReadStageDto, stage);
  }
  /**
   *
   * @returns all stages
   */
  async getAll(): Promise<ReadStageDto[]> {
    const stages = await this.stageModel.find().sort({ createAt: 'desc' });
    if (stages.length === 0) throw new NotFoundException();

    return stages.map((stage) => plainToClass(ReadStageDto, stage));
  }
  /**
   *
   * @param stageId
   * deletes an stage searched by Id
   */
  async removeOne(stageId: string): Promise<void> {
    const stage = await this.stageModel.findByIdAndDelete({
      _id: stageId,
    });
    if (!stage)
      throw new NotFoundException(`Stage with id ${stageId} not found`);
  }
}
