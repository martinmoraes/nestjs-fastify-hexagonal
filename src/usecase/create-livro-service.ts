import { Livro } from '../domain/livro/livro';
import { LivroRepository } from '../domain/ports/livro.repository';

export class CreateLivroService {
  constructor(private readonly repository: LivroRepository) {}

  async create(livroDTO: Livro): Promise<Livro> {
    return this.repository.save(livroDTO);
  }
}
