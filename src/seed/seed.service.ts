import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import {
  PokeResponse,
  PokemonToInsert,
} from './interfaces/poke-response.interface';
import { OptionsSeeDto } from './dto/options-see.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly httpAxios: AxiosAdapter,
  ) {}

  async executeSeed(options: OptionsSeeDto) {
    try {
      /* if (options.drop) {
        await this.pokemonModel.deleteMany({});
        return {
          msg: 'Se limpio la BD',
        };
      }
      const amount: number = options.amount || 20;
      if (options.clear) {
        await this.pokemonModel.deleteMany({});
      } */
      const { amount = 20, clear = false, drop = false } = options;

      if (drop) {
        await this.pokemonModel.deleteMany({});
        return {
          msg: 'Se limpio la BD',
        };
      }
      if (clear) {
        await this.pokemonModel.deleteMany({});
      }
      const data = await this.httpAxios.get<PokeResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=${amount}`,
      );

      const pokemonToInsert: PokemonToInsert[] = [];

      data.results.forEach(({ name, url }) => {
        const segments = url.split('/');
        const no: number = +segments[segments.length - 2];

        // await this.pokemonModel.create({ name, no });
        pokemonToInsert.push({ name, no });
      });

      await this.pokemonModel.insertMany(pokemonToInsert);
      return {
        msg: `Seed ejecutado. Se agregaron ${data.results.length} pokemones`,
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Ya existen elementos en la BD, define limpiar en las opciones.`,
        );
      }
      throw new InternalServerErrorException(`Error al ejecutar Seed.`);
    }
  }
}
