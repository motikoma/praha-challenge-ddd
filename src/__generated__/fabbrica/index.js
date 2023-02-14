"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineFoodsFactory = exports.defineParticipantOnPairFactory = exports.defineParticipantOnTeamFactory = exports.defineTeamOnPairFactory = exports.definePairFactory = exports.defineTeamFactory = exports.defineParticipantOnTaskFactory = exports.defineTaskStatusFactory = exports.defineTaskFactory = exports.defineParticipantMailAddressFactory = exports.defineParticipantOnEnrollmentStatusFactory = exports.defineEnrollmentStatusFactory = exports.defineParticipantFactory = exports.resetScalarFieldValueGenerator = exports.registerScalarFieldValueGenerator = exports.resetSequence = exports.initialize = void 0;
const internal_1 = require("@quramy/prisma-fabbrica/lib/internal");
var internal_2 = require("@quramy/prisma-fabbrica/lib/internal");
Object.defineProperty(exports, "initialize", { enumerable: true, get: function () { return internal_2.initialize; } });
Object.defineProperty(exports, "resetSequence", { enumerable: true, get: function () { return internal_2.resetSequence; } });
Object.defineProperty(exports, "registerScalarFieldValueGenerator", { enumerable: true, get: function () { return internal_2.registerScalarFieldValueGenerator; } });
Object.defineProperty(exports, "resetScalarFieldValueGenerator", { enumerable: true, get: function () { return internal_2.resetScalarFieldValueGenerator; } });
const modelFieldDefinitions = [{
        name: "Participant",
        fields: [{
                name: "ParticipantOnEnrollmentStatus",
                type: "ParticipantOnEnrollmentStatus",
                relationName: "ParticipantToParticipantOnEnrollmentStatus"
            }, {
                name: "ParticipantMailAddress",
                type: "ParticipantMailAddress",
                relationName: "ParticipantToParticipantMailAddress"
            }, {
                name: "ParticipantOnTask",
                type: "ParticipantOnTask",
                relationName: "ParticipantToParticipantOnTask"
            }, {
                name: "ParticipantOnPair",
                type: "ParticipantOnPair",
                relationName: "ParticipantToParticipantOnPair"
            }, {
                name: "ParticipantOnTeam",
                type: "ParticipantOnTeam",
                relationName: "ParticipantToParticipantOnTeam"
            }]
    }, {
        name: "EnrollmentStatus",
        fields: [{
                name: "ParticipantOnEnrollmentStatus",
                type: "ParticipantOnEnrollmentStatus",
                relationName: "EnrollmentStatusToParticipantOnEnrollmentStatus"
            }]
    }, {
        name: "ParticipantOnEnrollmentStatus",
        fields: [{
                name: "participant",
                type: "Participant",
                relationName: "ParticipantToParticipantOnEnrollmentStatus"
            }, {
                name: "enrollmentStatus",
                type: "EnrollmentStatus",
                relationName: "EnrollmentStatusToParticipantOnEnrollmentStatus"
            }]
    }, {
        name: "ParticipantMailAddress",
        fields: [{
                name: "participant",
                type: "Participant",
                relationName: "ParticipantToParticipantMailAddress"
            }]
    }, {
        name: "Task",
        fields: [{
                name: "ParticipantOnTask",
                type: "ParticipantOnTask",
                relationName: "ParticipantOnTaskToTask"
            }]
    }, {
        name: "TaskStatus",
        fields: [{
                name: "ParticipantOnTask",
                type: "ParticipantOnTask",
                relationName: "ParticipantOnTaskToTaskStatus"
            }]
    }, {
        name: "ParticipantOnTask",
        fields: [{
                name: "Participant",
                type: "Participant",
                relationName: "ParticipantToParticipantOnTask"
            }, {
                name: "Task",
                type: "Task",
                relationName: "ParticipantOnTaskToTask"
            }, {
                name: "TaskStatus",
                type: "TaskStatus",
                relationName: "ParticipantOnTaskToTaskStatus"
            }]
    }, {
        name: "Team",
        fields: [{
                name: "TeamOnPair",
                type: "TeamOnPair",
                relationName: "TeamToTeamOnPair"
            }, {
                name: "ParticipantOnTeam",
                type: "ParticipantOnTeam",
                relationName: "ParticipantOnTeamToTeam"
            }]
    }, {
        name: "Pair",
        fields: [{
                name: "TeamOnPair",
                type: "TeamOnPair",
                relationName: "PairToTeamOnPair"
            }, {
                name: "ParticipantOnPair",
                type: "ParticipantOnPair",
                relationName: "PairToParticipantOnPair"
            }]
    }, {
        name: "TeamOnPair",
        fields: [{
                name: "Pair",
                type: "Pair",
                relationName: "PairToTeamOnPair"
            }, {
                name: "Team",
                type: "Team",
                relationName: "TeamToTeamOnPair"
            }]
    }, {
        name: "ParticipantOnTeam",
        fields: [{
                name: "Participant",
                type: "Participant",
                relationName: "ParticipantToParticipantOnTeam"
            }, {
                name: "Team",
                type: "Team",
                relationName: "ParticipantOnTeamToTeam"
            }]
    }, {
        name: "ParticipantOnPair",
        fields: [{
                name: "Participant",
                type: "Participant",
                relationName: "ParticipantToParticipantOnPair"
            }, {
                name: "Pair",
                type: "Pair",
                relationName: "PairToParticipantOnPair"
            }]
    }, {
        name: "Foods",
        fields: []
    }];
function autoGenerateParticipantScalarsOrEnums({ seq }) {
    return {
        id: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Participant", fieldName: "id", isId: true, isUnique: false, seq }),
        lastName: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Participant", fieldName: "lastName", isId: false, isUnique: false, seq }),
        firstName: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Participant", fieldName: "firstName", isId: false, isUnique: false, seq })
    };
}
function defineParticipantFactoryInternal({ defaultData: defaultDataResolver }) {
    const seqKey = {};
    const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
    const screen = (0, internal_1.createScreener)("Participant", modelFieldDefinitions);
    const build = async (inputData = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateParticipantScalarsOrEnums({ seq });
        const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {};
        const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => build(data)));
    const pickForConnect = (inputData) => ({
        id: inputData.id
    });
    const create = async (inputData = {}) => {
        const data = await build(inputData).then(screen);
        return await (0, internal_1.getClient)().participant.create({ data });
    };
    const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
    const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "Participant",
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}
function defineParticipantFactory(options = {}) {
    return defineParticipantFactoryInternal(options);
}
exports.defineParticipantFactory = defineParticipantFactory;
function autoGenerateEnrollmentStatusScalarsOrEnums({ seq }) {
    return {
        id: (0, internal_1.getScalarFieldValueGenerator)().Int({ modelName: "EnrollmentStatus", fieldName: "id", isId: true, isUnique: false, seq }),
        status: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "EnrollmentStatus", fieldName: "status", isId: false, isUnique: false, seq })
    };
}
function defineEnrollmentStatusFactoryInternal({ defaultData: defaultDataResolver }) {
    const seqKey = {};
    const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
    const screen = (0, internal_1.createScreener)("EnrollmentStatus", modelFieldDefinitions);
    const build = async (inputData = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateEnrollmentStatusScalarsOrEnums({ seq });
        const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {};
        const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => build(data)));
    const pickForConnect = (inputData) => ({
        id: inputData.id
    });
    const create = async (inputData = {}) => {
        const data = await build(inputData).then(screen);
        return await (0, internal_1.getClient)().enrollmentStatus.create({ data });
    };
    const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
    const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "EnrollmentStatus",
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}
function defineEnrollmentStatusFactory(options = {}) {
    return defineEnrollmentStatusFactoryInternal(options);
}
exports.defineEnrollmentStatusFactory = defineEnrollmentStatusFactory;
function isParticipantOnEnrollmentStatusparticipantFactory(x) {
    return x?._factoryFor === "Participant";
}
function isParticipantOnEnrollmentStatusenrollmentStatusFactory(x) {
    return x?._factoryFor === "EnrollmentStatus";
}
function autoGenerateParticipantOnEnrollmentStatusScalarsOrEnums({ seq }) {
    return {};
}
function defineParticipantOnEnrollmentStatusFactoryInternal({ defaultData: defaultDataResolver }) {
    const seqKey = {};
    const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
    const screen = (0, internal_1.createScreener)("ParticipantOnEnrollmentStatus", modelFieldDefinitions);
    const build = async (inputData = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateParticipantOnEnrollmentStatusScalarsOrEnums({ seq });
        const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            participant: isParticipantOnEnrollmentStatusparticipantFactory(defaultData.participant) ? {
                create: await defaultData.participant.build()
            } : defaultData.participant,
            enrollmentStatus: isParticipantOnEnrollmentStatusenrollmentStatusFactory(defaultData.enrollmentStatus) ? {
                create: await defaultData.enrollmentStatus.build()
            } : defaultData.enrollmentStatus
        };
        const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => build(data)));
    const pickForConnect = (inputData) => ({
        participantId: inputData.participantId
    });
    const create = async (inputData = {}) => {
        const data = await build(inputData).then(screen);
        return await (0, internal_1.getClient)().participantOnEnrollmentStatus.create({ data });
    };
    const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
    const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "ParticipantOnEnrollmentStatus",
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}
function defineParticipantOnEnrollmentStatusFactory(options) {
    return defineParticipantOnEnrollmentStatusFactoryInternal(options);
}
exports.defineParticipantOnEnrollmentStatusFactory = defineParticipantOnEnrollmentStatusFactory;
function isParticipantMailAddressparticipantFactory(x) {
    return x?._factoryFor === "Participant";
}
function autoGenerateParticipantMailAddressScalarsOrEnums({ seq }) {
    return {
        mailAddress: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "ParticipantMailAddress", fieldName: "mailAddress", isId: false, isUnique: true, seq })
    };
}
function defineParticipantMailAddressFactoryInternal({ defaultData: defaultDataResolver }) {
    const seqKey = {};
    const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
    const screen = (0, internal_1.createScreener)("ParticipantMailAddress", modelFieldDefinitions);
    const build = async (inputData = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateParticipantMailAddressScalarsOrEnums({ seq });
        const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            participant: isParticipantMailAddressparticipantFactory(defaultData.participant) ? {
                create: await defaultData.participant.build()
            } : defaultData.participant
        };
        const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => build(data)));
    const pickForConnect = (inputData) => ({
        participantId: inputData.participantId
    });
    const create = async (inputData = {}) => {
        const data = await build(inputData).then(screen);
        return await (0, internal_1.getClient)().participantMailAddress.create({ data });
    };
    const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
    const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "ParticipantMailAddress",
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}
function defineParticipantMailAddressFactory(options) {
    return defineParticipantMailAddressFactoryInternal(options);
}
exports.defineParticipantMailAddressFactory = defineParticipantMailAddressFactory;
function autoGenerateTaskScalarsOrEnums({ seq }) {
    return {
        id: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Task", fieldName: "id", isId: true, isUnique: false, seq }),
        taskName: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Task", fieldName: "taskName", isId: false, isUnique: false, seq })
    };
}
function defineTaskFactoryInternal({ defaultData: defaultDataResolver }) {
    const seqKey = {};
    const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
    const screen = (0, internal_1.createScreener)("Task", modelFieldDefinitions);
    const build = async (inputData = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateTaskScalarsOrEnums({ seq });
        const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {};
        const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => build(data)));
    const pickForConnect = (inputData) => ({
        id: inputData.id
    });
    const create = async (inputData = {}) => {
        const data = await build(inputData).then(screen);
        return await (0, internal_1.getClient)().task.create({ data });
    };
    const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
    const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "Task",
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}
function defineTaskFactory(options = {}) {
    return defineTaskFactoryInternal(options);
}
exports.defineTaskFactory = defineTaskFactory;
function autoGenerateTaskStatusScalarsOrEnums({ seq }) {
    return {
        id: (0, internal_1.getScalarFieldValueGenerator)().Int({ modelName: "TaskStatus", fieldName: "id", isId: true, isUnique: false, seq }),
        status: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "TaskStatus", fieldName: "status", isId: false, isUnique: false, seq })
    };
}
function defineTaskStatusFactoryInternal({ defaultData: defaultDataResolver }) {
    const seqKey = {};
    const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
    const screen = (0, internal_1.createScreener)("TaskStatus", modelFieldDefinitions);
    const build = async (inputData = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateTaskStatusScalarsOrEnums({ seq });
        const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {};
        const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => build(data)));
    const pickForConnect = (inputData) => ({
        id: inputData.id
    });
    const create = async (inputData = {}) => {
        const data = await build(inputData).then(screen);
        return await (0, internal_1.getClient)().taskStatus.create({ data });
    };
    const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
    const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "TaskStatus",
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}
function defineTaskStatusFactory(options = {}) {
    return defineTaskStatusFactoryInternal(options);
}
exports.defineTaskStatusFactory = defineTaskStatusFactory;
function isParticipantOnTaskParticipantFactory(x) {
    return x?._factoryFor === "Participant";
}
function isParticipantOnTaskTaskFactory(x) {
    return x?._factoryFor === "Task";
}
function isParticipantOnTaskTaskStatusFactory(x) {
    return x?._factoryFor === "TaskStatus";
}
function autoGenerateParticipantOnTaskScalarsOrEnums({ seq }) {
    return {};
}
function defineParticipantOnTaskFactoryInternal({ defaultData: defaultDataResolver }) {
    const seqKey = {};
    const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
    const screen = (0, internal_1.createScreener)("ParticipantOnTask", modelFieldDefinitions);
    const build = async (inputData = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateParticipantOnTaskScalarsOrEnums({ seq });
        const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            Participant: isParticipantOnTaskParticipantFactory(defaultData.Participant) ? {
                create: await defaultData.Participant.build()
            } : defaultData.Participant,
            Task: isParticipantOnTaskTaskFactory(defaultData.Task) ? {
                create: await defaultData.Task.build()
            } : defaultData.Task,
            TaskStatus: isParticipantOnTaskTaskStatusFactory(defaultData.TaskStatus) ? {
                create: await defaultData.TaskStatus.build()
            } : defaultData.TaskStatus
        };
        const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => build(data)));
    const pickForConnect = (inputData) => ({
        participantId: inputData.participantId,
        taskId: inputData.taskId
    });
    const create = async (inputData = {}) => {
        const data = await build(inputData).then(screen);
        return await (0, internal_1.getClient)().participantOnTask.create({ data });
    };
    const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
    const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "ParticipantOnTask",
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}
function defineParticipantOnTaskFactory(options) {
    return defineParticipantOnTaskFactoryInternal(options);
}
exports.defineParticipantOnTaskFactory = defineParticipantOnTaskFactory;
function autoGenerateTeamScalarsOrEnums({ seq }) {
    return {
        id: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Team", fieldName: "id", isId: true, isUnique: false, seq }),
        teamName: (0, internal_1.getScalarFieldValueGenerator)().Int({ modelName: "Team", fieldName: "teamName", isId: false, isUnique: false, seq })
    };
}
function defineTeamFactoryInternal({ defaultData: defaultDataResolver }) {
    const seqKey = {};
    const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
    const screen = (0, internal_1.createScreener)("Team", modelFieldDefinitions);
    const build = async (inputData = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateTeamScalarsOrEnums({ seq });
        const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {};
        const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => build(data)));
    const pickForConnect = (inputData) => ({
        id: inputData.id
    });
    const create = async (inputData = {}) => {
        const data = await build(inputData).then(screen);
        return await (0, internal_1.getClient)().team.create({ data });
    };
    const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
    const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "Team",
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}
function defineTeamFactory(options = {}) {
    return defineTeamFactoryInternal(options);
}
exports.defineTeamFactory = defineTeamFactory;
function autoGeneratePairScalarsOrEnums({ seq }) {
    return {
        id: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Pair", fieldName: "id", isId: true, isUnique: false, seq }),
        pairName: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Pair", fieldName: "pairName", isId: false, isUnique: false, seq })
    };
}
function definePairFactoryInternal({ defaultData: defaultDataResolver }) {
    const seqKey = {};
    const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
    const screen = (0, internal_1.createScreener)("Pair", modelFieldDefinitions);
    const build = async (inputData = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGeneratePairScalarsOrEnums({ seq });
        const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {};
        const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => build(data)));
    const pickForConnect = (inputData) => ({
        id: inputData.id
    });
    const create = async (inputData = {}) => {
        const data = await build(inputData).then(screen);
        return await (0, internal_1.getClient)().pair.create({ data });
    };
    const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
    const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "Pair",
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}
function definePairFactory(options = {}) {
    return definePairFactoryInternal(options);
}
exports.definePairFactory = definePairFactory;
function isTeamOnPairPairFactory(x) {
    return x?._factoryFor === "Pair";
}
function isTeamOnPairTeamFactory(x) {
    return x?._factoryFor === "Team";
}
function autoGenerateTeamOnPairScalarsOrEnums({ seq }) {
    return {};
}
function defineTeamOnPairFactoryInternal({ defaultData: defaultDataResolver }) {
    const seqKey = {};
    const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
    const screen = (0, internal_1.createScreener)("TeamOnPair", modelFieldDefinitions);
    const build = async (inputData = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateTeamOnPairScalarsOrEnums({ seq });
        const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            Pair: isTeamOnPairPairFactory(defaultData.Pair) ? {
                create: await defaultData.Pair.build()
            } : defaultData.Pair,
            Team: isTeamOnPairTeamFactory(defaultData.Team) ? {
                create: await defaultData.Team.build()
            } : defaultData.Team
        };
        const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => build(data)));
    const pickForConnect = (inputData) => ({
        pairId: inputData.pairId
    });
    const create = async (inputData = {}) => {
        const data = await build(inputData).then(screen);
        return await (0, internal_1.getClient)().teamOnPair.create({ data });
    };
    const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
    const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "TeamOnPair",
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}
function defineTeamOnPairFactory(options) {
    return defineTeamOnPairFactoryInternal(options);
}
exports.defineTeamOnPairFactory = defineTeamOnPairFactory;
function isParticipantOnTeamParticipantFactory(x) {
    return x?._factoryFor === "Participant";
}
function isParticipantOnTeamTeamFactory(x) {
    return x?._factoryFor === "Team";
}
function autoGenerateParticipantOnTeamScalarsOrEnums({ seq }) {
    return {};
}
function defineParticipantOnTeamFactoryInternal({ defaultData: defaultDataResolver }) {
    const seqKey = {};
    const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
    const screen = (0, internal_1.createScreener)("ParticipantOnTeam", modelFieldDefinitions);
    const build = async (inputData = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateParticipantOnTeamScalarsOrEnums({ seq });
        const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            Participant: isParticipantOnTeamParticipantFactory(defaultData.Participant) ? {
                create: await defaultData.Participant.build()
            } : defaultData.Participant,
            Team: isParticipantOnTeamTeamFactory(defaultData.Team) ? {
                create: await defaultData.Team.build()
            } : defaultData.Team
        };
        const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => build(data)));
    const pickForConnect = (inputData) => ({
        participantId: inputData.participantId
    });
    const create = async (inputData = {}) => {
        const data = await build(inputData).then(screen);
        return await (0, internal_1.getClient)().participantOnTeam.create({ data });
    };
    const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
    const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "ParticipantOnTeam",
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}
function defineParticipantOnTeamFactory(options) {
    return defineParticipantOnTeamFactoryInternal(options);
}
exports.defineParticipantOnTeamFactory = defineParticipantOnTeamFactory;
function isParticipantOnPairParticipantFactory(x) {
    return x?._factoryFor === "Participant";
}
function isParticipantOnPairPairFactory(x) {
    return x?._factoryFor === "Pair";
}
function autoGenerateParticipantOnPairScalarsOrEnums({ seq }) {
    return {};
}
function defineParticipantOnPairFactoryInternal({ defaultData: defaultDataResolver }) {
    const seqKey = {};
    const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
    const screen = (0, internal_1.createScreener)("ParticipantOnPair", modelFieldDefinitions);
    const build = async (inputData = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateParticipantOnPairScalarsOrEnums({ seq });
        const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            Participant: isParticipantOnPairParticipantFactory(defaultData.Participant) ? {
                create: await defaultData.Participant.build()
            } : defaultData.Participant,
            Pair: isParticipantOnPairPairFactory(defaultData.Pair) ? {
                create: await defaultData.Pair.build()
            } : defaultData.Pair
        };
        const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => build(data)));
    const pickForConnect = (inputData) => ({
        participantId: inputData.participantId
    });
    const create = async (inputData = {}) => {
        const data = await build(inputData).then(screen);
        return await (0, internal_1.getClient)().participantOnPair.create({ data });
    };
    const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
    const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "ParticipantOnPair",
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}
function defineParticipantOnPairFactory(options) {
    return defineParticipantOnPairFactoryInternal(options);
}
exports.defineParticipantOnPairFactory = defineParticipantOnPairFactory;
function autoGenerateFoodsScalarsOrEnums({ seq }) {
    return {
        id: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Foods", fieldName: "id", isId: true, isUnique: false, seq }),
        foodName: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Foods", fieldName: "foodName", isId: false, isUnique: false, seq })
    };
}
function defineFoodsFactoryInternal({ defaultData: defaultDataResolver }) {
    const seqKey = {};
    const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
    const screen = (0, internal_1.createScreener)("Foods", modelFieldDefinitions);
    const build = async (inputData = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateFoodsScalarsOrEnums({ seq });
        const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {};
        const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => build(data)));
    const pickForConnect = (inputData) => ({
        id: inputData.id
    });
    const create = async (inputData = {}) => {
        const data = await build(inputData).then(screen);
        return await (0, internal_1.getClient)().foods.create({ data });
    };
    const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
    const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "Foods",
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}
function defineFoodsFactory(options = {}) {
    return defineFoodsFactoryInternal(options);
}
exports.defineFoodsFactory = defineFoodsFactory;
