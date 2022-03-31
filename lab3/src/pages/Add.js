const Add = (props) => {
    return <div class="add-class">
        <h2 class="add-class-name" > {props.add_class_name} </h2>
        <h5 class="add-student-name"> {props.add_student_name} </h5>
        <p class ="add-descritpion" > {props.add_description} </p>
        <div class="add-tag-list">
            <b>Tagi: </b> {props.add_tags}
        </div>
    </div>
    
};

export default Add;