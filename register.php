<?php
// config.php - Database connection configuration
$config = [
    'db_host' => 'localhost',
    'db_name' => 'ncmc_registration',
    'db_user' => 'username',
    'db_pass' => 'password'
];

// Connect to database
function connectDB() {
    global $config;
    
    try {
        $conn = new PDO(
            "mysql:host={$config['db_host']};dbname={$config['db_name']}", 
            $config['db_user'], 
            $config['db_pass']
        );
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch(PDOException $e) {
        return ['success' => false, 'message' => "Connection failed: " . $e->getMessage()];
    }
}

// Process registration.php - Handle the initial form submission
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action']) && $_POST['action'] == 'register') {
    // Collect form data
    $studentData = [
        'fullName' => $_POST['fullName'] ?? '',
        'dob' => $_POST['dob'] ?? '',
        'address' => $_POST['address'] ?? '',
        'class' => $_POST['class'] ?? '',
        'admissionNumber' => $_POST['admissionNumber'] ?? '',
        'admissionDate' => $_POST['admissionDate'] ?? '',
        'whatsapp' => $_POST['whatsapp'] ?? ''
    ];
    
    $parentData = [
        'fatherName' => $_POST['fatherName'] ?? null,
        'fatherJob' => $_POST['fatherJob'] ?? null,
        'fatherContact' => $_POST['fatherContact'] ?? null,
        'motherName' => $_POST['motherName'] ?? null,
        'motherJob' => $_POST['motherJob'] ?? null,
        'motherContact' => $_POST['motherContact'] ?? null,
        'guardianName' => $_POST['guardianName'] ?? null,
        'guardianJob' => $_POST['guardianJob'] ?? null,
        'guardianContact' => $_POST['guardianContact'] ?? null
    ];
    
    // Validate required fields
    $requiredFields = ['fullName', 'dob', 'address', 'class', 'admissionNumber', 'admissionDate', 'whatsapp'];
    foreach ($requiredFields as $field) {
        if (empty($studentData[$field])) {
            echo json_encode(['success' => false, 'message' => "Required field $field is missing"]);
            exit;
        }
    }
    
    // Store data in session for later use
    session_start();
    $_SESSION['registration_data'] = [
        'student' => $studentData,
        'parent' => $parentData
    ];
    
    echo json_encode(['success' => true, 'message' => 'Form data saved successfully']);
    exit;
}

// create_student_account.php - Create the student account
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action']) && $_POST['action'] == 'create_student') {
    session_start();
    
    // Check if we have the registration data
    if (!isset($_SESSION['registration_data'])) {
        echo json_encode(['success' => false, 'message' => 'Registration data not found']);
        exit;
    }
    
    // Get student account data
    $email = $_POST['studentEmail'] ?? '';
    $password = $_POST['studentPassword'] ?? '';
    $confirmPassword = $_POST['confirmStudentPassword'] ?? '';
    
    // Validate
    if (empty($email) || empty($password) || empty($confirmPassword)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }
    
    if ($password !== $confirmPassword) {
        echo json_encode(['success' => false, 'message' => 'Passwords do not match']);
        exit;
    }
    
    // Email validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        exit;
    }
    
    // Connect to database
    $conn = connectDB();
    if (!is_object($conn)) {
        echo json_encode($conn); // Return the error message
        exit;
    }
    
    // Check if email already exists
    $stmt = $conn->prepare("SELECT COUNT(*) FROM students WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetchColumn() > 0) {
        echo json_encode(['success' => false, 'message' => 'Email already registered']);
        exit;
    }
    
    // Hash the password (in production, use password_hash)
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // Get student data from session
    $studentData = $_SESSION['registration_data']['student'];
    
    // Insert into students table
    try {
        $stmt = $conn->prepare("
            INSERT INTO students 
            (full_name, date_of_birth, address, class, admission_number, admission_date, whatsapp_number, email, password) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $studentData['fullName'],
            $studentData['dob'],
            $studentData['address'],