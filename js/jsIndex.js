document.addEventListener("DOMContentLoaded",()=>{
    create_events()
    open_section()
})

function get_searches(){
    const Searches = document.location.search.slice(1).split("&")
    const SearchesArray = []
    for(let indexSearches = 0 ; indexSearches < Searches.length ; indexSearches++){
        const Search = Searches[indexSearches].split("=")
        if(Search[0] != "")SearchesArray.push({"name":Search[0],"value":atob(Search[1].replaceAll("*","="))})
    }
    if(SearchesArray.length == 0)return false
    return SearchesArray
}

function open_section(){
    const Search = get_searches()
    console.log("Search",Search)

    let openThisID = ""

    if(Search){
        const NameValue = Search.find((search)=>search.name == "name").value
        console.log("NameValue",NameValue)
    
        const SecretValue = Search.find((search)=>search.name == "secret").value
        console.log("SecretValue",SecretValue)
    
        openThisID = "content"
        
    }else{
        openThisID = "login"
        document.querySelector("#logo").classList.add("open")
    }

    const OpenThis = document.querySelector(`#${openThisID}`)
    OpenThis.classList.add("opening")
    OpenThis.addEventListener("transitionend",()=>{
        OpenThis.classList.add("open")
        OpenThis.classList.remove("opening")
    })
}

function create_events(){
    const FormLogin = document.querySelector("#login_form")
    FormLogin.querySelector("input[type=submit]").addEventListener("click",event=>{
        //event.preventDefault()
        const NameValue = FormLogin.name.value
        const SecretValue = FormLogin.secret.value
        const PasswordValue = FormLogin.password.value
        if(NameValue == "" || SecretValue == "")event.preventDefault()
        FormLogin.name.value = btoa(FormLogin.name.value).replaceAll("=","*")
        FormLogin.secret.value = btoa(FormLogin.secret.value).replaceAll("=","*")
        FormLogin.password.value = btoa(FormLogin.password.value).replaceAll("=","*")
    })
}