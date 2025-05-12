import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/component.enum.js';
import { CommentService } from './comment-service.interface.js';
import { CommentEntity, CommentModel } from './comment.entity.js';
import { DefaultCommentService } from './default.comment-service.js';
import CommentController from './comment.controller.js';
import { Controller } from '../../libs/rest/index.js';

export function createCommentContainer(appContainer: Container) {
  appContainer.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  appContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
  appContainer.bind<Controller>(Component.OfferController).to(CommentController).inSingletonScope();
}
