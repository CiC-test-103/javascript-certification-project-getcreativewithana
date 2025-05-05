/**
 * Create a Student Class
 * The class should have the private fields:
 * - name, year, email, specialization
 * The class should have means to modify these fields
 * The class should have means to access these fields
 *
 * 🔆🔆🔆This version uses _underscore to simulate private fields
 * because # syntax may not be supported in older environments.
 */


class Student {
    // "Private" Fields using underscore (accessible within the class)
    _name; // String (full name, no spaces like "JohnDoe")
    _year; // Number (e.g., 2 for 2nd year)
    _email; // String (e.g., "student@example.com")
    _specialization; // String (must be written in camelCase, e.g., "computerScience")


    /**
     * REQUIRES: The fields specified above
     * EFFECTS:  Creates a new Student instance
     * RETURNS:  None
     *
     * Constructor is called automatically when a new Student is created.
     * It sets up the name, year, email, and specialization.
     * 🔆🔆🔆 # is replaced with _ b/c it's an older version ie this#name is this._name
     */
    constructor(name, year, email, specialization) {
        this._name = name;
        this._year = year;
        this._email = email;
        this._specialization = specialization;
    }


    /**
     * REQUIRES:  None
     * EFFECTS:   None
     * RETURNS:   The student name (String)
     *
     * Getter method to access private field _name
     */
    getName() {
        return this._name;
    }


    /**
     * REQUIRES:  None
     * EFFECTS:   None
     * RETURNS:   The student year (Number)
     *
     * Getter for the year the student is in
     */
    getYear() {
        return this._year;
    }


    /**
     * REQUIRES:  None
     * EFFECTS:   None
     * RETURNS:   The student email (String)
     *
     * Getter for the student email address
     */
    getEmail() {
        return this._email;
    }


    /**
     * REQUIRES:  None
     * EFFECTS:   None
     * RETURNS:   The student specialization (String)
     *
     * Getter for the student’s chosen specialization
     */
    getSpecialization() {
        return this._specialization;
    }


    /**
     * REQUIRES:  None
     * EFFECTS:   None
     * RETURNS:   Student object as a string (formatted for display)
     *
     * Useful for logging or displaying student info
     */
    getString() {
        return `Name: ${this._name}, Year: ${this._year}, Email: ${this._email}, Specialization: ${this._specialization}`;
    }


    /**
     * REQUIRES:  The student's new email (String)
     * EFFECTS:   Modifies the student's email to match
     * RETURNS:   None
     *
     * Setter method to update the private _email field
     */
    setEmail(newEmail) {
        this._email = newEmail;
    }


    /**
     * REQUIRES:  The student's new specialization (String)
     * EFFECTS:   Modifies the student's specialization to match
     * RETURNS:   The student specialization (String)
     *
     * Setter to change the specialization (e.g., from "math" to "computerScience")
     */
    setSpecialization(newSpecialization) {
        this._specialization = newSpecialization;
    }
}


// Export the Student class so it can be used in other files (like LinkedList.js)
module.exports = { Student };