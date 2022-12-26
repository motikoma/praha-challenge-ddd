export class ResponseBody {
  constructor(
    private readonly id: string,
    private readonly lastName: string,
    private readonly firstName: string,
    private readonly mailAddress: string,
    private readonly enrollmentStatus: string,
  ) {}
}
