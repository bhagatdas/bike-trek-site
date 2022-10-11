import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Icon,
  Grid,
  Card,
  Form,
  Image,
  Message,
  Label,
  Header,
} from "semantic-ui-react";
import Hidden from "@material-ui/core/Hidden";
import { updateUser } from "../../functions/Auth";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

const ProfileSetting = ({ history }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [disabledPasswordEdit, setDisabledPasswordEdit] = useState(true);
  const dispatch = useDispatch();

  const [allValues, setAllValues] = useState({
    mobile: "",
    name: "",
    about: "",
    gender: "",
    age: "",
  });

  useEffect(() => {
    if (user && !user.token) history.push("/");
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (password !== "") {
      await auth.currentUser
        .updatePassword(password)
        .then(() => {
          setLoading(false);
          setDisabledPasswordEdit(true);
          setPassword("");
          toast.success("password updated !");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
        });
    } else {
      updateUser(user.token, allValues)
        .then((res) => {
          setLoading(false);
          setDisabledPasswordEdit(true);
          setAllValues({ password: "" });
          toast.success("user details updated !");
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              mobile: res.data.mobile,
              age: res.data.age,
              about: res.data.about,
              token: user.token,
              role: res.data.role,
              picture: res.data.picture,
              _id: res.data._id,
            },
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const handlePasswordEdit = () => {
    setDisabledPasswordEdit(!disabledPasswordEdit);
  };

  return (
    <div>
    <Grid columns={2} stackable>
      <Grid.Column width={4}>
        <Hidden smDown implementation="css">
          <div>
            <Card>
              <Image src={user && user.picture} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{user && user.name}</Card.Header>
                <Card.Meta> <span className="date">Joined in 2015</span> </Card.Meta>
                <Card.Description> Matthew is a musician living in Nashville. </Card.Description>
              </Card.Content>
              <Card.Content extra> <a> <Icon name="user" /> 22 Friends </a> </Card.Content>
            </Card>
          </div>
        </Hidden>
      </Grid.Column>
      <Grid.Column width={12}>
      <div> <Message attached header='User details' content='Fill out the form below to update your account' />
      <Form className='attached fluid segment' onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Input label="Display name" placeholder="Name" width={6} onChange={(e) =>setAllValues({...allValues ,name :e.target.value})} value={user && user.name}/>
          <Form.Select width={3} fluid label="Gender" options={options} placeholder="Gender" onChange={(e) =>setAllValues({...allValues ,gender :e.target.textContent})}/>
        </Form.Group>
        <Form.Group>
        <Form.Input label="Phone number" placeholder="Mobile" width={3} onChange={(e) =>setAllValues({...allValues ,mobile :e.target.value})}/>
          <Form.Input label="Age" placeholder="Age" width={3} onChange={(e) =>setAllValues({...allValues ,age :e.target.value})}/>
          <Form.Input label="Password" placeholder="*********" width={3} disabled={disabledPasswordEdit} onChange={(e) =>setPassword(e.target.value)}/>
        </Form.Group>
        <Form.TextArea label="About" placeholder="Tell us more about you..." onChange={(e) =>setAllValues({...allValues ,about :e.target.value})}/>
        <Button basic type="submit" loading={loading} color='orange'>Update</Button>
      </Form>
      <Message attached='bottom' info>
        <Header size='tiny' onClick={handlePasswordEdit}>Click to enable update password. &nbsp; Upload Photo</Header> 
      </Message>
      </div>
    </Grid.Column>
    </Grid>
  </div>
  );
};

export default ProfileSetting;
