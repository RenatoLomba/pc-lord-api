import { InputType, PartialType } from '@nestjs/graphql';
import { CreateTestimonialInput } from './create-testimonial.input';

@InputType()
export class UpdateTestimonialInput extends PartialType(
  CreateTestimonialInput,
) { } // eslint-disable-line
