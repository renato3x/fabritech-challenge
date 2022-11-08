export class ServerError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string
  ) {
    super(message)
  }
}
