// Necessary Imports (you will need to use this)
const { Student } = require('./Student');
const fs = require('fs/promises'); // For reading/writing JSON files


/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
    // Public Fields
    data // Student
    next // Object


    /**
     * REQUIRES:  The fields specified above
     * EFFECTS:   Creates a new Node instance
     * RETURNS:   None
     * // Null = undefined
     */
    constructor(data, next = null) {
        this.data = data; // This holds the student data
        this.next = next; // This points to the next node (or null if last node)
    }
}


/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
    // Public Fields
    head // Object
    tail // Object
    length // Number representing size of LinkedList


    /**
     * REQUIRES:  None
     * EFFECTS:   Creates a new LinkedList instance (empty)
     * RETURNS:   None
     * 🔆To add debug: console.log("Linked list initialized: empty");
     * 🔆To pass multiple nodes add values.forEach(value => this.append(value));}
     */
    constructor() {
        // TODO: Initialize an empty linked list
        this.head = null;
        this.tail = null;
        this.length = 0;
    }


    /**
     * REQUIRES:  A new student (Student)
     * EFFECTS:   Adds a Student to the end of the LinkedList
     * RETURNS:   None
     */
    addStudent(newStudent) {
        // TODO: Create a new Node and add to the end of the list
        //🔆if (!this.head) { checks if list is empty 
        //Wraps the newStudent in a Node. const newNode = new Node(newStudent);
        //Checks if the list is empty (this.head is null).
        //If empty: Set both head and tail to point to the new node.
        //Not empty: Attach the new node to the end of the list (this.tail.next = newNode)


        const newNode = new Node(newStudent);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }


    /**
     * REQUIRES:  email(String)
     * EFFECTS:   Removes a student by email (assume unique)
     * RETURNS:   None
     */
    removeStudent(email) {
        // TODO: Find node by email and remove it from the list
        //🔆If the list is empty (this.head === null), there’s nothing to remove, so it exits early.
        //If the first node (head) matches the email:
        //Move the head pointer to the next node (this.head.next)
        //If the list is now empty (this.head === null), also set tail = null


        if (!this.head) return;


        if (this.head.data.getEmail() === email) {
            this.head = this.head.next;
            if (!this.head) this.tail = null;
            this.length--;
            return;
        }


        let current = this.head;
        while (current.next) {
            if (current.next.data.getEmail() === email) {
                if (current.next === this.tail) this.tail = current;
                current.next = current.next.next;
                this.length--;
                return;
            }
            current = current.next;
        }
    }


    /**
     * REQUIRES:  email (String)
     * EFFECTS:   None
     * RETURNS:   The Student or -1 if not found
     */
    findStudent(email) {
        // TODO: Traverse list and return the student if found
        //🔆ilet current = this.head; (FIRST NODE) 
        //current will be used to move through each node.
        //while (current) { Loop through the linked list until current becomes null (end of list).
        //Check if the student's email matches the one we're looking for.
        //If it matches, return the student object (current.data)
        let current = this.head;
        while (current) {
            if (current.data.getEmail() === email) {
                return current.data;
            }
            current = current.next;
        }
        return -1;
    }


    /**
     * REQUIRES:  None
     * EFFECTS:   Clears all students from the Linked List
     * RETURNS:   None
     */
    clearStudents() {
            // TODO: Reset head, tail, and length
            // 
            this.head = null;
            this.tail = null;
            this.length = 0;
        }
        /**
         * REQUIRES:  None
         * EFFECTS:   None
         * RETURNS:   LinkedList as a String for console.log in caller
         * this.head = null; Removes the reference to the first node in the list.
         * this.tail = null; Clears the reference to the last node, since the list is now empty.
         * this.length = 0; Resets the count of students in the list to 0.
         */
    displayStudents() {
        // TODO: Return comma-separated student names\
        let names = [];
        let current = this.head;
        while (current) {
            names.push(current.data.getName());
            current = current.next;
        }
        return names.join(', ');
    }


    /**
     * REQUIRES:  None
     * EFFECTS:   None
     * RETURNS:   A sorted array of students by name
     */
    sortStudentsByName() {
        // TODO: Gather all students into array and sort
        // 🔆let students = []; empty array
        //Add each Student object (current.data) to the array.
        //Move to the next node until you reach the end.
        let students = [];
        let current = this.head;
        while (current) {
            students.push(current.data);
            current = current.next;
        }
        return students.sort((a, b) => a.getName().localeCompare(b.getName()));
    }


    /**
     * REQUIRES:  specialization (String)
     * EFFECTS:   None
     * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
     */
    filterBySpecialization(specialization) {
        // TODO: Filter by specialization using sorted array
        //🔆ifilter student:From that sorted list, it keeps only the students whose getSpecialization() matches the argument.
        return this.sortStudentsByName().filter(student =>
            student.getSpecialization() === specialization
        );
    }


    /**
     * REQUIRES:  minAge (Number)
     * EFFECTS:   None
     * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
     */
    filterByMinAge(minAge) {
        // TODO: Filter students with year >= minAge using sorted array
        //🔆ifilter(student => student.getYear() >= minAge) Keeps only students whose year is greater than or equal to minAge.
        return this.sortStudentsByName().filter(student =>
            student.getYear() >= minAge
        );
    }


    /**
     * REQUIRES:  A valid file name (String)
     * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
     * RETURNS:   None
     */
    async saveToJson(fileName) {
            // TODO: Convert students to plain objects and write to file
            let students = [];
            let current = this.head;
            while (current) {
                const s = current.data;
                students.push({
                    name: s.getName(),
                    year: s.getYear(),
                    email: s.getEmail(),
                    specialization: s.getSpecialization()
                });
                current = current.next;
            }
            await fs.writeFile(fileName, JSON.stringify(students, null, 2));
        }
        // 🔆This loop goes through each node in the linked list:s is the Student object at the current node.
        //It pushes a plain JavaScript object (no class methods) into the students array.
        //Moves to the next node with current = current.next.


    /**
     * REQUIRES:  A valid file name (String) that exists
     * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
     * RETURNS:   None
     * CONSIDERATIONS:
     *  - Use clearStudents() to perform overwriting
     */
    async loadFromJSON(fileName) {
        // TODO: Clear current list and load students from file
        //🔆clears list
        //'utf-8' means you want to read it as a text string.
        //const studentArray = JSON.parse(data);Convert the JSON string into a JavaScript array of student objects
        //for (const s of studentArray) { Loop over each raw student object (s) in the array.
        //Add the student to the linked list using a method like addStudent.


        this.clearStudents();
        const data = await fs.readFile(fileName, 'utf-8');
        const studentArray = JSON.parse(data);
        for (const s of studentArray) {
            const student = new Student(s.name, s.year, s.email, s.specialization);
            this.addStudent(student);
        }
    }
}


module.exports = { LinkedList };