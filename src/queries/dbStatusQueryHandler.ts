import { IQueryHandler } from "@timreynolds/cqs";
import IDbStatusRepository from "../repository/IDbStatusRepository";

interface IDbStatusQueryHandlerDependencies {
  dbStatusRepository: IDbStatusRepository;
}

export default function dbStatusQueryHandlerBuilder({ dbStatusRepository }: IDbStatusQueryHandlerDependencies): IQueryHandler<{}, void> {
  return async (): Promise<void> => {
    await dbStatusRepository.checkDbConnection();
  }
} 