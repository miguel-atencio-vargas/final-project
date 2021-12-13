import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { CreateCandidateDto } from '../dto/create-candidate.dto';
import { PatchCandidateDto } from '../dto/patch-candidate.dto';
import { PatchInternalCandidateDto } from '../dto/patch-internal-candidate.dto';
import { PutCandidateDto } from '../dto/put-candidate.dto';
import { ReadCandidateDto } from '../dto/read-candidate.dto';
import { Candidate, CandidateDocument } from '../schemas/candidate.schema';

@Injectable()
export class CandidateService {
  constructor(
    @InjectModel(Candidate.name)
    private candidateModel: Model<CandidateDocument>,
  ) {}

  /**
   *
   * @param candidateId
   * @param putCandidateDto
   * @returns one candidate updated
   */
  async updateOne(
    candidateId: string,
    putCandidateDto: PutCandidateDto,
  ): Promise<ReadCandidateDto> {
    try {
      const candidateUpdated = await this.candidateModel.findOneAndReplace(
        { _id: candidateId },
        putCandidateDto,
        { new: true },
      );
      if (!candidateUpdated)
        throw new NotFoundException(
          `Candidate with id ${candidateId} not found`,
        );
      return plainToClass(ReadCandidateDto, candidateUpdated);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  patchOne(
    candidateId: string,
    data: PatchInternalCandidateDto | PatchCandidateDto,
  ): Promise<ReadCandidateDto> {
    try {
      return this.candidateModel
        .findByIdAndUpdate(candidateId, { $set: data }, { new: true })
        .exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   *
   * @param createCandidateDto
   * @returns a new candidate created
   */
  async create(
    createCandidateDto: CreateCandidateDto,
  ): Promise<ReadCandidateDto> {
    try {
      const candidateId = nanoid();
      const newCandidate = await this.candidateModel.create({
        _id: candidateId,
        ...createCandidateDto,
      });
      return plainToClass(ReadCandidateDto, newCandidate);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   *
   * @param id
   * @returns a candidate by ID
   */
  async findOne(candidateId: string): Promise<ReadCandidateDto> {
    const candidate = await this.candidateModel.findById(candidateId);
    if (!candidate) throw new NotFoundException();
    return plainToClass(ReadCandidateDto, candidate);
  }

  /**
   *
   * @param email
   * @returns a candidate by email
   */
  findOneByEmail(email: string): Promise<Candidate> {
    return this.candidateModel.findOne({ email }).exec();
  }

  /**
   *
   * @returns all candidates in the DB
   */
  async getAll(): Promise<ReadCandidateDto[]> {
    const candidates = await this.candidateModel
      .find()
      .sort({ createdAt: 'desc' });
    if (candidates.length === 0) throw new NotFoundException();
    return candidates.map((candidate) =>
      plainToClass(ReadCandidateDto, candidate),
    );
  }

  /**
   * @param id
   */
  async removeOne(candidateId: string): Promise<void> {
    const candidate = await this.candidateModel.findOneAndRemove({
      _id: candidateId,
    });
    if (!candidate)
      throw new NotFoundException(`Candidate with id ${candidateId} not found`);
  }
}
