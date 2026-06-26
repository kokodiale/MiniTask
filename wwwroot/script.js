const apiUrl = "/api/tasks";

async function loadTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();

    const tasksList = document.getElementById("tasksList");
    tasksList.innerHTML = "";

    if (tasks.length === 0) {
        tasksList.innerHTML = "<p>Brak zadań do wyświetlenia.</p>";
        return;
    }

    tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";

        const title = document.createElement("h3");
        title.textContent = task.title;

        const description = document.createElement("p");
        description.textContent = task.description;

        const statusText = document.createElement("p");
        statusText.innerHTML = `Status: <span class="status">${task.status}</span>`;

        const select = document.createElement("select");
        select.id = `status-${task.id}`;

        ["Nowe", "W trakcie", "Zakończone"].forEach(status => {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;

            if (task.status === status) {
                option.selected = true;
            }

            select.appendChild(option);
        });

        const updateButton = document.createElement("button");
        updateButton.textContent = "Zmień status";
        updateButton.onclick = () => updateTask(task.id, task.title, task.description);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Usuń";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = () => deleteTask(task.id);

        taskDiv.appendChild(title);
        taskDiv.appendChild(description);
        taskDiv.appendChild(statusText);
        taskDiv.appendChild(select);
        taskDiv.appendChild(updateButton);
        taskDiv.appendChild(deleteButton);

        tasksList.appendChild(taskDiv);
    });
}

async function addTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const status = document.getElementById("status").value;

    if (title.trim() === "") {
        alert("Podaj tytuł zadania.");
        return;
    }

    const newTask = {
        title: title,
        description: description,
        status: status
    };

    await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
    });

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("status").value = "Nowe";

    loadTasks();
}

async function updateTask(id, title, description) {
    const newStatus = document.getElementById(`status-${id}`).value;

    const updatedTask = {
        title: title,
        description: description,
        status: newStatus
    };

    await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTask)
    });

    loadTasks();
}

async function deleteTask(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

loadTasks();

setInterval(loadTasks, 3000);
