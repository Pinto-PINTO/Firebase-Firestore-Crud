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
    const [category, setCategory] = React.useState("");
    const [subCategory, setSubCategory] = React.useState("");

    // State to handle error messages
    const [message, setMessage] = useState({ error: false, msg: "" });

    const [flag, setFlag] = useState(true);


    // 1) Handling Form Submit    
    const handleSubmit = async (e) => {
        e.preventDefault();  // prevents the page refreshing on submit
        setMessage("");
        if (title === "" || author === "" || category === "" || subCategory === "") {
            setMessage({ error: true, msg: "All fields are mandatory!" });
            return;
        }
        const newBook = {
            title,
            author,
            status,
            category,
            subCategory,
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
        setCategory("");
        setSubCategory("");
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
            setCategory(docSnap.data().category);
            setSubCategory(docSnap.data().subCategory);
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

                    {/* -------------- Main Cayegory Dropdown START -------------- */}
                    <FormControl fullWidth className="mb-3">
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={(e) => { setCategory(e.target.value) }}
                        >
                            <MenuItem value={"Eat"}>Eat</MenuItem>
                            <MenuItem value={"Goods"}>Goods</MenuItem>
                            <MenuItem value={"Repair and Construction"}>Repair and Construction</MenuItem>
                            <MenuItem value={"Car Service"}>Car Service</MenuItem>
                            <MenuItem value={"Medicine"}>Medicine</MenuItem>
                            <MenuItem value={"Auto Goods"}>Auto Goods</MenuItem>
                            <MenuItem value={"Beauty"}>Beauty</MenuItem>
                            <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                            <MenuItem value={"Sports"}>Sports</MenuItem>
                            <MenuItem value={"Services"}>Services</MenuItem>
                            <MenuItem value={"Special Stores"}>Special Stores</MenuItem>
                            <MenuItem value={"Tourism"}>Tourism</MenuItem>
                            <MenuItem value={"Products"}>Products</MenuItem>
                        </Select>
                    </FormControl>
                    {/* -------------- Main Cayegory Dropdown END -------------- */}

                    {/* -------------- Sub Category Dropdown START -------------- */}
                    <FormControl fullWidth className="mb-3">
                        <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                        {
                            category === "Eat" ? <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subCategory}
                                label="Sub Category"
                                onChange={(e) => { setSubCategory(e.target.value) }}
                            >
                                <MenuItem value={"Coffee Shops"}>Coffee Shops</MenuItem>
                                <MenuItem value={"Pubs"}>Pubs</MenuItem>
                                <MenuItem value={"Restaurants"}>Restaurants</MenuItem>
                                <MenuItem value={"Bar"}>Bar</MenuItem>
                                <MenuItem value={"Bakeries"}>Bakeries</MenuItem>
                                <MenuItem value={"Others"}>Others</MenuItem>
                            </Select> : category === "Goods" ? <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subCategory}
                                label="Sub Category"
                                onChange={(e) => { setSubCategory(e.target.value) }}
                            >
                                <MenuItem value={"Grocery Shops"}>Grocery Shops</MenuItem>
                                <MenuItem value={"Supermarket"}>Supermarket</MenuItem>
                                <MenuItem value={"Stationary"}>Stationary</MenuItem>
                                <MenuItem value={"Pet Shops"}>Pet Shops</MenuItem>
                                <MenuItem value={"For Homes"}>For Homes</MenuItem>
                                <MenuItem value={"Others"}>Others</MenuItem>
                            </Select> : category === "Repair and Construction" ? <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subCategory}
                                label="Sub Category"
                                onChange={(e) => { setSubCategory(e.target.value) }}
                            >
                                <MenuItem value={"Decoration material"}>Decoration material</MenuItem>
                                <MenuItem value={"Plumbing"}>Plumbing</MenuItem>
                                <MenuItem value={"Tool"}>Tool</MenuItem>
                                <MenuItem value={"Services"}>Services</MenuItem>
                                <MenuItem value={"Building Materials"}>Building Materials</MenuItem>
                                <MenuItem value={"Windows"}>Windows</MenuItem>
                                <MenuItem value={"Door"}>Door</MenuItem>
                                <MenuItem value={"Roof"}>Roof</MenuItem>
                                <MenuItem value={"Others"}>Others</MenuItem>
                            </Select> : category === "Car Service" ? <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subCategory}
                                label="Sub Category"
                                onChange={(e) => { setSubCategory(e.target.value) }}
                            >
                                <MenuItem value={"Car Repair"}>Car Repair</MenuItem>
                                <MenuItem value={"Car Washes"}>Car Washes</MenuItem>
                                <MenuItem value={"Tire Fitting"}>Tire Fitting</MenuItem>
                                <MenuItem value={"Refueling"}>Refueling</MenuItem>
                                <MenuItem value={"Auto Disassembly"}>Auto Disassembly</MenuItem>
                                <MenuItem value={"Others"}>Others</MenuItem>
                            </Select> : category === "Medicine" ? <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subCategory}
                                label="Sub Category"
                                onChange={(e) => { setSubCategory(e.target.value) }}
                            >
                                <MenuItem value={"Pharmacies"}>Pharmacies</MenuItem>
                                <MenuItem value={"Hospital"}>Hospital</MenuItem>
                                <MenuItem value={"Dispensary"}>Dispensary</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>
                            </Select> : category === "Auto Goods" ? <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subCategory}
                                label="Sub Category"
                                onChange={(e) => { setSubCategory(e.target.value) }}
                            >
                                <MenuItem value={"Car Batteries"}>Car Batteries</MenuItem>
                                <MenuItem value={"Tyres and Wheels"}>Tyres and Wheels</MenuItem>
                                <MenuItem value={"Oil & Car Chemicals"}>Oil & Car Chemicals</MenuItem>
                                <MenuItem value={"Motor Transport"}>Motor Transport</MenuItem>
                                <MenuItem value={"Spare Parts"}>Spare Parts</MenuItem>
                                <MenuItem value={"Others"}>Others</MenuItem>
                            </Select> : category === "Beauty" ? <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subCategory}
                                label="Sub Category"
                                onChange={(e) => { setSubCategory(e.target.value) }}
                            >
                                <MenuItem value={"Hairdressers"}>Hairdressers</MenuItem>
                                <MenuItem value={"Cosmetologist"}>Cosmetologist</MenuItem>
                                <MenuItem value={"Manicure and Pedicure"}>Manicure and Pedicure</MenuItem>
                                <MenuItem value={"Cosmetics"}>Cosmetics</MenuItem>
                                <MenuItem value={"Solariums"}>Solariums</MenuItem>
                                <MenuItem value={"Others"}>Others</MenuItem>
                            </Select> : category === "Entertainment" ? <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subCategory}
                                label="Sub Category"
                                onChange={(e) => { setSubCategory(e.target.value) }}
                            >
                                <MenuItem value={"Clubs"}>Clubs</MenuItem>
                                <MenuItem value={"Night Clubs"}>Night Clubs</MenuItem>
                                <MenuItem value={"Saunas"}>Saunas</MenuItem>
                                <MenuItem value={"Baths"}>Baths</MenuItem>
                                <MenuItem value={"Cinemas"}>Cinemas</MenuItem>
                                <MenuItem value={"Amusement"}>Amusement</MenuItem>
                                <MenuItem value={"Children Playrooms"}>Children Playrooms</MenuItem>
                                <MenuItem value={"Others"}>Others</MenuItem>
                            </Select> : category === "Sports" ? <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subCategory}
                                label="Sub Category"
                                onChange={(e) => { setSubCategory(e.target.value) }}
                            >
                                <MenuItem value={"Gym"}>Gym</MenuItem>
                                <MenuItem value={"Fitness Centers"}>Fitness Centers</MenuItem>
                                <MenuItem value={"Sections"}>Sections</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>
                            </Select> : category === "Special Stores" ? <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subCategory}
                                label="Sub Category"
                                onChange={(e) => { setSubCategory(e.target.value) }}
                            >
                                <MenuItem value={"Furniture"}>Furniture</MenuItem>
                                <MenuItem value={"Flowers"}>Flowers</MenuItem>
                                <MenuItem value={"Jewelry"}>Jewelry</MenuItem>
                                <MenuItem value={"Clothes"}>Clothes</MenuItem>
                                <MenuItem value={"Shoes"}>Shoes</MenuItem>
                                <MenuItem value={"Souvenirs"}>Souvenirs</MenuItem>
                                <MenuItem value={"Others"}>Others</MenuItem>
                            </Select> : category === "Tourism" ? <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subCategory}
                                label="Sub Category"
                                onChange={(e) => { setSubCategory(e.target.value) }}
                            >
                                <MenuItem value={"Hotels"}>Hotels</MenuItem>
                                <MenuItem value={"Apartment Offices"}>Apartment Offices</MenuItem>
                                <MenuItem value={"Travel Agencies"}>Travel Agencies</MenuItem>
                                <MenuItem value={"Hostels"}>Hostels</MenuItem>
                                <MenuItem value={"Recreation Centers"}>Recreation Centers</MenuItem>
                                <MenuItem value={"Others"}>Others</MenuItem>
                            </Select> : <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subCategory}
                                label="Sub Category"
                                onChange={(e) => { setSubCategory(e.target.value) }}
                            >
                                <MenuItem value={"Fish"}>Fish</MenuItem>
                                <MenuItem value={"Meat"}>Meat</MenuItem>
                                <MenuItem value={"Drinks"}>Drinks</MenuItem>
                                <MenuItem value={"Confectionery"}>Confectionery</MenuItem>
                                <MenuItem value={"Others"}>Others</MenuItem>
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