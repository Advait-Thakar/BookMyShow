let availabelKeywords = [
    "HTML",
    "CSS",
    "DS",
    "JAVA",
    "PYTHON",
    "DBMS",
    "DE",
    "FSD",
    "PS",
]

const resultsBox = document.querySelector(".result-box")
const inputBox = document.getElementById("input-box")
const city = document.querySelector(".form-select")
const signin = document.querySelector(".signin")

inputBox.onkeyup = function(){  
    let result = []
    let input = inputBox.value
    if(input.length){
        city.classList.add("active")
        signin.classList.add("active")
        result = availabelKeywords.filter((keyword) => {
            return keyword.toLowerCase().includes(input.toLowerCase())
        })
    }
    
    display(result)
    
    if(!result.length){
            resultsBox.innerHTML = ''
        }
}   

function display(result){
    const content = result.map((list) => {
        return "<li onclick = selectInput(this)>" + list + "</li>"
    })

    resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>"
}

function selectInput(list){
    inputBox.value = list.innerHTML
    resultsBox.innerHTML = ''
    city.classList.remove("active")
    signin.classList.remove("active")
}