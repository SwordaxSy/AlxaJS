// Footer Contact User Copying
const copyContact = document.querySelector(".copy-contact");
copyContact.addEventListener("click", () => {
    const contact = "swordax.sy";
    navigator.clipboard
        .writeText(contact)
        .then(() => {
            copyContact.classList.add("active");
            setTimeout(() => {
                copyContact.classList.remove("active");
            }, 1500);
        })
        .catch((err) => console.log(err));
});

// Admin Command
function get_stats(stat, password) {
    const fetchOptions = {
        method: "POST",
        body: JSON.stringify({ stat, password }),
        headers: { "Content-Type": "application/json" },
    };

    fetch("/getstats", fetchOptions)
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                console.table(data.data);
            } else {
                console.log(`%c${data.error}`, "color: red;");
            }
        })
        .catch((err) => console.log(err));
}
