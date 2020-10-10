window.onload = init();

function init () {
    // initial birds data
    birds = [];

    body = document.getElementById("body");

    generatedColor = [];

    // initial app document
    app = document.getElementById('app');
    app.innerHTML = "";

    // all of colors are displayed
    colors = ['mediumvioletred', 'orange', 'purple', 'salmon'];

    // generate content
    generate();
}

function generate () {
    // get static birds from birds.json (for example)
    fetch('birds.json')
        .then(response => response.json())
        .then(response => {

            // set birds
            birds = response;

            // create DOM
            create();

        })
        .catch(error => {
            console(error);
            alert('Error. Make sure you access it on localhost.')
        });
}

function create () {
    birds.forEach(bird => {
        const doc = document.createElement('div');
        const randomColor = Math.floor(Math.random() * colors.length );

        doc.classList.add('bird');
        doc.style.backgroundColor = colors[randomColor];

        generatedColor.push(colors[randomColor]);

        doc.onclick = function() {
            if(isDominantColor(colors[randomColor])) {
                init();
            }else {
                body.style.backgroundColor = "red";
    
                setTimeout(() => {
                    body.style.backgroundColor = "white";
                }, 100);
            }
        }

        app.append(doc);
    });   
}

function isDominantColor(selected_color) {
    const counts = generatedColor.reduce((objColor, color) => {
        objColor[color] = (objColor[color] || 0)  + 1;

        return objColor;
    }, {})

    const maxCount = Math.max(...Object.values(counts));
    const mostFeequent = Object.keys(counts).filter(color => counts[color] === maxCount);

    if(mostFeequent.includes(selected_color)) return true;

    return false;

}