import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import app from "./init";
import { error } from "console";

import { Result } from "postcss";

const firestore = getFirestore(app)


// retrieveData, retrieveDataById, retrieveDataByField, addData adalah fungsi yang berhubungan dengan Firebase
export async function retrieveData(collectionName:string) {
    const snapshot = await getDocs(collection(firestore, collectionName))
    const data = snapshot.docs.map((doc) => (
        {id: 
            doc.id, 
            ...doc.data(),
        }
    ))

    return data
}

export async function retrieveDataById(collectionName:string, id:string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id))
    const data = snapshot.data()
    return data
}

export async function retrieveDataByField(collectionName:string, field:string, value:string) {
     const q = query(
       collection(firestore, collectionName),
       where(field, "==", value)
     );

     const snapshot = await getDocs(q);
     const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

     return data;
}

export async function addData(collectionName:string, data:any, callback:Function) {
    await addDoc(collection(firestore, collectionName), data)
      .then(() => {
        callback(true);
      })
      .catch((error) => {
        callback(false);
        console.log(error);
      });
}

export async function updateData(collectionName:string, id:string, data:any, callback: Function) {
  const docsRef = doc(firestore ,collectionName, id);
  await updateDoc(docsRef, data)
  .then(() => {
    callback(true)
  })
  .catch(() => {
    callback(false)
  })
}


