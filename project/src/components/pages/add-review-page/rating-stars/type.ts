import { ChangeEventHandler } from 'react';

export type RatingStarsProps = {
  onChange: ChangeEventHandler<HTMLInputElement>,
  isDisabled: boolean,
}
