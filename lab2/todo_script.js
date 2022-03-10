"use strict"

let removedElement = null;
let removedElementList = null;
let currentListElement = null;  
const numberOfElementsOnAList = [0, 0, 0];


$(document).ready(() => {
    // wersja tego co poniżej - JQuery
    // $("#activity-submit-btn").click(() => {
    //     addActivity();
    // });

    // dodanie obsłlugi kliknięcia do przycisku dodania zadania
    document.getElementById("activity-submit-btn").addEventListener("click", (event) => {
        addActivity();
    });

    // odtworzenie usuniętego zadania
    $("#restore-list-element-btn").click(() => {
        console.log({removedElement});
        if(removedElement === null){
            console.warn("Nie ma elementu do przywrócenia na listę");
        }else{
            removedElementList.append(removedElement);
            removedElement = null;
        }
    });

    // obsługa przycisku anulującego usuwanie na modalu
    $("#dont-delete-modal-btn").click(() => {
        $("#modal").toggle("slow");
    });

    // obsługa przycisku usuwającego na modalu
    $("#delete-modal-btn").click(() => {
        removedElement = currentListElement;
        currentListElement.remove();
        $("#modal").toggle("slow");
    });

    // zwijanie i rozwijanie listy
    $(".list-header").click((event) => {
        const currentList = event.target.parentElement.lastElementChild;
        $(currentList).toggle("slow");
    });

    // wywołanie foltorwania przy wpisywaniu do pola filtru
    document.getElementById("filter-input").addEventListener("keyup", (event) => {
        filter();
    });

    // wywołanie filtrowania przy zmianie stanu checkbox'a
    document.getElementById("case-sens-chb").addEventListener("click", (event) => {
        filter();
    });
});

const addActivity = () => {
    // funkcja tworzy nowy wpis na liście rzeczy do zrobienia
    const activity = document.getElementById("activity-input").value;
    const targetTodoList = document.getElementById("todo-list-selector").value;
    console.log(activity);

    // sprawdza czy wszystki epola wypełnione poprawnie
    if (activity === ""){
        console.warn("Activity is empty");
    }else if(targetTodoList === "Wybierz listę"){
        console.warn("Musisz wybrać listę, jeśli chcesz dodać zadanie.")
    }else{
        // wybór listy do której zapisać
        let listId;
        let listElementStyle;
        if(targetTodoList === "1"){
            listId = "todo-list-important";
            listElementStyle = "list-group-item-danger"
        }else if (targetTodoList === "2"){
            listId = "todo-list-not-very-important";
            listElementStyle = "list-group-item-warning"
        }else if (targetTodoList === "3"){
            listId = "todo-list-late";
            listElementStyle = "list-group-item-dark"
        }

        const todoList = document.getElementById(listId);

        // Stworzenie elementów nowego wpisu do listy
        const newActivityText = document.createElement("p");
        newActivityText.setAttribute("class", "activity-text");
        newActivityText.innerHTML = `${activity}`;

        const newRemoveButton = document.createElement("button");
        newRemoveButton.setAttribute("class", "remove-btn btn btn-danger");
        newRemoveButton.innerHTML = "X";

        const newListElement = document.createElement("div");
        newListElement.setAttribute("class", `todo-list-element list-group-item ${listElementStyle}`);
        newListElement.append(newActivityText, newRemoveButton);

        numberOfElementsOnAList[Number(targetTodoList)-1] += 1;
        todoList.parentElement.getElementsByClassName("counter")[0].innerHTML = `${numberOfElementsOnAList[Number(targetTodoList)-1]}`;
        todoList.append(newListElement);

        // dodawanie obsługi kliknięcia - wyszarzenie
        newActivityText.addEventListener("click", (event) => {
            const parent = event.target.parentElement;

            if (event.target.style.color === "grey" && event.target.style.textDecoration === "line-through"){
                // jeśli czynność już wyszarzona
                event.target.style.color = "black";
                event.target.style.textDecoration = "none";
                parent.lastChild.remove();
            }else{
                // jeśli czynność jeszcze do zrobienia
                event.target.style.color = "grey";
                event.target.style.textDecoration = "line-through";

                const today = new Date();
                const time = today.getHours() + ":" + today.getMinutes() + " " 
                    + today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear();
                const newDate = document.createElement("p")
                newDate.setAttribute("class", "date-of-achivement-para")
                newDate.innerHTML=`${time}`
                parent.append(newDate);
            }
        }, false)

        // dodanie akcji do przycisku usuwania, wyświetlenie modala
        $(newRemoveButton).click((event) => {
            const listElement = event.target.parentElement;
            removedElementList = todoList;
            $("#modal").toggle();
            currentListElement = listElement;
        });
    }
}

const filter = () =>{
    // Funkcja zapewnijąca filtrowanie
    const filterValue = document.getElementById("filter-input").value;

    const allActivities = document.getElementsByClassName("todo-list-element");
    for (let i = 0; i < allActivities.length;  i++) {
        const element = allActivities[i];

        // jeśli nie ma case sensitive
        if(!document.getElementById("case-sens-chb").checked){
            if(element.firstChild.innerHTML.toUpperCase().indexOf(filterValue.toUpperCase())){
                element.style.display = "none";
            }
            else{
                element.style.display = "";
            }
        }
        // jeśli jest case sensitive
        else if(element.firstChild.innerHTML.indexOf(filterValue) === 0){
            element.style.display = "";
        }else{
            element.style.display = "none";
        }
    }
}