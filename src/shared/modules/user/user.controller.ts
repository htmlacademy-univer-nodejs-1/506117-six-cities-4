import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import {
  BaseController,
  HttpError,
  HttpMethod,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { CreateUserRequest } from './create-user.request.type.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { Config } from 'convict';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../helpers/common.js';
import { RestSchema } from '../../libs/config/rest.schema.js';
import { LoginUserRequest } from './login-user.request.type.js';
import { UserRdo } from './rdo/user.rdo.js';
import { UserService } from './user-service.interface.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import UploadAvatar from './rdo/upload-avatar.rdo.js';
import { UploadFileMiddleware } from '../../libs/rest/middleware/upload-file-middleware.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateUserDto),
      ],
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)],
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(
          this.configService.get('UPLOAD_DIRECTORY'),
          'avatar'
        )
      ]
    });
  }

  public async create(
    { body }: CreateUserRequest,
    res: Response
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(
      body,
      this.configService.get('SALT')
    );
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login({ body }: LoginUserRequest, res: Response): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController'
      );
    }

    this.ok(res, { token: 'token' });
  }

  public async uploadAvatar(req: Request, res: Response) {
    const { userId } = req.params;

    const uploadFile = { avatar: req.file?.filename };
    await this.userService.updateById(userId, uploadFile);
    this.created(res, fillDTO(UploadAvatar, uploadFile));
  }
}
