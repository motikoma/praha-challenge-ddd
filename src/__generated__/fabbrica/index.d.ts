import type { User } from "@prisma/client";
import type { Post } from "@prisma/client";
import type { Participant } from "@prisma/client";
import type { EnrollmentStatus } from "@prisma/client";
import type { ParticipantOnEnrollmentStatus } from "@prisma/client";
import type { ParticipantMailAddress } from "@prisma/client";
import type { Task } from "@prisma/client";
import type { TaskStatus } from "@prisma/client";
import type { ParticipantOnTask } from "@prisma/client";
import type { Pair } from "@prisma/client";
import type { Team } from "@prisma/client";
import type { PairOnTeam } from "@prisma/client";
import type { ParticipantOnTeam } from "@prisma/client";
import type { ParticipantOnPair } from "@prisma/client";
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
    createdAt?: Date;
    ParticipantOnEnrollmentStatus?: Prisma.ParticipantOnEnrollmentStatusCreateNestedManyWithoutParticipantInput;
    ParticipantMailAddress?: Prisma.ParticipantMailAddressCreateNestedManyWithoutParticipantInput;
    ParticipantOnTask?: Prisma.ParticipantOnTaskCreateNestedManyWithoutParticipantInput;
    ParticipantOnPair?: Prisma.ParticipantOnPairCreateNestedManyWithoutParticipantInput;
    ParticipantOnTeam?: Prisma.ParticipantOnTeamCreateNestedManyWithoutParticipantInput;
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
type TaskFactoryDefineInput = {
    id?: string;
    taskName?: string;
    ParticipantOnTask?: Prisma.ParticipantOnTaskCreateNestedManyWithoutTaskInput;
};
type TaskFactoryDefineOptions = {
    defaultData?: Resolver<TaskFactoryDefineInput, BuildDataOptions>;
};
interface TaskFactoryInterface {
    readonly _factoryFor: "Task";
    build(inputData?: Partial<Prisma.TaskCreateInput>): PromiseLike<Prisma.TaskCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TaskCreateInput>): PromiseLike<Prisma.TaskCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.TaskCreateInput>[]): PromiseLike<Prisma.TaskCreateInput[]>;
    pickForConnect(inputData: Task): Pick<Task, "id">;
    create(inputData?: Partial<Prisma.TaskCreateInput>): PromiseLike<Task>;
    createList(inputData: number | readonly Partial<Prisma.TaskCreateInput>[]): PromiseLike<Task[]>;
    createForConnect(inputData?: Partial<Prisma.TaskCreateInput>): PromiseLike<Pick<Task, "id">>;
}
export declare function defineTaskFactory(options?: TaskFactoryDefineOptions): TaskFactoryInterface;
type TaskStatusFactoryDefineInput = {
    id?: number;
    status?: string;
    ParticipantOnTask?: Prisma.ParticipantOnTaskCreateNestedManyWithoutTaskStatusInput;
};
type TaskStatusFactoryDefineOptions = {
    defaultData?: Resolver<TaskStatusFactoryDefineInput, BuildDataOptions>;
};
interface TaskStatusFactoryInterface {
    readonly _factoryFor: "TaskStatus";
    build(inputData?: Partial<Prisma.TaskStatusCreateInput>): PromiseLike<Prisma.TaskStatusCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TaskStatusCreateInput>): PromiseLike<Prisma.TaskStatusCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.TaskStatusCreateInput>[]): PromiseLike<Prisma.TaskStatusCreateInput[]>;
    pickForConnect(inputData: TaskStatus): Pick<TaskStatus, "id">;
    create(inputData?: Partial<Prisma.TaskStatusCreateInput>): PromiseLike<TaskStatus>;
    createList(inputData: number | readonly Partial<Prisma.TaskStatusCreateInput>[]): PromiseLike<TaskStatus[]>;
    createForConnect(inputData?: Partial<Prisma.TaskStatusCreateInput>): PromiseLike<Pick<TaskStatus, "id">>;
}
export declare function defineTaskStatusFactory(options?: TaskStatusFactoryDefineOptions): TaskStatusFactoryInterface;
type ParticipantOnTaskParticipantFactory = {
    _factoryFor: "Participant";
    build: () => PromiseLike<Prisma.ParticipantCreateNestedOneWithoutParticipantOnTaskInput["create"]>;
};
type ParticipantOnTaskTaskFactory = {
    _factoryFor: "Task";
    build: () => PromiseLike<Prisma.TaskCreateNestedOneWithoutParticipantOnTaskInput["create"]>;
};
type ParticipantOnTaskTaskStatusFactory = {
    _factoryFor: "TaskStatus";
    build: () => PromiseLike<Prisma.TaskStatusCreateNestedOneWithoutParticipantOnTaskInput["create"]>;
};
type ParticipantOnTaskFactoryDefineInput = {
    Participant: ParticipantOnTaskParticipantFactory | Prisma.ParticipantCreateNestedOneWithoutParticipantOnTaskInput;
    Task: ParticipantOnTaskTaskFactory | Prisma.TaskCreateNestedOneWithoutParticipantOnTaskInput;
    TaskStatus: ParticipantOnTaskTaskStatusFactory | Prisma.TaskStatusCreateNestedOneWithoutParticipantOnTaskInput;
};
type ParticipantOnTaskFactoryDefineOptions = {
    defaultData: Resolver<ParticipantOnTaskFactoryDefineInput, BuildDataOptions>;
};
interface ParticipantOnTaskFactoryInterface {
    readonly _factoryFor: "ParticipantOnTask";
    build(inputData?: Partial<Prisma.ParticipantOnTaskCreateInput>): PromiseLike<Prisma.ParticipantOnTaskCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ParticipantOnTaskCreateInput>): PromiseLike<Prisma.ParticipantOnTaskCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.ParticipantOnTaskCreateInput>[]): PromiseLike<Prisma.ParticipantOnTaskCreateInput[]>;
    pickForConnect(inputData: ParticipantOnTask): Pick<ParticipantOnTask, "participantId" | "taskId">;
    create(inputData?: Partial<Prisma.ParticipantOnTaskCreateInput>): PromiseLike<ParticipantOnTask>;
    createList(inputData: number | readonly Partial<Prisma.ParticipantOnTaskCreateInput>[]): PromiseLike<ParticipantOnTask[]>;
    createForConnect(inputData?: Partial<Prisma.ParticipantOnTaskCreateInput>): PromiseLike<Pick<ParticipantOnTask, "participantId" | "taskId">>;
}
export declare function defineParticipantOnTaskFactory(options: ParticipantOnTaskFactoryDefineOptions): ParticipantOnTaskFactoryInterface;
type PairFactoryDefineInput = {
    id?: string;
    pairName?: string;
    PairOnTeam?: Prisma.PairOnTeamCreateNestedManyWithoutPairInput;
    ParticipantOnPair?: Prisma.ParticipantOnPairCreateNestedManyWithoutPairInput;
};
type PairFactoryDefineOptions = {
    defaultData?: Resolver<PairFactoryDefineInput, BuildDataOptions>;
};
interface PairFactoryInterface {
    readonly _factoryFor: "Pair";
    build(inputData?: Partial<Prisma.PairCreateInput>): PromiseLike<Prisma.PairCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.PairCreateInput>): PromiseLike<Prisma.PairCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.PairCreateInput>[]): PromiseLike<Prisma.PairCreateInput[]>;
    pickForConnect(inputData: Pair): Pick<Pair, "id">;
    create(inputData?: Partial<Prisma.PairCreateInput>): PromiseLike<Pair>;
    createList(inputData: number | readonly Partial<Prisma.PairCreateInput>[]): PromiseLike<Pair[]>;
    createForConnect(inputData?: Partial<Prisma.PairCreateInput>): PromiseLike<Pick<Pair, "id">>;
}
export declare function definePairFactory(options?: PairFactoryDefineOptions): PairFactoryInterface;
type TeamFactoryDefineInput = {
    id?: string;
    teamName?: string;
    PairOnTeam?: Prisma.PairOnTeamCreateNestedManyWithoutTeamInput;
    ParticipantOnTeam?: Prisma.ParticipantOnTeamCreateNestedManyWithoutTeamInput;
};
type TeamFactoryDefineOptions = {
    defaultData?: Resolver<TeamFactoryDefineInput, BuildDataOptions>;
};
interface TeamFactoryInterface {
    readonly _factoryFor: "Team";
    build(inputData?: Partial<Prisma.TeamCreateInput>): PromiseLike<Prisma.TeamCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TeamCreateInput>): PromiseLike<Prisma.TeamCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.TeamCreateInput>[]): PromiseLike<Prisma.TeamCreateInput[]>;
    pickForConnect(inputData: Team): Pick<Team, "id">;
    create(inputData?: Partial<Prisma.TeamCreateInput>): PromiseLike<Team>;
    createList(inputData: number | readonly Partial<Prisma.TeamCreateInput>[]): PromiseLike<Team[]>;
    createForConnect(inputData?: Partial<Prisma.TeamCreateInput>): PromiseLike<Pick<Team, "id">>;
}
export declare function defineTeamFactory(options?: TeamFactoryDefineOptions): TeamFactoryInterface;
type PairOnTeamPairFactory = {
    _factoryFor: "Pair";
    build: () => PromiseLike<Prisma.PairCreateNestedOneWithoutPairOnTeamInput["create"]>;
};
type PairOnTeamTeamFactory = {
    _factoryFor: "Team";
    build: () => PromiseLike<Prisma.TeamCreateNestedOneWithoutPairOnTeamInput["create"]>;
};
type PairOnTeamFactoryDefineInput = {
    Pair: PairOnTeamPairFactory | Prisma.PairCreateNestedOneWithoutPairOnTeamInput;
    Team: PairOnTeamTeamFactory | Prisma.TeamCreateNestedOneWithoutPairOnTeamInput;
};
type PairOnTeamFactoryDefineOptions = {
    defaultData: Resolver<PairOnTeamFactoryDefineInput, BuildDataOptions>;
};
interface PairOnTeamFactoryInterface {
    readonly _factoryFor: "PairOnTeam";
    build(inputData?: Partial<Prisma.PairOnTeamCreateInput>): PromiseLike<Prisma.PairOnTeamCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.PairOnTeamCreateInput>): PromiseLike<Prisma.PairOnTeamCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.PairOnTeamCreateInput>[]): PromiseLike<Prisma.PairOnTeamCreateInput[]>;
    pickForConnect(inputData: PairOnTeam): Pick<PairOnTeam, "pairId" | "teamId">;
    create(inputData?: Partial<Prisma.PairOnTeamCreateInput>): PromiseLike<PairOnTeam>;
    createList(inputData: number | readonly Partial<Prisma.PairOnTeamCreateInput>[]): PromiseLike<PairOnTeam[]>;
    createForConnect(inputData?: Partial<Prisma.PairOnTeamCreateInput>): PromiseLike<Pick<PairOnTeam, "pairId" | "teamId">>;
}
export declare function definePairOnTeamFactory(options: PairOnTeamFactoryDefineOptions): PairOnTeamFactoryInterface;
type ParticipantOnTeamParticipantFactory = {
    _factoryFor: "Participant";
    build: () => PromiseLike<Prisma.ParticipantCreateNestedOneWithoutParticipantOnTeamInput["create"]>;
};
type ParticipantOnTeamTeamFactory = {
    _factoryFor: "Team";
    build: () => PromiseLike<Prisma.TeamCreateNestedOneWithoutParticipantOnTeamInput["create"]>;
};
type ParticipantOnTeamFactoryDefineInput = {
    Participant: ParticipantOnTeamParticipantFactory | Prisma.ParticipantCreateNestedOneWithoutParticipantOnTeamInput;
    Team: ParticipantOnTeamTeamFactory | Prisma.TeamCreateNestedOneWithoutParticipantOnTeamInput;
};
type ParticipantOnTeamFactoryDefineOptions = {
    defaultData: Resolver<ParticipantOnTeamFactoryDefineInput, BuildDataOptions>;
};
interface ParticipantOnTeamFactoryInterface {
    readonly _factoryFor: "ParticipantOnTeam";
    build(inputData?: Partial<Prisma.ParticipantOnTeamCreateInput>): PromiseLike<Prisma.ParticipantOnTeamCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ParticipantOnTeamCreateInput>): PromiseLike<Prisma.ParticipantOnTeamCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.ParticipantOnTeamCreateInput>[]): PromiseLike<Prisma.ParticipantOnTeamCreateInput[]>;
    pickForConnect(inputData: ParticipantOnTeam): Pick<ParticipantOnTeam, "participantId" | "teamId">;
    create(inputData?: Partial<Prisma.ParticipantOnTeamCreateInput>): PromiseLike<ParticipantOnTeam>;
    createList(inputData: number | readonly Partial<Prisma.ParticipantOnTeamCreateInput>[]): PromiseLike<ParticipantOnTeam[]>;
    createForConnect(inputData?: Partial<Prisma.ParticipantOnTeamCreateInput>): PromiseLike<Pick<ParticipantOnTeam, "participantId" | "teamId">>;
}
export declare function defineParticipantOnTeamFactory(options: ParticipantOnTeamFactoryDefineOptions): ParticipantOnTeamFactoryInterface;
type ParticipantOnPairParticipantFactory = {
    _factoryFor: "Participant";
    build: () => PromiseLike<Prisma.ParticipantCreateNestedOneWithoutParticipantOnPairInput["create"]>;
};
type ParticipantOnPairPairFactory = {
    _factoryFor: "Pair";
    build: () => PromiseLike<Prisma.PairCreateNestedOneWithoutParticipantOnPairInput["create"]>;
};
type ParticipantOnPairFactoryDefineInput = {
    Participant: ParticipantOnPairParticipantFactory | Prisma.ParticipantCreateNestedOneWithoutParticipantOnPairInput;
    Pair: ParticipantOnPairPairFactory | Prisma.PairCreateNestedOneWithoutParticipantOnPairInput;
};
type ParticipantOnPairFactoryDefineOptions = {
    defaultData: Resolver<ParticipantOnPairFactoryDefineInput, BuildDataOptions>;
};
interface ParticipantOnPairFactoryInterface {
    readonly _factoryFor: "ParticipantOnPair";
    build(inputData?: Partial<Prisma.ParticipantOnPairCreateInput>): PromiseLike<Prisma.ParticipantOnPairCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ParticipantOnPairCreateInput>): PromiseLike<Prisma.ParticipantOnPairCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.ParticipantOnPairCreateInput>[]): PromiseLike<Prisma.ParticipantOnPairCreateInput[]>;
    pickForConnect(inputData: ParticipantOnPair): Pick<ParticipantOnPair, "participantId" | "pairId">;
    create(inputData?: Partial<Prisma.ParticipantOnPairCreateInput>): PromiseLike<ParticipantOnPair>;
    createList(inputData: number | readonly Partial<Prisma.ParticipantOnPairCreateInput>[]): PromiseLike<ParticipantOnPair[]>;
    createForConnect(inputData?: Partial<Prisma.ParticipantOnPairCreateInput>): PromiseLike<Pick<ParticipantOnPair, "participantId" | "pairId">>;
}
export declare function defineParticipantOnPairFactory(options: ParticipantOnPairFactoryDefineOptions): ParticipantOnPairFactoryInterface;
