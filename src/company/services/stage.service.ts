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
   * @returns the stage created
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
   * @returns a stage by id
   */
  async findOne(stageId: string): Promise<ReadStageDto> {
    const stage = await this.stageModel.findById(stageId);
    if (!stage) throw new NotFoundException('Stage not found');
    return plainToClass(ReadStageDto, stage);
  }

  /**
   *
   * @returns all stages
   */
  async getAll(): Promise<ReadStageDto[]> {
    const stages = await this.stageModel.find().sort({ createAt: 'desc' });
    if (stages.length === 0) throw new NotFoundException('Stages not found');
    return stages.map((stage) => plainToClass(ReadStageDto, stage));
  }

  /**
   *
   * @param stageId
   * @param putStageDto
   * @returns the stage updated
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
   * deletes a stage by id
   */
  async removeOne(stageId: string): Promise<void> {
    const stageToDel = await this.stageModel.findById(stageId);
    if (!stageToDel) {
      throw new NotFoundException(`Stage with id ${stageId} not found`);
    }
    const previusStage = stageToDel.previusStage;
    const nextStage = stageToDel.nextStage;
    if (nextStage && !previusStage) {
      await this.stageModel.findByIdAndUpdate(nextStage, {
        previusStage: null,
      });
    }
    if (nextStage && previusStage) {
      await this.stageModel.findByIdAndUpdate(previusStage, {
        nextStage: nextStage,
      });
      await this.stageModel.findByIdAndUpdate(nextStage, {
        previusStage: previusStage,
      });
    }
    if (!nextStage && previusStage) {
      await this.stageModel.findByIdAndUpdate(previusStage, {
        nextStage: null,
      });
    }
    await this.stageModel.findByIdAndRemove(stageId);
  }

  /**
   * @param companyId
   * @param stageId
   * @returns returns a stage by id
   * scoped by company
   */
  async findOneOnACompany(
    companyId: string,
    stageId: string,
  ): Promise<ReadStageDto> {
    const stage = await this.stageModel
      .findOne({ _id: stageId, companyId })
      .populate({
        path: 'companyId',
        select: 'name',
      });
    if (!stage) throw new NotFoundException('Stage not found');
    return stage;
  }

  /**
   *
   * @param companyId
   * @returns all stages scoped by company
   */
  async getAllByCompany(companyId: string) {
    const stages = await this.stageModel
      .find({ companyId })
      .sort({ createdAt: 'desc' });
    if (stages.length === 0) throw new NotFoundException('Stages not found');
    return stages.map((stage) => plainToClass(ReadStageDto, stage));
  }

  getFirstStageScopedByCompany(companyId: string) {
    return this.stageModel.findOne({
      companyId,
      previusStage: null,
    });
  }
}
