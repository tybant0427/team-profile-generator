const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generateHTML = require('./src/page-template');
const fs = require("fs"); 
const team = [];


const promptManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the manager name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter manager name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id', 
            message: 'Enter manager employee ID.',
            validate: id => {
                if (id) {
                    return true;
                } else {
                    console.log('Please enter employee ID!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email', 
            message: 'Enter manager email address.',
            validate: email => {
                if (email) {
                    return true;
                } else {
                    console.log('Please enter email address!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber', 
            message: 'Enter manager office number.',
            validate: officeNumber => {
                if (officeNumber) {
                    return true;
                } else {
                    console.log('Please enter office number!');
                    return false;
                }
            }
        },
    ]).then(answers => {
        console.log(answers);
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        team.push(manager);
        promptMenu()
    })
};
