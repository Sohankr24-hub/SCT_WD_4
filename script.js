/* ==========================================
   TASKFLOW - TO-DO WEB APPLICATION
   SCT_WD_4
   ========================================== */


/* ================= ELEMENTS ================= */

const taskForm =
    document.getElementById("taskForm");

const taskInput =
    document.getElementById("taskInput");

const taskDate =
    document.getElementById("taskDate");

const taskTime =
    document.getElementById("taskTime");

const taskPriority =
    document.getElementById("taskPriority");

const taskList =
    document.getElementById("taskList");

const emptyState =
    document.getElementById("emptyState");

const totalTasks =
    document.getElementById("totalTasks");

const activeTasks =
    document.getElementById("activeTasks");

const completedTasks =
    document.getElementById("completedTasks");

const taskMessage =
    document.getElementById("taskMessage");

const filters =
    document.querySelectorAll(".filter");

const currentDay =
    document.getElementById("currentDay");

const currentDate =
    document.getElementById("currentDate");


/* ================= EDIT MODAL ================= */

const editModal =
    document.getElementById("editModal");

const editInput =
    document.getElementById("editInput");

const editDate =
    document.getElementById("editDate");

const editTime =
    document.getElementById("editTime");

const editPriority =
    document.getElementById("editPriority");

const saveEdit =
    document.getElementById("saveEdit");

const closeModal =
    document.getElementById("closeModal");


/* ================= VARIABLES ================= */

let tasks =
    JSON.parse(
        localStorage.getItem("taskflowTasks")
    ) || [];


let currentFilter = "all";

let editingTaskId = null;


/* ================= CURRENT DATE ================= */

function updateDate() {

    const now = new Date();

    currentDay.textContent =
        now.toLocaleDateString(
            "en-US",
            {
                weekday: "long"
            }
        ).toUpperCase();


    currentDate.textContent =
        now.toLocaleDateString(
            "en-US",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

}


updateDate();


/* ================= SAVE ================= */

function saveTasks() {

    localStorage.setItem(
        "taskflowTasks",
        JSON.stringify(tasks)
    );

}


/* ================= ADD TASK ================= */

taskForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const title =
            taskInput.value.trim();


        if (!title) return;


        const task = {

            id: Date.now(),

            title: title,

            date: taskDate.value,

            time: taskTime.value,

            priority: taskPriority.value,

            completed: false,

            createdAt: new Date().toISOString()

        };


        tasks.unshift(task);


        saveTasks();

        renderTasks();


        taskForm.reset();

        taskPriority.value = "medium";

    }
);


/* ================= RENDER TASKS ================= */

function renderTasks() {

    taskList.innerHTML = "";


    let filteredTasks =
        tasks.filter(task => {

            if (currentFilter === "active") {

                return !task.completed;

            }


            if (currentFilter === "completed") {

                return task.completed;

            }


            return true;

        });


    if (filteredTasks.length === 0) {

        taskList.appendChild(emptyState);

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";


        filteredTasks.forEach(task => {

            const item =
                createTaskElement(task);

            taskList.appendChild(item);

        });

    }


    updateStats();

}


/* ================= CREATE TASK ================= */

function createTaskElement(task) {

    const item =
        document.createElement("div");


    item.className =
        "task-item";


    if (task.completed) {

        item.classList.add("completed");

    }


    let dateText = "";

    if (task.date) {

        const date =
            new Date(
                task.date + "T00:00:00"
            );


        dateText =
            date.toLocaleDateString(
                "en-US",
                {
                    day: "numeric",
                    month: "short"
                }
            );

    }


    let timeText =
        task.time
            ? task.time
            : "";


    let dateTimeText = "";

    if (dateText && timeText) {

        dateTimeText =
            `${dateText} • ${timeText}`;

    } else {

        dateTimeText =
            dateText || timeText;

    }


    item.innerHTML = `

        <button
            class="check-btn"
            title="Mark complete"
        >
            ✓
        </button>


        <div class="task-info">

            <h3>
                ${escapeHTML(task.title)}
            </h3>


            <div class="task-meta">

                ${
                    dateTimeText
                        ? `<span>◷ ${dateTimeText}</span>`
                        : ""
                }


                <span
                    class="priority ${task.priority}"
                >
                    ${task.priority.toUpperCase()}
                </span>

            </div>

        </div>


        <div class="task-actions">

            <button
                class="action-btn edit-btn"
                title="Edit task"
            >
                ✎
            </button>


            <button
                class="action-btn delete-btn"
                title="Delete task"
            >
                ×
            </button>

        </div>

    `;


    /* Complete */

    item
        .querySelector(".check-btn")
        .addEventListener(
            "click",
            () => toggleTask(task.id)
        );


    /* Edit */

    item
        .querySelector(".edit-btn")
        .addEventListener(
            "click",
            () => openEditModal(task.id)
        );


    /* Delete */

    item
        .querySelector(".delete-btn")
        .addEventListener(
            "click",
            () => deleteTask(task.id)
        );


    return item;

}


/* ================= COMPLETE ================= */

function toggleTask(id) {

    tasks =
        tasks.map(task => {

            if (task.id === id) {

                return {
                    ...task,
                    completed: !task.completed
                };

            }

            return task;

        });


    saveTasks();

    renderTasks();

}


/* ================= DELETE ================= */

function deleteTask(id) {

    tasks =
        tasks.filter(
            task => task.id !== id
        );


    saveTasks();

    renderTasks();

}


/* ================= EDIT ================= */

function openEditModal(id) {

    const task =
        tasks.find(
            task => task.id === id
        );


    if (!task) return;


    editingTaskId = id;


    editInput.value =
        task.title;

    editDate.value =
        task.date;

    editTime.value =
        task.time;

    editPriority.value =
        task.priority;


    editModal.classList.add("show");

}


closeModal.addEventListener(
    "click",
    () => {

        editModal.classList.remove(
            "show"
        );

    }
);


/* ================= SAVE EDIT ================= */

saveEdit.addEventListener(
    "click",
    () => {

        const title =
            editInput.value.trim();


        if (!title) return;


        tasks =
            tasks.map(task => {

                if (
                    task.id === editingTaskId
                ) {

                    return {

                        ...task,

                        title: title,

                        date:
                            editDate.value,

                        time:
                            editTime.value,

                        priority:
                            editPriority.value

                    };

                }


                return task;

            });


        saveTasks();

        renderTasks();

        editModal.classList.remove(
            "show"
        );

    }
);


/* ================= CLOSE MODAL OUTSIDE ================= */

editModal.addEventListener(
    "click",
    event => {

        if (
            event.target === editModal
        ) {

            editModal.classList.remove(
                "show"
            );

        }

    }
);


/* ================= FILTERS ================= */

filters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            filters.forEach(button => {

                button.classList.remove(
                    "active"
                );

            });


            filter.classList.add(
                "active"
            );


            currentFilter =
                filter.dataset.filter;


            renderTasks();

        }
    );

});


/* ================= STATISTICS ================= */

function updateStats() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const active =
        total - completed;


    totalTasks.textContent =
        total;

    activeTasks.textContent =
        active;

    completedTasks.textContent =
        completed;


    if (total === 0) {

        taskMessage.textContent =
            "Your tasks will appear here.";

    } else {

        taskMessage.textContent =
            `${active} active task${active !== 1 ? "s" : ""} remaining.`;

    }

}


/* ================= ESCAPE HTML ================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* ================= KEYBOARD ================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            editModal.classList.remove(
                "show"
            );

        }

    }
);


/* ================= INITIAL RENDER ================= */

renderTasks();
