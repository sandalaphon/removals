import React from 'react'

class UserList extends React.Component {
  
  handleUpdateClick(e){
    e.preventDefault()
    //iff checked
    var id = e.target.value
    var checked = document.getElementById(id).checked
    this.props.updateAdmin(id,checked)
  }

  handleCheckBoxChange(e){
    e.preventDefault()
     var id = e.target.id
     var checked = document.getElementById(id).checked
     this.props.updateAdmin(id,checked)

  }



  render(){
    var list;

    if(this.props.users.users){
      this.props.users.users.sort(function(a, b) { 

          return (a.email < b.email) ? -1: 1;
      })

     list = this.props.users.users.map((user, index)=>{

      return <li key={index}><input 
      type='checkbox' 
      onChange={this.handleCheckBoxChange.bind(this)} 
      checked={user.admin} id={user.id} key={index}/>{user.email}{user.admin}<button>Delete</button><button onClick={this.handleUpdateClick.bind(this)} value={user.id} >Update</button></li>
      })
    }



    return(
      <div>
        <ol>
          {list}
        </ol>
      </div>
      )
  }
}

export default UserList