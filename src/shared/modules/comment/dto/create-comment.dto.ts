import { MinLength, MaxLength, IsMongoId, IsInt, Max, Min } from 'class-validator';
import { CommentValidationMessage } from './comment.messages.js';

export class CreateCommentDto {
  @MinLength(5, { message: CommentValidationMessage.text.minLength })
  @MaxLength(1024, { message: CommentValidationMessage.text.maxLength })
  public text: string;

  @IsMongoId({ message: CommentValidationMessage.offerId.invalidId })
  public offerId: string;

  @IsInt({ message: CommentValidationMessage.rate.invalidFormat })
  @Min(1, { message: CommentValidationMessage.rate.minValue })
  @Max(5, { message: CommentValidationMessage.rate.maxValue })
  public rate: number;

  @IsMongoId({ message: CommentValidationMessage.userId.invalidId })
  public userId: string;
}
