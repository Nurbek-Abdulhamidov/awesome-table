import React from "react";
import { data } from "../data";
import { useState } from "react";
import {
  AddInputWrapper,
  Button,
  Container,
  Image,
  Input,
  SearchMovies,
  TableBtnWrapper,
  Wrapper,
} from "./style";

const FuncTable = () => {
  const [movies, setMovies] = useState(data);
  const [openInput, setOpenInput] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [newInputValue, setNewInputValue] = useState("");
  const [select, setSelect] = useState(null);
  const [file, setFile] = useState();
  const [newImgValue, setNewImgValue] = useState();

  const SaveMovie = () => {
    let savedMovies = movies.map((value) =>
      value.id === select?.id
        ? { ...value, url: newImgValue, name: newInputValue }
        : value
    );
    setMovies(savedMovies);
    setSelect(null);
  };

  const AddImage = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const AddNewMovie = () => {
    setOpenInput(!openInput);
  };

  const DeleteMovie = (valueId) => {
    let newMovie = movies.filter((value) => value.id !== valueId);
    setMovies(newMovie);
  };

  const AddMovie = () => {
    setMovies([
      ...movies,
      { id: movies.length + 1, url: file, name: nameValue },
    ]);
    setNameValue("");
    setFile();
  };

  const EditMovie = (value) => {
    setSelect(value);
  };

  const CancelEdit = () => {
    setSelect(null);
  };

  return (
    <Wrapper>
      <Container>
        {openInput ? (
          <Button rang="#16C60C" onClick={AddMovie}>
            ✔️ Add Movie
          </Button>
        ) : (
          <Button rang="#16C60C" onClick={AddNewMovie}>
            ✔️ New Movie
          </Button>
        )}

        <AddInputWrapper>
          {openInput ? (
            <AddInputWrapper>
              <Input
                type="file"
                placeholder="Add Image..."
                filename={file}
                onChange={AddImage}
              />
              <Input
                type="text"
                placeholder="Add Name..."
                value={nameValue}
                onChange={({ target }) => setNameValue(target.value)}
              />
            </AddInputWrapper>
          ) : (
            ""
          )}
        </AddInputWrapper>
        <SearchMovies>
          {openInput ? (
            ""
          ) : (
            <Input
              type="text"
              placeholder="🔍 Search movies..."
              onChange={({ target }) => setSearchVal(target.value)}
            />
          )}
        </SearchMovies>
        <table border={1} width="50%">
          <thead>
            <tr>
              <td>Id</td>
              <td>Image</td>
              <td>Name</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {movies.map(
              (value, index) =>
                value.name.toLowerCase().includes(searchVal.toLowerCase()) && (
                  <tr key={index}>
                    <td>{value.id}</td>
                    <td>
                      {select?.id == value.id ? (
                        <Input
                          type="file"
                          placeholder="Add Image..."
                          filename={file}
                          onChange={(e) =>
                            setNewImgValue(
                              URL.createObjectURL(e.target.files[0])
                            )
                          }
                        />
                      ) : (
                        <Image src={value.url} />
                      )}
                    </td>
                    <td>
                      {select?.id == value.id ? (
                        <Input
                          defaultValue={value.name}
                          onChange={({ target }) =>
                            setNewInputValue(target.value)
                          }
                        />
                      ) : (
                        value.name
                      )}
                    </td>
                    <td>
                      {select?.id == value.id ? (
                        <TableBtnWrapper>
                          <Button rang="red" onClick={CancelEdit}>
                            cancel ❌
                          </Button>
                          <Button rang="yellow" onClick={SaveMovie}>
                            save ✏️
                          </Button>
                        </TableBtnWrapper>
                      ) : (
                        <TableBtnWrapper>
                          <Button
                            rang="red"
                            onClick={() => DeleteMovie(value.id)}
                          >
                            delete ❌
                          </Button>
                          <Button
                            rang="yellow"
                            onClick={() => EditMovie(value)}
                          >
                            edit ✏️
                          </Button>
                        </TableBtnWrapper>
                      )}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </Container>
    </Wrapper>
  );
};

export default FuncTable;
