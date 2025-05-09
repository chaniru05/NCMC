-- MySQL Database Structure for NCMC Registration System

-- Students Table
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    address TEXT NOT NULL,
    class VARCHAR(10) NOT NULL,
    admission_number VARCHAR(50) NOT NULL,
    admission_date DATE NOT NULL,
    whatsapp_number VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Should be hashed in production
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Parents Table
CREATE TABLE parents (
    parent_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Should be hashed in production
    father_name VARCHAR(100),
    father_job VARCHAR(100),
    father_contact VARCHAR(20),
    mother_name VARCHAR(100),
    mother_job VARCHAR(100),
    mother_contact VARCHAR(20),
    guardian_name VARCHAR(100),
    guardian_job VARCHAR(100),
    guardian_contact VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Memberships Table 
CREATE TABLE memberships (
    membership_id INT AUTO_INCREMENT PRIMARY KEY,
    membership_code VARCHAR(12) UNIQUE NOT NULL, -- Format: NCMC000001M to NCMC999999M
    student_id INT NOT NULL,
    parent_id INT NOT NULL,
    registration_date DATE NOT NULL,
    membership_status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (parent_id) REFERENCES parents(parent_id)
);

-- Index for faster lookup by membership code
CREATE INDEX idx_membership_code ON memberships(membership_code);

-- Membership Counter Table (to track the current membership number)
CREATE TABLE membership_counter (
    id INT PRIMARY KEY DEFAULT 1,
    current_value INT NOT NULL DEFAULT 1,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CHECK (id = 1) -- Ensures only one row exists
);

-- Initialize the counter
INSERT INTO membership_counter (current_value) VALUES (1);

-- Example Stored Procedure to Generate New Membership ID
DELIMITER //
CREATE PROCEDURE generate_membership_id (OUT new_membership_code VARCHAR(12))
BEGIN
    DECLARE current_id INT;
    
    -- Get the current counter value
    SELECT current_value INTO current_id FROM membership_counter WHERE id = 1 FOR UPDATE;
    
    -- Generate the membership code
    SET new_membership_code = CONCAT('NCMC', LPAD(current_id, 6, '0'), 'M');
    
    -- Increment the counter
    UPDATE membership_counter SET current_value = current_id + 1 WHERE id = 1;
END //
DELIMITER ;

-- Example Trigger to automatically generate membership_code before insert
DELIMITER //
CREATE TRIGGER before_membership_insert
BEFORE INSERT ON memberships
FOR EACH ROW
BEGIN
    DECLARE new_code VARCHAR(12);
    
    IF NEW.membership_code IS NULL OR NEW.membership_code = '' THEN
        CALL generate_membership_id(new_code);
        SET NEW.membership_code = new_code;
    END IF;
END //
DELIMITER ;

-- Example of how to insert a new membership
/*
-- First, insert student
INSERT INTO students (full_name, date_of_birth, address, class, admission_number, admission_date, whatsapp_number, email, password)
VALUES ('John Doe', '2008-05-15', '123 Student St, Colombo', '9', 'NC2025001', '2022-01-15', '0771234567', 'john.doe@example.com', 'hashed_password');

-- Then, insert parent
INSERT INTO parents (email, password, father_name, father_job, father_contact)
VALUES ('parent.doe@example.com', 'hashed_password', 'James Doe', 'Engineer', '0712345678');

-- Finally, create membership (the code will be auto-generated)
INSERT INTO memberships (student_id, parent_id, registration_date)
VALUES (
    (SELECT student_id FROM students WHERE email = 'john.doe@example.com'),
    (SELECT parent_id FROM parents WHERE email = 'parent.doe@example.com'),
    CURDATE()
);
*/

-- Additional tables that might be useful:

-- Login History Table
CREATE TABLE login_history (
    login_id INT AUTO_INCREMENT PRIMARY KEY,
    user_type ENUM('student', 'parent') NOT NULL,
    user_id INT NOT NULL,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT
);

-- Activity Log Table
CREATE TABLE activity_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_type ENUM('student', 'parent', 'admin') NOT NULL,
    user_id INT NOT NULL,
    activity_type VARCHAR(50) NOT NULL,
    activity_details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tournament Registrations Table (for future use)
CREATE TABLE tournament_registrations (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    tournament_name VARCHAR(100) NOT NULL,
    student_id INT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

-- Workshop Registrations Table (for future use)
CREATE TABLE workshop_registrations (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    workshop_name VARCHAR(100) NOT NULL,
    student_id INT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);