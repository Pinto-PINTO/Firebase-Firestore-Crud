import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import '../App.css';
import BookDataService from "../services/book.services";

// Imports from MUI
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';



const AddBook = ({ id, setBookId }) => {

    // States for the form fields
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState("Available");
    const [age, setAge] = React.useState("");
    const [category, setCategory] = React.useState("");

    // State to handle error messages
    const [message, setMessage] = useState({ error: false, msg: "" });

    const [flag, setFlag] = useState(true);


    // 1) Handling Form Submit    
    const handleSubmit = async (e) => {
        e.preventDefault();  // prevents the page refreshing on submit
        setMessage("");
        if (title === "" || author === "" || age === "") {
            setMessage({ error: true, msg: "All fields are mandatory!" });
            return;
        }
        const newBook = {
            title,
            author,
            status,
            age,
            category,
        };
        console.log(newBook);

        // if id is empty or undefined -> insert
        // if id is defined -> update

        try {
            if (id !== undefined && id !== "") {
                await BookDataService.updateBook(id, newBook);
                setBookId("");
                setMessage({ error: false, msg: "Updated successfully!" });
            } else {
                await BookDataService.addBooks(newBook);
                setMessage({ error: false, msg: "New Book added successfully!" });
            }
        } catch (err) {
            setMessage({ error: true, msg: err.message });
        }

        setTitle("");
        setAuthor("");
        setAge("");
        setCategory("");
    };

    // 2) Update

    // 2.1) Fetch the record from the id
    const editHandler = async () => {
        setMessage("");
        try {
            const docSnap = await BookDataService.getBook(id);
            console.log("the record is :", docSnap.data());
            setTitle(docSnap.data().title);
            setAuthor(docSnap.data().author);
            setStatus(docSnap.data().status);
            setAge(docSnap.data().age);
            setCategory(docSnap.data().category);
        } catch (err) {
            setMessage({ error: true, msg: err.message });
        }
    };

    // 2.2) Insert or Update indentifier
    // If id is undefined or empty -> The form acts as 'insert'
    // If id is defined -> The form acts as 'update'
    useEffect(() => {
        console.log("The id here is : ", id);
        if (id !== undefined && id !== "") {
            editHandler();
        }
    }, [id]);


    return (
        <>
            <div className="p-4 box">

                {/* -------------- Alert Box START -------------- */}
                {message?.msg && (
                    <Alert
                        variant={message?.error ? "danger" : "success"}
                        dismissible
                        onClose={() => setMessage("")}
                    >
                        {message?.msg}
                    </Alert>
                )}
                {/* -------------- Alert Box END -------------- */}

                {/* --------------Form START -------------- */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBookTitle">
                        <InputGroup>
                            <InputGroup.Text id="formBookTitle">B</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Book Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBookAuthor">
                        <InputGroup>
                            <InputGroup.Text id="formBookAuthor">A</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Book Author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <ButtonGroup aria-label="Basic example" className="mb-3">
                        <Button
                            disabled={flag}
                            variant="success"
                            onClick={(e) => {
                                setStatus("Available");
                                setFlag(true);
                            }}
                        >
                            Available
                        </Button>
                        <Button
                            variant="danger"
                            disabled={!flag}
                            onClick={(e) => {
                                setStatus("Not Available");
                                setFlag(false);
                            }}
                        >
                            Not Available
                        </Button>
                    </ButtonGroup>

                    {/* -------------- Age Dropdown START -------------- */}
                    <FormControl fullWidth className="mb-3">
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={(e) => { setAge(e.target.value) }}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    {/* -------------- Age Dropdown END -------------- */}

                    {/* -------------- Category Dropdown START -------------- */}
                    <FormControl fullWidth className="mb-3">
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        {
                            age === 10 ? <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Category"
                                onChange={(e) => { setCategory(e.target.value) }}
                            >
                                <MenuItem value={"Ten Cat 1"}>Ten Cat 1</MenuItem>
                                <MenuItem value={"Ten Cat 2"}>Ten Cat 2</MenuItem>
                                <MenuItem value={"Ten Cat 3"}>Ten Cat 3</MenuItem>
                            </Select> : age === 20 ? <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Category"
                                onChange={(e) => { setCategory(e.target.value) }}
                            >
                                <MenuItem value={"Twenty Cat 1"}>Twenty Cat 1</MenuItem>
                                <MenuItem value={"Twenty Cat 2"}>Twenty Cat 2</MenuItem>
                                <MenuItem value={"Twenty Cat 3"}>Twenty Cat 3</MenuItem>
                            </Select> : <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Category"
                                onChange={(e) => { setCategory(e.target.value) }}
                            >
                                <MenuItem value={"Thirty Cat 1"}>Thirty Cat 1</MenuItem>
                                <MenuItem value={"Thirty Cat 2"}>Thirty Cat 2</MenuItem>
                                <MenuItem value={"Thirty Cat 3"}>Thirty Cat 3</MenuItem>
                            </Select>
                        }

                    </FormControl>
                    {/* -------------- Category Dropdown END -------------- */}



                    {/* <div>
                        {
                            age === 10 ? "Type 1" : age === 20 ? "Type 2" : "Type 3"
                        }
                    </div> */}



                    <div className="d-grid gap-2">
                        <Button variant="primary" type="Submit">
                            Add/ Update
                        </Button>
                    </div>
                </Form>
                {/* --------------Form END -------------- */}
            </div>
        </>
    );
};

export default AddBook;