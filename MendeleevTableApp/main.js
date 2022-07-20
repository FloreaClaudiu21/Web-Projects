window.onload = () => {
    let result = document.querySelector("#result");
    let element = document.querySelector("#element");
    let search = document.querySelector("#search");
    let loader = document.querySelector("#loader");
    let data_field = document.querySelector("#data_field");
    let message = document.querySelector("#Message");
    let info;
    let name;
    let output;

    search.addEventListener("click", data);

    function data() {
        loader.style.display = "flex";
        result.style.display = "none";
        name = element.value;

        output = `${name.charAt(0).toUpperCase()}${name.substr(1).toLowerCase()}`.replace(" ", "");

        fetch(`https://chemistrydata.herokuapp.com/elements/` + output)
            .then(res => res.json())
            .then(data => {

                if (data.symbol == undefined) {
                    data_field.style.animation = "alert 0.6s";
                    message.style.color = "#f00"
                    message.textContent = "Invalid element name"
                    element.style.borderColor = "#f00";
                    search.style.borderColor = "#f00";
                    setTimeout(() => {
                        element.style.borderColor = "#000";
                        search.style.borderColor = "#000";
                        data_field.style.animation = "";
                        message.style.color = "#000"
                        message.textContent = "Enter a name of an element"
                    }, 1000)
                    loader.style.display = "none";
                }
                else {
                    info = `
                        <span class="title">${output}</span>
                        <div>
                            <span>Symbol: ${data.symbol}</span>
                            <span>Number: ${data.number}</span>
                            <span>Phase: ${data.phase}</span>
                            <span>Category: ${data.category}</span>
                            <span>Atomic mass: ${data.atomic_mass}</span>
                            <span>Boil: ${data.boil}</span>
                            <span>Melt: ${data.melt}</span>
                            <span>Density: ${data.density}</span>
                            <span>Discovered by: ${data.discovered_by}</span>
                            <span>Named by: ${data.named_by}</span>
                            <span>Summary: ${data.summary}</span>
                        </div>
                    `;

                    loader.style.display = "none";
                    result.style.display = "flex";
                    result.innerHTML = info;
                }
                element.value = '';
            });
    }
}


