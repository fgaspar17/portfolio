document.addEventListener("DOMContentLoaded", async () => {
    const projects = await getProjects();
    renderProjects(projects);
})

async function getProjects() {
    let response = await fetch("./data/projects.json")
    .then(response => response.json())

    return response["projects"]
}

function createProjectImage(project) {
    const img = document.createElement("img");
    img.src = project.image;
    img.alt = project.title;
    img.width = 280;
    img.height = 300;
    return img;
}

function createProjectInfo(project) {
    const info = document.createElement("div");
    info.classList.add("project-card-info");

    const title = document.createElement("h2");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.classList.add("shrinkable-paragraph");
    description.textContent = project.description;

    const technologies = document.createElement("p");
    technologies.classList.add("fixed-paragraph");
    technologies.textContent = project.technologies.join(", ");

    const link = document.createElement("a");
    link.href = project.url;
    link.textContent = "View Project";
    link.target = "_blank";

    info.append(title, description, technologies, link);
    return info;
}

function createProjectCard(project) {
    const card = document.createElement("div");
    card.classList.add("project-card");

    card.appendChild(createProjectImage(project));
    card.appendChild(createProjectInfo(project));

    return card;
}

function renderProjects(projects) {
    const projectsSection = document.querySelector("#projects"); // ensure this ID exists

    projects.forEach(project => {
        const article = document.createElement("article");
        article.appendChild(createProjectCard(project));
        projectsSection.appendChild(article);
    });
}