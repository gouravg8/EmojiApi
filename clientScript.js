let ul = document.querySelector("ul");
let submitBtn = document.querySelector("#submitBtn");
let query = document.querySelector("#query");

let res, out;
ul.addEventListener("click", async (e) => {
  if (e.target.tagName === "LI") {
    // Toggle the visibility of the span element
    e.target.querySelector("span").classList.toggle("hidden");
    await navigator.clipboard.writeText(
      e.target.textContent.trim().replace(/\s*copied\s*/, "")
    );
  } else if (e.target.tagName !== "SPAN") {
    let allspans = e.target.querySelectorAll("span");
    console.log(allspans);
  }
});

function displayOnDom(outArray) {
  ul.innerHTML = "";
  outArray.forEach((elem) => {
    let li = document.createElement("li");
    li.innerHTML += `<li class="text-3xl p-3 bg-blue-600 w-fit rounded relative">
    ${elem.symbol}<span
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-white bg-black px-2 py-1 rounded hidden"
      >copied</span
    >
  </li>`;
    ul.appendChild(li);
  });
}

submitBtn.addEventListener("click", async () => {
  if (query) {
    // let res = await fetch(`https://test-mp4z.onrender.com/search?${query}`);
    res = await fetch(`http://localhost:3000/search?q=${query.value}`);
    out = await res.json();
  }
  console.log(out);
  displayOnDom(out);
});
