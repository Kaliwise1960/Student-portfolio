document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. ACADEMIC PLANNER LOGIC
    // ==========================================
    const plannerForm = document.getElementById("plannerForm");
    const taskInput = document.getElementById("taskInput");
    const courseSelect = document.getElementById("courseSelect");
    const taskList = document.getElementById("taskList");

    // Task Array State
    let tasks = [
        { id: 1, title: "Submit COS 106 Practical Term Project", course: "COS 106", completed: false },
        { id: 2, title: "Review CYB 101 Security Fundamentals", course: "CYB 101", completed: true }
    ];

    // Render tasks dynamically into DOM
    function renderTasks() {
        if (!taskList) return;
        taskList.innerHTML = "";

        if (tasks.length === 0) {
            taskList.innerHTML = "<p style='color: var(--light-text);'>No active tasks. Add a task above to manage your schedule!</p>";
            return;
        }

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.className = `task-item ${task.completed ? "completed" : ""}`;

            li.innerHTML = `
                <div>
                    <strong>[${task.course}]</strong> ${task.title}
                </div>
                <div class="task-actions">
                    <button class="btn-complete" onclick="toggleTask(${task.id})">
                        ${task.completed ? "Undo" : "Complete"}
                    </button>
                    <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    // Add Task Event Handler
    if (plannerForm) {
        plannerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const titleVal = taskInput.value.trim();
            const courseVal = courseSelect.value;

            if (titleVal === "") return;

            const newTask = {
                id: Date.now(),
                title: titleVal,
                course: courseVal,
                completed: false
            };

            tasks.push(newTask);
            taskInput.value = "";
            renderTasks();
        });
    }

    // Toggle completion status
    window.toggleTask = function(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        renderTasks();
    };

    // Delete task from array
    window.deleteTask = function(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    };

    // Initial render call
    renderTasks();


    // ==========================================
    // 2. CONTACT FORM VALIDATION LOGIC
    // ==========================================
    const contactForm = document.getElementById("contactForm");
    const formFeedback = document.getElementById("formFeedback");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("fullName").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const message = document.getElementById("message").value.trim();

            // Regex Patterns
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneDigitsOnlyPattern = /^\d+$/;

            // Reset feedback
            formFeedback.className = "feedback-msg";
            formFeedback.textContent = "";

            // Validation Requirement 1: Non-empty fields
            if (name === "" || email === "" || phone === "" || message === "") {
                showFeedback("All fields are required. Please complete every field.", "error");
                return;
            }

            // Validation Requirement 2: Valid email format
            if (!emailPattern.test(email)) {
                showFeedback("Please enter a valid email address (e.g., student@miva.edu.ng).", "error");
                return;
            }

            // Validation Requirement 3: Phone number contains digits only
            if (!phoneDigitsOnlyPattern.test(phone)) {
                showFeedback("Phone number must contain digits only.", "error");
                return;
            }

            // All validations passed
            showFeedback("Thank you! Your message has been submitted successfully.", "success");
            contactForm.reset();
        });
    }

    function showFeedback(msg, type) {
        if (!formFeedback) return;
        formFeedback.textContent = msg;
        formFeedback.className = `feedback-msg ${type}`;
    }
});
