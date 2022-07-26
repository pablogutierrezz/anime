let inputText = document.querySelector(".buscador"),
animes = document.querySelectorAll(".article-animes"),
next = document.querySelector(".next"),
prev = document.querySelector(".prev"),
seccionEstrenos = document.querySelectorAll(".seccion-estrenos"),
contenedorTop = document.querySelectorAll(".contenedor-top-title"),
btn = document.querySelector(".btn"),
modeDark = document.querySelector(".mode"),
dataDark = document.querySelectorAll("[data-dark]"),
dataDark2 = document.querySelector("[data-dark2]"),
menu = document.querySelector("#menu"),
navMenu = document.querySelector(".links"),
navMenuLinks = document.querySelectorAll(".links a"),
form = document.querySelector(".form"),
value

inputText.addEventListener("keyup",e=>{
    let value = e.target.value.toLowerCase()
    animes.forEach(el=>{
        el.dataset.valor.toLowerCase().includes(value) ? el.classList.remove("filtro") : el.classList.add(("filtro"))
    })
})
next.addEventListener("click",e=>{
    e.preventDefault()
    cambiar(1)
})
prev.addEventListener("click",e=>{
    e.preventDefault()
    cambiar(-1)
})
function cambiar(num) {
    let data = document.querySelector(".seccion-estrenos-show").dataset.id
    value = Number(data)
    value += num
    seccionEstrenos[Number(data)-1].classList.remove("seccion-estrenos-show")
    if(value === seccionEstrenos.length+1 || value === 0){
        value = value === 0 ?  seccionEstrenos.length : 1
    }
    seccionEstrenos[value-1].classList.add("seccion-estrenos-show")
}

contenedorTop.forEach(el=>{
    let height = 0;
    let padre  =el.parentElement
    el.addEventListener("click",e=>{
        let asnwer = el.parentElement
         asnwer.classList.toggle("hidden")
    })
})
btn.addEventListener("click",e=>{
    e.preventDefault()
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
})

function lightMode() {
    dataDark.forEach(el=> el.classList.remove("dark"))
    dataDark2.classList.remove("dark2")
    localStorage.setItem("theme", "light")
}
function darkMode() {  
    modeDark.classList.add("active")
    dataDark.forEach(el=> el.classList.add("dark"))
    dataDark2.classList.toggle("dark2")
    localStorage.setItem("theme", "dark")
}

modeDark.addEventListener("click",e=>{
    if(e.target.matches(".moon")  || e.target.matches(".sun")){
        modeDark.classList.toggle("active")
    }
    // dataDark.forEach(el=> el.classList.toggle("dark"))
    // dataDark2.classList.toggle("dark2")
    
    if(e.target.matches(".moon")){
           darkMode()
    }
    if(e.target.matches(".sun")){
           lightMode()
    }
})
menu.addEventListener("click",e=>{
    navMenu.classList.toggle("links-mostrar")
})
navMenuLinks.forEach(el=>{
    el.addEventListener("click",e=>{
        navMenu.classList.remove("links-mostrar")
    })
})
document.addEventListener("DOMContentLoaded",e=>{
    console.log(localStorage.getItem("theme"));
    if(localStorage.getItem("theme")===null){
        localStorage.setItem("theme", "dark")
    }
    if(localStorage.getItem("theme")=== "light"){
        lightMode()
    }
    if(localStorage.getItem("theme")=== "dark"){
        darkMode()
    }
})
form.addEventListener("submit",e=>{
    e.preventDefault()
    fetch("https://formsubmit.co/ajax/pablostk54@gmail.com",{
        method: "POST",
        body: new FormData(e.target)
    })
    .then(res=> res.ok ? res.json(): Promise.reject(res))
    .then(json=>{
        form.reset()
        alert("formulario enviado con éxito")
    })
    .catch(err=>{
        alert("ocurrió un error");
    })
})