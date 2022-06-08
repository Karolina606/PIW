import { firestore } from "./init";
import {doc, getDoc, collection, addDoc, updateDoc, Timestamp, query, where, getDocs} from 'firebase/firestore'


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

export const editAdd = async (user, add) => {
    try {

        // const addRef = doc(firestore, "adds", user.uid);

        const q = doc(firestore, "adds", add.add_id);
        const docs = await getDoc(q);
        if (docs.exists()) {
            await updateDoc(q, {
                add_class_name: add.add_class_name, 
                add_student_name: add.add_student_name, 
                add_description: add.add_description, 
                add_tags: add.add_tags, 
                add_email: add.add_email,
                created: Timestamp.now()
            });
        }

        // await updateDoc(addRef, {
        //     add_class_name: add.add_class_name, 
        //     add_student_name: add.add_student_name, 
        //     add_description: add.add_description, 
        //     add_tags: add.add_tags, 
        //     add_email: add.add_email,
        //     picture: add.picture,
        //     created: Timestamp.now()
        // });
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
                add_id:doc.id,
                add_class_name: data.add_class_name, 
                add_student_name: data.add_student_name, 
                add_description: data.add_description, 
                add_tags: data.add_tags, 
                add_email: data.add_email,
                picture: data.picture,
                add_uid: data.uid
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
                add_id:doc.id,
                add_class_name: data.add_class_name, 
                add_student_name: data.add_student_name, 
                add_description: data.add_description, 
                add_tags: data.add_tags, 
                add_email: data.add_email,
                picture: data.picture,
                add_uid: data.uid
            };
            adds.push(newAdd);
        });
    } catch (err) {
        console.log({err});
    }
    console.log({adds});
    return adds;
}

export const addNewGroupAdd = async (user, add) => {
    try {
        await addDoc(collection(firestore, 'groupAdds'), {
            uid: user.uid,
            add_class_name: add.add_class_name, 
            add_students: add.add_students, 
            add_description: add.add_description, 
            add_tags: add.add_tags,
            created: Timestamp.now()
        });
    } catch (err) {
        console.log({err});
    }
}


export const getAllUserGroupAdds = async (user) => {
    const q = query(collection(firestore, "groupAdds"),
        where("uid", "==", user.uid));
    // const q = collection(firestore, "todos");
    const groupAdds = [];
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const newAdd = {
                add_class_name: data.add_class_name, 
                add_students: data.add_students, 
                add_description: data.add_description, 
                add_tags: data.add_tags,
            };
            groupAdds.push(newAdd);
        });
    } catch (err) {
        console.log({err});
    }
    console.log({groupAdds});
    return groupAdds;
}

export const getAllGroupAdds = async () => {
    const q = query(collection(firestore, "groupAdds"));
    const groupAdds = [];
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            const data = doc.data();
            const newAdd = {
                add_class_name: data.add_class_name, 
                add_students: data.add_students, 
                add_description: data.add_description, 
                add_tags: data.add_tags,
            };
            groupAdds.push(newAdd);
        });
    } catch (err) {
        console.log({err});
    }
    console.log({groupAdds});
    return groupAdds;
}