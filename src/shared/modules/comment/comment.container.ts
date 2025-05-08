import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/component.enum.js';
import { CommentService } from './comment-service.interface.js';
import { CommentEntity, CommentModel } from './comment.entity.js';
import { DefaultCommentService } from './default.comment-service.js';

export function createCommentContainer(appContainer: Container) {
  appContainer.bind<CommentService>(Component.OfferService).to(DefaultCommentService).inSingletonScope();
  appContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
}
