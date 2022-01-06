const JobAdvertismentKind = require('../models/JobAdvertismentKind');

async function createKind(title) {
    let kind = await JobAdvertismentKind.findOne({title: title, deletedAt: null}); 

    if(kind) {
        throw {Error: "Kind with this title alredy exists"};
    }

    let kindData = {
        title: title,
        createdAt: new Date(Date.now()).toUTCString()
    };

    kind = new JobAdvertismentKind(kindData);

    await kind.save();

    return {Message: "Kind is created successfully!"}
}

async function editKind(title, id) {
    let kind = await JobAdvertismentKind.findOne({_id: id, deletedAt: null});

    if(!kind) {
        throw {Error: "Kind doesn't exists"};
    };

    kind.title = title;
    kind.updatedAt = new Date(Date.now()).toUTCString();

    await kind.save();

    return {Message: "Kind is edited successfully!"}
}

async function deleteKind(id) {
    let kind = await JobAdvertismentKind.findOne({_id: id, deletedAt: null});

    if(!kind) {
        throw {Error: "Kind doesn't exists"};
    };

    kind.deletedAt = new Date(Date.now()).toUTCString();

    await kind.save();

    return {Message: "Kind is edited successfully!"}
}

module.exports = {
    createKind,
    editKind,
    deleteKind
}