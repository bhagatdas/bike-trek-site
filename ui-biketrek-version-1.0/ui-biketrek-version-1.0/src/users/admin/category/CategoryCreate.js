import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Grid,
  Form,
  Message,
  Table,
  Confirm,
  Modal,
  Input,
} from "semantic-ui-react";

import {
  createCategory,
  removeCategory,
  getCategories,
  updateCategory,
} from "../../../functions/Category";
import "./css/style.css";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState(false);
  const [updateOption, setUpdateOption] = useState("");
  const [deleteValue, setDeleteValue] = useState("");
  const [open, setOpen] = useState(true);
  const [firstOpen, setFirstOpen] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => {
      setCategories(c.data);
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 401) {
          toast.error("token expired ! please re login");
        } else {
          toast.error("failed to add category !. ", err.message);
        }
      });
  };

  const deleteRow = async (slug) => {
    setDeleteValue(slug);
    setState(true);
  };

  const deleteSlugRow = async (slug) => {
    setLoading(true);
    removeCategory(slug, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.name}" is deleted`);
        loadCategories();
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const updateSlugRow = async () => {
    setLoading(true);
    updateCategory(updateOption, { updatedName }, user.token)
    .then((res) => {
      setLoading(false);
      setFirstOpen(false);
      setUpdatedName("");
      loadCategories();
      toast.success(`"${res.data.name}" is updated`);
    })
    .catch((err) => {
      setLoading(false);
      setFirstOpen(false);
      console.log(err);
      setLoading(false);
      if (err.response.status === 401) {
        toast.error("token expired ! please re login");
      } else {
        toast.error("failed to add category !. ", err.message);
      }
    });
  };

  const updateRow = async (slug) => {
    setFirstOpen(true);
    setUpdateOption(slug);
  };

  const Open = () => {
    console.log("deleting data");
    setState(false);
    deleteSlugRow(deleteValue);
  };
  const Close = () => {
    setState(false);
  };

  return (
    <Grid columns={2} stackable>
        <Grid.Column width={4}></Grid.Column>
        <Grid.Column width={12}>
        
        <Confirm open={state} onCancel={Close} onConfirm={Open} />
       
        <Message attached header="Category details" content="Manage your category details , default biking and trekking available." />
        <Form className="attached fluid segment" onSubmit={handleSubmit}>
            <Form.Input label="Category name" placeholder="Name" width={6} onChange={(e) => setName(e.target.value)} value={name}/>
            <Button loading={loading} basic type="submit" circular icon='add circle' />
        </Form>
        
          <Table selectable color='orange'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Category name</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
            
              {categories.map((c) => (
                <Table.Row key={c._id}>
                  <Table.Cell>{c.name} </Table.Cell>
                  <Table.Cell textAlign='right'>
                  <Button loading={loading} onClick={() =>deleteRow(c.slug)} basic circular icon='delete' />
                  <Button loading={loading} onClick={() =>updateRow(c.slug)} basic circular icon='pencil' />
                  </Table.Cell>
                </Table.Row>
              ))}

            </Table.Body>
            <Table.Footer> <Table.Row> <Table.HeaderCell>Total categories available {categories.length}</Table.HeaderCell> </Table.Row> </Table.Footer>
          </Table>
        </Grid.Column>

        <Modal onClose={() => setFirstOpen(false)} onOpen={() => setFirstOpen(true)} open={firstOpen} >
        <Modal.Content>
          <Message size='small'>Please provide new category name.</Message>
          <Input placeholder='New category name' onChange={(e) => setUpdatedName(e.target.value)} value={updatedName}/>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setFirstOpen(false)}> Cancel </Button>
          <Button content="Update" labelPosition='right' icon='checkmark' onClick={() => updateSlugRow()} positive loading={loading}/>
        </Modal.Actions>
      </Modal>
      </Grid>

  );
};

export default CategoryCreate;
