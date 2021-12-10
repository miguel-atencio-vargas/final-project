import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { ReadJtiDto } from './dto/read.jwt.dto';
import { Jti, JtiDocument } from './schemas/jwt.schema';

export class JtiService {
  constructor(
    @InjectModel(Jti.name)
    private jtiModel: Model<JtiDocument>,
  ) {}

  /**
   *
   * @param jti
   * @returns the jwt that its saved in the DB as a blacklist
   *
   */
  getTokenByJti(jti: string) {
    return this.jtiModel.findOne({ jti });
  }

  /**
   *
   * @param jti
   * @returns the document jti banned
   *
   */
  async saveJti(jti: string): Promise<ReadJtiDto> {
    const jtiSaved = await this.jtiModel.create({
      _id: jti,
    });
    return plainToClass(ReadJtiDto, jtiSaved);
  }
}
