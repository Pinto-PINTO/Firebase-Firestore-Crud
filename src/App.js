import './App.css';
import AddBook from './components/Form';
import BooksList from './components/Table';
import { Container, Navbar, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function App() {

  // State to grab the book id
  const [bookId, setBookId] = useState("");

  const getBookIdHandler = (id) => {
    console.log("The id of doc to be edited: ", id);
    setBookId(id);
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">CRUD</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddBook id={bookId} setBookId={setBookId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <BooksList getBookId={getBookIdHandler} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

// const users = [
//   { id: '1', firstName: 'Robin', lastName: 'Wieruch' },
//   { id: '2', firstName: 'Dennis', lastName: 'Wieruch' },
// ];

// function App() {
//   return (
//     <div>
//       <h1>Hello Conditional Rendering</h1>
//       <List list={users} />
//     </div>
//   );
// }

// function List({ list }) {
//   if (!list) {
//     return null;
//   }

//   return (
//     <ul>
//       {list.map(item => (
//         <Item key={item.id} item={item} />
//       ))}
//     </ul>
//   );
// }

// function Item({ item }) {
//   return (
//     <li>
//       {item.firstName} {item.lastName}
//     </li>
//   );
// }

export default App;
