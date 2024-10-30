document.addEventListener("DOMContentLoaded",()=>{
    init_veggie()
})

function init_veggie(){
    document.veggie = {
        server:{
            secret:"",
            password:""
        },
        users:[]
    }
    create_events()
    open_section()
}

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

    const NameValue = Search?Search.find((search)=>search.name == "name")?Search.find((search)=>search.name == "name").value:"":""
    document.veggie.users.push(NameValue)
    console.log("NameValue",NameValue)

    const SecretValue = Search?Search.find((search)=>search.name == "secret")?Search.find((search)=>search.name == "secret").value:"":""
    document.veggie.server.secret = SecretValue
    console.log("SecretValue",SecretValue)

    const PasswordValue = Search?Search.find((search)=>search.name == "password")?Search.find((search)=>search.name == "password").value:"":""
    document.veggie.server.password = PasswordValue
    console.log("PasswordValue",PasswordValue)

    let openThisID = ""

    if(NameValue && SecretValue){
    
        openThisID = "content"

        open_content()
        
    }else{
        openThisID = "login"
        document.querySelector("#login_form #secret").value = SecretValue
        document.querySelector("#login_form #password").value = PasswordValue
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
        event.preventDefault()
        const NameValue = FormLogin.name.value
        const SecretValue = FormLogin.secret.value
        const PasswordValue = FormLogin.password.value

        if(NameValue == "" || SecretValue == "")return
        
        let searchString = ""
        if(NameValue)searchString += `${searchString==""?"?":"&"}name=${btoa(NameValue).replaceAll("=","*")}`
        if(SecretValue)searchString += `${searchString==""?"?":"&"}secret=${btoa(SecretValue).replaceAll("=","*")}`
        if(PasswordValue)searchString += `${searchString==""?"?":"&"}password=${btoa(PasswordValue).replaceAll("=","*")}`

        location.search = searchString

        /*
        FormLogin.name.value = btoa(FormLogin.name.value).replaceAll("=","*")
        FormLogin.secret.value = btoa(FormLogin.secret.value).replaceAll("=","*")
        FormLogin.password.value = btoa(FormLogin.password.value).replaceAll("=","*")
        */

        console.log(searchString)
    })
}

function open_content(){
    const ContainerNameServer = document.querySelector("#name_server")
    const ContainerPasswordServer = document.querySelector("#password_server")
    const ContainerUsersOnline = document.querySelector("#users_online")

    ContainerNameServer.textContent = document.veggie.server.secret
    if(document.veggie.server.password){
        ContainerPasswordServer.textContent = "true"
        ContainerPasswordServer.classList.add("ok")
    }else{
        ContainerPasswordServer.textContent = "false"
        ContainerPasswordServer.classList.add("ko")
    }
}