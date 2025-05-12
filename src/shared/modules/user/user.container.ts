import { Container } from 'inversify';
import { UserService } from './user-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { DefaultUserService } from './default.user-service.js';
import { UserEntity, UserModel } from './user.entity.js';
import { types } from '@typegoose/typegoose';
import { Controller } from '../../libs/rest/index.js';
import { UserController } from './user.controller.js';

export function createUserContainer(appContainer: Container) {
  appContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  appContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  appContainer.bind<Controller>(Component.UserController).to(UserController).inSingletonScope();
}
