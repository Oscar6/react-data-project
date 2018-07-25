import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Table } from 'react-bootstrap';
import Select from 'react-select';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
      jsonList : []
    };
  }

  componentDidMount() {
    fetch('http://www.json-generator.com/api/json/get/cqTfPdJnNe?indent=2',{
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      this.setState({
        jsonList : json
      });
    })
    .catch(error => {
      console.log(error)
    });
  }

  handleChange(selectedOption) {
    // console.log(selectedOption)
    this.setState({
      selectedOption : selectedOption ? selectedOption : ''
    });
    // console.log(`Option selected:`, selectedOption);
  }

  render() {

    const selectList = this.state.jsonList.map(item => {
      return { value : item.name, label : item.name}
    });

    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">React Data Project</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Home</NavItem>
            <NavDropdown eventKey={3} title="Data Views" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>List</MenuItem>
              <MenuItem eventKey={3.2}>Search</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1>Randomly Generated AI Lives</h1>
              <p>Here we will list some data</p>
                <div className="row">
                  <div className="col-sm-3">
                    <Select
                      name="form-field-name"
                      value={this.state.selectedOption.value}
                      onChange={this.handleChange.bind(this)}
                      options={selectList}
                    />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-9">
                  <hr />
                  <Table striped bordered condensed hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Address</th>
                          <th>Age</th>
                          <th>Company</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.jsonList.map(item => {
                          console.log(this.state.selectedOption)
                          if(this.state.selectedOption===''||item.name===this.state.selectedOption.value) {
                            return (
                              <tr>
                                <td>{item.name}</td>
                                <td>{item.address}</td>
                                <td>{item.age}</td>
                                <td>{item.company}</td>
                              </tr>
                            )
                          }
                        })}
                      </tbody>
                    </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

export default App;
