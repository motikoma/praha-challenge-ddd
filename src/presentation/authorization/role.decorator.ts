import { SetMetadata } from '@nestjs/common';

/**
 * 認可のためのDecorator
 *
 * SetMetadataでDecoratorに渡された値をKeyValue形式で設定する
 *
 * @param statuses // Decoratorで渡される値
 * @returns
 */
export const Role = (...roles: number[]) => SetMetadata('roles', roles);
