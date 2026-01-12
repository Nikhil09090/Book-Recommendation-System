// script.js

function getRecommendations() {
  const bookInput = document.getElementById("bookInput").value.trim();
  const resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = ""; // Clear previous results

  if (bookInput === "") {
    resultsDiv.innerHTML = "<p>Please enter a book title.</p>";
    return;
  }

  // Static recommendation data
  const recommendations = {
    "harry potter": ["Percy Jackson", "Eragon", "The Hobbit", "The Lightning Thief"],
    "pride and prejudice": ["Emma", "Sense and Sensibility", "Jane Eyre", "Wuthering Heights"],
    "the alchemist": ["Siddhartha", "The Prophet", "The Celestine Prophecy", "Jonathan Livingston Seagull"],
    "default": ["To Kill a Mockingbird", "1984", "The Great Gatsby", "Life of Pi"]
  };

  const key = bookInput.toLowerCase();
  const recs = recommendations[key] || recommendations["default"];

  resultsDiv.innerHTML = "<h3>Recommended Books:</h3>";
  recs.forEach(title => {
    const div = document.createElement("div");
    div.className = "book";
    div.textContent = title;
    resultsDiv.appendChild(div);
  });
}
