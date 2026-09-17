@import url(
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'
);


/* ================= RESET ================= */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}


body {

    min-height: 100vh;

    font-family: "Inter", sans-serif;

    background: #090a0f;

    color: white;

    padding: 40px 0;

}


/* ================= VARIABLES ================= */

:root {

    --background: #090a0f;

    --card: rgba(18, 20, 28, 0.9);

    --border: rgba(255,255,255,0.08);

    --muted: #858894;

    --red: #ff315a;

    --red-dark: #ff1744;

    --green: #39d98a;

    --yellow: #ffc857;

}


/* ================= BACKGROUND ================= */

.background {

    position: fixed;

    inset: 0;

    overflow: hidden;

    z-index: -1;

    background:

        radial-gradient(
            circle at 15% 15%,
            rgba(255,49,90,0.12),
            transparent 30%
        ),

        radial-gradient(
            circle at 85% 85%,
            rgba(66,100,255,0.08),
            transparent 30%
        );

}


.glow {

    position: absolute;

    width: 300px;

    height: 300px;

    border-radius: 50%;

    filter: blur(130px);

    opacity: 0.2;

}


.glow-one {

    background: var(--red);

    top: -150px;

    left: -100px;

}


.glow-two {

    background: #394cff;

    bottom: -150px;

    right: -100px;

}


/* ================= APP ================= */

.app {

    width: min(900px, 92%);

    margin: auto;

}


/* ================= HEADER ================= */

.header {

    display: flex;

    justify-content: space-between;

    align-items: flex-end;

    margin-bottom: 30px;

}


.eyebrow {

    color: var(--red);

    font-size: 9px;

    font-weight: 800;

    letter-spacing: 3px;

    margin-bottom: 8px;

}


.header h1 {

    font-size: 45px;

    font-weight: 900;

    letter-spacing: -2px;

}


.header h1 span {

    color: var(--red);

}


.subtitle {

    color: var(--muted);

    font-size: 13px;

    margin-top: 7px;

}


.date-box {

    text-align: right;

    padding: 12px 18px;

    border: 1px solid var(--border);

    background: var(--card);

    border-radius: 12px;

}


.date-box span {

    display: block;

    color: var(--red);

    font-size: 8px;

    font-weight: 800;

    letter-spacing: 2px;

}


.date-box strong {

    display: block;

    margin-top: 5px;

    font-size: 12px;

    color: #ccc;

}


/* ================= STATS ================= */

.stats {

    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 12px;

    margin-bottom: 18px;

}


.stat-card {

    background: var(--card);

    border: 1px solid var(--border);

    border-radius: 14px;

    padding: 18px 20px;

}


.stat-card span {

    color: var(--muted);

    font-size: 8px;

    font-weight: 800;

    letter-spacing: 2px;

}


.stat-card strong {

    display: block;

    margin-top: 5px;

    font-size: 25px;

}


/* ================= CARDS ================= */

.add-card,
.tasks-card {

    background: var(--card);

    border: 1px solid var(--border);

    border-radius: 18px;

    padding: 28px;

    backdrop-filter: blur(20px);

}


.tasks-card {

    margin-top: 18px;

}


/* ================= SECTION TITLE ================= */

.section-title {

    display: flex;

    align-items: center;

    gap: 10px;

    margin-bottom: 20px;

}


.section-title span {

    color: var(--red);

    font-size: 9px;

    font-weight: 800;

    letter-spacing: 1px;

}


.section-title h2 {

    font-size: 19px;

}


/* ================= INPUT ================= */

.input-row {

    display: flex;

    gap: 10px;

}


#taskInput {

    flex: 1;

    min-width: 0;

    padding: 16px;

    background: rgba(255,255,255,0.04);

    border: 1px solid var(--border);

    border-radius: 10px;

    color: white;

    outline: none;

    font-size: 13px;

}


#taskInput:focus {

    border-color: rgba(255,49,90,0.5);

}


#taskInput::placeholder {

    color: #5f616b;

}


.add-btn {

    border: none;

    border-radius: 10px;

    padding: 0 22px;

    background: var(--red);

    color: white;

    font-size: 10px;

    font-weight: 800;

    letter-spacing: 1px;

    cursor: pointer;

    transition: 0.25s;

}


.add-btn:hover {

    background: var(--red-dark);

    transform: translateY(-2px);

}


/* ================= OPTIONS ================= */

.task-options {

    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 10px;

    margin-top: 12px;

}


.option label,
.edit-options label {

    display: block;

    color: var(--muted);

    font-size: 8px;

    font-weight: 800;

    letter-spacing: 1px;

    margin-bottom: 6px;

}


.option input,
.option select,
.edit-options input,
.edit-options select {

    width: 100%;

    padding: 11px;

    background: rgba(255,255,255,0.04);

    border: 1px solid var(--border);

    border-radius: 8px;

    color: white;

    outline: none;

    font-family: inherit;

    font-size: 11px;

}


.option select option,
.edit-options select option {

    background: #15161d;

}


/* ================= TASK HEADER ================= */

.tasks-header {

    display: flex;

    justify-content: space-between;

    align-items: flex-end;

    gap: 20px;

    border-bottom: 1px solid var(--border);

}


.tasks-header .section-title {

    margin-bottom: 5px;

}


.tasks-header > div > p {

    color: var(--muted);

    font-size: 10px;

    margin-bottom: 20px;

}


.filters {

    display: flex;

    gap: 5px;

    margin-bottom: 15px;

}


.filter {

    background: transparent;

    border: 1px solid var(--border);

    color: var(--muted);

    padding: 7px 11px;

    border-radius: 7px;

    font-size: 8px;

    font-weight: 800;

    cursor: pointer;

}


.filter.active {

    background: var(--red);

    border-color: var(--red);

    color: white;

}


/* ================= TASK LIST ================= */

.task-list {

    padding-top: 8px;

}


.task-item {

    display: grid;

    grid-template-columns: 35px 1fr auto;

    align-items: center;

    gap: 12px;

    padding: 16px 5px;

    border-bottom: 1px solid rgba(255,255,255,0.05);

    animation: slideIn 0.25s ease;

}


@keyframes slideIn {

    from {

        opacity: 0;

        transform: translateY(-7px);

    }

    to {

        opacity: 1;

        transform: translateY(0);

    }

}


/* ================= CHECKBOX ================= */

.check-btn {

    width: 22px;

    height: 22px;

    border-radius: 7px;

    border: 1px solid #555864;

    background: transparent;

    color: transparent;

    cursor: pointer;

    display: flex;

    justify-content: center;

    align-items: center;

    font-weight: 900;

}


.task-item.completed .check-btn {

    background: var(--green);

    border-color: var(--green);

    color: #07120d;

}


.task-info h3 {

    font-size: 13px;

    font-weight: 600;

    color: #eee;

}


.task-item.completed .task-info h3 {

    text-decoration: line-through;

    color: #656771;

}


.task-meta {

    display: flex;

    flex-wrap: wrap;

    gap: 8px;

    margin-top: 6px;

}


.task-meta span {

    color: var(--muted);

    font-size: 8px;

}


.priority {

    padding: 3px 7px;

    border-radius: 4px;

    font-size: 7px !important;

    font-weight: 800;

    letter-spacing: 0.5px;

}


.priority.high {

    color: #ff718c;

    background: rgba(255,49,90,0.1);

}


.priority.medium {

    color: var(--yellow);

    background: rgba(255,200,87,0.1);

}


.priority.low {

    color: var(--green);

    background: rgba(57,217,138,0.1);

}


/* ================= TASK ACTIONS ================= */

.task-actions {

    display: flex;

    gap: 6px;

}


.action-btn {

    width: 32px;

    height: 32px;

    border-radius: 8px;

    border: 1px solid var(--border);

    background: rgba(255,255,255,0.03);

    color: #aaa;

    cursor: pointer;

    transition: 0.2s;

}


.action-btn:hover {

    color: white;

    background: rgba(255,255,255,0.08);

}


.delete-btn:hover {

    color: var(--red);

    border-color: rgba(255,49,90,0.3);

}


/* ================= EMPTY ================= */

.empty-state {

    text-align: center;

    padding: 55px 20px;

}


.empty-icon {

    width: 50px;

    height: 50px;

    margin: auto;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 50%;

    border: 1px solid var(--border);

    color: var(--red);

    font-size: 20px;

}


.empty-state h3 {

    margin-top: 15px;

    font-size: 14px;

}


.empty-state p {

    margin-top: 7px;

    color: var(--muted);

    font-size: 10px;

}


/* ================= MODAL ================= */

.modal {

    position: fixed;

    inset: 0;

    display: none;

    align-items: center;

    justify-content: center;

    padding: 20px;

    background: rgba(0,0,0,0.7);

    backdrop-filter: blur(8px);

    z-index: 2000;

}


.modal.show {

    display: flex;

}


.modal-box {

    width: min(500px, 100%);

    background: #14151c;

    border: 1px solid var(--border);

    border-radius: 18px;

    padding: 25px;

    box-shadow: 0 30px 80px rgba(0,0,0,0.5);

}


.modal-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 20px;

}


.modal-header h2 {

    font-size: 20px;

}


.close-btn {

    width: 30px;

    height: 30px;

    border: none;

    background: rgba(255,255,255,0.05);

    color: #aaa;

    border-radius: 7px;

    font-size: 20px;

    cursor: pointer;

}


#editInput {

    width: 100%;

    padding: 14px;

    background: rgba(255,255,255,0.04);

    border: 1px solid var(--border);

    border-radius: 9px;

    color: white;

    outline: none;

    font-size: 13px;

}


.edit-options {

    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 10px;

    margin-top: 15px;

}


.save-btn {

    width: 100%;

    margin-top: 20px;

    padding: 14px;

    border: none;

    border-radius: 9px;

    background: var(--red);

    color: white;

    font-size: 10px;

    font-weight: 800;

    letter-spacing: 1px;

    cursor: pointer;

}


/* ================= FOOTER ================= */

footer {

    display: flex;

    justify-content: space-between;

    padding: 25px 3px;

    color: #4d4f59;

    font-size: 8px;

    letter-spacing: 2px;

}


/* ================= MOBILE ================= */

@media (max-width: 650px) {

    body {

        padding: 20px 0;

    }


    .header {

        align-items: flex-start;

        gap: 20px;

    }


    .header h1 {

        font-size: 35px;

    }


    .date-box {

        display: none;

    }


    .stats {

        gap: 7px;

    }


    .stat-card {

        padding: 14px 10px;

    }


    .stat-card strong {

        font-size: 20px;

    }


    .add-card,
    .tasks-card {

        padding: 20px;

    }


    .input-row {

        flex-direction: column;

    }


    .add-btn {

        padding: 14px;

    }


    .task-options,
    .edit-options {

        grid-template-columns: 1fr;

    }


    .tasks-header {

        align-items: flex-start;

        flex-direction: column;

        gap: 0;

    }


    .filters {

        margin-bottom: 12px;

    }


    .task-item {

        grid-template-columns: 30px 1fr;

    }


    .task-actions {

        grid-column: 2;

    }


    footer {

        flex-direction: column;

        align-items: center;

        gap: 10px;

    }

}
