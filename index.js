//node modules
const inquirer = require('inquirer');
const fs = require("fs");

//team positions
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

//new page
const generateHTML = require('./src/page-template');
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html")

 
//team array
const team = [];


const promptManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter manager name:',
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
            message: 'Enter manager employee ID:',
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
            message: 'Enter manager email address:',
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
            message: 'Enter manager office number:',
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

const promptMenu = () => {
    return inquirer.prompt([
        {
            type: 'list', 
            name: 'menu',
            message: 'How would you like to continue?',
            choices: ['add engineer', 'add intern', 'complete team building']
        }])
        .then(userChoice => {
            switch (userChoice.menu) {
                case "add engineer":
                    promptEngineer();
                    break;
                case "add intern":
                    promptIntern();
                    break;
                default:
                    buildTeam()
            }
        });
};

const promptEngineer = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter engineer name:',
            validate: engName => {
                if (engName) {
                    return true;
                } else {
                    console.log('Please enter engineer name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter engineer ID:',
            validate: id => {
                if (id) {
                    return true;
                } else {
                    console.log('Please enter engineer ID!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter engineer email:',
            validate: email => {
                if (email) {
                    return true;
                } else {
                    console.log('Please enter engineer email!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter Github username:',
            validate: github => {
                if (github) {
                    return true;
                } else {
                    console.log('Please enter github username!');
                    return false;
                }
            }
        }
    ]).then(answers => {
        console.log(answers);
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        team.push(engineer);
        promptMenu();
    })
};

const promptIntern = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter intern name:',
            validate: intName => {
                if (intName) {
                    return true;
                } else {
                    console.log('Please enter intern name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter intern ID:',
            validate: id => {
                if (id) {
                    return true;
                } else {
                    console.log('Please enter intern ID!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter intern email:',
            validate: email => {
                if (email) {
                    return true;
                } else {
                    console.log('Please enter intern email!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: 'Enter name of school:',
            validate: school => {
                if (school) {
                    return true;
                } else {
                    console.log('Please enter school name!');
                    return false;
                }
            }
        }
    ]).then(answers => {
        console.log(answers);
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        team.push(intern);
        promptMenu();
    })
};

const buildTeam = () => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, generateHTML(team), "utf-8");
}

promptManager();

