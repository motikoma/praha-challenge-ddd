"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineParticipantOnTaskFactory = exports.defineTaskStatusFactory = exports.defineTaskFactory = exports.defineParticipantMailAddressFactory = exports.defineParticipantOnEnrollmentStatusFactory = exports.defineEnrollmentStatusFactory = exports.defineParticipantFactory = exports.definePostFactory = exports.defineUserFactory = exports.resetScalarFieldValueGenerator = exports.registerScalarFieldValueGenerator = exports.resetSequence = exports.initialize = void 0;
const internal_1 = require("@quramy/prisma-fabbrica/lib/internal");
var internal_2 = require("@quramy/prisma-fabbrica/lib/internal");
Object.defineProperty(exports, "initialize", { enumerable: true, get: function () { return internal_2.initialize; } });
Object.defineProperty(exports, "resetSequence", { enumerable: true, get: function () { return internal_2.resetSequence; } });
Object.defineProperty(exports, "registerScalarFieldValueGenerator", { enumerable: true, get: function () { return internal_2.registerScalarFieldValueGenerator; } });
Object.defineProperty(exports, "resetScalarFieldValueGenerator", { enumerable: true, get: function () { return internal_2.resetScalarFieldValueGenerator; } });
const modelFieldDefinitions = [{
        name: "User",
        fields: [{
                name: "posts",
                type: "Post",
                relationName: "PostToUser"
            }]
    }, {
        name: "Post",
        fields: [{
                name: "author",
                type: "User",
                relationName: "PostToUser"
            }]
    }, {
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
                name: "taskStatus",
                type: "TaskStatus",
                relationName: "TaskToTaskStatus"
            }, {
                name: "ParticipantOnTask",
                type: "ParticipantOnTask",
                relationName: "ParticipantOnTaskToTask"
            }]
    }, {
        name: "TaskStatus",
        fields: [{
                name: "Task",
                type: "Task",
                relationName: "TaskToTaskStatus"
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
            }]
    }];
function autoGenerateUserScalarsOrEnums({ seq }) {
    return {
        email: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "User", fieldName: "email", isId: false, isUnique: true, seq })
    };
}
function defineUserFactoryInternal({ defaultData: defaultDataResolver }) {
    const seqKey = {};
    const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
    const screen = (0, internal_1.createScreener)("User", modelFieldDefinitions);
    const build = async (inputData = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGenerateUserScalarsOrEnums({ seq });
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
        return await (0, internal_1.getClient)().user.create({ data });
    };
    const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
    const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "User",
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}
function defineUserFactory(options = {}) {
    return defineUserFactoryInternal(options);
}
exports.defineUserFactory = defineUserFactory;
function isPostauthorFactory(x) {
    return x?._factoryFor === "User";
}
function autoGeneratePostScalarsOrEnums({ seq }) {
    return {
        title: (0, internal_1.getScalarFieldValueGenerator)().String({ modelName: "Post", fieldName: "title", isId: false, isUnique: false, seq })
    };
}
function definePostFactoryInternal({ defaultData: defaultDataResolver }) {
    const seqKey = {};
    const getSeq = () => (0, internal_1.getSequenceCounter)(seqKey);
    const screen = (0, internal_1.createScreener)("Post", modelFieldDefinitions);
    const build = async (inputData = {}) => {
        const seq = getSeq();
        const requiredScalarData = autoGeneratePostScalarsOrEnums({ seq });
        const resolveValue = (0, internal_1.normalizeResolver)(defaultDataResolver ?? {});
        const defaultData = await resolveValue({ seq });
        const defaultAssociations = {
            author: isPostauthorFactory(defaultData.author) ? {
                create: await defaultData.author.build()
            } : defaultData.author
        };
        const data = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...inputData };
        return data;
    };
    const buildList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => build(data)));
    const pickForConnect = (inputData) => ({
        id: inputData.id
    });
    const create = async (inputData = {}) => {
        const data = await build(inputData).then(screen);
        return await (0, internal_1.getClient)().post.create({ data });
    };
    const createList = (inputData) => Promise.all((0, internal_1.normalizeList)(inputData).map(data => create(data)));
    const createForConnect = (inputData = {}) => create(inputData).then(pickForConnect);
    return {
        _factoryFor: "Post",
        build,
        buildList,
        buildCreateInput: build,
        pickForConnect,
        create,
        createList,
        createForConnect,
    };
}
function definePostFactory(options = {}) {
    return definePostFactoryInternal(options);
}
exports.definePostFactory = definePostFactory;
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
function isTasktaskStatusFactory(x) {
    return x?._factoryFor === "TaskStatus";
}
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
        const defaultAssociations = {
            taskStatus: isTasktaskStatusFactory(defaultData.taskStatus) ? {
                create: await defaultData.taskStatus.build()
            } : defaultData.taskStatus
        };
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
function defineTaskFactory(options) {
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
            } : defaultData.Task
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