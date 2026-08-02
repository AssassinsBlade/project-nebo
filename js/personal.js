const FIRST_NAMES = [
    "Avery", "Jordan", "Riley", "Casey", "Morgan",
    "Taylor", "Quinn", "Reese", "Emerson", "Rowan",
    "Hayden", "Skyler", "Elliot", "Finley", "Dakota",
    "Sawyer", "Peyton", "Cameron", "Jamie", "Drew"
];

const LAST_NAMES = [
    "Bennett", "Coleman", "Fletcher", "Hughes", "Mercer",
    "Nolan", "Pierce", "Sinclair", "Whitfield", "Ashford",
    "Barlow", "Chandler", "Donovan", "Ellison", "Grayson",
    "Hartley", "Ingram", "Keaton", "Lambert", "Marsh"
];

function randomFromList(list) {
    const index = Math.floor(Math.random() * list.length);
    return list[index];
}

function generatePerson() {
    const firstName = randomFromList(FIRST_NAMES);
    const lastName = randomFromList(LAST_NAMES);
    const fullName = `${firstName} ${lastName}`;

    return {
        firstName,
        lastName,
        fullName
    };
}

function renderPerson(person) {
    document.getElementById("firstName").textContent = person.firstName;
    document.getElementById("lastName").textContent = person.lastName;
    document.getElementById("fullName").textContent = person.fullName;
}

function initializePersonalGenerator() {
    const regenerateBtn = document.getElementById("regenerateBtn");

    regenerateBtn.addEventListener("click", () => {
        const person = generatePerson();
        renderPerson(person);
    });

    renderPerson(generatePerson());
}

document.addEventListener("DOMContentLoaded", () => {
    initializePersonalGenerator();
});
