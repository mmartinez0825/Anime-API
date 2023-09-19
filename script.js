document
  .getElementById("fetchButton")
  .addEventListener("click", async function () {
    try {
      const response = await fetch("https://api.jikan.moe/v4/anime");
      const result = await response.json();

      const { data } = result;

      const resultContainer = document.getElementById("resultContainer");
      resultContainer.innerHTML = ""; // Clear previous results

      data.forEach((anime) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h2>${anime.title}</h2>
            <h2>${anime.title_japanese}</h2>
            <h3>Aired: ${formatDate(anime.aired.from)}</h3>
            <h3>Duration: ${formatDuration(anime.duration)}</h3>
            <p>Synopsis: ${anime.synopsis}</p>
          `;

        resultContainer.appendChild(card);
      });
    } catch (error) {
      console.log("error", error);
    }
  });

// Helper function to format the date
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Helper function to format the duration
function formatDuration(durationString) {
  const match = durationString.match(/(\d+) hr (\d+) min/);
  if (match) {
    const hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    return `${hours} hr ${minutes} min`;
  }
  // If the format doesn't match, return the original duration string
  return durationString;
}
