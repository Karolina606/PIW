import { useState, useContext } from "react";
// import AllAccountsContext from "../contexts/AllAccountsContext";


const Filters = (props) => {
    const setAdds = props.setAdds;
    const adds = props.announcementsState;
    // const [accounts, setAccounts] = useContext(AllAccountsContext);

    const [inputs, setInputs] = useState({ 
        inputDescriptionIncludes:"",
        inputTags:"",
        inputClassName:""
    });

    const handleChange = (event) => {
        // event.preventDefault();

        const name = event.target.id;
        const value = event.target.value;
        setInputs(input => ({...inputs, [name]: value}));
        // console.log({accounts});
    }

    const handleFilterSubmit = (event) => {
        event.preventDefault();
                
        ///////////////////////////// FILTR DLA OPISU //////////////////////////////////////////////////
        let filteredAdds0 = [];
        if (inputs.inputDescriptionIncludes === ""){
            filteredAdds0 = [...adds.all];
        }else{
            console.log({adds});
            adds.all.filter(add => add.add_description.toLowerCase().includes(inputs.inputDescriptionIncludes.toLowerCase()))
            .map(add => (
                filteredAdds0.push(add)
            ));
        }
        console.log({filteredAdds0});

        ///////////////////////////// FILTR DLA TAGÓW //////////////////////////////////////////////////
        let filteredAdds1 = [];
        if (inputs.inputTags === ""){
            filteredAdds1 = [...adds.all];
        }else{
            const splitedTags = inputs.inputTags.toLowerCase().replace(" ", "").split(",");
            console.log({adds});
            
            adds.all.filter(add => {
                let containsAll = true;
                for (const tag of splitedTags){
                    if (!add.add_tags.toLowerCase().includes(tag)){
                        containsAll = false;
                        break;
                    }
                }
                return containsAll;
            }).map(add => (
                filteredAdds1.push(add)
            ));

        }
        console.log({filteredAdds1});

        ///////////////////////////// FILTR DLA PRZEDMIOTU //////////////////////////////////////////////////
        let filteredAdds2 = [];
        if (inputs.inputClassName === ""){
            filteredAdds2 = [...adds.all];
        }else{
            console.log({adds});
            adds.all.filter(add => add.add_class_name.toLowerCase().includes(inputs.inputClassName.toLowerCase()))
            .map(add => (
                filteredAdds2.push(add)
            ));
        }
        console.log({filteredAdds2});

        const filteredAdds = filteredAdds0.filter(value => filteredAdds1.includes(value)).filter(value => filteredAdds2.includes(value));
        setAdds({
            all: adds.all,    
            all_to_show: filteredAdds}
        );
    }


    return <div id="filters">
        <h2>Filtry</h2>
            <div className="announcment-browser">
                <form onSubmit={handleFilterSubmit}>
                    <div className="input-group mb-3">
                        <input 
                            type="text" className="form-control" 
                            placeholder="Opis zawiera"
                            id="inputDescriptionIncludes"
                            value={inputs.inputDescriptionIncludes || ""} 
                            onChange={handleChange}></input>
                        <input 
                            type="text" className="form-control" 
                            placeholder="Tagi" 
                            id="inputTags"
                            value={inputs.inputTags || ""} 
                            onChange={handleChange}></input>
                        <input 
                            type="text" className="form-control" 
                            placeholder="Przedmiot" 
                            id="inputClassName"
                            value={inputs.inputClassName || ""} 
                            onChange={handleChange}></input>
                        <div className="input-group-append">
                            <button 
                                className="btn btn-outline-secondary" 
                                type="submit" 
                                id="button-addon2">
                                    Szukaj
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div> 
  };
  
  export default Filters;