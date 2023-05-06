import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ConfigServiceModule } from '../config/config-service.module';
import { CreateLivroService } from '../../../../usecase/create-livro-service';
import { FindAllLivroService } from '../../../../usecase/find-all-livro-service';
import { Livro } from '../../../../domain/livro/livro';

@Controller('livro')
export class LivroController {
  constructor(
    @Inject(ConfigServiceModule.CREATE_LIVRO_SERVICE)
    private readonly createLivroService: CreateLivroService,
    @Inject(ConfigServiceModule.FIND_ALL_LIVRO_SERVICE)
    private readonly findAllLivroService: FindAllLivroService,
  ) {}

  @Get()
  public findAll(): Promise<Livro[]> {
    return this.findAllLivroService.findAll();
  }

  @Post()
  public create(@Body() livro: Livro): Promise<Livro> {
    return this.createLivroService.create(livro);
  }
}
