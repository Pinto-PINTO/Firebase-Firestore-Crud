import { db } from "../firebase-config";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";


const bookCollectionRef = collection(db, "books");
class BookDataService {

    // 1) insert
    // newBook is the new record
    addBooks = (newBook) => {
        return addDoc(bookCollectionRef, newBook);
    };

    // 2) Update
    // bookDoc -> Existing record
    // updatedBook -> Updated record
    updateBook = (id, updatedBook) => {
        const bookDoc = doc(db, "books", id);
        return updateDoc(bookDoc, updatedBook)
    };

    // 3) Delete
    deleteBook = (id) => {
        const bookDoc = doc(db, "books", id);
        return deleteDoc(bookDoc);
    };

    // 4) Fetch All Books in db
    getAllBooks = () => {
        return getDocs(bookCollectionRef);
    };

    // 5) Fetch an individual book
    getBook = (id) => {
        const bookDoc = doc(db, "books", id);
        return getDoc(bookDoc);
    }

}

export default new BookDataService();
