import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  text: string;

  @IsOptional()
  updatedAt: Date;
}
