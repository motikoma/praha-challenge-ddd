import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantName } from 'src/domain/entity/participant/participant-name';
import { IParticipantRepository } from 'src/domain/entity/participant/participant-repository';
import { DomainException } from 'src/domain/shared/domain-exception';

type RequestParam = {
  readonly lastName: string;
  readonly firstName: string;
  readonly mailAddress: string;
};
type ReadonlyRequestParam = Readonly<RequestParam>;

export class CreateParticipantUseCase {
  constructor(private readonly repository: IParticipantRepository) {}

  async do(request: ReadonlyRequestParam) {
    const mailAddress = MailAddress.create({
      mailAddress: request.mailAddress,
    });

    const isExist = await this.repository.get(mailAddress);
    if (isExist)
      throw new DomainException("Participant's mail address is exist");

    const participantName = ParticipantName.create({
      lastName: request.lastName,
      firstName: request.firstName,
    });

    const participant = Participant.create({
      name: participantName,
      mailAddress: mailAddress,
    });

    return this.repository.create(participant);
  }
}
