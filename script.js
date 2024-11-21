const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const apiBase = "https://data.europa.eu/api/hub/repo";

// Fetch categories and list their IDs
document.getElementById("fetchCategories").addEventListener("click", async () => {
    try {
        const response = await fetch(`${proxyUrl}${apiBase}/catalogues`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const categories = await response.json();
        const categoryList = document.getElementById("categoryList");
        categoryList.innerHTML = ""; // Clear previous results

        categories.forEach(categoryUrl => {
            const categoryId = categoryUrl.split("/").pop(); // Extract category ID
            const li = document.createElement("li");
            li.textContent = categoryId;
            categoryList.appendChild(li);
        });
    } catch (error) {
        alert("Failed to fetch categories: " + error.message);
    }
});


// Fetch datasets based on the category ID
document.getElementById("fetchDatasets").addEventListener("click", async () => {
    const categoryId = document.getElementById("categoryInput").value;
    if (!categoryId) {
        alert("Please enter a category ID.");
        return;
    }

    try {
        const response = await fetch(`${apiBase}/catalogues/${categoryId}/datasets`);
        const datasets = await response.json();
        const datasetList = document.getElementById("datasetList");
        datasetList.innerHTML = ""; // Clear previous results

        datasets.forEach(datasetUrl => {
            // Extract the dataset name from the URL
            const datasetName = datasetUrl.split("/").pop();
            const li = document.createElement("li");
            li.textContent = datasetName;
            datasetList.appendChild(li);
        });
    } catch (error) {
        alert("Failed to fetch datasets: " + error.message);
    }
});

// Fetch metadata for a specific dataset
document.getElementById("fetchMetadata").addEventListener("click", async () => {
    const datasetName = document.getElementById("datasetInput").value;
    const categoryId = document.getElementById("categoryInput").value;
    if (!categoryId || !datasetName) {
        alert("Please enter both category ID and dataset name.");
        return;
    }

    try {
        const response = await fetch(`${apiBase}/catalogues/${categoryId}/datasets/${datasetName}`, {
            headers: { Accept: "application/json" }
        });
        const metadata = await response.json();
        const metadataOutput = document.getElementById("metadataOutput");
        metadataOutput.textContent = JSON.stringify(metadata, null, 2); // Pretty print JSON
    } catch (error) {
        alert("Failed to fetch metadata: " + error.message);
    }
});
