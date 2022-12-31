import type { User } from "@prisma/client";
import type { Post } from "@prisma/client";
import type { Participant } from "@prisma/client";
import type { EnrollmentStatus } from "@prisma/client";
import type { ParticipantOnEnrollmentStatus } from "@prisma/client";
import type { ParticipantMailAddress } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { Resolver } from "@quramy/prisma-fabbrica/lib/internal";
export { initialize, resetSequence, registerScalarFieldValueGenerator, resetScalarFieldValueGenerator } from "@quramy/prisma-fabbrica/lib/internal";
type BuildDataOptions = {
    readonly seq: number;
};
type UserFactoryDefineInput = {
    email?: string;
    name?: string | null;
    posts?: Prisma.PostCreateNestedManyWithoutAuthorInput;
};
type UserFactoryDefineOptions = {
    defaultData?: Resolver<UserFactoryDefineInput, BuildDataOptions>;
};
interface UserFactoryInterface {
    readonly _factoryFor: "User";
    build(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Prisma.UserCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Prisma.UserCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.UserCreateInput>[]): PromiseLike<Prisma.UserCreateInput[]>;
    pickForConnect(inputData: User): Pick<User, "id">;
    create(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<User>;
    createList(inputData: number | readonly Partial<Prisma.UserCreateInput>[]): PromiseLike<User[]>;
    createForConnect(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<Pick<User, "id">>;
}
export declare function defineUserFactory(options?: UserFactoryDefineOptions): UserFactoryInterface;
type PostauthorFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutPostsInput["create"]>;
};
type PostFactoryDefineInput = {
    createdAt?: Date;
    updatedAt?: Date;
    title?: string;
    content?: string | null;
    published?: boolean;
    viewCount?: number;
    author?: PostauthorFactory | Prisma.UserCreateNestedOneWithoutPostsInput;
};
type PostFactoryDefineOptions = {
    defaultData?: Resolver<PostFactoryDefineInput, BuildDataOptions>;
};
interface PostFactoryInterface {
    readonly _factoryFor: "Post";
    build(inputData?: Partial<Prisma.PostCreateInput>): PromiseLike<Prisma.PostCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.PostCreateInput>): PromiseLike<Prisma.PostCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.PostCreateInput>[]): PromiseLike<Prisma.PostCreateInput[]>;
    pickForConnect(inputData: Post): Pick<Post, "id">;
    create(inputData?: Partial<Prisma.PostCreateInput>): PromiseLike<Post>;
    createList(inputData: number | readonly Partial<Prisma.PostCreateInput>[]): PromiseLike<Post[]>;
    createForConnect(inputData?: Partial<Prisma.PostCreateInput>): PromiseLike<Pick<Post, "id">>;
}
export declare function definePostFactory(options?: PostFactoryDefineOptions): PostFactoryInterface;
type ParticipantFactoryDefineInput = {
    id?: string;
    lastName?: string;
    firstName?: string;
    ParticipantOnEnrollmentStatus?: Prisma.ParticipantOnEnrollmentStatusCreateNestedManyWithoutParticipantInput;
    ParticipantMailAddress?: Prisma.ParticipantMailAddressCreateNestedManyWithoutParticipantInput;
};
type ParticipantFactoryDefineOptions = {
    defaultData?: Resolver<ParticipantFactoryDefineInput, BuildDataOptions>;
};
interface ParticipantFactoryInterface {
    readonly _factoryFor: "Participant";
    build(inputData?: Partial<Prisma.ParticipantCreateInput>): PromiseLike<Prisma.ParticipantCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ParticipantCreateInput>): PromiseLike<Prisma.ParticipantCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.ParticipantCreateInput>[]): PromiseLike<Prisma.ParticipantCreateInput[]>;
    pickForConnect(inputData: Participant): Pick<Participant, "id">;
    create(inputData?: Partial<Prisma.ParticipantCreateInput>): PromiseLike<Participant>;
    createList(inputData: number | readonly Partial<Prisma.ParticipantCreateInput>[]): PromiseLike<Participant[]>;
    createForConnect(inputData?: Partial<Prisma.ParticipantCreateInput>): PromiseLike<Pick<Participant, "id">>;
}
export declare function defineParticipantFactory(options?: ParticipantFactoryDefineOptions): ParticipantFactoryInterface;
type EnrollmentStatusFactoryDefineInput = {
    id?: number;
    status?: string;
    ParticipantOnEnrollmentStatus?: Prisma.ParticipantOnEnrollmentStatusCreateNestedManyWithoutEnrollmentStatusInput;
};
type EnrollmentStatusFactoryDefineOptions = {
    defaultData?: Resolver<EnrollmentStatusFactoryDefineInput, BuildDataOptions>;
};
interface EnrollmentStatusFactoryInterface {
    readonly _factoryFor: "EnrollmentStatus";
    build(inputData?: Partial<Prisma.EnrollmentStatusCreateInput>): PromiseLike<Prisma.EnrollmentStatusCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.EnrollmentStatusCreateInput>): PromiseLike<Prisma.EnrollmentStatusCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.EnrollmentStatusCreateInput>[]): PromiseLike<Prisma.EnrollmentStatusCreateInput[]>;
    pickForConnect(inputData: EnrollmentStatus): Pick<EnrollmentStatus, "id">;
    create(inputData?: Partial<Prisma.EnrollmentStatusCreateInput>): PromiseLike<EnrollmentStatus>;
    createList(inputData: number | readonly Partial<Prisma.EnrollmentStatusCreateInput>[]): PromiseLike<EnrollmentStatus[]>;
    createForConnect(inputData?: Partial<Prisma.EnrollmentStatusCreateInput>): PromiseLike<Pick<EnrollmentStatus, "id">>;
}
export declare function defineEnrollmentStatusFactory(options?: EnrollmentStatusFactoryDefineOptions): EnrollmentStatusFactoryInterface;
type ParticipantOnEnrollmentStatusparticipantFactory = {
    _factoryFor: "Participant";
    build: () => PromiseLike<Prisma.ParticipantCreateNestedOneWithoutParticipantOnEnrollmentStatusInput["create"]>;
};
type ParticipantOnEnrollmentStatusenrollmentStatusFactory = {
    _factoryFor: "EnrollmentStatus";
    build: () => PromiseLike<Prisma.EnrollmentStatusCreateNestedOneWithoutParticipantOnEnrollmentStatusInput["create"]>;
};
type ParticipantOnEnrollmentStatusFactoryDefineInput = {
    participant: ParticipantOnEnrollmentStatusparticipantFactory | Prisma.ParticipantCreateNestedOneWithoutParticipantOnEnrollmentStatusInput;
    enrollmentStatus: ParticipantOnEnrollmentStatusenrollmentStatusFactory | Prisma.EnrollmentStatusCreateNestedOneWithoutParticipantOnEnrollmentStatusInput;
};
type ParticipantOnEnrollmentStatusFactoryDefineOptions = {
    defaultData: Resolver<ParticipantOnEnrollmentStatusFactoryDefineInput, BuildDataOptions>;
};
interface ParticipantOnEnrollmentStatusFactoryInterface {
    readonly _factoryFor: "ParticipantOnEnrollmentStatus";
    build(inputData?: Partial<Prisma.ParticipantOnEnrollmentStatusCreateInput>): PromiseLike<Prisma.ParticipantOnEnrollmentStatusCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ParticipantOnEnrollmentStatusCreateInput>): PromiseLike<Prisma.ParticipantOnEnrollmentStatusCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.ParticipantOnEnrollmentStatusCreateInput>[]): PromiseLike<Prisma.ParticipantOnEnrollmentStatusCreateInput[]>;
    pickForConnect(inputData: ParticipantOnEnrollmentStatus): Pick<ParticipantOnEnrollmentStatus, "participantId">;
    create(inputData?: Partial<Prisma.ParticipantOnEnrollmentStatusCreateInput>): PromiseLike<ParticipantOnEnrollmentStatus>;
    createList(inputData: number | readonly Partial<Prisma.ParticipantOnEnrollmentStatusCreateInput>[]): PromiseLike<ParticipantOnEnrollmentStatus[]>;
    createForConnect(inputData?: Partial<Prisma.ParticipantOnEnrollmentStatusCreateInput>): PromiseLike<Pick<ParticipantOnEnrollmentStatus, "participantId">>;
}
export declare function defineParticipantOnEnrollmentStatusFactory(options: ParticipantOnEnrollmentStatusFactoryDefineOptions): ParticipantOnEnrollmentStatusFactoryInterface;
type ParticipantMailAddressparticipantFactory = {
    _factoryFor: "Participant";
    build: () => PromiseLike<Prisma.ParticipantCreateNestedOneWithoutParticipantMailAddressInput["create"]>;
};
type ParticipantMailAddressFactoryDefineInput = {
    participant: ParticipantMailAddressparticipantFactory | Prisma.ParticipantCreateNestedOneWithoutParticipantMailAddressInput;
    mailAddress?: string;
};
type ParticipantMailAddressFactoryDefineOptions = {
    defaultData: Resolver<ParticipantMailAddressFactoryDefineInput, BuildDataOptions>;
};
interface ParticipantMailAddressFactoryInterface {
    readonly _factoryFor: "ParticipantMailAddress";
    build(inputData?: Partial<Prisma.ParticipantMailAddressCreateInput>): PromiseLike<Prisma.ParticipantMailAddressCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ParticipantMailAddressCreateInput>): PromiseLike<Prisma.ParticipantMailAddressCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.ParticipantMailAddressCreateInput>[]): PromiseLike<Prisma.ParticipantMailAddressCreateInput[]>;
    pickForConnect(inputData: ParticipantMailAddress): Pick<ParticipantMailAddress, "participantId">;
    create(inputData?: Partial<Prisma.ParticipantMailAddressCreateInput>): PromiseLike<ParticipantMailAddress>;
    createList(inputData: number | readonly Partial<Prisma.ParticipantMailAddressCreateInput>[]): PromiseLike<ParticipantMailAddress[]>;
    createForConnect(inputData?: Partial<Prisma.ParticipantMailAddressCreateInput>): PromiseLike<Pick<ParticipantMailAddress, "participantId">>;
}
export declare function defineParticipantMailAddressFactory(options: ParticipantMailAddressFactoryDefineOptions): ParticipantMailAddressFactoryInterface;
