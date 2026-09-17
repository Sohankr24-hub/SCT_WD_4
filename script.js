/* ==========================================
   TASKFLOW
   TO-DO WEB APPLICATION
   ========================================== */


/* =========================
   ELEMENTS
========================= */

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

const totalCount =
    document.getElementById("totalCount");

const activeCount =
    document.getElementById("activeCount");

const completedCount =
    document.getElementById("completedCount");

const taskSummary =
    document.getElementById("taskSummary");

const filters =
    document.querySelectorAll(".filter");

const dayName =
    document.getElementById("dayName");

const dateDisplay =
    document.getElementById("dateDisplay");


/* =========================
   EDIT MODAL
========================= */

const editModal =
    document.getElementById("editModal");

const editTaskInput =
    document.getElementById("editTaskInput");

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


/* =========================
   VARIABLES
========================= */

let tasks = [];

let currentFilter = "all";

let editingTaskId = null;


/* =========================
   LOAD SAVED TASKS
========================= */

try {

    tasks =
        JSON.parse(
            localStorage.getItem(
                "taskflow_tasks"
            )
        ) || [];

} catch (error) {

    tasks = [];

}


/* =========================
   SAVE TASKS
========================= */

function saveTasks() {

    localStorage.setItem(
        "taskflow_tasks",
        JSON.stringify(tasks)
    );

}


/* =========================
   DISPLAY DATE
========================= */

function showDate() {

    const today = new Date();


    dayName.textContent =
        today
            .toLocaleDateString(
                "en-US",
                {
                    weekday: "long"
                }
            )
            .toUpperCase();


    dateDisplay.textContent =
        today
            .toLocaleDateString(
                "en-US",
                {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                }
            );

}


showDate();


/* =========================
   ADD TASK
========================= */

taskForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const title =
            taskInput.value.trim();


        if (title === "") {

            return;

        }


        const task = {

            id: Date.now(),

            title: title,

            date: taskDate.value,

            time: taskTime.value,

            priority: taskPriority.value,

            completed: false

        };


        tasks.unshift(task);


        saveTasks();

        renderTasks();


        taskInput.value = "";

        taskDate.value = "";

        taskTime.value = "";

        taskPriority.value = "medium";


        taskInput.focus();

    }
);


/* =========================
   RENDER TASKS
========================= */

function renderTasks() {

    taskList.innerHTML = "";


    let visibleTasks;


    if (currentFilter === "active") {

        visibleTasks =
            tasks.filter(
                task => !task.completed
            );

    }

    else if (
        currentFilter === "completed"
    ) {

        visibleTasks =
            tasks.filter(
                task => task.completed
            );

    }

    else {

        visibleTasks = [...tasks];

    }


    if (visibleTasks.length === 0) {

        taskList.appendChild(
            emptyState
        );

        emptyState.style.display =
            "block";

    }

    else {

        emptyState.style.display =
            "none";


        visibleTasks.forEach(
            task => {

                taskList.appendChild(
                    createTaskElement(task)
                );

            }
        );

    }


    updateStatistics();

}


/* =========================
   CREATE TASK ELEMENT
========================= */

function createTaskElement(task) {

    const item =
        document.createElement("div");


    item.className =
        "task-item";


    if (task.completed) {

        item.classList.add(
            "completed"
        );

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
                    month: "short",
                    year: "numeric"
                }
            );

    }


    let dateTime = "";


    if (dateText && task.time) {

        dateTime =
            `◷ ${dateText} • ${task.time}`;

    }

    else if (dateText) {

        dateTime =
            `◷ ${dateText}`;

    }

    else if (task.time) {

        dateTime =
            `◷ ${task.time}`;

    }


    item.innerHTML = `

        <button
            class="check"
            title="Complete task"
        >
            ✓
        </button>


        <div class="task-info">

            <h3>
                ${escapeHTML(task.title)}
            </h3>


            <div class="meta">

                ${
                    dateTime
                    ? `<span>${dateTime}</span>`
                    : ""
                }


                <span
                    class="priority ${task.priority}"
                >
                    ${task.priority.toUpperCase()}
                </span>

            </div>

        </div>


        <div class="actions">

            <button
                class="action edit"
                title="Edit"
            >
                ✎
            </button>


            <button
                class="action delete"
                title="Delete"
            >
                ×
            </button>

        </div>

    `;


    /* Complete */

    item
        .querySelector(".check")
        .addEventListener(
            "click",
            () => {

                toggleTask(task.id);

            }
        );


    /* Edit */

    item
        .querySelector(".edit")
        .addEventListener(
            "click",
            () => {

                openEdit(task.id);

            }
        );


    /* Delete */

    item
        .querySelector(".delete")
        .addEventListener(
            "click",
            () => {

                deleteTask(task.id);

            }
        );


    return item;

}


/* =========================
   COMPLETE TASK
========================= */

function toggleTask(id) {

    tasks =
        tasks.map(task => {

            if (task.id === id) {

                return {

                    ...task,

                    completed:
                        !task.completed

                };

            }


            return task;

        });


    saveTasks();

    renderTasks();

}


/* =========================
   DELETE TASK
========================= */

function deleteTask(id) {

    tasks =
        tasks.filter(
            task => task.id !== id
        );


    saveTasks();

    renderTasks();

}


/* =========================
   OPEN EDIT
========================= */

function openEdit(id) {

    const task =
        tasks.find(
            task => task.id === id
        );


    if (!task) return;


    editingTaskId = id;


    editTaskInput.value =
        task.title;

    editDate.value =
        task.date;

    editTime.value =
        task.time;

    editPriority.value =
        task.priority;


    editModal.classList.add(
        "show"
    );


    editTaskInput.focus();

}


/* =========================
   SAVE EDIT
========================= */

saveEdit.addEventListener(
    "click",
    function() {

        const title =
            editTaskInput.value.trim();


        if (title === "") {

            return;

        }


        tasks =
            tasks.map(task => {

                if (
                    task.id ===
                    editingTaskId
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

        closeEdit();

    }
);


/* =========================
   CLOSE EDIT
========================= */

function closeEdit() {

    editModal.classList.remove(
        "show"
    );

    editingTaskId = null;

}


closeModal.addEventListener(
    "click",
    closeEdit
);


/* =========================
   CLICK OUTSIDE MODAL
========================= */

editModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === editModal
        ) {

            closeEdit();

        }

    }
);


/* =========================
   FILTERS
========================= */

filters.forEach(
    filter => {

        filter.addEventListener(
            "click",
            function() {

                filters.forEach(
                    button => {

                        button.classList.remove(
                            "active"
                        );

                    }
                );


                filter.classList.add(
                    "active"
                );


                currentFilter =
                    filter.dataset.filter;


                renderTasks();

            }
        );

    }
);


/* =========================
   STATISTICS
========================= */

function updateStatistics() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const active =
        total - completed;


    totalCount.textContent =
        total;

    activeCount.textContent =
        active;

    completedCount.textContent =
        completed;


    if (total === 0) {

        taskSummary.textContent =
            "Your tasks will appear here.";

    }

    else if (active === 0) {

        taskSummary.textContent =
            "All tasks completed!";

    }

    else {

        taskSummary.textContent =
            `${active} active task${active === 1 ? "" : "s"} remaining.`;

    }

}


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(text) {

    const element =
        document.createElement("div");


    element.textContent = text;


    return element.innerHTML;

}


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeEdit();

        }


        if (
            event.key === "Enter" &&
            document.activeElement ===
            editTaskInput
        ) {

            saveEdit.click();

        }

    }
);


/* =========================
   INITIALIZE
========================= */

renderTasks();
