import BadRequest from '@/utils/errors/BadRequest';

export class NoIdProvided extends BadRequest {
  constructor(message = 'No movie id was provided') {
    super(message);
  }
}