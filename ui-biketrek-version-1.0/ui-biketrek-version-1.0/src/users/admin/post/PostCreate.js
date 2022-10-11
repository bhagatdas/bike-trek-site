import React, { useState, useEffect,Fragment } from "react";
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
  Label,
  Header,
  Dropdown,
  TextArea,
  Select,
  Segment,
  Divider,
  Icon,
  Popup,
} from "semantic-ui-react";

import { createPost } from "../../../functions/Post";
import DropdownAllowAdditions from "../../../shared/components/DropdownAllowAdditions";
import {getCategories} from "../../../functions/Category";
import {validateInfo} from "../../../shared/validation/ValidateInfo";
import _ from 'lodash';
import FileUpload from "../../../shared/components/FileUpload";


const initialState = {
  title: "",
  description: "",
  cost: [],
  organizerId: "",
  categories: [],
  category: "",
  totalSlot: "",
  availableSlot: "",
  images: [],
  location: "",
  duration: 1,
  difficulty: ["easy", "moderate", "hard", "extremely hard"],
  season: [
    "january", "febuary", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december",
  ],
  tripDate:"",
  distance:"",
};

const options = [
  { key: 'English', text: 'English', value: 'English' },
  { key: 'French', text: 'French', value: 'French' },
  { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
  { key: 'German', text: 'German', value: 'German' },
  { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
]
const stateOptions =[];

const PostCreate = () => {

  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [imageLoading, setimageLoading] = useState(false);
  const {
    title,
    description,
    cost,
    organizerId,
    categories,
    category,
    totalSlot,
    availableSlot,
    images,
    iternity,
    location,
    duration,
    difficulty,
    season,
    tags,
    tripDate,
    distance,
  } = values;

  const { user } = useSelector((state) => ({ ...state }));

  const [costDetails, setcostDetails] = useState([
    {costValue:'',costDesc:''},
  ])
  
  useEffect(() => {
    console.log("loading data from DB");
    loadCategories();
  }, []);

  useEffect(() => {
    console.log("loading data from DB");
    console.log("values new dasd ",values);
    
  }, [category,season]);


  const loadCategories = () =>{
    getCategories().then((c) => {
      setValues({ ...values, categories: c.data });
      console.log("c.data" ,c.data);
      console.log("values ",values);
      console.log("categories ",c.data);
      const stateOptions1 = _.map(c.data, (state, index) => ({
        key: c.data[index].name,
        text: c.data[index].name,
        value: c.data[index].name,
      }))
      Object.assign(stateOptions,stateOptions1);
    })
  }


  const updateChildData=(child_data)=>{
    //setValues({ ...values, [e.target.name]: e.target.value });
  }

  const handleSubmitCreatePost = async (event) => {
    event.preventDefault();
    console.log("values form submit",values);
    
    validateInfo(values).then((c) =>{
      setErrors(c);
    if(Object.keys(c).length === 0){
      console.log("you can post");
    }
    else{
      console.log("you cant post");
    }
    }).catch((err) =>{
      console.log("validate error ", err);
    })
    
    // createPost(values,user.token).then(res =>{
    //   console.log(res);
    // }).catch((err) =>{
    //   console.log(err);
    //   toast.error(err.response.data);
    // });
  };

  const handleChange = (e,result) => {
    console.log("event details ",e.target.name +"----"+e.target.value);
    
    const { name, value } = result || e.target;
    setValues({ ...values, [name]: value });
    console.log("values dasd ",values);
  };

  // const handleChangeSelect= (e ,target)=>{
  //  setValues({ ...values, [target.name]: target.value },()=>{
  //   console.log("values new " ,values)
  //  });
   
  // }

  const handleChangeSelect= (e ,target)=>{
    
    setValues((prevState)=>({ ...prevState.values, [target.name]: target.value }));
    console.log("dasdasdasd ",values);
   }

  const handleChangeCost = (index,event) => {
    const values = [...costDetails];
    values[index][event.target.name] = event.target.value;
    setcostDetails(values);
  };

  const handleChangeItinerary = (index,event) => {
    const values = [...costDetails];
    values[index][event.target.name] = event.target.value;
    setcostDetails(values);
    console.log("costDetails" ,costDetails);
  };

  const handleAddField = (index,fieldName) => {
    if(index + 1 < duration || fieldName ==="cost-term"){
      setcostDetails([...costDetails,{costValue:'',costDesc:''},]);
    }else{
        toast.error( `Please update trip duration to add more itinerary. current days is ${duration} .` );
      }
  };

  const handleRemoveField = (index) => {
    const values = [...costDetails];
    if(index !== 0){
      values.splice(index,1);
      setcostDetails(values);
    }else{
      toast.error( `You can't delete the first detail. You can update this detail.` );
    }
  };

  return (
    <Grid columns={2} stackable>
      <Grid.Column width={4}></Grid.Column>
      <Grid.Column width={12}>
      <Form onSubmit={handleSubmitCreatePost}>
      <Segment attached="top">
        <Header as="h2" content="Organizer post" />
        <p>Please provide all inputs relevent to your organization service. </p>
      </Segment>
      <Segment>
        <Header as="h2" content="Upload image." />
        <p>Please upload images to make the post imaginable.</p>
        <FileUpload values={values} setValues={setValues} setimageLoading={setimageLoading}/>
      </Segment>
      
      <Segment>
      <Header as="h2" content="Basic details." />
        <p>Please provide basic information to know more about the trip.</p>
        <Form.Group widths='equal'>
        <Form.Input name='title' label='Title' placeholder='Trip title' onChange={handleChange} error={errors.title ? { content: errors.title} : false }/>
        </Form.Group>
        <Form.Field control={TextArea} name='description' label='Description' placeholder='Please provide description about the trip.' onChange={handleChange} />
        <Form.Group widths='equal'>
            <Form.Input label='Duration' name='duration' placeholder='Duration' onChange={handleChange} />
            <Form.Input label='Location' name='location' placeholder='Location' onChange={handleChange} />
            <Form.Input label='Trip Date' name='tripDate' placeholder='Date'  onChange={handleChange} />
            <Form.Input label='Total distance' name='distance' placeholder='Distance in KM' onChange={handleChange} />
        </Form.Group>
          <Form.Group widths='equal'>
            <Form.Select name='category' options={stateOptions} label='Trip Category' placeholder='Category' search selection onChange={handleChangeSelect}/>
            <Form.Select name='difficulty' label='Trip Difficulty' options={options} placeholder='Difficulty' search  onChange={handleChange} />
            <Form.Select name='season' options={stateOptions} fluid multiple search selection  label='Trip Season' placeholder='Season' search  onChange={handleChangeSelect} />
          </Form.Group>
        </Segment>

        <Segment>
        <Header as="h2" content="Itinerary details." />
        <p>Please provide the itinerary details day wise to make the traveller confident about the trip. you can add total of {duration} days itinenary.</p>        
        <Form.Field control={Input} name='itinerary-title' label='Itinerary title' placeholder='Trip itinerary title' onChange={handleChange}/>
          {costDetails.map((costDetail,index) =>(
            <div key={index}>
              {costDetails.length > 1 && (<Divider horizontal>{index + 1}</Divider>)}  
              <Form.Input label="Itinerary summary" name='itinerary-summary' placeholder="Itinerary summary" onChange={event =>handleChangeItinerary(index,event)} />
              <Form.Field control={TextArea} name='itinerary-description' label='Itinerary description' placeholder='Please provide itinerary description about the above summary.' onChange={event =>handleChangeItinerary(index,event)} />    
              <Popup content='Add cost to your feed' trigger={<Button circular icon='plus circle' type="button" onClick={()=>handleAddField(index)}/>} />
              <Popup content='Remove cost to your feed' trigger={<Button circular icon='minus circle' type="button" onClick={()=>handleRemoveField(index)}/>} />
            </div>
          ))}
        </Segment>

        <Segment>
          <Header as="h2" content="Cost details." />
        <p>Please provide cost related information for the trip. you can more details by clicking on the plus button.</p>
          <Form.Input label="Cost in rupee" name='cost' placeholder="Trip Cost in Rupee"  onChange={event =>handleChangeCost(event)} />
          <Form.Field control={TextArea} rows={2} name='cost-description' label='Cost description' placeholder='Please provide cost description about the trip.' onChange={event =>handleChangeCost(event)} />    
        </Segment>

        <Segment>
        <Header as="h2" content="Cost terms inclusion." />
        <p>Please provide cost related information like inclusion and exclusion in the package provided.</p>
        {costDetails.map((costDetail,index) =>(
          <div key={index}>
            {costDetails.length > 1 && (<Divider horizontal>{index + 1}</Divider>)}  
            <Form.Input label="cost inclusion summary" name='cost-inclusion-summary' placeholder="cost inclusion summary" onChange={event =>handleChangeItinerary(index,event)} />
            <Form.Field control={TextArea} rows={2} name='cost-inclusion-description' label='Cost inclusion description' placeholder='Please provide cost inclusion description about the above summary.' onChange={event =>handleChangeItinerary(index,event)} />    
              <Button circular icon='plus circle' onClick={()=>handleAddField(index)}/>
              <Button circular icon='minus circle' onClick={()=>handleRemoveField(index)}/>
          </div>
          ))}
          <Header/>
          <Form.Field control={TextArea} name='cost-note-description' label='Cost note description' placeholder='Please provide cost notes if any' onChange={event =>handleChangeItinerary(event)} />    
        </Segment>
          
        <Segment>
        <Header as="h2" content="Cost terms exclusion." />
        <p>Please provide cost related information like inclusion and exclusion in the package provided.</p>
          {costDetails.map((costDetail,index) =>(
            <div key={index}>
            {costDetails.length > 1 && (<Divider horizontal>{index + 1}</Divider>)}  
            <Form.Input label="cost exclusion summary" name='cost-exclusion-summary' placeholder="cost exclusion summary" onChange={event =>handleChangeItinerary(index,event)} />
            <Form.Field control={TextArea} rows={2} name='cost-exclusion-description' label='Cost exclusion description' placeholder='Please provide cost exclusion description about the above summary.' onChange={event =>handleChangeItinerary(index,event)} />    
            <Button circular icon='plus circle' onClick={()=>handleAddField(index,"cost-term-exclusion")}/>
              <Button circular icon='minus circle' onClick={()=>handleRemoveField(index,"cost-term-exclusion")}/>
          </div>
          ))}
          <Header/>
          <Form.Field control={TextArea} name='cost-note-description' label='Cost note description' placeholder='Please provide cost notes if any' onChange={event =>handleChangeItinerary(event)} />    
        </Segment>

        <Segment>
        <Header as="h2" content="Slot details." />
        <p>Please provide total slots available for the trip.</p>
          <Form.Input label='Total Slots' placeholder='Total slot for the trip' onChange={handleChange} />
        </Segment>

      <Segment>
        <Header as="h2" content="Notes." />
          <p>Please provide any notes that the traveller should take care of. </p>
          <Form.Field control={TextArea} name='last-note-description' label='Trip note description' placeholder='Please provide notes if any' onChange={event =>handleChangeItinerary(event)} />    
      </Segment>

    <Segment>
      <Header as="h2" content="Cancellation policy." />
        <p>Please select cancellation policy from the dropdown. If you don't have any cancellation polity created you can from the policy menu.</p>
          <Form.Field control={Select} options={options} label={{ children: 'Cancellation policy', htmlFor: 'form-select-control-gender' }} placeholder='Cancellation policy' search  onChange={handleChange} />
    </Segment>

    <Segment>
      <Header as="h2" content="Trip essential." />
        <p>Please select trip essential from the dropdown. If you don't have any trip essential created you can add from the essential menu.</p>
          <Form.Field control={Select} options={options} label={{ children: 'Trip Essential', htmlFor: 'form-select-control-gender' }} placeholder='Trip essential' search  onChange={handleChange} />
    </Segment>

  <Segment>
    <Header as="h2" content="Fitness regime." />
      <p>Please fitness regime from the dropdown. If you don't have any trip essential created you can add from the fitness menu </p>
    <DropdownAllowAdditions callFromParent={updateChildData.bind(this)} dataParentToChild={user}/>
  </Segment>

  <Segment>
    <Header as="h2" content="Risk & Respond" />
      <p>Please risk and respond from the dropdown. If you don't have any trip essential created you can add from the risk menu </p>
    <DropdownAllowAdditions callFromParent={updateChildData.bind(this)} dataParentToChild={user}/>
  </Segment>

    <Segment>
    <Header as="h2" content="Search tags." />
    <p>Please provide tags relevent to this post to enrich search about this post by others. </p>
    <DropdownAllowAdditions callFromParent={updateChildData.bind(this)} dataParentToChild={user}/>
    </Segment>
      <Button basic type="submit" color='orange'>Update</Button>
      </Form>
      </Grid.Column>
    </Grid>
  );
};

export default PostCreate;
