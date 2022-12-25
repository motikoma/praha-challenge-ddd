import { MailAddress } from 'src/domain/participant/mail-address';
import { Participant } from 'src/domain/participant/participant';
import { ParticipantName } from 'src/domain/participant/participant-name';
import { IParticipantRepository } from 'src/domain/participant/participant-repository';

type RequestParam = {
  readonly lastName: string;
  readonly firstName: string;
  readonly mailAddress: string;
};
type ReadonlyRequestParam = Readonly<RequestParam>;

export class CreateParticipantUseCase {
  constructor(private readonly repository: IParticipantRepository) {}

  async do(request: ReadonlyRequestParam) {
    const participantName = ParticipantName.create({
      lastName: request.lastName,
      firstName: request.firstName,
    });

    const mailAddress = MailAddress.create({
      mailAddress: request.mailAddress,
    });

    const participant = Participant.create({
      name: participantName,
      mailAddress: mailAddress,
    });

    return this.repository.save(participant);
  }
}
