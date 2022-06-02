import { firestore } from "./init";
import {collection, addDoc, Timestamp, query, where, getDocs} from 'firebase/firestore'


export const addNewAdd = async (user, add) => {
    try {
        await addDoc(collection(firestore, 'adds'), {
            uid: user.uid,
            add_class_name: add.add_class_name, 
            add_student_name: add.add_student_name, 
            add_description: add.add_description, 
            add_tags: add.add_tags, 
            add_email: add.add_email,
            picture: add.picture,
            created: Timestamp.now()
        });
    } catch (err) {
        console.log({err});
    }
}

export const getAllUserAdds = async (user) => {
    const q = query(collection(firestore, "adds"),
        where("uid", "==", user.uid));
    // const q = collection(firestore, "todos");
    const adds = [];
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const newAdd = {
                add_class_name: data.add_class_name, 
                add_student_name: data.add_student_name, 
                add_description: data.add_description, 
                add_tags: data.add_tags, 
                add_email: data.add_email,
                picture: data.picture,
            };
            adds.push(newAdd);
        });
    } catch (err) {
        console.log({err});
    }
    console.log({adds});
    return adds;
}

export const getAllAdds = async () => {
    const q = query(collection(firestore, "adds"));
    // const q = collection(firestore, "todos");
    const adds = [];
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            const data = doc.data();
            const newAdd = {
                add_class_name: data.add_class_name, 
                add_student_name: data.add_student_name, 
                add_description: data.add_description, 
                add_tags: data.add_tags, 
                add_email: data.add_email,
                picture: data.picture,
            };
            adds.push(newAdd);
        });
    } catch (err) {
        console.log({err});
    }
    console.log({adds});
    return adds;
}