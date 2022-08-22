import React from "react";
import { data } from "../data";
import { TbCloudUpload } from "react-icons/tb";
import { useState } from "react";
import {
  AddInputWrapper,
  Button,
  Container,
  Image,
  Input,
  Label,
  SearchMovies,
  TableBtnWrapper,
  UploadIcon,
  Wrapper,
} from "./style";

const FuncTable = () => {
  const [movies, setMovies] = useState(data);
  const [openInput, setOpenInput] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [newInputValue, setNewInputValue] = useState("");
  const [select, setSelect] = useState(null);
  const [file, setFile] = useState("");
  const [newImgValue, setNewImgValue] = useState("");

  const SaveMovie = () => {
    let savedMovies = movies.map((value) =>
      value.id === select?.id
        ? {
            ...value,
            url: newImgValue <= 0 ? select.url : newImgValue,
            name: newInputValue <= 0 ? select.name : newInputValue,
          }
        : value
    );
    setMovies(savedMovies);
    setSelect(null);
    setFile(null);
    setNewImgValue(null);
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
    setFile(null);
    setNameValue("");
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
              <Label>
                <Input
                  borderNone
                  id="file"
                  type="file"
                  placeholder="Add Image..."
                  filename={file}
                  onChange={AddImage}
                />
                <UploadIcon>
                  <TbCloudUpload />
                </UploadIcon>
              </Label>
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
                    <td>{index + 1}</td>
                    <td>
                      {select?.id == value.id ? (
                        <>
                          <Label>
                            <Input
                              borderNone
                              id="file"
                              type="file"
                              placeholder="Add Image..."
                              filename={file}
                              onChange={(e) =>
                                setNewImgValue(
                                  URL.createObjectURL(e.target.files[0])
                                )
                              }
                            />
                            <UploadIcon>
                              <TbCloudUpload />
                            </UploadIcon>
                          </Label>
                        </>
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
