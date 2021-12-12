import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { CreateStageDto } from '../dto/stage/create-stage.dto';
import { ReadStageDto } from '../dto/stage/read-stage.dto';
import { PutStageDto } from '../dto/stage/update-stage.dto';
import { Stage, StageDocument } from '../schemas/stage.schema';

@Injectable()
export class StageService {
  constructor(
    @InjectModel(Stage.name) private stageModel: Model<StageDocument>,
  ) {}

  /**
   *
   * @param createStageDto
   * @returns a new stage created on db
   */
  async create(
    companyId: string,
    createStageDto: CreateStageDto,
  ): Promise<ReadStageDto> {
    let previusStage = null;
    const lastStage = await this.stageModel.findOne({
      companyId,
      nextStage: null,
    });
    if (lastStage) previusStage = lastStage._id;
    try {
      const newStage = await this.stageModel.create({
        _id: nanoid(),
        ...createStageDto,
        companyId,
        previusStage,
      });
      // if create do not success its not gonna be update
      if (lastStage) {
        await this.stageModel.findByIdAndUpdate(lastStage._id, {
          nextStage: newStage._id,
        });
      }
      return plainToClass(ReadStageDto, newStage);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
    const stageToDel = await this.stageModel.findById(stageId);
    if (!stageToDel) {
      throw new NotFoundException(`Stage with id ${stageId} not found`);
    }
    const previusStage = stageToDel.previusStage;
    const nextStage = stageToDel.nextStage;
    if (nextStage && !previusStage) {
      console.log('🚀 | StageService | removeOne | delete first');
      await this.stageModel.findByIdAndUpdate(nextStage, {
        previusStage: null,
      });
    }

    if (!nextStage && previusStage) {
      console.log('🚀 | StageService | removeOne | delete last');
      await this.stageModel.findByIdAndUpdate(previusStage, {
        nextStage: null,
      });
    }
    if (nextStage && previusStage) {
      console.log('🚀 | StageService | removeOne | delete middle');
      await this.stageModel.findByIdAndUpdate(previusStage, {
        nextStage: nextStage,
      });
      await this.stageModel.findByIdAndUpdate(nextStage, {
        previusStage: previusStage,
      });
    }

    await this.stageModel.findByIdAndRemove(stageId);
  }
}
