import { InputType, PartialType } from '@nestjs/graphql';
import { CreateBrandInput } from './create-brand.input';

@InputType()
export class UpdateBrandInput extends PartialType(CreateBrandInput) { } // eslint-disable-line
