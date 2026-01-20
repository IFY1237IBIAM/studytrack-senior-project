const TEST_URL = "http://localhost:5001/api";

const runTests = async () => {
    console.log("--- Starting Backend Tests ---");

    // Helper to handle response
    const handleResponse = async (response, label) => {
        const text = await response.text();
        try {
            const data = JSON.parse(text);
            if (response.ok) {
                console.log(`✅ ${label} Success:`, data);
                return data;
            } else {
                console.log(`❌ ${label} Failed:`, data);
                return data;
            }
        } catch (e) {
            console.log(`❌ ${label} Failed (Non-JSON Response):`, text);
            return null;
        }
    };

    // 1. Register User
    console.log("\n1. Testing User Registration...");
    let user = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
    };

    let response = await fetch(`${TEST_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });

    let data = await handleResponse(response, "Registration");

    // If user already exists (from previous runs), log it and move to login
    if (data?.message === "User already exists") {
        console.log("ℹ️ User exists, proceeding to login...");
    } else if (!data && !response.ok) {
        // Critical failure if we can't register or login
        return;
    }

    // 2. Login User
    console.log("\n2. Testing Login...");
    response = await fetch(`${TEST_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, password: user.password }),
    });

    data = await handleResponse(response, "Login");

    if (!data?.token) {
        console.log("🛑 Creating/Logging in user failed. Stopping tests.");
        return;
    }

    const token = data.token;
    const userId = data.id;

    // 3. Create Task
    console.log("\n3. Testing Create Task...");
    const task = { title: "Complete Backend Implementation" };
    response = await fetch(`${TEST_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(task),
    });
    data = await handleResponse(response, "Create Task");
    const taskId = data?.id;


    // 4. Get Tasks
    console.log("\n4. Testing Get Tasks...");
    response = await fetch(`${TEST_URL}/tasks`, {
        headers: { "Authorization": `Bearer ${token}` },
    });
    data = await handleResponse(response, "Get Tasks");

    // 5. Update Task
    if (taskId) {
        console.log("\n5. Testing Update Task...");
        response = await fetch(`${TEST_URL}/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ status: "Completed" }),
        });
        handleResponse(response, "Update Task");
    }

    // 6. Delete Task
    if (taskId) {
        console.log("\n6. Testing Delete Task...");
        response = await fetch(`${TEST_URL}/tasks/${taskId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
        });
        handleResponse(response, "Delete Task");
    }

    // 7. Contact Form
    console.log("\n7. Testing Contact Form...");
    response = await fetch(`${TEST_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Test", email: "test@test.com", subject: "Hello", message: "World" }),
    });
    handleResponse(response, "Contact Form");

    console.log("\n--- Tests Completed ---");
};

runTests();
