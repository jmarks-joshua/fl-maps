import React, { Component } from 'react';

class CategoryDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catagory: 'All',
      value: "",
    };
    this.change = this.change.bind(this);
  }

  componentDidUpdate(prevProps,prevState){
    if (prevState.value !== this.state.value){
      this.props.changeCategory(this.state.value);
    }
  }

  change(event) {
    const setValueAndToggle = {
      value: event.target.value,
    }
    this.setState(setValueAndToggle);
  }

  render() {
    const { allPosibleCategories} = this.props;
    const categoriesForDropDown = [<option key={"Sort By Category"} selected disabled>Sort By Category</option>];
    allPosibleCategories.forEach(ele=>{
      categoriesForDropDown.push(<option key={ele} value={ele}>{ele}</option>);
    })

    return (
      <select id="pet-select"  onChange={this.change}>
        {categoriesForDropDown}
      </select>
    )
  }
}

export default CategoryDropDown;
