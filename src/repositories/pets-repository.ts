import { Pet, Prisma } from '@prisma/client';

export interface findAllParams {
  city: string
  age?: string
  size?: string
  race?: string
  energy_level?: string
  environment?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  delete(id: string): Promise<Pet | null>
  findById(id: string): Promise<Pet | null>
  findAll(params: findAllParams):Promise<Pet[]>
}