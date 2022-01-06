const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const employee = require('../models/Employee');
const Organization = require('../models/Organization');
require("dotenv").config();

async function registerEmployee(data) {
    

    if(!data.password.match(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/))
    {
        throw {error: "Password must contain one lowercase letter, one uppercase leter, one digit and must be at least 6 symbols"};
    }

    if(data.password !== data.confirmPassword) {
        throw {error: "Password and Confirm password must match"};
    }

    let employee = await Employee.findOne({email: data.email, deletedAt: null});

    if(employee) {
        throw {error: "Employee with this email alredy exists"}
    }

    

    let salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));

    
    let hash = await bcrypt.hash(data.password, salt);

    
    let employeeData = {
        email: data.email,
        name: data.name,
        passwordHash: hash,
        createdAt: new Date(Date.now()).toUTCString(),
    }
    
    employee = await new Employee(employeeData);

    await employee.save();

    return({message: 'Employee registered succesfully'});
}

async function registerOrganization(data) {
    if(!data.password.match(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/))
    {
        throw {error: "Password must contain one lowercase letter, one uppercase leter, one digit and must be at least 6 symbols"};
    }

    if(data.password !== data.confirmPassword) {
        throw {error: "Password and Confirm password must match"};
    }

    let organization = await Organization.findOne({email: data.email, deletedAt: null});

    if(organization) {
        throw {error: "Organization with this email alredy exists"}
    }

    let salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));

    let hash = await bcrypt.hash(data.password, salt);

    let organizationData = {
        email: data.email,
        name: data.name,
        passwordHash: hash,
        createdAt: new Date(Date.now()).toUTCString(),
    }

    organization = await new Organization(organizationData);

    await organization.save();

    return({message: 'Organization registered succesfully'});
}

async function loginEmployee(email, password) {
    let employee = await Employee.findOne({email: email, deletedAt: null});

    if(!employee) {
        throw ({Error: "Employee with this email doesn't exists"});
    }

    let compare = await bcrypt.compare(password, employee.passwordHash);

    if(!compare) {
        throw ({Error: "Wrong credentials"});
    }

    let accessToken = jwt.sign({_id: employee._id, email: employee.email, isOrganization: false}, 
        process.env.USER_TOKEN);

    return accessToken;
}

async function loginOrganization(email, password) {
    let organization = await Organization.findOne({email: email, deletedAt: null});

    if(!organization) {
        throw ({Error: "Organization with this email doesn't exists"});
    }

    let compare = await bcrypt.compare(password, organization.passwordHash);

    if(!compare) {
        throw ({Error: "Wrong credentials"});
    }

    let accessToken = jwt.sign({_id: organization._id, email: organization.email, isOrganization: true}, 
        process.env.USER_TOKEN);

    return accessToken;
}

async function updateEmployeeName(name, employeeId) {
    let employee = await Employee.findOne({_id: employeeId, deletedAt: null});

    if(!employee) {
        throw {Error: "Employee doesn't exists"};
    }

    employee.name = name;
    employee.updatedAt = new Date(Date.now()).toUTCString();
    employee.updatedBy = employee;

    await employee.save();

    return {Message: 'Employee is updated successfully!'};
}

async function changeEmployeePassword(oldPassword, newPassword, confirmNewPassword, employeeId) {
    let employee = await Employee.findOne({_id: employeeId, deletedAt: null});

    if(!newPassword.match(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/))
    {
        throw {error: "Password must contain one lowercase letter, one uppercase leter, one digit and must be at least 6 symbols"};
    }

    if(!employee) {
        throw {Error: "Employee doesn't exists"};
    }

    if(newPassword !== confirmNewPassword) {
        throw {Error: "New password and Confirm new password must match"}
    }

    let compare = await bcrypt.compare(oldPassword, employee.passwordHash);

    if(!compare) {
        throw {Error: "Wrong old password"}
    }

    let salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    let hash = await bcrypt.hash(newPassword, salt);

    employee.passwordHash = hash;
    employee.updatedAt = new Date(Date.now()).toUTCString();
    employee.updatedBy = employee;

    await employee.save();

    return {Message: 'Employee is updated successfully!'};
}

async function deleteEmployee(employeeId) {
    let employee = await Employee.findOne({_id: employeeId, deletedAt: null});

    if(!employee) {
        throw {Error: "Employee doesn't exists"};
    }

    employee.deletedAt = new Date(Date.now()).toUTCString();
    employee.deletedBy = employee;

    await employee.save();

    return {Message: 'Employee is deleted successfully!'};
}

async function deleteOrganization(organizationId) {
    let organization = await Organization.findOne({_id: organizationId, deletedAt: null});

    if(!organization) {
        throw {Error: "Organization doesn't exists"};
    }

    organization.deletedAt = new Date(Date.now()).toUTCString();
    organization.deletedBy = organization;

    await organization.save();

    return {Message: 'Organization is deleted successfully!'};
}


module.exports = {
    registerEmployee,
    registerOrganization,
    loginEmployee,
    loginOrganization,
    updateEmployeeName,
    changeEmployeePassword,
    deleteEmployee,
    deleteOrganization
}