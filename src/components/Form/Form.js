import React, {Component} from 'react';
import './Form.css';
//import Wrap from '../../hoc/Wrap/Wrap';
import states from '../../data/SelectState/states.json';
import Button from '../Button/Button';
import $ from 'jquery';

class Form extends Component {
    state = {
        firstName:'',
        lastName:'',
        email:'',
        street:'',
        zip:'',
        ddState:'',
        checked: false,
        checkedNotRequired: false,
        radioOption:'',
        radioRequiredOption:'Option3'
    }

    //the change handlers check for each character input in the field, using html5. This would have to be done
    //differently if check only at submit, for example - compare to regex
    inputChangeHandler = (event) => {
        event.target.classList.add('active'); 

        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });

        this.showInputError(event.target.name);
    }

    inputChangeNotRequiredHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    checkHandler = () => {
        this.setState({checked: !this.state.checked});
    }
    checkNotRequiredHandler = () => {
        this.setState({checkedNotRequired: !this.state.checked});
    }

    radioChangeHandler = (event) => {
        this.setState({radioOption: event.target.value });
    }
    radioRequiredChangeHandler = (event) => {
        this.setState({radioRequiredOption: event.target.value});
    }
   
    submitHandler = (event) => {
        event.preventDefault();

        console.log('component state', JSON.stringify(this.state));

        if (!this.showFormErrors()) {
            console.log('form is invalid: do not submit');
          } else {
            console.log('form is valid: submit');

            const min = 1;
            const max = 10000;
            const rand = Math.round(min + Math.random() * (max - min));

            let formData = {
                //update this to fields needed. This is for testing
                userId: String(rand),
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                insertDate: new Date().toISOString().replace('T', ' ').replace('Z', '').toString()
            }

            console.log('formData: ' + JSON.stringify(formData));

            var postUrl = 'https://byl4ikq1cj.execute-api.us-east-1.amazonaws.com/dev/users';
                    
            postData(postUrl, formData)
            .then(data => {
                console.log("POST - data: " + JSON.stringify(data));
                console.log(JSON.stringify(data))  // JSON-string from 'response.json()' call
            }) 
            .catch(error => {
                console.error(error);
                alert('There was some problem with sending your message. ' + error.toString());
            });  

            function postData(url = '', data = {}) {
                // Default options are marked with *
                return fetch(url, {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, cors, *same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "omit", // include, *same-origin, omit
                    headers: {
                        "Content-Type": "application/json", // "Content-Type": "application/x-www-form-urlencoded",
                        "X-Api-Key": "x50B0mqpwf8Ge9GlWa0EO3xWA4Q4uloo3bSP8ln3" 
                    },
                    redirect: "follow", // manual, *follow, error
                    referrer: "no-referrer", // no-referrer, *client
                    body: JSON.stringify(data), // body data type must match "Content-Type" header
                })
                .then(response => response.json()); // parses response to JSON
            }  

            this.setState({
                firstName:'',
                    lastName:'',
                    email:'',
                    street:'',
                    zip:'',
                    ddState:'',
                    checked: false,
                    checkedNotRequired: false,
                    radioOption:'',
                    radioRequiredOption:'Option3'
                });
     

            this.props.history.push({pathname: '/thank-you'});
          }

        //check zip code regex pattern here
        const zipInput = document.getElementsByName('zip')[0].value;
        const zipErrorLabel = document.getElementById('zipError');
        const reZip = /^\d{5}$/;
        if (zipInput === '') {
            zipErrorLabel.textContent = "ZIP Code is a required field";
        } else if (!reZip.test(zipInput)) {
            zipErrorLabel.textContent = "ZIP Code requires 5 digits";
         }
    }

    showFormErrors = () => {
        //const inputs = document.querySelectorAll('input');
        const inputs = document.querySelectorAll('input[type="text"][required], input[type="email"][required]');
        const selects = document.querySelectorAll('select');
        const checkboxes = document.querySelectorAll('input[type="checkbox"][required]');
        let isFormValid = true;

        inputs.forEach(input => {
            input.classList.add('active');

            const isInputValid = this.showInputError(input.name);

            if(!isInputValid) {
                isFormValid = false;
            }
        });

        selects.forEach(select => { 
            select.classList.add('active');

            const isInputValid = this.showInputError(select.name);
            if(!isInputValid) {
                isFormValid = false;
            }
        });

        checkboxes.forEach(checkbox => {
            
                checkbox.classList.add('active');
                const isInputValid = this.showInputError(checkbox.name);
                if (!this.state.checked) {
                    if(!isInputValid) {
                        isFormValid = false;
                    }
                } 
            
        });
        

        return isFormValid;
    }

    showInputError = (refName) => { 
        const validity = this.refs[refName].validity;
        const label = document.getElementById(`${refName}Label`).textContent;
        const error = document.getElementById(`${refName}Error`);
        if (!validity.valid) {
            if (validity.valueMissing) {
                if (this.refs[refName].type === "checkbox") { 
                    error.textContent = `this checkbox is a required field`;
                } else { 
                error.textContent = `${label} is a required field`;
                }
            } else if (validity.typeMismatch) {
                error.textContent = `${label} should be a valid email address`;
            } 
            
            return false;
        } 

        error.textContent = '';
        return true;
    }

    render() {
        //var msg;
        //if (this.state.checked){
        //    msg = 'checked';
        //} else {
        //    msg = "unchecked";
        //}
        return(
            // <Wrap>
            <div className="form-wrapper">
            <div className="form-content">
                <h1>Form Page</h1>
                <form noValidate>
                    <div className="form-group">
                        <label id="firstNameLabel">First Name</label><span>*</span>
                        <input 
                            className = "form-control"
                            name="firstName"
                            ref="firstName"
                            type="text" 
                            placeholder="First Name"
                            value={this.state.firstName} 
                            onChange={this.inputChangeHandler} 
                            required
                            />
                        <div className="error" id="firstNameError" />
                    </div>

                    <div className="form-group">
                        <label id="lastNameLabel">Last Name</label><span>*</span>
                        <input 
                            className = "form-control"
                            name="lastName"
                            ref="lastName"
                            type="text" 
                            placeholder="Last Name"
                            value={this.state.lastName} 
                            onChange={this.inputChangeHandler} 
                            required
                            />
                        <div className="error" id="lastNameError" />
                    </div>

                    <div className="form-group">
                        <label id="emailLabel">Email</label><span>*</span>
                        <input
                            className = "form-control"
                            name="email" 
                            ref="email"
                            type="email"
                            placeholder="Email" 
                            value={this.state.email} 
                            onChange={this.inputChangeHandler} 
                            required
                            />
                        <div className="error" id="emailError" />
                    </div>

                    <div className="form-group">
                        <label id="streetLabel">Street</label>
                        <input
                            className = "form-control"
                            name="street" 
                            ref="street"
                            type="text" 
                            placeholder="Street"
                            value={this.state.street} 
                            onChange={this.inputChangeNotRequiredHandler}
                            />
                    </div>
                    
                    <div className="form-group">
                        <label id="zipLabel">ZIP Code</label><span>*</span>
                        <input
                            className = "form-control"
                            name="zip" 
                            ref="zip"
                            type="text" 
                            placeholder="zip"
                            pattern="^\d{5}$"
                            maxLength="5"
                            value={this.state.zip} 
                            onChange={this.inputChangeHandler}
                            required 
                            />
                        <div className="error" id="zipError" />
                    </div>

                    <div className="form-group">
                        <label id="ddStateLabel">State</label><span>*</span>
                        
                        <select
                            className="form-control"
                            name="ddState"
                            ref="ddState"
                            value={this.state.ddState}
                            onChange={this.inputChangeHandler}
                            required
                            >
                            {states.map(item => <option key={item.abbreviation} value={item.abbreviation}>{item.name}</option>)}
                        </select>
                        
                        <div className="error" id="ddStateError" />
                    </div>

                    <div className="form-group cb-group">
                        <input 
                            type="checkbox"
                            id="cb" 
                            name="cb"
                            ref="cb"
                            onChange={this.checkHandler}
                            defaultChecked={this.state.checked}
                            required
                            />
                        <label id="cbLabel" htmlFor="cb" className="cbLabel">This is required.</label>
                        {/*<p>box is {msg}</p> */}
                        <div className="error" id="cbError" />
                    </div>

                    <div className="form-group cb-group">
                        <input 
                            type="checkbox"
                            id="cb1" 
                            name="cb1"
                            ref="cb1"
                            onChange={this.checkNotRequiredHandler}
                            defaultChecked={this.state.checkedNotRequired}
                            />
                        <label id="cbLabel" htmlFor="cb1" className="cbLabel">This is not required.</label>
                        {/*<p>box is {msg}</p> */}
                        {/*<div className="error" id="cbError" /> */}
                    </div>
                    
                    <div className="form-group radios">
                        <p>This radio button group is not required.</p>
                        <div className="radio-group">
                            <input 
                                type="radio"
                                id="radio1"
                                name="radios"
                                value="Option1"
                                ref=""
                                onChange={this.radioChangeHandler}
                            />
                            <label id="radio1Label">Option 1</label>
                        </div>
                        
                        <div className="radio-group">
                            <input 
                                type="radio"
                                id="radio2"
                                name="radios"
                                value="Option2"
                                ref=""
                                onChange={this.radioChangeHandler}
                            />
                            <label id="radio1Label">Option 2</label>
                        </div>
                    </div>

                    <div className="form-group radios">
                        <p>This radio button group IS required. So one option is prechecked.</p>
                        <div className="radio-group">
                            <input 
                                type="radio"
                                id="radio3"
                                name="radiosReq"
                                value="Option3"
                                ref=""
                                onChange={this.radioRequiredChangeHandler}
                                defaultChecked
                                required
                            />
                            <label id="radio1Label">Option 3</label>
                        </div>
                        
                        <div className="radio-group">
                            <input 
                                type="radio"
                                id="radio4"
                                name="radiosReq"
                                value="Option4"
                                ref=""
                                onChange={this.radioRequiredChangeHandler}
                                required
                            />
                            <label id="radio1Label">Option 4</label>
                        </div>
                    </div>

                    <div className="button-group">
                        <Button 
                            clicked={this.submitHandler.bind(this)}>Submit - Default Button</Button>

                        <Button 
                            btnType="green" 
                            clicked={this.submitHandler.bind(this)}>Submit Green</Button>
                    </div>

                </form>
            </div>
            </div>
            //</Wrap>
        );
    }
    
}
export default Form;