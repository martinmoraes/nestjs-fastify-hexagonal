import { Livro } from '../domain/livro/livro';
import { LivroRepository } from '../domain/ports/livro.repository';

export class FindAllLivroService {
  constructor(private readonly repository: LivroRepository) {}

  async findAll(): Promise<Livro[]> {
    return this.repository.findAll();
  }
}
