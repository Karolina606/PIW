const GroupAdd = (props) => {
    return <div class="add-class">
        <h2 class="add-class-name" > {props.add_class_name} </h2>

        <div class="group-add-crew">
            <h4>Aktualny skład grupy:</h4>
            {props.add_students.map(student => (  
                <h6 class="add-student-name"> {student.name}</h6>
            ))} 
        </div>
        
        <p class ="add-descritpion" > {props.add_description} </p>
        <div class="add-tag-list">
            <b>Tagi: </b> {props.add_tags}
        </div>
    </div>
    
};

export default GroupAdd;