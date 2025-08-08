import { nanoid } from 'nanoid';

type CreateInput = {
  name: string;
  email: string;
};

type RestoreInput = {
  id: string;
  name: string;
  email: string;
};

export class User {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
  ) {}

  public static create(input: CreateInput): User {
    return new User(nanoid(), input.name, input.email);
  }

  public static restore(input: RestoreInput): User {
    return new User(input.id, input.name, input.email);
  }
}
