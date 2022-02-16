import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import '../App.css';
import BookDataService from "../services/book.services";

const BooksList = ({ getBookId }) => {

    // State to store all book records as an array
    const [books, setBooks] = useState([]);

    // 1) Fetch all books as the page is loaded (run only once)
    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        const data = await BookDataService.getAllBooks();
        console.log(data.docs);
        setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    // 2) Delete Handler to delete a record
    const deleteHandler = async (id) => {
        await BookDataService.deleteBook(id);
        getBooks();  // refresh after delete
    };

    return (
        <>
            {/* -------------- Refresh Btn START -------------- */}
            <div className="mb-2">
                <Button variant="dark edit" onClick={getBooks}>
                    Refresh List
                </Button>
            </div>
            {/* -------------- Refresh Btn END -------------- */}

            {/* -------------- Table START -------------- */}
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Book Title</th>
                        <th>Book Author</th>
                        <th>Status</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((doc, index) => {
                        return (
                            <tr key={doc.id}>
                                <td>{index + 1}</td>
                                <td>{doc.title}</td>
                                <td>{doc.author}</td>
                                <td>{doc.status}</td>
                                <td>{doc.age}</td>
                                <td>
                                    <Button
                                        variant="secondary"
                                        className="edit"
                                        onClick={(e) => getBookId(doc.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="delete"
                                        onClick={(e) => deleteHandler(doc.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {/* -------------- Table END -------------- */}
        </>
    );
};

export default BooksList;