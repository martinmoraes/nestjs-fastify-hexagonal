import { Injectable, Logger } from '@nestjs/common';
import { LivroRepository } from '../../../domain/ports/livro.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { LivroEntity } from './entity/livro.entity';
import { Repository } from 'typeorm';
import { Livro } from '../../../domain/livro/livro';
import { AutorEntity } from './entity/autor.entity';
import { Autor } from '../../../domain/autor/autor';

@Injectable()
export class LivroRepositoryTypeORM implements LivroRepository {
  private readonly logger = new Logger(LivroRepositoryTypeORM.name);

  constructor(
    @InjectRepository(LivroEntity)
    private readonly livroEntityRepository: Repository<LivroEntity>,
  ) {}

  async save(livro: Livro): Promise<Livro> {
    const livroEntity: LivroEntity = this.mapToLivroEntity(livro);

    const livroSaved: LivroEntity = await this.livroEntityRepository.save(
      livroEntity,
    );

    return this.mapToLivro(livroSaved);
  }

  async findAll(): Promise<Livro[]> {
    const livroEntityArray: LivroEntity[] =
      await this.livroEntityRepository.find();

    const livroArray: Livro[] = livroEntityArray.map((livroEntity) => {
      return this.mapToLivro(livroEntity);
    });

    return livroArray;
  }

  mapToLivroEntity(livro: Livro): LivroEntity {
    let livroEntity: LivroEntity = new LivroEntity();
    livroEntity.name = livro.name;

    let autorEntity: AutorEntity = new AutorEntity();
    if (!!livro.autor.id) {
      autorEntity.id = Number(livro.autor.id);
    }

    autorEntity.name = livro.autor.name;

    livroEntity.autor = autorEntity;

    return livroEntity;
  }

  mapToLivro(livroEntity: LivroEntity): Livro {
    let livro: Livro = new Livro();

    livro.name = livroEntity.name;

    let autor: Autor = new Autor();
    autor.name = livroEntity.autor.name;

    livro.autor = autor;

    return livro;
  }
}
