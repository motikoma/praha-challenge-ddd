import type { Participant } from "@prisma/client";
import type { EnrollmentStatus } from "@prisma/client";
import type { ParticipantOnEnrollmentStatus } from "@prisma/client";
import type { ParticipantMailAddress } from "@prisma/client";
import type { Task } from "@prisma/client";
import type { TaskStatus } from "@prisma/client";
import type { ParticipantOnTask } from "@prisma/client";
import type { Team } from "@prisma/client";
import type { Pair } from "@prisma/client";
import type { TeamOnPair } from "@prisma/client";
import type { ParticipantOnTeam } from "@prisma/client";
import type { ParticipantOnPair } from "@prisma/client";
import type { ParticipantAuth } from "@prisma/client";
import type { Role } from "@prisma/client";
import type { ParticipantOnRole } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { Resolver } from "@quramy/prisma-fabbrica/lib/internal";
export { initialize, resetSequence, registerScalarFieldValueGenerator, resetScalarFieldValueGenerator } from "@quramy/prisma-fabbrica/lib/internal";
type BuildDataOptions = {
    readonly seq: number;
};
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
    ParticipantAuth?: Prisma.ParticipantAuthCreateNestedManyWithoutParticipantInput;
    ParticipantOnRole?: Prisma.ParticipantOnRoleCreateNestedManyWithoutParticipantInput;
};
type ParticipantFactoryDefineOptions = {
    defaultData?: Resolver<ParticipantFactoryDefineInput, BuildDataOptions>;
};
export interface ParticipantFactoryInterface {
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
export interface EnrollmentStatusFactoryInterface {
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
export interface ParticipantOnEnrollmentStatusFactoryInterface {
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
export interface ParticipantMailAddressFactoryInterface {
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
export interface TaskFactoryInterface {
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
export interface TaskStatusFactoryInterface {
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
export interface ParticipantOnTaskFactoryInterface {
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
type TeamFactoryDefineInput = {
    id?: string;
    teamName?: number;
    TeamOnPair?: Prisma.TeamOnPairCreateNestedManyWithoutTeamInput;
    ParticipantOnTeam?: Prisma.ParticipantOnTeamCreateNestedManyWithoutTeamInput;
};
type TeamFactoryDefineOptions = {
    defaultData?: Resolver<TeamFactoryDefineInput, BuildDataOptions>;
};
export interface TeamFactoryInterface {
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
type PairFactoryDefineInput = {
    id?: string;
    pairName?: string;
    TeamOnPair?: Prisma.TeamOnPairCreateNestedManyWithoutPairInput;
    ParticipantOnPair?: Prisma.ParticipantOnPairCreateNestedManyWithoutPairInput;
};
type PairFactoryDefineOptions = {
    defaultData?: Resolver<PairFactoryDefineInput, BuildDataOptions>;
};
export interface PairFactoryInterface {
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
type TeamOnPairPairFactory = {
    _factoryFor: "Pair";
    build: () => PromiseLike<Prisma.PairCreateNestedOneWithoutTeamOnPairInput["create"]>;
};
type TeamOnPairTeamFactory = {
    _factoryFor: "Team";
    build: () => PromiseLike<Prisma.TeamCreateNestedOneWithoutTeamOnPairInput["create"]>;
};
type TeamOnPairFactoryDefineInput = {
    Pair: TeamOnPairPairFactory | Prisma.PairCreateNestedOneWithoutTeamOnPairInput;
    Team: TeamOnPairTeamFactory | Prisma.TeamCreateNestedOneWithoutTeamOnPairInput;
};
type TeamOnPairFactoryDefineOptions = {
    defaultData: Resolver<TeamOnPairFactoryDefineInput, BuildDataOptions>;
};
export interface TeamOnPairFactoryInterface {
    readonly _factoryFor: "TeamOnPair";
    build(inputData?: Partial<Prisma.TeamOnPairCreateInput>): PromiseLike<Prisma.TeamOnPairCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TeamOnPairCreateInput>): PromiseLike<Prisma.TeamOnPairCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.TeamOnPairCreateInput>[]): PromiseLike<Prisma.TeamOnPairCreateInput[]>;
    pickForConnect(inputData: TeamOnPair): Pick<TeamOnPair, "pairId">;
    create(inputData?: Partial<Prisma.TeamOnPairCreateInput>): PromiseLike<TeamOnPair>;
    createList(inputData: number | readonly Partial<Prisma.TeamOnPairCreateInput>[]): PromiseLike<TeamOnPair[]>;
    createForConnect(inputData?: Partial<Prisma.TeamOnPairCreateInput>): PromiseLike<Pick<TeamOnPair, "pairId">>;
}
export declare function defineTeamOnPairFactory(options: TeamOnPairFactoryDefineOptions): TeamOnPairFactoryInterface;
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
export interface ParticipantOnTeamFactoryInterface {
    readonly _factoryFor: "ParticipantOnTeam";
    build(inputData?: Partial<Prisma.ParticipantOnTeamCreateInput>): PromiseLike<Prisma.ParticipantOnTeamCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ParticipantOnTeamCreateInput>): PromiseLike<Prisma.ParticipantOnTeamCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.ParticipantOnTeamCreateInput>[]): PromiseLike<Prisma.ParticipantOnTeamCreateInput[]>;
    pickForConnect(inputData: ParticipantOnTeam): Pick<ParticipantOnTeam, "participantId">;
    create(inputData?: Partial<Prisma.ParticipantOnTeamCreateInput>): PromiseLike<ParticipantOnTeam>;
    createList(inputData: number | readonly Partial<Prisma.ParticipantOnTeamCreateInput>[]): PromiseLike<ParticipantOnTeam[]>;
    createForConnect(inputData?: Partial<Prisma.ParticipantOnTeamCreateInput>): PromiseLike<Pick<ParticipantOnTeam, "participantId">>;
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
export interface ParticipantOnPairFactoryInterface {
    readonly _factoryFor: "ParticipantOnPair";
    build(inputData?: Partial<Prisma.ParticipantOnPairCreateInput>): PromiseLike<Prisma.ParticipantOnPairCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ParticipantOnPairCreateInput>): PromiseLike<Prisma.ParticipantOnPairCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.ParticipantOnPairCreateInput>[]): PromiseLike<Prisma.ParticipantOnPairCreateInput[]>;
    pickForConnect(inputData: ParticipantOnPair): Pick<ParticipantOnPair, "participantId">;
    create(inputData?: Partial<Prisma.ParticipantOnPairCreateInput>): PromiseLike<ParticipantOnPair>;
    createList(inputData: number | readonly Partial<Prisma.ParticipantOnPairCreateInput>[]): PromiseLike<ParticipantOnPair[]>;
    createForConnect(inputData?: Partial<Prisma.ParticipantOnPairCreateInput>): PromiseLike<Pick<ParticipantOnPair, "participantId">>;
}
export declare function defineParticipantOnPairFactory(options: ParticipantOnPairFactoryDefineOptions): ParticipantOnPairFactoryInterface;
type ParticipantAuthParticipantFactory = {
    _factoryFor: "Participant";
    build: () => PromiseLike<Prisma.ParticipantCreateNestedOneWithoutParticipantAuthInput["create"]>;
};
type ParticipantAuthFactoryDefineInput = {
    Participant: ParticipantAuthParticipantFactory | Prisma.ParticipantCreateNestedOneWithoutParticipantAuthInput;
    passwordHash?: string;
};
type ParticipantAuthFactoryDefineOptions = {
    defaultData: Resolver<ParticipantAuthFactoryDefineInput, BuildDataOptions>;
};
export interface ParticipantAuthFactoryInterface {
    readonly _factoryFor: "ParticipantAuth";
    build(inputData?: Partial<Prisma.ParticipantAuthCreateInput>): PromiseLike<Prisma.ParticipantAuthCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ParticipantAuthCreateInput>): PromiseLike<Prisma.ParticipantAuthCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.ParticipantAuthCreateInput>[]): PromiseLike<Prisma.ParticipantAuthCreateInput[]>;
    pickForConnect(inputData: ParticipantAuth): Pick<ParticipantAuth, "id">;
    create(inputData?: Partial<Prisma.ParticipantAuthCreateInput>): PromiseLike<ParticipantAuth>;
    createList(inputData: number | readonly Partial<Prisma.ParticipantAuthCreateInput>[]): PromiseLike<ParticipantAuth[]>;
    createForConnect(inputData?: Partial<Prisma.ParticipantAuthCreateInput>): PromiseLike<Pick<ParticipantAuth, "id">>;
}
export declare function defineParticipantAuthFactory(options: ParticipantAuthFactoryDefineOptions): ParticipantAuthFactoryInterface;
type RoleFactoryDefineInput = {
    id?: number;
    name?: string;
    ParticipantOnRole?: Prisma.ParticipantOnRoleCreateNestedManyWithoutRoleInput;
};
type RoleFactoryDefineOptions = {
    defaultData?: Resolver<RoleFactoryDefineInput, BuildDataOptions>;
};
export interface RoleFactoryInterface {
    readonly _factoryFor: "Role";
    build(inputData?: Partial<Prisma.RoleCreateInput>): PromiseLike<Prisma.RoleCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.RoleCreateInput>): PromiseLike<Prisma.RoleCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.RoleCreateInput>[]): PromiseLike<Prisma.RoleCreateInput[]>;
    pickForConnect(inputData: Role): Pick<Role, "id">;
    create(inputData?: Partial<Prisma.RoleCreateInput>): PromiseLike<Role>;
    createList(inputData: number | readonly Partial<Prisma.RoleCreateInput>[]): PromiseLike<Role[]>;
    createForConnect(inputData?: Partial<Prisma.RoleCreateInput>): PromiseLike<Pick<Role, "id">>;
}
export declare function defineRoleFactory(options?: RoleFactoryDefineOptions): RoleFactoryInterface;
type ParticipantOnRoleParticipantFactory = {
    _factoryFor: "Participant";
    build: () => PromiseLike<Prisma.ParticipantCreateNestedOneWithoutParticipantOnRoleInput["create"]>;
};
type ParticipantOnRoleroleFactory = {
    _factoryFor: "Role";
    build: () => PromiseLike<Prisma.RoleCreateNestedOneWithoutParticipantOnRoleInput["create"]>;
};
type ParticipantOnRoleFactoryDefineInput = {
    Participant: ParticipantOnRoleParticipantFactory | Prisma.ParticipantCreateNestedOneWithoutParticipantOnRoleInput;
    role: ParticipantOnRoleroleFactory | Prisma.RoleCreateNestedOneWithoutParticipantOnRoleInput;
};
type ParticipantOnRoleFactoryDefineOptions = {
    defaultData: Resolver<ParticipantOnRoleFactoryDefineInput, BuildDataOptions>;
};
export interface ParticipantOnRoleFactoryInterface {
    readonly _factoryFor: "ParticipantOnRole";
    build(inputData?: Partial<Prisma.ParticipantOnRoleCreateInput>): PromiseLike<Prisma.ParticipantOnRoleCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ParticipantOnRoleCreateInput>): PromiseLike<Prisma.ParticipantOnRoleCreateInput>;
    buildList(inputData: number | readonly Partial<Prisma.ParticipantOnRoleCreateInput>[]): PromiseLike<Prisma.ParticipantOnRoleCreateInput[]>;
    pickForConnect(inputData: ParticipantOnRole): Pick<ParticipantOnRole, "id">;
    create(inputData?: Partial<Prisma.ParticipantOnRoleCreateInput>): PromiseLike<ParticipantOnRole>;
    createList(inputData: number | readonly Partial<Prisma.ParticipantOnRoleCreateInput>[]): PromiseLike<ParticipantOnRole[]>;
    createForConnect(inputData?: Partial<Prisma.ParticipantOnRoleCreateInput>): PromiseLike<Pick<ParticipantOnRole, "id">>;
}
export declare function defineParticipantOnRoleFactory(options: ParticipantOnRoleFactoryDefineOptions): ParticipantOnRoleFactoryInterface;
