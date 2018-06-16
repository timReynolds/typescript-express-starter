export default interface IDbStatusRepository {
  checkDbConnection: () => Promise<void>;
}
