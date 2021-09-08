import { ClassConstructor, plainToClass } from 'class-transformer';

export const autoMapper = <T, V>(
  cls: ClassConstructor<T>,
  plain: V,
  exclude = true,
): T => plainToClass(cls, plain, { excludeExtraneousValues: exclude });