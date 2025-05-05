//Deleted merge file "head"
// Necessary Imports, DO NOT REMOVE
const { LinkedList } = require("./LinkedList");
const { Student } = require("./Student");
const readline = require("readline");


// Initialize terminal interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// Creates the Student Management System as a Linked List
/**
 * studentManagementSystem is the object that the main() function will be modifying
 */
const studentManagementSystem = new LinkedList();


// Display available commands
function main() {
    console.log(`
Available Commands:
- add [name] [year] [email] [specialization]: Add a student
- remove [email]: Remove a student by email
- display: Show all students
- find [email]: Find a student by email
- save [fileName]: Save the current linked list to a file
- load [fileName]: Load a linked list from a file
- clear: Clear the current linked list
- q: Quit the terminal
`);
}


// Command handling logic
async function handleCommand(command) {
    const [operation, ...args] = command.trim().split(" ");


    switch (operation) {
        case "add":
            /**
             * TODO:
             *  Adds a student to the LinkedList
             *  You will need to do the following:
             *   - Grab the args (code is given)
             *   - Use implemented functions in LinkedList to add the Student, and display the updated LinkedList
             */
            if (args.length < 4) {
                console.log("Invalid add command.");
                break;
            }
            const [name, yearStr, email, specialization] = args;
            const year = parseInt(yearStr);
            const student = new Student(name, year, email, specialization);
            studentManagementSystem.addStudent(student);
            console.log("Student added.");
            break;


        case "remove":
            /**
             * TODO:
             *  Removes a particular student by email
             *  You will need to do the following:
             *   - Grab the args (emailToRemove)
             *   - Use implemented functions in LinkedList to remove the Student, and display the updated LinkedList
             */
            const emailToRemove = args[0];
            studentManagementSystem.removeStudent(emailToRemove);
            console.log("Student removed.");
            break;


        case "display":
            /**
             * TODO:
             *  Displays the students in the Linked List
             *  You will need to do the following:
             *   - Use implemented functions in LinkedList to display the student
             */
            console.log(studentManagementSystem.displayStudents());
            break;


        case "find":
            /**
             * TODO:
             *  Finds a particular student by email, and returns their information
             *  You will need to do the following:
             *   - Grab the args (emailToFind)
             *   - Use implemented functions in LinkedList to grab the Student
             *   - Use implemented functions in Student to display if found, otherwise, state "Student does not exist"
             */
            const emailToFind = args[0];
            const found = studentManagementSystem.findStudent(emailToFind);
            if (found === -1) {
                console.log("Student does not exist");
            } else {
                console.log(`Name: ${found.getName()}, Year: ${found.getYear()}, Email: ${found.getEmail()}, Specialization: ${found.getSpecialization()}`);
            }
            break;


        case "save":
            /**
             * TODO:
             *  Saves the current LinkedList to a specified JSON file
             *  You will need to do the following:
             *   - Grab the args (saveFile)
             *   - Use implemented functions in LinkedList to save the data
             */
            const saveFile = args[0];
            await studentManagementSystem.saveToJson(saveFile);
            console.log("Students saved.");
            break;


        case "load":
            /**
             * TODO:
             *  Loads data from specified JSON file into current Linked List
             *  You will need to do the following:
             *   - Grab the args (loadFile)
             *   - Use implemented functions in LinkedList to load the data, and display the updated LinkedList
             */
            const loadFile = args[0];
            await studentManagementSystem.loadFromJSON(loadFile);
            console.log("Students loaded.");
            break;


        case "clear":
            /**
             * TODO:
             *  Clears all data in the Linked List
             *  You will need to do the following:
             *   - Use implemented functions in LinkedList to clear the data
             */
            studentManagementSystem.clearStudents();
            console.log("All students cleared.");
            break;


        case "q":
            console.log("Goodbye!");
            rl.close();
            break;


        default:
            console.log('Unknown command. Type "help" for a list of commands.');
            break;
    }
}


// Start terminal-based interaction (DO NOT MODIFY)
console.log("Welcome to the Student Management System!");
main();


rl.on("line", async(input) => {
    if (input.trim().toLowerCase() === "help") {
        main();
    } else {
        await handleCommand(input);
    }
});