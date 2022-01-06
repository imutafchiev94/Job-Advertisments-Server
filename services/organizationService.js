const Employee = require('../models/Employee');
const Organization = require('../models/Organization');
const JobAdvertisment = require('../models/JobAdvertisment')

async function allOrganizations() {
    let organizations = await Organization.find({deletedAt: null}).populate('jobAdvertisments');

    return organizations;
}

async function addJobAdvertisment(data, organizationId) {
    let jobAdverismentData = {
        title: data.title,
        description: data.description,
        kind: data.kind,
        category: data.category,
        createdAt: new Date(Date.now()).toUTCString(),
        createdBy: organizationId
    };

    let jobAdverisment = new JobAdvertisment(jobAdverismentData);

    await jobAdverisment.save();

    return {Message: "Job Advertisment is added successfully"};
}

async function editJobAdvertisment(data, jobAdvertismentId, organizationId) {
    let jobAdvertisment = await JobAdvertisment.findOne({_id: jobAdvertismentId, deletedAt: null});

    if(!jobAdvertisment) {
        throw {Error: "Job Advertisment doesn't exists!"};
    }

    if(jobAdvertisment.createdBy !== organizationId) {
        throw {Error: "You don't have permissions to edit!"}
    }

    if(data.title) {
        jobAdvertisment.title = data.title;
    } if (data.description) {
        jobAdvertisment.description = data.description;
    } if(data.kind) {
        jobAdvertisment.kind = data.kind;
    } if(data.category) {
        jobAdvertisment.category = data.category;
    }

    jobAdvertisment.updatedAt = new Date(Date.now()).toUTCString();
    jobAdvertisment.updatedBy = organizationId;

    await jobAdvertisment.save();

    return {Message: "Job Advertisment is updated successfully!"};

}

async function deleteJobAdvertisment(jobAdvertismentId, organizationId) {
    let jobAdvertisment = await JobAdvertisment.findOne({_id: jobAdvertismentId, deletedAt: null});

    if(!jobAdvertisment) {
        throw {Error: "Job Advertisment doesn't exists!"};
    }

    if(jobAdvertisment.createdBy !== organizationId) {
        throw {Error: "You don't have permissions to delete!"}
    }

    jobAdvertisment.deletedAt = new Date(Date.now()).toUTCString();
    jobAdvertisment.deletedBy = organizationId;

    await jobAdvertisment.save();

    return {Message: "Job Advertisment is deleted successfully!"};
}

async function allCandidates(jobAdvertismentId, organizationId) {
    let jobAdvertisment = await JobAdvertisment.findOne({_id: jobAdvertismentId, deletedAt: null}).populate("candidates");

    if(!jobAdvertisment) {
        throw {Error: "Job Advertisment doesn't exists!"};
    }

    if(jobAdvertisment.createdBy !== organizationId) {
        throw {Error: "You don't have permissions to see candidates!"}
    }

    return jobAdvertisment.candidates;

}

async function approveCandidate(jobAdvertismentId, organizationId, employeeId) {
    let jobAdvertisment = await JobAdvertisment.findOne({_id: jobAdvertismentId, deletedAt: null}).populate("candidates");

    if(!jobAdvertisment) {
        throw {Error: "Job Advertisment doesn't exists!"};
    }

    if(jobAdvertisment.createdBy !== organizationId) {
        throw {Error: "You don't have permissions to approve candidates!"}
    }

    jobAdvertisment.approveCandidate = employeeId;

    await jobAdvertisment.save();

    return {Message: "Candidate is approved!"};
}

async function rejectCandidate(jobAdvertismentId, organizationId, employeeId) {
    let jobAdvertisment = await JobAdvertisment.findOne({_id: jobAdvertismentId, deletedAt: null}).populate("candidates");

    if(!jobAdvertisment) {
        throw {Error: "Job Advertisment doesn't exists!"};
    }

    if(jobAdvertisment.createdBy !== organizationId) {
        throw {Error: "You don't have permissions to see candidates!"}
    }
    
    jobAdvertisment.rejectedCandidates.push(employeeId);

    await jobAdvertisment.save();

    return {Message: "Candidate is rejected!"};
}

module.exports = {
    addJobAdvertisment,
    editJobAdvertisment,
    deleteJobAdvertisment,
    allCandidates,
    approveCandidate,
    rejectCandidate,
    allOrganizations
}